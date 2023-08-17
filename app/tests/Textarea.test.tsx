import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Textarea from "../components/Textarea";

export const typeOnTextarea = async (text: string) => {
  const textarea = screen.getByRole("input", { name: "textarea" });
  await userEvent.type(textarea, text);
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
    it("should type correctly", async () => {
      const testText = "hello world";
      await typeOnTextarea(testText);
      const textarea = screen.getByRole("input", { name: "textarea" });
      expect(textarea).toHaveValue(testText);
    });
  });
});
