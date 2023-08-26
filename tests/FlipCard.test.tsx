import React from "react";
import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import FlipCard, { flipCard, flipBackCard } from "../app/components/FlipCard";

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
    });

    it("flips the card when clicked", () => {
      const card = screen.getByRole("card", { name: "flip-card" });

      expect(card).not.toHaveStyle("transform: rotateY(180deg)");
      fireEvent.click(card);
      expect(card).toHaveStyle("transform: rotateY(180deg)");
    });

    it("flips the card back when the back button is clicked", async () => {
      const card = screen.getByRole("card", { name: "flip-card" });
      fireEvent.click(card);

      const flipBackButton = screen.getByRole("button", { name: "flip-back" });
      await act(async () => {
        fireEvent.click(flipBackButton);
        await waitFor(() => {
          expect(card).toHaveStyle("transform: rotateY(0deg)");
        });
      });
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

      expect(card).not.toHaveStyle("transform: rotateY(180deg)");
      fireEvent.click(card);
      expect(card).not.toHaveStyle("transform: rotateY(180deg)");
    });
  });

  it("applies the flipCard function correctly", () => {
    const div = document.createElement("div");
    flipCard(div);
    expect(div.style.transform).toBe("rotateY(180deg)");
  });

  it("applies the flipBackCard function correctly", () => {
    const div = document.createElement("div");
    flipBackCard(div);
    expect(div.style.transform).toBe("rotateY(0deg)");
  });
});
