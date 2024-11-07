import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CustomButton from "@/app/components/CustomButton";
import { CustomButtonProps } from "@/app/general/interfaces";

describe("CustomButton", () => {
    const defaultProps: CustomButtonProps = {
        text: "Click Me",
    };

    it("renders the button with the provided text", () => {
        render(<CustomButton {...defaultProps} />);
        const buttonElement = screen.getByRole("button", { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
    });

    it("applies additional props to the Button component", () => {
        render(<CustomButton {...defaultProps} disabled />);
        const buttonElement = screen.getByRole("button", { name: /click me/i });
        expect(buttonElement).toBeDisabled();
    });

    it("applies primary color and contained variant by default", () => {
        render(<CustomButton {...defaultProps} />);
        const buttonElement = screen.getByRole("button", { name: /click me/i });
        expect(buttonElement).toHaveClass("MuiButton-containedPrimary");
    });
});
