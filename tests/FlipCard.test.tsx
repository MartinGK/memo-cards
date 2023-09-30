import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import FlipCard, {
  flipCard,
  flipBackCard,
  removeCardFromView,
} from "../app/components/FlipCard";
// const { expect } = require("chai").use(require("chai-style"));

describe("FlipCard ", () => {
  describe("with flipOnClick", () => {
    beforeEach(() => {
      const frontContent = <div>Front Content</div>;
      const backContent = <div>Back Content</div>;

      render(
        <FlipCard
          frontContent={frontContent}
          backContent={backContent}
          flipOnClick
        />
      );
    });

    it("renders without crashing", () => {
      const flipCard = screen.getByRole("card", { name: "flip-card" });
      expect(flipCard).toBeInTheDocument();
      // expect(flipCard).to.be.an.instanceOf(HTMLDivElement);
    });

    it("flips the card when clicked", () => {
      const card = screen.getByRole("card", { name: "flip-card" });
      fireEvent.click(card);
      expect(card).toHaveClass("flip");
    });

    it("flips the card back when the back button is clicked", () => {
      const card = screen.getByRole("card", { name: "flip-card" });
      fireEvent.click(card);
      expect(card).toHaveClass("flip");

      const flipBackButton = screen.getByRole("button", { name: "flip-back" });
      act(() => {
        fireEvent.click(flipBackButton);
      });
      // flipBackCard(card as HTMLDivElement)
      expect(card).toHaveClass("flip-back")
      
    });
  });

  describe("without flipOnClick", () => {
    beforeEach(() => {
      const frontContent = <div>Front Content</div>;
      const backContent = <div>Back Content</div>;

      render(
        <FlipCard frontContent={frontContent} backContent={backContent} />
      );
    });

    it("shouldn't flip on click because flipOnClick is undefined", () => {
      const card = screen.getByRole("card", { name: "flip-card" });
      fireEvent.click(card);

      expect(card).not.toHaveClass("flip");
      fireEvent.click(card);
      expect(card).not.toHaveClass("flip");
    });
  });

  it("applies the flipCard function correctly", () => {
    const div = document.createElement("div");
    flipCard(div);
    expect(div).toHaveClass("flip");
  });

  it("applies the flipBackCard function correctly", () => {
    const div = document.createElement("div");
    flipBackCard(div);
    expect(div).toHaveClass("flip-back");
  });

  it("applies the removeCardFromView function correctly", () => {
    const div = document.createElement("div");
    removeCardFromView(div);
    expect(div).toHaveClass("disappear-card");
  });
});
