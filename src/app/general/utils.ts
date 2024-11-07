import * as fs from "fs";
import * as path from "path";
import { OPERATORS } from "@/app/operators/operators";
import { Message, Bot, generalObject } from "@/app/general/interfaces";
import { Sender, TypeOfQuestion, strOrNum } from "@/app/general/types";

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
        sender: Sender.BOT,
        typeOfQuestion: TypeOfQuestion.INTRO,
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

export function getTableInfo(bot: Bot) {
    const botHeaders = bot?._data.headers;
    const botColumns = bot?._data.columns;

    const rows: generalObject<strOrNum>[] = botHeaders.map((_, index) => {
        const row: generalObject<strOrNum> = {};
        botColumns.forEach((col) => {
            row[col.displayName] = col.rows[index];
        });
        return row;
    });

    return { botHeaders, botColumns, rows };
}
