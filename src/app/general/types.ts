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

type State<T> = {
    state: T;
    setState: Dispatch<SetStateAction<T>>;
};

export type currentMsgType = State<Message[]>;
export type currentQIndexType = State<number>;
export type strParamType = State<boolean>;
export type strOrNum = string | number;
