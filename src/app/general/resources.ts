import { Message, MessageSection, Bot } from "@/app/general/interfaces";
import { Sender, TypeOfQuestion, DataType } from "@/app/general/types";
import { convertTextToMessage } from "@/app/general/utils";
import { RESOURCES_TEXTS } from "@/app/general/constants";

export const botMessages = (bot: Bot): Message[] => {
    const headers = bot?._data.headers || [];
    if (!headers || headers.length === 0) return [];
    const headersArray = headers.map(
        (header, index) => `${index + 1}: ${header}`
    );
    const headersString = headersArray.join("\n");

    const welcomeMessages = bot?._messages?.slots.welcomeSlot ?? [];
    const welcomeMessagesArray = welcomeMessages.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );

    return [
        ...welcomeMessagesArray,
        {
            id: welcomeMessagesArray.length,
            text: `${bot?._messages.customMessages.attributeMessage}
            
${headersString}

${RESOURCES_TEXTS.propertyMessage}`,
            sender: Sender.BOT,
            typeOfQuestion: TypeOfQuestion.PARAMETER,
            answerOptions: Array.from(
                { length: headers.length },
                (_, index) => index + 1
            ),
        },
    ];
};

export const botOperatorMessages = (
    bot: Bot,
    currentParam: string
): Message[] => {
    const operators = bot?._data.columns.filter(
        (col) => col._id === currentParam
    )[0]?.operatorsArray;

    const optionsArray = operators.map(
        (operator, index) => `${index + 1}: ${operator.displayName}`
    );
    const optionsString = optionsArray.join("\n");

    const chosenOperator = operators[bot.currentOperatorIndex];

    const operatorMessage: Message = {
        id: 0,
        text: `${chosenOperator?.message}
            
${bot?._messages.customMessages.continueMessage}`,
        sender: Sender.BOT,
        typeOfQuestion: TypeOfQuestion.INTRO,
        answerOptions: [1],
    };

    const operatorSlot = bot?._messages?.slots.operatorSlot ?? [];
    const operatorSlotArray = operatorSlot.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );

    const displayMessage: Message[] = [
        ...operatorSlotArray,
        {
            id: 0,
            text: `${bot?._messages?.customMessages.operatorMessage}

${optionsString}
`,
            sender: Sender.BOT,
            typeOfQuestion: TypeOfQuestion.OPERATOR,
            answerOptions: Array.from(
                { length: operators.length },
                (_, index) => index + 1
            ),
        },
    ];

    if (chosenOperator.message) {
        displayMessage.push(operatorMessage);
    }

    return displayMessage;
};

export const botFunctionParamsMessages = (
    bot: Bot,
    currentParam: string
): Message[] => {
    const column = bot?._data.columns.filter(
        (col) => col._id === currentParam
    )[0];
    const operators = column?.operatorsArray;
    const columnType = column?.dataType;
    const rows = column?.rows;

    const chosenOperator = operators[bot.currentOperatorIndex];
    const params = chosenOperator.params;

    const isFactor = columnType === DataType.FACTOR;
    const factorOptions = Array.from(new Set(rows));
    const factorOptionsMessage = `${
        RESOURCES_TEXTS.factorOptions
    } ${factorOptions?.join(", ")}`;
    const extraMessage = isFactor ? factorOptionsMessage : "";

    const messages: Message[] = params.map((prm, index) => {
        return {
            id: index,
            text:
                (prm?.message ??
                    `${RESOURCES_TEXTS.paramMessageDefault} ${prm?.name}`) +
                "\n" +
                "\n" +
                extraMessage,
            sender: Sender.BOT,
            typeOfQuestion: TypeOfQuestion.FUNCTION_PARAMS,
        };
    });
    const messageWithoutFirst = messages.slice(1);

    if (messageWithoutFirst.length === 0) return [emptyMessage];

    messageWithoutFirst.push(...botAddMessages);

    const paramsSlot = bot?._messages?.slots.paramsSlot ?? [];
    const paramsSlotArray = paramsSlot.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );
    messageWithoutFirst.unshift(...paramsSlotArray);

    return messageWithoutFirst;
};

export const botAddMessages: Message[] = [
    {
        id: 0,
        text: `${RESOURCES_TEXTS.addParameter}
    
    ${RESOURCES_TEXTS.yesOption}
    ${RESOURCES_TEXTS.noOption}`,
        sender: Sender.BOT,
        typeOfQuestion: TypeOfQuestion.ADD,
        answerOptions: [1, 2],
    },
];

export const botRestartMessages = (bot: Bot): Message[] => {
    const startMsg = botMessages(bot).slice(-1)[0];
    const restartSlot = bot?._messages?.slots.restartSlot ?? [];
    const restartSlotArray = restartSlot.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );
    return [
        ...restartSlotArray,
        {
            id: 0,
            text: `${RESOURCES_TEXTS.restartMessage}

${bot?._messages.customMessages.continueMessage}`,
            sender: Sender.BOT,
            typeOfQuestion: TypeOfQuestion.INTRO,
            answerOptions: [1],
        },
        startMsg,
    ];
};

export const resultMsg = (bot: Bot, foundResults: boolean): Message[] => {
    const resultSlot = bot?._messages?.slots.resultSlot ?? [];
    const resultSlotArray = resultSlot.map((msg, index) =>
        convertTextToMessage(
            msg,
            index,
            bot?._messages.customMessages.continueMessage
        )
    );
    return [
        ...resultSlotArray,
        {
            id: 0,
            text: foundResults
                ? bot?._messages?.customMessages.resultMessage
                : RESOURCES_TEXTS.noResultsFound,
            sender: Sender.BOT,
            typeOfQuestion: TypeOfQuestion.RESULT,
        },
    ];
};

export const defaultMsgSection = [
    {
        id: 0,
        messageSection: [] as Message[],
    },
] as MessageSection[];

export const emptyMessage: Message = {
    id: 0,
    text: RESOURCES_TEXTS.emptyMessage,
    sender: Sender.BOT,
    typeOfQuestion: TypeOfQuestion.FUNCTION_PARAMS,
};
