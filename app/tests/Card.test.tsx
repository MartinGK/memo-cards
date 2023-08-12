import { render } from "@testing-library/react";
import Card from "../components/Card";

describe("Card component", () => {
  it("should exists a card", () => {
    const { getByRole } = render(
      <Card>
        <div>Content</div>
      </Card>
    );
    const card = getByRole("card");
    expect(card).toBeInTheDocument();
  });
});
