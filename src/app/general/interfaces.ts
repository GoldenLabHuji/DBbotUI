import {
    Sender,
    TypeOfQuestion,
    strOrNum,
    DataType,
} from "@/app/general/types";

export interface Message {
    id: number;
    text: string;
    sender: Sender;
    typeOfQuestion: TypeOfQuestion;
    answerOptions?: number[];
}

export interface MessageSection {
    id: number;
    messageSection: Message[];
}

export interface ChatProps {
    bot: Bot;
}
export interface ChatBoxProps extends ChatProps {}

export interface MessageProps {
    message: Message;
    colors: Colors;
}

export interface Bot {
    dataMap: {};
    _data: BotData;
    _details: BotDetails;
    _messages: BotMessages;
    filePath: string;
    operatorsData: BotOperatorData[];
    currentOperatorIndex: number;
    operatorsFiles: BorOperatorsFiles;
    colors: Colors;
}

export interface Colors {
    bot: string;
    user: string;
}

interface BorOperatorsFiles {
    functions: { [key: string]: string };
    main: string;
}

interface BotData {
    headers: string[];
    columns: BotColumn[];
}

interface BotDetails {
    name: string;
    description: string;
}

interface BotMessages {
    customMessages: CustomMessages;
    slots: MessagesSlot;
}

interface CustomMessages {
    attributeMessage: string;
    operatorMessage: string;
    errorMessage: string;
    continueMessage: string;
    resultMessage: string;
}

interface MessagesSlot {
    welcomeSlot?: string[];
    operatorSlot?: string[];
    paramsSlot?: string[];
    restartSlot?: string[];
    resultSlot?: string[];
}
export interface BotColumn {
    _id: string;
    dataType: DataType;
    displayName: string;
    rows: strOrNum[];
    operatorsArray: BotOperatorData[];
}
interface BotOperatorData {
    params: BotOperatorParams[];
    message?: string;
    displayName: string;
    id: string;
}

interface BotOperatorParams {
    isArray: boolean;
    message?: string;
    dataType: DataType;
    name: string;
}

export interface Attribute {
    name: string;
    params: strOrNum[];
    operator: string;
}

interface generalObject<T> {
    [key: string]: T;
}

export interface QueryWords extends generalObject<Attribute> {}

export interface WordData extends generalObject<strOrNum | null> {}

export interface HeaderProps {
    text: string;
}
