import clsx from "clsx";

import "./Section.scss";

interface SectionProps {
  isHeading?: boolean;
  title: string;
  children: React.ReactNode;
  isFullWidth?: boolean;
  hideTitle?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  isHeading = false,
  title,
  children,
  isFullWidth = false,
  hideTitle = false,
}) => {
  const Tag = isHeading ? "h1" : "h2";
  return (
    <section className={clsx("section", { "section--wide": isFullWidth })}>
      <Tag className={clsx({ "visually-hidden": hideTitle })}>{title}</Tag>
      {children}
    </section>
  );
};
