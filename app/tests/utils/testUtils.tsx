import { screen } from "@testing-library/react";
import {
TIME_TO_DISAPPEAR_CARD,
TIME_TO_APPEAR_CARD
} from "../../utils/constants";

export const expectCardToBeNullAfterAnimation = () => {
  fakeTimersToCallACallback(() => {
    const card = screen.getByRole("card");
    expect(card).toBe(null);
  }, TIME_TO_DISAPPEAR_CARD);
};

export const expectCardToAppearAfterAnimation = () => {
  fakeTimersToCallACallback(() => {
    const card = screen.getByRole("card");
    expect(card).toBeInTheDocument();
  }, TIME_TO_APPEAR_CARD);
};

export const fakeTimersToCallACallback = (
  callback: () => void,
  timeToFake: number
) => {
  jest.useFakeTimers();
  setTimeout(callback, timeToFake);
  jest.runAllTimers();
};

export const expectToTransitionToNextCard = () => {
  expectCardToBeNullAfterAnimation();
  expectCardToAppearAfterAnimation();
};

export const mockGlobalStorage = ({
  getItem = jest.fn(),
  setItem = jest.fn(),
  clear = jest.fn(),
}) => {
  const localStorageMock = {
    getItem,
    setItem,
    clear,
  };

  global.localStorage = localStorageMock as unknown as Storage;

  return { localStorageMock };
};
