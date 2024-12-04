"use client";
import { useEffect, useRef, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import Message from "@/app/components/Message/Message";
import { defaultMsgSection } from "@/app/general/resources";
import ChatBox from "@/app/components/ChatBox";
import { styles } from "@/app/components/Chat/Chat.style";
import { useRecoilState } from "recoil";
import {
    messagesSectionAtom,
    queryParamsAtom,
    queryWordsAtom,
    isResultsAtom,
    isQuerySubmitAtom,
} from "@/app/store/atoms";
import { ChatProps } from "@/app/general/interfaces";
import { resultMsg } from "@/app/general/resources";
import CSVButton from "@/app/components/CSVButton";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Dialog from "@/app/components/Dialog";

export default function Chat({ bot }: ChatProps) {
    const [messagesSection, setMessagesSection] =
        useRecoilState(messagesSectionAtom);
    const [queryParams, __] = useRecoilState(queryParamsAtom);
    const [queryWords, setQueryWords] = useRecoilState(queryWordsAtom);
    const [isResult, setIsResult] = useRecoilState(isResultsAtom);
    const [isQuerySubmit, ___] = useRecoilState(isQuerySubmitAtom);
    const [loading, setLoading] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            (messagesEndRef.current as HTMLElement).scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messagesSection]);

    useEffect(() => {
        const getQueryWords = async () => {
            try {
                setLoading(true);

                const pathArray = bot?.filePath.split("/");
                const path = pathArray.pop();
                const nullValues = bot?.nullValues;

                const response = await fetch("/api/root", {
                    method: "POST",
                    body: JSON.stringify({
                        queryParams,
                        filePath: path,
                        nullValues,
                    }),
                });
                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message);
                }
                const data = await response.json();
                setQueryWords(data);
            } catch (err: any) {
                console.log(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (isQuerySubmit) {
            getQueryWords();
            setIsResult(true);
        }
    }, [isQuerySubmit]);

    useEffect(() => {
        if (isQuerySubmit && isResult) {
            setMessagesSection((prev) => [
                ...prev,

                {
                    id: 0,
                    messageSection: resultMsg(bot, queryWords.length > 0),
                },
            ]);
        }
    }, [isQuerySubmit, queryWords]);

    useEffect(() => {
        if (isResult && !(queryWords.length > 0)) {
            setOpenAlert(true);
        }
    }, [queryWords]);

    return (
        <Box sx={styles.headFootContainer}>
            <Header bot={bot} />
            <Box sx={styles.container}>
                <Box sx={styles.secondContainer}>
                    {(messagesSection &&
                        messagesSection.length > 0 &&
                        messagesSection.map(
                            (msgSection) =>
                                msgSection?.messageSection &&
                                msgSection?.messageSection.length > 0 &&
                                msgSection?.messageSection.map(
                                    (message, index) => (
                                        <Message
                                            key={index}
                                            message={message}
                                            colors={bot?.colors}
                                        />
                                    )
                                )
                        )) ??
                        defaultMsgSection}
                    {loading && (
                        <Box textAlign="center">
                            <CircularProgress />
                        </Box>
                    )}
                    {isResult && queryWords.length > 0 && (
                        <CSVButton queryWords={queryWords} />
                    )}
                    <Dialog
                        open={openAlert}
                        setOpen={setOpenAlert}
                        title="No results found"
                        content="No results found for the selected filters. You can try
                        again with different filters."
                    />
                    <Box component="div" ref={messagesEndRef} />
                </Box>

                <ChatBox bot={bot} />
            </Box>
            <Footer />
        </Box>
    );
}
