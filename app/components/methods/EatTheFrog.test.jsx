import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import EatTheFrog from "./EatTheFrog";

describe("EatTheFrog", () => {
  const mockData = {
    id: "eat-the-frog",
    icon: "/frog-icon.png",
  };

  afterEach(() => {
    cleanup();
  });

  it("renders the component", () => {
    render(<EatTheFrog methodData={mockData} />);

    expect(screen.getByRole("textbox")).toBeDefined;
    expect(screen.getByRole("button", { name: "Create Frog" })).toBeDefined();
    expect(screen.getByText("No frogs yet...")).toBeDefined();
  });

  it("can type in the input", () => {
    render(<EatTheFrog methodData={mockData} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Test task" } });

    expect(input.value).toBe("Test task");
  });

  it("can click the button", () => {
    render(<EatTheFrog methodData={mockData} />);

    const button = screen.getByRole("button", { name: "Create Frog" });

    fireEvent.click(button);
    expect(button).toBeDefined();
  });
});
