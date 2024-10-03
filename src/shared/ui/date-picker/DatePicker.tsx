"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import ArrowLeft from "@/shared/icons/arrow-left.svg";
import ArrowRight from "@/shared/icons/arrow-right.svg";
import { useClickOutside } from "@/shared/lib/hooks/use-click-outside";
import { Input, Portal } from "@/shared/ui";

import "./DatePicker.scss";

interface IWeek {
  [key: number]: number | null;
}

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}
export const DatePicker = ({
  label,
  error,
  value,
  onChange,
  ...props
}: DatePickerProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [displayedDate, setDisplayedDate] = useState<Date>();
  const [choosenDate, setChoosenDate] = useState<Date>(new Date());
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useClickOutside(divRef, () => {
    if (isVisible) {
      setIsVisible(false);
      inputRef.current?.blur();
    }
  });

  useEffect(() => {
    const newDate = new Date();
    newDate.setHours(12, 0, 0, 0);
    if (!value) {
      setDisplayedDate(newDate);
      setChoosenDate(newDate);
    }
  }, [value]);

  useEffect(() => {
    onChange &&
      choosenDate &&
      onChange({
        target: {
          value: choosenDate.toISOString().slice(0, 10),
        },
      } as React.ChangeEvent<HTMLInputElement>);
  }, [choosenDate, onChange]);

  const generateCalendarForMonth = (date: Date) => {
    const calendar: IWeek[] = [];
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    const firstWeekDay =
      (new Date(date.getFullYear(), date.getMonth(), 1).getDay() + 6) % 7;
    let startDay = 1;

    for (let i = 0; i < 6; i++) {
      const week: IWeek = {
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
      };
      for (let j = 0; j < 7; j++) {
        const day =
          i === 0 && j < firstWeekDay
            ? null
            : startDay <= daysInMonth
              ? startDay
              : null;
        week[j] = day;
        if (day !== null) startDay++;
      }
      if (Object.values(week).every((day) => day === null)) break;
      calendar.push(week);
    }

    return calendar;
  };

  const changeMonth = (offset: number) => {
    setDisplayedDate((prev) => {
      if (!prev) return prev;
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const handleDateChange = (day: number) => {
    if (!displayedDate) return;
    const newDate = new Date(
      displayedDate.getFullYear(),
      displayedDate.getMonth(),
      day,
    );
    newDate.setHours(12, 0, 0, 0);
    setChoosenDate(newDate);
    setDisplayedDate(newDate);
  };

  const ifCurrentDateIsChoosen = (day: number) => {
    if (!choosenDate || !displayedDate) return false;
    return (
      day === choosenDate.getDate() &&
      displayedDate.getMonth() === choosenDate.getMonth() &&
      displayedDate.getFullYear() === choosenDate.getFullYear()
    );
  };

  return (
    <div>
      <Input
        ref={inputRef}
        {...props}
        label={label}
        error={error}
        type="date"
        value={choosenDate?.toLocaleDateString("fi-FI")}
        onFocus={() => setIsVisible(true)}
      />
      {isVisible && (
        <Portal
          isOpen={isVisible}
          onClose={() => {
            setIsVisible(false);
            inputRef.current?.blur();
          }}
        >
          <div
            className={clsx("calendar", {
              "calendar--visible": isVisible,
              "calendar--hidden": !isVisible,
            })}
            ref={divRef}
            role="grid"
          >
            <div className="label-wrapper">
              <h4 aria-hidden className="label-wrapper--heading">
                {displayedDate?.toLocaleString("en", {
                  month: "long",
                  year: "numeric",
                })}
              </h4>
              <div className="label-wrapper--controls">
                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  title="Previous month"
                  aria-label="Previous month"
                >
                  <ArrowLeft aria-hidden focusable={false} />
                </button>
                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  title="Next month"
                  aria-label="Next month"
                >
                  <ArrowRight aria-hidden focusable={false} />
                </button>
              </div>
            </div>
            <div className="calendar__header" role="row">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span
                  key={day}
                  className="calendar__day calendar__day--bold"
                  aria-label={day}
                  role="columnheader"
                >
                  {day}
                </span>
              ))}
            </div>
            {displayedDate &&
              generateCalendarForMonth(displayedDate).map((week, weekIndex) => (
                <div
                  className="calendar__week"
                  key={weekIndex}
                  role="row"
                  aria-rowindex={weekIndex + 1}
                >
                  {Object.values(week).map((day, dayIndex) =>
                    day ? (
                      <button
                        role="gridcell"
                        aria-colindex={dayIndex + 1}
                        aria-selected={ifCurrentDateIsChoosen(day)}
                        type="button"
                        key={weekIndex * 7 + dayIndex}
                        className={clsx("calendar__day", {
                          "calendar__day--accent": dayIndex > 4,
                          "calendar__day--selected":
                            ifCurrentDateIsChoosen(day),
                        })}
                        onClick={() => {
                          handleDateChange(day);
                        }}
                      >
                        {day}
                      </button>
                    ) : (
                      <div role="gridcell" key={weekIndex * 7 + dayIndex} />
                    ),
                  )}
                </div>
              ))}
          </div>
        </Portal>
      )}
    </div>
  );
};
