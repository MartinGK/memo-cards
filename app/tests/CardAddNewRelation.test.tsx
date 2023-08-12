import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardAddNewRelation from "../components/CardAddNewRelation";
import {
  expectCardToBeNullAfterAnimation,
  expectToTransitionToNextCard,
  fakeTimersToCallACallback,
  mockGlobalStorage,
} from "./utils/testUtils";
import {
  PRESS_ENTER_MESSAGE,
  TIME_TO_SHOW_PRESS_ENTER_MESSAGE,
} from "../utils/constants";

const CardWordsToRelateValues = {
  toRelate: "word",
  relation: "relation",
};

const { localStorageMock } = mockGlobalStorage({});

describe("CardAddNewRelation component", () => {
  beforeEach(() => {
    render(<CardAddNewRelation />);
  });

  it("should exists a card", () => {
    const card = screen.getByRole("card", { name: "card" });
    expect(card).toBeInTheDocument();
  });

  it("should exists a relation-to-learn input", () => {
    const relationToLearnInput = screen.getByRole("input", {
      name: "relation-to-learn",
    });
    expect(relationToLearnInput).toBeInTheDocument();
  });

  it("should focus the user on the relation-to-learn input", () => {
    const relationToLearnInput = screen.getByRole("input", {
      name: "relation-to-learn",
    });
    expect(relationToLearnInput).toHaveFocus();
  });

  it("shouldn't exists the press enter button if input is empty", () => {
    const pressEnterPopup = screen.queryByText(PRESS_ENTER_MESSAGE);
    expect(pressEnterPopup).toBe(null);
  });

  describe("events when the input is filled", () => {
    const newRelationToAdd = "relation one";

    beforeEach(() => {
      const relationToLearnInput = screen.getByRole("input", {
        name: "relation-to-relate",
      });
      userEvent.type(relationToLearnInput, newRelationToAdd);
    });

    it("should fill the input", () => {
      const relationToLearnInput = screen.getByRole("input", {
        name: "relation-to-relate",
      });
      expect(relationToLearnInput).toHaveValue(newRelationToAdd);
    });

    it("shouldn't appear the press enter message", () => {
      const pressEnterPopup = screen.queryByText(PRESS_ENTER_MESSAGE);
      expect(pressEnterPopup).toBe(null);
    });

    it("should appear the press enter message after an specific time", () => {
      fakeTimersToCallACallback(() => {
        const pressEnterPopup = screen.getByText(PRESS_ENTER_MESSAGE);
        expect(pressEnterPopup).toBeInTheDocument();
      }, TIME_TO_SHOW_PRESS_ENTER_MESSAGE);
    });

    describe("events when enter is pressed", () => {
      it("should flip the card", () => {
        const cardFlipped = screen.getByRole("card", {name: "card-back"});
        expect(cardFlipped).toBeInTheDocument();
      });

      it("should appear a back button to flip back", () => {
        const relationInput = screen.getByRole("button", {
          name: "flip-back",
        });
        expect(relationInput).toBeInTheDocument();
      });

      it("should appear the 'relation' input the card", () => {
        const relationInput = screen.getByRole("input", {
          name: "relation-to-learn",
        });
        expect(relationInput).toBeInTheDocument();
      });

      it("should focus the user on the textbox input", () => {
        const relationInput = screen.getByRole("input", {
          name: "relation-to-learn",
        });
        expect(relationInput).toHaveFocus();
      });

      describe("events when the user start typing", () => {
        const relation = "new relation";
        beforeEach(() => {
          const relationInput = screen.getByRole("input", {
            name: "relation-to-learn",
          });
          userEvent.type(relationInput, relation);
        });

        it("shouldn't appear the press enter message", () => {
          const pressEnterPopup = screen.queryByText(PRESS_ENTER_MESSAGE);
          expect(pressEnterPopup).toBe(null);
        });

        it("should appear the press enter message after an specific time", () => {
          fakeTimersToCallACallback(() => {
            const pressEnterPopup = screen.getByText(PRESS_ENTER_MESSAGE);
            expect(pressEnterPopup).toBeInTheDocument();
          }, TIME_TO_SHOW_PRESS_ENTER_MESSAGE);
        });

        it("should add the breakpoint to the textarea and the user can type", async () => {
          const testWordToAdd = "test";
          const relationInput = screen.getByRole("input", {
            name: "relation-to-learn",
          });
          await userEvent.type(relationInput, "{shift}{enter}");
          await userEvent.type(relationInput, testWordToAdd);
          expect(relationInput).toHaveValue(`${relation}\n${testWordToAdd}`);
        });

        describe("events when enter is pressed", () => {
          it("should add the relation to the localStorage", () => {
            expect(localStorageMock.setItem).toHaveBeenCalledWith(
              "relationsToLearn",
              JSON.stringify([relation])
            );
          });

          it("should disappear the card", () => {
            expectCardToBeNullAfterAnimation();
          });

          it("should appear a new card after the one that disappear", () => {
            expectToTransitionToNextCard();
          });

          it.skip("should call the addRelationToRelationsToLearn function", () => {
            const addRelationToRelationsToLearn = jest.fn();
            // this will be a mock for the zustand store
            expect(addRelationToRelationsToLearn).toHaveBeenCalled();
          });
        });
      });
    });
  });
});
