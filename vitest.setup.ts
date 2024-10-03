import "@testing-library/jest-dom";

import * as matchers from "@testing-library/jest-dom/matchers";

vi.mock("@/shared/icons/cart.svg", () => ({
  ReactComponent: () => "svg",
  default: "svg",
}));

vi.mock("@/shared/icons/warning.svg", () => ({
  ReactComponent: () => "svg",
  default: "svg",
}));

expect.extend(matchers);
