/**
 * @jest-environment jsdom
 */
import Learn from "../../pages/Learn";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  mockGlobalStorage,
  expectCardToBeNullAfterAnimation,
  expectToTransitionToNextCard,
} from "../testUtils";

const relationsToLearnArrayFromLocalStorage = [
  {
    toRelate: "word",
    relation: "relation",
  },
  {
    toRelate: "word2",
    relation: "relation2",
  },
  {
    toRelate: "word3",
    relation: "relation3",
  },
];

const { localStorageMock } = mockGlobalStorage({
  getItem: jest.fn(
    () =>
      `[{"relationsToLearn":${JSON.stringify(
        relationsToLearnArrayFromLocalStorage
      )}}]`
  ),
});

describe("Learn Page", () => {
  beforeEach(() => {
    render(<Learn />);
  });

  it("should exists a Learn container", () => {
    const learnContainer = screen.getByRole("learn-container");
    expect(learnContainer).toBeInTheDocument();
  });

  it("should call localStorage for the list of words", () => {
    // Check in this test if the render time is enough to call localStorage.getItem
    expect(localStorageMock.getItem).toHaveBeenCalledWith("wordsList");
  });

  it("should exists a card", () => {
    const card = screen.getByRole("card");
    expect(card).toBeInTheDocument();
  });

  it("should exists the word(s) to relate", async () => {
    const textToRelate = screen.getByRole("text-to-relate");
    expect(textToRelate).toBeInTheDocument();
  });

  describe("situations when the card is flipped", () => {
    beforeEach(async () => {
      const card = screen.getByRole("card");
      await userEvent.click(card);
    });

    it("should exists the word(s) in relation", async () => {
      const relatedText = screen.getByRole("related-text");
      expect(relatedText).toBeInTheDocument();
    });

    describe("situations after click at the CROSS button", () => {
      beforeEach(async () => {
        const crossButton = screen.getByRole("button", { name: "cross" });
        await userEvent.click(crossButton);
      });

      it("should disappear the card ", () => {
        expectCardToBeNullAfterAnimation();
      });

      it("should disappear the card and then appear a new one", () => {
        expectToTransitionToNextCard();
      });

      describe("situations after show next card", () => {
        // idk if i can use a expect inside a beforeEach
        beforeEach(expectToTransitionToNextCard);

        it.skip("should appear the new text to relate", () => {
          //it could be the same word as before
        });
      });
    });

    describe("situations after click at the CHECK button", () => {
      const clickCheckButton = async () => {
        const checkButton = screen.getByRole("button", { name: "check" });
        await userEvent.click(checkButton);
      };

      beforeEach(clickCheckButton); // first click

      it("should disappear the card ", () => {
        expectCardToBeNullAfterAnimation();
      });

      it("should disappear the card and then appear a new one", () => {
        expectToTransitionToNextCard();
      });

      it("should call localStorage.setItem", () => {
        expect(localStorageMock.setItem).toHaveBeenCalled();
      });

      it("should call addWordToLearnedList", () => {
        const addWordToLearnedList = jest.fn()
        // this will be a mock for the zustand store
        expect(addWordToLearnedList).toHaveBeenCalled();
      });

      describe("situations after show next card", () => {
        // idk if i can use a expect inside a beforeEach
        beforeEach(expectToTransitionToNextCard);

        it.skip("shouldn't appear the old text to relate", () => {});

        it.skip("should appear the new text to relate", () => {});

        it("should show the no-more-words-message after check all the words", async () => {
          //in this test we need to click the check button 3 times
          await clickCheckButton(); // second click
          expectToTransitionToNextCard();
          await clickCheckButton(); // third click
          expectCardToBeNullAfterAnimation();
          const noMoreWordsMessage = screen.getByRole("no-more-words-message");
          expect(noMoreWordsMessage).toBeInTheDocument();
        });
      });
    });
  });
});
