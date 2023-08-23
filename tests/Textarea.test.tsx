import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Textarea from "../app/components/Textarea";
import { fireEventOnChangeInInputValue } from "./utils/testUtils";

export const typeOnTextarea = (text: string) => {
  const textarea = screen.getByRole("input", { name: "textarea" });
  fireEventOnChangeInInputValue(textarea, text);
};

describe("Textarea component", () => {
  beforeEach(() => {
    render(<Textarea />);
  });

  it("should exists a textarea", () => {
    const textarea = screen.getByRole("input", { name: "textarea" });
    expect(textarea).toBeInTheDocument();
  });

  describe("when the user is typing", () => {
    it("should type correctly", () => {
      const testText = "hello world";
      typeOnTextarea(testText);
      const textarea = screen.getByRole("input", { name: "textarea" });
      expect(textarea).toHaveValue(testText);
    });
  });
});
