import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FlipCard, { flipCard } from "../components/FlipCard";

describe("FlipCard component", () => {
  it("renders without crashing", () => {
    const frontContent = <div>Front Content</div>;
    const backContent = <div>Back Content</div>;

    render(<FlipCard frontContent={frontContent} backContent={backContent} />);
  });

  it("flips the card when clicked", () => {
    const frontContent = <div>Front Content</div>;
    const backContent = <div>Back Content</div>;

    const { container } = render(
      <FlipCard frontContent={frontContent} backContent={backContent} />
    );

    const card = container.querySelector(".card-inner");

    expect(card).not.toHaveStyle("transform: rotateY(180deg)");
    fireEvent.click(card!);
    console.log(card)
    expect(card).toHaveStyle("transform: rotateY(180deg)");
  });

  it("flips the card back when the back button is clicked", () => {
    const frontContent = <div>Front Content</div>;
    const backContent = <div>Back Content</div>;

    const { container } = render(
      <FlipCard frontContent={frontContent} backContent={backContent} />
    );

    const card = container.querySelector(".card-inner");
    const backButton = container.querySelector(".card-arrow-left");

    fireEvent.click(card!);
    expect(card).toHaveStyle("transform: rotateY(180deg)");

    fireEvent.click(backButton!);
    expect(card).toHaveStyle("transform: rotateY(0deg)");
  });

  it("applies the flip style when flipOnClick is true", () => {
    const frontContent = <div>Front Content</div>;
    const backContent = <div>Back Content</div>;

    const { container } = render(
      <FlipCard frontContent={frontContent} backContent={backContent} flipOnClick />
    );

    const card = container.querySelector(".card-inner");

    expect(card).not.toHaveStyle("transform: rotateY(180deg)");
    fireEvent.click(card!);
    expect(card).toHaveStyle("transform: rotateY(180deg)");
  });

  it("applies the flipCard function correctly", () => {
    const div = document.createElement("div");
    flipCard(div);
    expect(div.style.transform).toBe("rotateY(180deg)");
  });
});
