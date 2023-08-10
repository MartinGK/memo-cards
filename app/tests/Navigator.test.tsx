/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Navigator from "../components/Navigator";
import { Routes } from "../utils/routes";

describe("Navigator component", () => {
  beforeEach(() => {
    render(<Navigator />);
  });

  describe("check the existence", () => {
    it("should exists a navigator", () => {
      const Navigator = screen.getByRole("navigator");
      expect(Navigator).toBeInTheDocument();
    });

    it("should have a link to redirect to add a card", () => {
      const linkToAddACard = screen.getByRole("link", {
        name: "link to add a card",
      });
      expect(linkToAddACard).toBeInTheDocument();
    });

    it("should have a link to redirect to start learn", () => {
      const linkToStartLearn = screen.getByRole("link", {
        name: "link to start learn",
      });
      expect(linkToStartLearn).toBeInTheDocument();
    });

    it("should have a link to redirect to the learned list", () => {
      const linkToLearnedList = screen.getByRole("link", {
        name: "link to the learned list",
      });
      expect(linkToLearnedList).toBeInTheDocument();
    });

    it("should have a link to redirect to the learning list", () => {
      const linkToTheListToLearn = screen.getByRole("link", {
        name: "link to the learning list",
      });
      expect(linkToTheListToLearn).toBeInTheDocument();
    });
  });

  describe("check the button's click functionality to change the path", () => {
    it("should check that the link has the correct attribute to add a card", async () => {
      const linkToAddACard = screen.getByRole("link", {
        name: "link to add a card",
      });
      expect(linkToAddACard).toHaveAttribute("href", Routes.ADD);
    });

    it("should check that the link has the correct attribute to start learn", async () => {
      const linkToStartLearn = screen.getByRole("link", {
        name: "link to start learn",
      });
      expect(linkToStartLearn).toHaveAttribute("href", Routes.LEARN);
    });

    it("should check that the link has the correct attribute to show the learned words", async () => {
      const linkToLearnedList = screen.getByRole("link", {
        name: "link to the learned list",
      });
      expect(linkToLearnedList).toHaveAttribute("href", Routes.LEARNED);
    });

    it("should check that the link has the correct attribute to show the words to learn", async () => {
      const linkToTheListToLearn = screen.getByRole("link", {
        name: "link to the learning list",
      });
      expect(linkToTheListToLearn).toHaveAttribute("href", Routes.TO_LEARN);
    });
  });
});
