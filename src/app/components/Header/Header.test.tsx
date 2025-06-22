import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Header from "@/app/components/Header/Header";
import { botMock } from "@/app/__tests__/resources";

// Mock props
const mockText = "Bot";

describe("Header Component", () => {
    it("renders the header text", () => {
        render(<Header bot={botMock} />);

        // Check if the text is rendered
        expect(screen.getByText(mockText)).toBeInTheDocument();
    });

    it("renders the correct typography element", () => {
        render(<Header bot={botMock} />);
        // Check if Typography is rendered as an h1
        const typography = screen.getByRole("heading", { level: 1 });
        expect(typography).toBeInTheDocument();
        expect(typography.tagName).toBe("H6");
    });
});
