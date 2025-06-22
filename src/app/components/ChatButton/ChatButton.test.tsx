import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ChatButton from "@/app/components/ChatButton/ChatButton";

describe("ChatButton Component", () => {
    it("renders the submit IconButton", () => {
        render(<ChatButton />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("type", "submit");
    });

    it("renders the Send icon", () => {
        render(<ChatButton />);
        const icon = screen.getByTestId("SendIcon");
        expect(icon).toBeInTheDocument();
    });
});
