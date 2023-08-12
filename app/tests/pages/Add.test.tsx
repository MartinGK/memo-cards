import Add from "../../Add/page";
import { render, screen } from "@testing-library/react";

describe("Add page", () => {
  beforeEach(() => {
    render(<Add />);
  });

  it("should exists an Add container", () => {
    const addContainer = screen.getByRole("container", {
      name: "add-container",
    });
    expect(addContainer).toBeInTheDocument();
  });

  it("should exists a card", () => {
    const card = screen.getByRole("card", {
      name: "card",
    });
    expect(card).toBeInTheDocument();
  });
});
