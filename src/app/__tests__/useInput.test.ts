import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import useInput from "@/app/hooks/useInput";
import { Message } from "@/app/general/interfaces";
import { Sender, TypeOfQuestion } from "@/app/general/types";
import { botMessages, botAddMessages } from "@/app/general/resources";
import { botMock } from "@/app/__tests__/resources";

// Mock data for testing

const currentMsgMock = {
    state: [
        {
            id: 0,
            text: "test bot message",
            sender: Sender.BOT,
            typeOfQuestion: TypeOfQuestion.PARAMETER,
            answerOptions: [1],
        } as Message,
    ],
    setState: jest.fn(),
};

const currentQIndexMock = {
    state: 0,
    setState: jest.fn(),
};

const setIsEndSectionMock = jest.fn();
const setIsEndChatMock = jest.fn();
const currentParamMock = {
    state: "",
    setState: jest.fn(),
};

describe("useInput Hook", () => {
    it("should initialize with the bot messages and default states", () => {
        const { result } = renderHook(() =>
            useInput(
                currentMsgMock,
                currentQIndexMock,
                3,
                botMock,
                setIsEndSectionMock,
                currentParamMock
            )
        );

        expect(result.current.botMsg).toEqual(botMessages(botMock));
        expect(result.current.isSubmit).toBe(false);
    });

    it("should update messages and handle valid user input for 'parameter' question type", () => {
        const { result } = renderHook(() =>
            useInput(
                currentMsgMock,
                currentQIndexMock,
                3,
                botMock,
                setIsEndSectionMock,
                currentParamMock
            )
        );

        act(() => {
            result.current.handleUserInput("1", setIsEndChatMock);
        });

        // Should update message state with user's input
        expect(currentMsgMock.setState).toHaveBeenCalledWith([
            ...currentMsgMock.state,
            {
                id: 1,
                text: "1",
                sender: Sender.USER,
                typeOfQuestion: TypeOfQuestion.PARAMETER,
            },
        ]);

        // Should update the current parameter
        expect(currentParamMock.setState).toHaveBeenCalledWith("name");
    });

    it("should handle invalid input and show error message", () => {
        const { result } = renderHook(() =>
            useInput(
                currentMsgMock,
                currentQIndexMock,
                3,
                botMock,
                setIsEndSectionMock,
                currentParamMock
            )
        );

        act(() => {
            result.current.handleUserInput("2", setIsEndChatMock);
        });

        // Should update message state with an error message from the bot
        expect(currentMsgMock.setState).toHaveBeenCalledWith([
            ...currentMsgMock.state,
            {
                id: 1,
                text: "Invalid input",
                sender: Sender.BOT,
                typeOfQuestion: TypeOfQuestion.PARAMETER,
                answerOptions: [1],
            },
        ]);
    });

    it("should handle the 'add' question type and end the section", () => {
        botAddMessages;
        const endMsgMock = {
            state: botAddMessages,
            setState: jest.fn(),
        };
        const { result } = renderHook(() =>
            useInput(
                endMsgMock,
                currentQIndexMock,
                3,
                botMock,
                setIsEndSectionMock,
                currentParamMock
            )
        );

        act(() => {
            result.current.handleUserInput("2", setIsEndChatMock); // "2" corresponds to ending the section
        });

        expect(setIsEndSectionMock).toHaveBeenCalledWith(true);
        expect(setIsEndChatMock).toHaveBeenCalledWith(true);
    });

    it("should toggle the submit state after handling input", () => {
        const { result } = renderHook(() =>
            useInput(
                currentMsgMock,
                currentQIndexMock,
                3,
                botMock,
                setIsEndSectionMock,
                currentParamMock
            )
        );

        act(() => {
            result.current.handleUserInput("1", setIsEndChatMock);
        });

        // Expect the submit state to toggle
        expect(result.current.isSubmit).toBe(true);
    });
});
