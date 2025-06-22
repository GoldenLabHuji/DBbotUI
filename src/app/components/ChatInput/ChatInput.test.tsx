import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChatInput from "@/app/components/ChatInput";

describe("ChatInput Component", () => {
    it("renders the input field correctly", () => {
        render(<ChatInput />);

        // Check if the TextField is rendered with the correct placeholder
        const input = screen.getByPlaceholderText("Type a message");
        expect(input).toBeInTheDocument();
    });

    it("applies the correct attributes to the TextField", () => {
        render(<ChatInput />);

        const input = screen.getByPlaceholderText("Type a message");

        // Check if the input field has the correct attributes
        expect(input).toHaveAttribute("name", "input");
        expect(input).toHaveAttribute("type", "text");
        expect(input).toHaveAttribute("placeholder", "Type a message");
    });
});
