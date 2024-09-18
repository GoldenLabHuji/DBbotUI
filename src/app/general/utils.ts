import * as fs from "fs";
import * as path from "path";
import { OPERATORS } from "@/app/operators/operators";
import { Message, Bot } from "@/app/general/interfaces";

export function isNumberArray(value: any): value is number[] {
    const isArray = Array.isArray(value);
    if (!isArray) return false;
    const isNumArray = value.every(
        (element: any) => typeof element === "number"
    );
    return isNumArray;
}

export function getOperator(name: string) {
    return OPERATORS[name as keyof typeof OPERATORS];
}

export function convertTextToMessage(
    text: string,
    id: number,
    continueMessage: string
): Message {
    return {
        id: id,
        text: text + "\n" + continueMessage,
        sender: "bot",
        typeOfQuestion: "intro",
        answerOptions: [1],
    };
}

export function createOperatorsFiles(bot: Bot) {
    const mainFileText = bot.operatorsFiles.main;
    const functionsFileObject = bot.operatorsFiles.functions;

    const mainFilePath = path.resolve(
        `${process.cwd()}/src/app/operators`,
        "operators.ts"
    );

    fs.writeFileSync(mainFilePath, mainFileText);
    Object.keys(functionsFileObject).forEach((key) => {
        fs.writeFileSync(
            path.resolve(`${process.cwd()}/src/app/operators`, `${key}.ts`),
            functionsFileObject[key]
        );
    });
}
