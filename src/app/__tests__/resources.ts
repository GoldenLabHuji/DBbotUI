import "@testing-library/jest-dom/jest-globals";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Bot } from "@/app/general/interfaces";
import { DataType } from "@/app/general/types";

export const botMock: Bot = {
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
                dataType: DataType.STRING,
                operatorsArray: [
                    {
                        id: "equals",
                        displayName: "equals",
                        params: [
                            {
                                isArray: false,
                                dataType: DataType.STRING,
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
                                dataType: DataType.STRING,
                                name: "cell",
                            },
                        ],
                    },
                ],
                rows: ["Alice", "Bob"],
                _description: "The name of the person",
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
                    dataType: DataType.STRING,
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
                    dataType: DataType.STRING,
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

describe("Resources", () => {
    it("Test", () => {});
});
