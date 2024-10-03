"use client";

import React, { useId, useState } from "react";
import clsx from "clsx";

import ChevronDown from "@/shared/icons/chevron-down.svg";

import "./Dropdown.scss";

import { FormError } from "../form-error/FormError";
import { FormLabel } from "../form-label/FormLabel";
import { FormRow } from "../form-row/FormRow";

interface DropdownProps {
  label: string;
  name: string;
  options: { label: string; value: number | null | string }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  onFocus?: () => void;
  disabled?: boolean;
}

export function Dropdown({
  label,
  options,
  value,
  name,
  onChange,
  error,
  onFocus,
  disabled = false,
}: DropdownProps) {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleToggle();
    }
  };

  const handleSelect = (optionValue: number | null | string) => {
    onChange(optionValue?.toString() || "");
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value?.toString() === value);

  return (
    <FormRow>
      <FormLabel name={name} label={label} id={uniqueId} error={error} />
      <div
        className={clsx("custom-dropdown", {
          "custom-dropdown-error": error,
          "custom-dropdown-disabled": disabled,
        })}
      >
        <div
          id={`${name}-${uniqueId}`}
          className={clsx("custom-dropdown-select", { open: isOpen })}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={`${name}-${uniqueId}-listbox`}
          aria-disabled={disabled}
          aria-labelledby={uniqueId}
          aria-describedby={
            error ? `error-${uniqueId}` : `label-${name}-${uniqueId}`
          }
        >
          <span>{selectedOption?.label || "Select an option"}</span>
          <ChevronDown className="arrow" />
        </div>
        {isOpen && (
          <ul className="custom-dropdown-options" aria-labelledby={uniqueId}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    handleSelect(option.value);
                  }
                }}
                tabIndex={0}
                role="option"
                aria-selected={option.value?.toString() === value}
                className={clsx({
                  selected: option.value?.toString() === value,
                })}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <FormError error={error} id={uniqueId} />
    </FormRow>
  );
}
