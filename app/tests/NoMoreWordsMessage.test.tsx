//it should show a message
import userEvent from "@testing-library/user-event";
import NoMoreWordsMessage from "../components/NoMoreWordsMessage";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { Routes } from "../utils/routes";

jest.mock("next/navigation", () => ({
  push: jest.fn(),
  useRouter: jest.fn(),
}));

describe("CardWordsToRelate component", () => {
  beforeEach(() => {
    render(<NoMoreWordsMessage />);
  });

  it("should exists", () => {
    const noMoreWordsMessage = screen.getByRole("no-more-words-message");
    expect(noMoreWordsMessage).toBeInTheDocument();
  });

  it("should exists the message", () => {
    const noMoreWordsMessage = screen.getByText("You learned all the words!");
    expect(noMoreWordsMessage).toBeInTheDocument();
  });

  it("should exists the message to add a new one", () => {
    const addANewOne = screen.getByText("Add a new one!");
    expect(addANewOne).toBeInTheDocument();
  });

  it("should redirect to /add when the 'add a new one' button is clicked", async () => {
    const mockPush = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<NoMoreWordsMessage />);

    const addANewOneButton = screen.getByRole("button", {
      name: "add a new word",
    });
    await userEvent.click(addANewOneButton);
      expect(mockPush).toHaveBeenCalledWith(Routes.ADD);
  });
});
