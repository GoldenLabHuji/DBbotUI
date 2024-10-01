import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Message from "@/app/components/Message";
import { Colors, Message as IMessage } from "@/app/general/interfaces";
import { colorCodes } from "@/app/general/resources";

// Mock props
const mockColors: Colors = {
    bot: "blue",
    user: "green",
};

const mockMessageBot: IMessage = {
    id: 1,
    text: "Hello, I am a bot",
    sender: "bot",
    typeOfQuestion: "intro",
};

const mockMessageUser: IMessage = {
    id: 2,
    text: "Hello, I am a user",
    sender: "user",
    typeOfQuestion: "result",
};

describe("Message Component", () => {
    it("renders bot message with correct styling and icon", () => {
        render(<Message message={mockMessageBot} colors={mockColors} />);

        // Check the correct icon (SmartToyIcon for bot)
        expect(screen.getByTestId("SmartToyIcon")).toBeInTheDocument();

        // Check the correct message text
        expect(screen.getByText("Hello, I am a bot")).toBeInTheDocument();

        // Check the color styles
        const avatar = screen.getByTestId("Avatar");
        expect(avatar).toHaveStyle(`background-color: #1976d2`);

        const paper = screen.getByTestId("Paper");
        expect(paper).toHaveStyle(`background-color: #42a5f5`);
    });

    it("renders user message with correct styling and icon", () => {
        render(<Message message={mockMessageUser} colors={mockColors} />);

        // Check the correct icon (PersonIcon for user)
        expect(screen.getByTestId("PersonIcon")).toBeInTheDocument();

        // Check the correct message text
        expect(screen.getByText("Hello, I am a user")).toBeInTheDocument();

        // Check the color styles
        const avatar = screen.getByTestId("Avatar");
        expect(avatar).toHaveStyle(
            `background-color: ${colorCodes.green.dark}`
        );

        const paper = screen.getByTestId("Paper");
        expect(paper).toHaveStyle(
            `background-color: ${colorCodes.green.light}`
        );
    });

    it("renders HTML content correctly with dangerouslySetInnerHTML", () => {
        render(<Message message={mockMessageBot} colors={mockColors} />);

        // Ensure that HTML is rendered
        const messageText = screen.getByText("Hello, I am a bot");
        expect(messageText.tagName).toBe("DIV");
    });
});
