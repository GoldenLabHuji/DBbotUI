import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "@/app/components/Footer/Footer";

describe("Footer Component", () => {
    it("renders the footer text", () => {
        render(<Footer />);

        // Check if the footer text is rendered
        expect(screen.getByText("Powered by dbBot")).toBeInTheDocument();
    });

    it("applies the correct styles to the footer container", () => {
        render(<Footer />);

        // Check if the Box component has the correct styles
        const footerBox = screen.getByRole("contentinfo");
        expect(footerBox).toHaveStyle(`
            background-color: #f8f9fa;
            padding: 8px;
            text-align: center;
            position: fixed;
            width: 100%;
            bottom: 0;
            color: black;
        `);
    });

    it("renders the correct typography variant", () => {
        render(<Footer />);

        // Check if Typography is rendered with the correct variant
        const typography = screen.getByText("Powered by dbBot");
        expect(typography).toBeInTheDocument();
        expect(typography).toHaveStyle(`font-size: 0.75rem`);
    });
});
