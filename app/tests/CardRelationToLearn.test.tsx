import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardWordsToRelate from "../components/CardRelationToLearn";
import {
  expectCardToBeNullAfterAnimation,
  mockGlobalStorage,
} from "./utils/testUtils";

const CardWordsToRelateValues = {
  toRelate: "word",
  relation: "relation",
};

const { localStorageMock } = mockGlobalStorage({});

describe("CardWordsToRelate component", () => {
  beforeEach(() => {
    render(<CardWordsToRelate />);
  });

  it("should exists a card", () => {
    const card = screen.getByRole("card", { name: "card" });
    expect(card).toBeInTheDocument();
  });

  it("should exists the word(s) to relate", () => {
    const toRelate = screen.getByText(CardWordsToRelateValues.toRelate);
    expect(toRelate).toBeInTheDocument();
  });

  describe("events when the card is clicked", () => {
    beforeEach(async () => {
    const card = screen.getByRole("card", { name: "card" });
      await userEvent.click(card);
    });

    it("clicks the button to show the card-flipped", () => {
      const cardFlipped = screen.getByRole("card-flipped");
      expect(cardFlipped).toBeInTheDocument();
    });

    it("clicks the button to show the word(s) in relation to learn", () => {
      const relation = screen.getByText(CardWordsToRelateValues.relation);
      expect(relation).toBeInTheDocument();
    });

    it("should exists a CROSS BUTTON", () => {
      const crossButton = screen.getByRole("button", { name: "cross" });
      expect(crossButton).toBeInTheDocument();
    });

    it("should exists a CHECK BUTTON", () => {
      const checkButton = screen.getByRole("button", { name: "check" });
      expect(checkButton).toBeInTheDocument();
    });

    describe("events when the CHECK button is clicked", () => {
      beforeEach(async () => {
        const checkButton = screen.getByRole("button", { name: "check" });
        await userEvent.click(checkButton);
      });

      it("should add the word to 'wordsLearned' object in the localStorage", () => {
        const { toRelate, relation } = CardWordsToRelateValues;
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          "wordsLearned",
          JSON.stringify([{ toRelate, relation }])
        );
      });

      it("should remove the word from 'relationsToLearn' object", () => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          "relationsToLearn",
          JSON.stringify([])
        );
      });

      it("should disappear the card", () => {
        expectCardToBeNullAfterAnimation();
      });
    });

    describe("events when the CROSS button is clicked", () => {
      beforeEach(async () => {
        const crossButton = screen.getByRole("button", { name: "cross" });
        await userEvent.click(crossButton);
      });

      it("marks the word as NOT LEARNED, it shouldn't call the localStorage setItem", () => {
        expect(localStorageMock.setItem).not.toHaveBeenCalled();
      });

      it("should disappear the card", () => {
        expectCardToBeNullAfterAnimation();
      });
    });
  });
});
