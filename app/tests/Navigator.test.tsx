/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigator from "../components/Navigator";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  push: jest.fn(),
  useRouter: jest.fn(),
}));

describe("Navigator component", () => {
  beforeEach(() => {
    render(<Navigator />);
  });

  it("should exists a navigator", () => {
    const Navigator = screen.getByRole("navigator");
    expect(Navigator).toBeInTheDocument();
  });

  describe("check the existence", () => {
    it("should have a button to add a word", () => {
      const addButton = screen.getByRole("button", { name: /add a word/i });
      expect(addButton).toBeInTheDocument();
    });

    it("should have a button to start learning", () => {
      const startButton = screen.getByRole("button", {
        name: /start learning/i,
      });
      expect(startButton).toBeInTheDocument();
    });

    it("should have a button to show the learned words", () => {
      const learnedWordsButton = screen.getByRole("button", {
        name: /show the learned words/i,
      });
      expect(learnedWordsButton).toBeInTheDocument();
    });

    it("should have a button to show the words to learn", () => {
      const toLearnButton = screen.getByRole("button", {
        name: /show the words to learn/i,
      });
      expect(toLearnButton).toBeInTheDocument();
    });
  });

  describe("check the button's click functionality to change the path", () => {
    const mockPush = jest.fn();
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
      });

      render(<Navigator />);
    });

    it("clicks the button to add a word", () => {
      const addButton = screen.getByRole("button", { name: /add a word/i });
      userEvent.click(addButton);
      expect(mockPush).toHaveBeenCalledWith("/add");
    });

    it("clicks the button to start learning", () => {
      const startButton = screen.getByRole("button", {
        name: /start learning/i,
      });
      userEvent.click(startButton);
      expect(mockPush).toHaveBeenCalledWith("/learn");
    });

    it("clicks the button to show the learned words", () => {
      const learnedWordsButton = screen.getByRole("button", {
        name: /show the learned words/i,
      });
      userEvent.click(learnedWordsButton);
      expect(mockPush).toHaveBeenCalledWith("/learned-words");
    });

    it("clicks the button to show the words to learn", () => {
      const toLearnButton = screen.getByRole("button", {
        name: /show the words to learn/i,
      });
      expect(mockPush).toHaveBeenCalledWith("/words-to-learn");
    });
  });
});
