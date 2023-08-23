import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import CardAddNewRelation from "../components/CardAddNewRelation";
import {
  expectCardToBeNullAfterAnimation,
  expectToTransitionToNextCard,
  fakeTimersToCallACallback,
  fireEventOnChangeInInputValue,
  mockGlobalStorage,
  pressEnterOnInput,
} from "./utils/testUtils";
import {
  CARD_TEXTAREA_MAX_CHARACTERS,
  PRESS_ENTER_MESSAGE,
  TIME_TO_SHOW_PRESS_ENTER_MESSAGE,
} from "../utils/constants";

export const typeOnRelationToRelateTextarea = (text: string) => {
  typeOnTextareaInput(text, "relation-to-relate");
};

export const typeOnRelationToLearnTextarea = (text: string) => {
  typeOnTextareaInput(text, "relation-to-learn");
};

const typeOnTextareaInput = (text: string, inputRoleName: string) => {
  const textareaInput = screen.getByRole("input", {
    name: inputRoleName,
  });
  fireEventOnChangeInInputValue(textareaInput, text);
};

const { localStorageMock } = mockGlobalStorage({});

describe("CardAddNewRelation", () => {
  describe(" happy path", () => {
    beforeEach(() => {
      render(
        <div>
          <CardAddNewRelation />
          <div id="popup-root" />
        </div>
      );
    });

    it("should exists a card", () => {
      expect.assertions(1);
      const card = screen.getByRole("card", { name: "card" });
      return expect(card).toBeInTheDocument();
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

    describe("when the relation-to-learn input is filled", () => {
      const newRelationToAdd = "relation one";
      beforeEach(() => {
        const relationToRelateInput = screen.getByRole("input", {
          name: "relation-to-relate",
        });
        fireEventOnChangeInInputValue(relationToRelateInput, newRelationToAdd);
      });

      it("should fill the input", () => {
        const relationToRelateInput = screen.getByRole("input", {
          name: "relation-to-relate",
        });
        expect(relationToRelateInput).toHaveValue(newRelationToAdd);
      });

      it("shouldn't appear the press enter message", () => {
        const pressEnterPopup = screen.queryByText(PRESS_ENTER_MESSAGE);
        expect(pressEnterPopup).toBe(null);
      });

      it("should appear the press enter message after an specific time", async () => {
        const ClickMe = screen.getByText("ClickMe");
        fireEvent.click(ClickMe);
        jest.runAllTimers();
        const relationToRelateInput = screen.getByRole("input", {
          name: "relation-to-relate",
        });
        fireEvent.keyUp(relationToRelateInput, { key: "A", code: "KeyA" });
        jest.runAllTimers();

        const pressEnterPopup = screen.getByText(PRESS_ENTER_MESSAGE);
        expect(pressEnterPopup).toBeInTheDocument();
        // fakeTimersToCallACallback(() => {
        // }, TIME_TO_SHOW_PRESS_ENTER_MESSAGE);
      });

      describe("when enter is pressed", () => {
        beforeEach(() => {
          const relationToRelateInput = screen.getByRole("input", {
            name: "relation-to-relate",
          });
          pressEnterOnInput(relationToRelateInput);
        });

        it("should add the rotateY(180deg) to the card style", () => {
          const card = screen.getByRole("card", { name: "card" });
          expect(card.style.transform).toBe("rotateY(180deg)");
        });

        //this not a good test because the flip button is always in the screen
        it("should appear a back button to flip back", () => {
          const flipBackButton = screen.getByRole("button", {
            name: "flip-back",
          });
          expect(flipBackButton).toBeInTheDocument();
        });

        //this not a good test because the relationInput is always in the screen
        it("should appear the 'relation-to-learn' input the card", () => {
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

        describe("when the user start typing in the relation-to-learn input", () => {
          const relation = "new relation";

          beforeEach(() => {
            const relationInput = screen.getByRole("input", {
              name: "relation-to-learn",
            });
            fireEventOnChangeInInputValue(relationInput, relation);
          });

          it("should fill the input", () => {
            const relationToRelateInput = screen.getByRole("input", {
              name: "relation-to-learn",
            });
            expect(relationToRelateInput).toHaveValue(relation);
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

          describe("when enter is pressed", () => {
            it.skip("should add the relation to the localStorage", () => {
              expect(localStorageMock.setItem).toHaveBeenCalledWith(
                "relationsToLearn",
                JSON.stringify([relation])
              );
            });

            it.skip("should disappear the card", () => {
              expectCardToBeNullAfterAnimation();
            });

            it.skip("should appear a new card after the one that disappear", () => {
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

  describe("boundaries", () => {
    beforeEach(() => {
      cleanup();
      render(<CardAddNewRelation />);
    });

    describe("front side", () => {
      it(`shouldn't let you type more than ${CARD_TEXTAREA_MAX_CHARACTERS} characters`, async () => {
        const relationToRelateInput = screen.getByRole("input", {
          name: "relation-to-relate",
        });
        let controlString = new Array(CARD_TEXTAREA_MAX_CHARACTERS + 1)
          .fill("A")
          .join("");

        fireEvent.input(relationToRelateInput, {
          target: { value: controlString },
        });
        controlString = controlString.slice(0, -1);
        expect(relationToRelateInput).toHaveValue(controlString);
      });

      it(`could have ${CARD_TEXTAREA_MAX_CHARACTERS} characters`, () => {
        const relationToRelateInput = screen.getByRole("input", {
          name: "relation-to-relate",
        });
        let controlString = new Array(CARD_TEXTAREA_MAX_CHARACTERS)
          .fill("A")
          .join("");

        fireEvent.input(relationToRelateInput, {
          target: { value: controlString },
        });

        expect(relationToRelateInput).toHaveValue(controlString);
      });
    });

    describe("back side", () => {
      beforeEach(() => {
        const testText = "go next side";
        typeOnRelationToRelateTextarea(testText);
        const relationToRelateInput = screen.getByRole("input", {
          name: "relation-to-relate",
        });
        pressEnterOnInput(relationToRelateInput);
      });

      it(`could have ${CARD_TEXTAREA_MAX_CHARACTERS} characters`, () => {
        const relationToLearnInput = screen.getByRole("input", {
          name: "relation-to-learn",
        });
        let controlString = new Array(CARD_TEXTAREA_MAX_CHARACTERS)
          .fill("A")
          .join("");

        fireEvent.input(relationToLearnInput, {
          target: { value: controlString },
        });

        expect(relationToLearnInput).toHaveValue(controlString);
      });

      it(`shouldn't let you type more than ${CARD_TEXTAREA_MAX_CHARACTERS} characters`, () => {
        const relationToLearnInput = screen.getByRole("input", {
          name: "relation-to-learn",
        });
        let controlString = new Array(CARD_TEXTAREA_MAX_CHARACTERS + 1)
          .fill("A")
          .join("");

        fireEvent.input(relationToLearnInput, {
          target: { value: controlString },
        });
        controlString = controlString.slice(0, -1);
        expect(relationToLearnInput).toHaveValue(controlString);
      });
    });
  });
});
