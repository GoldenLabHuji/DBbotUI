import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/app/components/Header/Header";

// Mock props
const mockText = "Welcome to the Application";

describe("Header Component", () => {
    it("renders the header text", () => {
        render(<Header text={mockText} />);

        // Check if the text is rendered
        expect(screen.getByText(mockText)).toBeInTheDocument();
    });

    it("applies the correct styles to the header container", () => {
        render(<Header text={mockText} />);

        // Check if the Box component has correct styles
        const headerBox = screen.getByRole('banner');
        expect(headerBox).toHaveStyle(`
            background-color: #f8f9fa;
            padding: 16px;
            text-align: center;
            color: black;
        `);
    });

    it("renders the correct typography element", () => {
        render(<Header text={mockText} />);

        // Check if Typography is rendered as an h1
        const typography = screen.getByRole('heading', { level: 1 });
        expect(typography).toBeInTheDocument();
        expect(typography.tagName).toBe("H1");
    });
});
