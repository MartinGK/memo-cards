import { cleanup, render, screen } from "@testing-library/react";
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

export const typeOnRelationToRelateTextarea = async (text: string) => {
  await typeOnTextareaInput(text, "relation-to-relate");
};

export const typeOnRelationToLearnTextarea = async (text: string) => {
  await typeOnTextareaInput(text, "relation-to-learn");
};

const typeOnTextareaInput = async (text: string, inputRoleName: string) => {
  const textareaInput = screen.getByRole("input", {
    name: inputRoleName,
  });
  await userEvent.type(textareaInput, text);
};

const { localStorageMock } = mockGlobalStorage({});

describe("CardAddNewRelation happy path", () => {
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

    beforeEach(async () => {
      const relationToLearnInput = screen.getByRole("input", {
        name: "relation-to-relate",
      });
      await userEvent.type(relationToLearnInput, newRelationToAdd);
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
        beforeAll(() => {
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

describe("CardAddNewRelation boundaries", () => {
  describe("front side", () => {
    beforeEach(() => {
      render(<CardAddNewRelation />);
    });

    it("shouldn't let you type more than 3 starts", async () => {
      const testText = "hello world\n\n\n\na";
      await typeOnRelationToRelateTextarea(testText);
      const textarea = screen.getByRole("input", {
        name: "relation-to-relate",
      });
      const lastNewLineIndex = testText.lastIndexOf("\n");
      const theValueThatTheTextareaShouldHave =
        testText.slice(0, lastNewLineIndex) +
        testText.slice(lastNewLineIndex + 1);
      expect(textarea).toHaveValue(theValueThatTheTextareaShouldHave);
    });

    it("should let you type 3 starts", async () => {
      const testText = "hello world\n\n\na";
      await typeOnRelationToRelateTextarea(testText);
      const textarea = screen.getByRole("input", {
        name: "relation-to-relate",
      });
      expect(textarea).toHaveValue(testText);
    });

    it("should limit the amount of word based on the number of characters", async () => {
      const testText = "hello world\n\n\n\naaaaaaaaaaaaaaaaaaaaaa";
      const previousTextarea = screen.getByRole("input", {
        name: "relation-to-relate",
      });
      await typeOnRelationToLearnTextarea(testText);
      const textarea = screen.getByRole("input", {
        name: "relation-to-relate",
      });
      expect(previousTextarea).toBe(textarea.scrollHeight);
    });
  });

  describe("back side", () => {
    beforeEach(async () => {
      render(<CardAddNewRelation />);
      const testText = "go next side";
      await typeOnRelationToRelateTextarea(testText);
      await typeOnRelationToRelateTextarea("start");
    });

    it("shouldn't let you type more than 3 starts", async () => {
      const testText = "hello world\n\n\n\na";
      await typeOnRelationToLearnTextarea(testText);
      const textarea = screen.getByRole("input", {
        name: "relation-to-learn",
      });
      const lastNewLineIndex = testText.lastIndexOf("\n");
      const theValueThatTheTextareaShouldHave =
        testText.slice(0, lastNewLineIndex) +
        testText.slice(lastNewLineIndex + 1);
      expect(textarea).toHaveValue(theValueThatTheTextareaShouldHave);
    });

    it("should add the breakpoint when the user type shift + enter", async () => {
      const relationInput = screen.getByRole("input", {
        name: "relation-to-learn",
      });
      const testWord = "test1";
      await userEvent.type(relationInput, testWord);
      await userEvent.type(relationInput, "{shift}{enter}");
      const testWordToAdd = "test2";
      await userEvent.type(relationInput, testWordToAdd);
      expect(relationInput).toHaveValue(`${testWord}\n${testWordToAdd}`);
    });

    it("should't let you type more than 3 starts", async () => {
      const testText = "hello world\n\n\n\na";
      await typeOnRelationToLearnTextarea(testText);
      const textarea = screen.getByRole("input", {
        name: "relation-to-learn",
      });
      const lastNewLineIndex = testText.lastIndexOf("\n");
      const theValueThatTheTextareaShouldHave =
        testText.slice(0, lastNewLineIndex) +
        testText.slice(lastNewLineIndex + 1);
      expect(textarea).toHaveValue(theValueThatTheTextareaShouldHave);
    });

    it("should let you type 3 starts", async () => {
      const testText = "hello world\n\n\na";
      await typeOnRelationToLearnTextarea(testText);
      const textarea = screen.getByRole("input", {
        name: "relation-to-learn",
      });
      expect(textarea).toHaveValue(testText);
    });

    it("should limit the amount of word based on their scroll height", async () => {
      const testText = "hello world\n\n\n\naaaaaaaaaaaaaaaaaaaaaa";
      const previousTextarea = screen.getByRole("input", {
        name: "relation-to-learn",
      });
      await typeOnRelationToLearnTextarea(testText);
      const textarea = screen.getByRole("input", {
        name: "relation-to-learn",
      });
      //idk if previous is affected
      expect(previousTextarea.scrollHeight).toBe(textarea.scrollHeight);
    });
  });
});
