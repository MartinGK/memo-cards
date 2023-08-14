import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Textarea from "../components/Textarea";

const typeOnTextarea = (text: string) => {
  const textarea = screen.getByRole("textarea", { name: "textarea" });
  userEvent.type(textarea, text);
};

describe("Textarea component", () => {
  beforeEach(() => {
    render(<Textarea />)
  });

  it("should exists a textarea", () => {
    const textarea = screen.getByRole("textarea", { name: "textarea" });
    expect(textarea).toBeInTheDocument();
  });

  describe("when the user is typing", () => {
    it("should type correctly", () => {
      const testText = "hello world";
      typeOnTextarea(testText);
      const testTextFound = screen.getByText(testText);
      expect(testTextFound).toBeInTheDocument();
    });

    it("should't let you type more than 4 starts", () => {
      const testText = "hello world\n\n\n\n\na";
      typeOnTextarea(testText);
      const testTextNotFound = screen.getByText(testText);
      expect(testTextNotFound).toBeNull();
    });

    it("should let you type 4 starts", () => {
      const testText = "hello world\n\n\n\na";
      typeOnTextarea(testText);
      const testTextFound = screen.getByText(testText);
      expect(testTextFound).toBeInTheDocument();
    });
  });
});
