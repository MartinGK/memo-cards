import userEvent from "@testing-library/user-event";
import NothingMoreToLearn, {
  NOTHING_MORE_TO_LEARN_MESSAGE,
} from "../../app/components/NothingMoreToLearnMessage";
import { render, screen } from "@testing-library/react";
import { Routes } from "../../app/utils/routes";


describe("CardWordsToRelate component", () => {
  beforeEach(() => {
    render(<NothingMoreToLearn />);
  });

  it("should exists", () => {
    const nothingMoreToLearnMarkup = screen.getByRole("message", {
      name: "nothing-more-to-learn-message",
    });
    expect(nothingMoreToLearnMarkup).toBeInTheDocument();
  });

  it("should exists the message", () => {
    const nothingMoreToLearnMessage = screen.getByText(
      NOTHING_MORE_TO_LEARN_MESSAGE
    );
    expect(nothingMoreToLearnMessage).toBeInTheDocument();
  });

  it("should exists the message to add a new one", () => {
    const addANewOne = screen.getByText("Add a new card!");
    expect(addANewOne).toBeInTheDocument();
  });

  it("should check that the link has the correct attribute", async () => {
    const addANewCardAnchor = screen.getByRole("link", {
      name: "add a new card anchor",
    });
    expect(addANewCardAnchor).toHaveAttribute('href', Routes.ADD);
  });
});
