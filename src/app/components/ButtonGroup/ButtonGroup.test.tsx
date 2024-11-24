import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ButtonGroup from "@/app/components/ButtonGroup";
import { ButtonGroupProps } from "@/app/general/interfaces";

describe("ButtonGroup Component", () => {
    const mockButtons = [
        { text: "Button 1", onClick: jest.fn() },
        { text: "Button 2", onClick: jest.fn() },
        { text: "Button 3", onClick: jest.fn() },
    ];

    const defaultProps: ButtonGroupProps = {
        buttonList: mockButtons,
        buttonStyle: { color: "red" },
        containerStyle: { backgroundColor: "blue" },
    };

    it("renders all buttons correctly", () => {
        render(<ButtonGroup {...defaultProps} />);

        mockButtons.forEach((button) => {
            expect(screen.getByText(button.text)).toBeInTheDocument();
        });
    });

    it("applies custom container styles", () => {
        const { container } = render(<ButtonGroup {...defaultProps} />);

        const boxElement = container.querySelector("div");
        expect(boxElement).toHaveStyle("background-color: blue");
    });

    it("applies custom button styles", () => {
        render(<ButtonGroup {...defaultProps} />);

        const buttonElements = screen.getAllByRole("button");
        buttonElements.forEach((button) => {
            expect(button).toHaveStyle("color: red");
        });
    });

    it("calls the correct onClick handler when a button is clicked", () => {
        render(<ButtonGroup {...defaultProps} />);

        const buttons = screen.getAllByRole("button");
        buttons.forEach((button, index) => {
            fireEvent.click(button);
            expect(mockButtons[index].onClick).toHaveBeenCalledTimes(1);
        });
    });
});
