import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";
import useInput from "@/app/hooks/useInput";
import { Bot, Message } from "@/app/general/interfaces";
import { sender } from "@/app/general/types";
import { botMessages, botAddMessages } from "@/app/general/resources";

// Mock data for testing
const botMock: Bot = {
    dataMap: {},
    _details: {
        name: "Bot",
        description: "A bot for testing",
    },
    _data: {
        headers: ["Name", "Age"],
        columns: [
            {
                _id: "name",
                displayName: "Name",
                dataType: "string",
                operatorsArray: [
                    {
                        id: "equals",
                        displayName: "equals",
                        params: [
                            {
                                isArray: false,
                                dataType: "string",
                                name: "cell",
                            },
                        ],
                    },
                    {
                        id: "contains",
                        displayName: "contains",
                        params: [
                            {
                                isArray: false,
                                dataType: "string",
                                name: "cell",
                            },
                        ],
                    },
                ],
                rows: ["Alice", "Bob"],
            },
        ],
    },
    _messages: {
        customMessages: {
            errorMessage: "Invalid input",
            attributeMessage: "Please select an attribute",
            operatorMessage: "Choose an operator",
            continueMessage: "Continue",
            resultMessage: "Here is the result",
        },
        slots: {
            welcomeSlot: ["Welcome to the bot"],
            restartSlot: ["Restarting the process"],
        },
    },
    currentOperatorIndex: 0,
    filePath: "path/to/file",
    operatorsData: [
        {
            id: "equals",
            displayName: "equals",
            params: [
                {
                    isArray: false,
                    dataType: "string",
                    name: "cell",
                },
            ],
        },
        {
            id: "contains",
            displayName: "contains",
            params: [
                {
                    isArray: false,
                    dataType: "string",
                    name: "cell",
                },
            ],
        },
    ],
    operatorsFiles: {
        functions: {
            startsWithBAndEndsWithX:
                '\n\n        export const startsWithBAndEndsWithX = function (cell, value) {\n        return cell.startsWith("B") && cell.endsWith(value);\n    };',
        },
        main: '\nimport {\n    greaterOperator,\n    lowerOperator,\n    equalOperator,\n    rangeOperator,\n    startWithOperator,\n    endWithOperator,\n    containsOperator,\n    equalStringOperator,\n    chooseOneOperator,\n    chooseMultipleOperator,   \n} from "@/app/operators";\n\nexport const OPERATORS = {\n    greater: greaterOperator,\n    lower: lowerOperator,\n    equal: equalOperator,\n    range: rangeOperator,\n    startWith: startWithOperator,\n    endWith: endWithOperator,\n    contains: containsOperator,\n    equalString: equalStringOperator,\n    chooseOne: chooseOneOperator,\n    chooseMultiple: chooseMultipleOperator,\n};\n\nimport { startsWithBAndEndsWithX } from "@/app/operators/startsWithBAndEndsWithX";\n\nOPERATORS["startsWithBAndEndsWithX" as keyof typeof OPERATORS] = startsWithBAndEndsWithX;',
    },
    colors: { bot: "green", user: "blue" },
};

const currentMsgMock = {
    state: [
        {
            id: 0,
            text: "test bot message",
            sender: "bot" as sender,
            typeOfQuestion: "parameter",
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
                sender: "user",
                typeOfQuestion: "parameter",
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
                sender: "bot",
                typeOfQuestion: "parameter",
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
