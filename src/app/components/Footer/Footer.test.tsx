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

    it("renders the correct typography variant", () => {
        render(<Footer />);

        // Check if Typography is rendered with the correct variant
        const typography = screen.getByText("Powered by dbBot");
        expect(typography).toBeInTheDocument();
        expect(typography).toHaveStyle(`font-size: 1rem`);
    });
});
