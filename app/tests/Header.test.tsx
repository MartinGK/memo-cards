/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

jest.mock("next/navigation", () => ({
  push: jest.fn(),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Header component", () => {
  beforeEach(() => {
    render(<Header />);
  });

  it("should exists a header", () => {
    const header = screen.getByRole("header", {name: 'header'});
    expect(header).toBeInTheDocument();
  });

  it("should exists a navigator", () => {
    const navigator = screen.getByRole("navigator");
    expect(navigator).toBeInTheDocument();
  });

  it("should have a Welcome message", () => {
    const Welcome = screen.getByText("Welcome");
    expect(Welcome).toBeInTheDocument();
  });
});
