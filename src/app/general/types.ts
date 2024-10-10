import { Dispatch, SetStateAction } from "react";
import { Message } from "@/app/general/interfaces";

export enum DataType {
    STRING = "string",
    NUMERIC = "numeric",
    FACTOR = "factor",
}

export enum Sender {
    BOT = "bot",
    USER = "user",
}

export enum TypeOfQuestion {
    PARAMETER = "parameter",
    FUNCTION_PARAMS = "functionParams",
    VALUE = "value",
    OPERATOR = "operator",
    ADD = "add",
    RESULT = "result",
    INTRO = "intro",
}

export type currentMsgType = {
    state: Message[];
    setState: Dispatch<SetStateAction<Message[]>>;
};

export type currentQIndexType = {
    state: number;
    setState: Dispatch<SetStateAction<number>>;
};

export type strParamType = {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
};

export type strOrNum = string | number;
