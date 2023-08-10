/**
 * @jest-environment jsdom
 */
import Add from "../../pages/Add";
import { render, screen } from "@testing-library/react";

describe("Add page", () => {
  beforeEach(() => {
    render(<Add />);
  });

  it("should exists an Add container", () => {
    const addContainer = screen.getByRole("add-container");
    expect(addContainer).toBeInTheDocument();
  });

  it("should exists a card", () => {
    const card = screen.getByRole("card");
    expect(card).toBeInTheDocument();
  });
});
