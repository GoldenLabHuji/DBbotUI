import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChatButton from "@/app/components/ChatButton/ChatButton";

describe("ChatButton Component", () => {
    it("renders the send button correctly", () => {
        render(<ChatButton />);

        // Check if the button with "Send" text is rendered
        const button = screen.getByRole("button", { name: /Send/i });
        expect(button).toBeInTheDocument();
    });

    it("applies the correct styles to the button", () => {
        render(<ChatButton />);

        // Check if the button has the correct inline styles
        const button = screen.getByRole("button", { name: /Send/i });
        expect(button).toHaveStyle("width: 120%");
    });

    it("renders the Send icon", () => {
        render(<ChatButton />);

        // Check if the button contains the SendIcon
        const icon = screen.getByTestId("SendIcon");
        expect(icon).toBeInTheDocument();
    });

    it("is wrapped inside a Grid component with correct sizing", () => {
        render(<ChatButton />);

        // Check if the Grid component is rendered with the correct xs prop
        const gridItem = screen
            .getByRole("button", { name: /Send/i })
            .closest(".MuiGrid-item");
        expect(gridItem).toBeInTheDocument();
        expect(gridItem).toHaveClass("MuiGrid-grid-xs-2");
    });
});
