import { screen } from "@testing-library/react";

export const disappearAnimationTime = 3000;
export const appearingAnimationTime = 3000;

export const expectCardToBeNullAfterAnimation = () => {
  jest.useFakeTimers();
  setTimeout(() => {
    const card = screen.getByRole("card");
    expect(card).toBe(null);
  }, disappearAnimationTime);
  jest.runAllTimers();
};

export const expectCardToAppearAfterAnimation = () => {
  jest.useFakeTimers();
  setTimeout(() => {
    const card = screen.getByRole("card");
    expect(card).toBeInTheDocument()
  }, appearingAnimationTime);
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
