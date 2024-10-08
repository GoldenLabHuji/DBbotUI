import { useState, Dispatch, SetStateAction } from "react";
import { Message, Bot } from "@/app/general/interfaces";
import {
    Sender,
    TypeOfQuestion,
    currentMsgType,
    currentQIndexType,
} from "@/app/general/types";
import {
    botMessages,
    botOperatorMessages,
    botRestartMessages,
    botFunctionParamsMessages,
    emptyMessage,
    botAddMessages,
} from "@/app/general/resources";

export default function useInput(
    currentMsg: currentMsgType,
    currentQIndex: currentQIndexType,
    lastQuestionIndex: number,
    bot: Bot,
    setIsEndSection: Dispatch<SetStateAction<boolean>>,
    currentParam: {
        state: string;
        setState: Dispatch<SetStateAction<string>>;
    }
) {
    const [botMsg, setBotMsg] = useState<Message[]>(botMessages(bot));
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const handleUserInput = (
        input: string,
        setIsEndChat: Dispatch<SetStateAction<boolean>>
    ) => {
        const lastMessageSectionQuestion =
            currentMsg.state[currentMsg.state.length - 1];
        const typeOfQuestion = lastMessageSectionQuestion.typeOfQuestion ?? "";

        const isAnswerOptions = !!lastMessageSectionQuestion.answerOptions;
        const isAnswerOptionsValid =
            lastMessageSectionQuestion.answerOptions?.includes(Number(input));

        if ((isAnswerOptions && !isAnswerOptionsValid) || input === "") {
            const newMessage: Message = {
                id: currentMsg.state.length,
                text: bot?._messages.customMessages?.errorMessage,
                sender: Sender.BOT,
                typeOfQuestion: typeOfQuestion as TypeOfQuestion,
                answerOptions: lastMessageSectionQuestion.answerOptions,
            };
            currentMsg.setState([...currentMsg.state, newMessage]);
        }

        if ((!isAnswerOptions && input !== "") || isAnswerOptionsValid) {
            const newMessage: Message = {
                id: currentMsg.state.length,
                text: input,
                sender: Sender.USER,
                typeOfQuestion: typeOfQuestion as TypeOfQuestion,
            };
            currentMsg.setState([...currentMsg.state, newMessage]);

            switch (typeOfQuestion) {
                case TypeOfQuestion.PARAMETER:
                    const currentHeader = bot?._data.headers[Number(input) - 1];
                    const currentParameter = bot?._data.columns.filter(
                        (col) => col.displayName === currentHeader
                    )[0]._id;
                    currentParam.setState(currentParameter);
                    setBotMsg([
                        ...botMsg,
                        ...botOperatorMessages(bot, currentParameter),
                    ]);
                    break;
                case TypeOfQuestion.OPERATOR:
                    const operatorIndex = Number(input) - 1;
                    bot.currentOperatorIndex = operatorIndex;

                    const funcParamsMsg = botFunctionParamsMessages(
                        bot,
                        currentParam.state
                    );

                    if (funcParamsMsg[0] === emptyMessage) {
                        setBotMsg([...botMsg, ...botAddMessages]);
                    } else {
                        setBotMsg([...botMsg, ...funcParamsMsg]);
                    }
                    break;
                case TypeOfQuestion.ADD:
                    const isEnd = Number(input) === 2;
                    setIsEndSection(true);
                    setIsEndChat(isEnd);
                    !isEnd &&
                        setBotMsg([...botMsg, ...botRestartMessages(bot)]);
                    break;
                default:
                    break;
            }

            currentQIndex.setState(
                currentQIndex.state < lastQuestionIndex + 1
                    ? currentQIndex.state + 1
                    : 0
            );
        }
        setIsSubmit(!isSubmit);
    };

    return { handleUserInput, botMsg, isSubmit };
}
