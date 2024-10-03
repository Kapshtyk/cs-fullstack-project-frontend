import Link from "next/link";

import { Section } from "@/shared/ui";

export default function NotFound() {
  return (
    <Section title="Not Found">
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </Section>
  );
}
