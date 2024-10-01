import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import CSVButton from "@/app/components/CSVButton";
import { saveAs } from "file-saver";
import { parse } from "json2csv";

// Mock saveAs and parse functions
jest.mock("file-saver", () => ({
    saveAs: jest.fn(),
}));

jest.mock("json2csv", () => ({
    parse: jest.fn(() => "mocked,csv,content"),
}));

const mockQueryWords = [
    { word: "apple", frequency: 5 },
    { word: "banana", frequency: 3 },
];

describe("CSVButton Component", () => {
    it("renders the button correctly", () => {
        render(<CSVButton queryWords={mockQueryWords} />);

        // Check if the button is rendered with correct text
        const button = screen.getByRole("button", { name: /Download Results/i });
        expect(button).toBeInTheDocument();
    });

    it("triggers CSV download on button click", () => {
        render(<CSVButton queryWords={mockQueryWords} />);

        const button = screen.getByRole("button", { name: /Download Results/i });

        // Click the button
        fireEvent.click(button);

        // Check if the CSV was parsed correctly
        expect(parse).toHaveBeenCalledWith(mockQueryWords);

        // Check if saveAs was called with the correct blob
        expect(saveAs).toHaveBeenCalledWith(
            expect.any(Blob), // Blob object
            "data.csv" // Filename
        );
    });

    it("applies the correct styles to the button", () => {
        render(<CSVButton queryWords={mockQueryWords} />);

        // Check if the Button component has the correct styles
        const button = screen.getByRole("button", { name: /Download Results/i });
        expect(button).toHaveStyle(`
            margin-left: 7%;
            padding: 1%;
        `);
    });
});
