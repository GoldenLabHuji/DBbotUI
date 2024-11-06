"use client";
import { useState } from "react";
import { styles } from "./Header.style";
import { Box, Typography, Link } from "@mui/material";
import Table from "@/app/components/Table";
import Dialog from "@/app/components/Dialog";
import CustomButton from "@/app/components/CustomButton";
import {
    HeaderProps,
    NameAndDescription,
    generalObject,
} from "@/app/general/interfaces";
import { strOrNum } from "@/app/general/types";
import {
    SAMPLE_SIZE,
    ATTRIBUTES_BUTTON_TEXT,
    SAMPLE_BUTTON_TEXT,
    NO_HELP_DESCRIPTION,
    NO_MAIL_PROVIDED,
} from "@/app/general/constants";
import { getTableInfo } from "@/app/general/utils";

export default function Header({ bot }: HeaderProps) {
    const [openAttribute, setOpenAttribute] = useState<boolean>(false);
    const [openData, setOpenData] = useState<boolean>(false);
    const [openHelp, setOpenHelp] = useState<boolean>(false);
    const [openMail, setOpenMail] = useState<boolean>(false);

    const helpDescription = bot?._details.helpDescription;
    const mailInfo = bot?._details.mailInfo;
    const { botHeaders, botColumns, rows } = getTableInfo(bot);
    const sampleRows = rows.slice(0, SAMPLE_SIZE);

    const attributesRows = botColumns?.map((column) => ({
        name: column.displayName,
        description: column._description,
    }));

    const buttons = [
        { onClick: () => setOpenAttribute(true), text: ATTRIBUTES_BUTTON_TEXT },
        { onClick: () => setOpenData(true), text: SAMPLE_BUTTON_TEXT },
        { onClick: () => setOpenHelp(true), text: "Help!" },
        { onClick: () => setOpenMail(true), text: "Leave us a comment" },
    ];

    const dialogs = [
        {
            open: openAttribute,
            setOpen: setOpenAttribute,
            title: "Details of Attributes",
            children: (
                <Table<NameAndDescription>
                    headers={["name", "description"]}
                    rows={attributesRows}
                />
            ),
        },
        {
            open: openData,
            setOpen: setOpenData,
            title: "Sample of Data",
            children: (
                <Table<generalObject<strOrNum>>
                    headers={botHeaders}
                    rows={sampleRows}
                />
            ),
        },
        {
            open: openHelp,
            setOpen: setOpenHelp,
            title: "Help!",
            content: helpDescription ?? NO_HELP_DESCRIPTION,
        },
        {
            open: openMail,
            setOpen: setOpenMail,
            title: "Leave us a comment",
            children: (
                <Link href={`mailto:${mailInfo}`}>
                    {mailInfo ?? NO_MAIL_PROVIDED}
                </Link>
            ),
        },
    ];

    return (
        <Box component="header" sx={styles.box}>
            <Box component="div" sx={styles.buttonsContainer}>
                {buttons.map((button, index) => (
                    <CustomButton key={index} sx={styles.button} {...button} />
                ))}
            </Box>
            <Box component="div" sx={styles.typContainer}>
                <Typography variant="h4" component="h1">
                    {bot?._details.name as string}
                </Typography>
            </Box>
            {dialogs.map((dialog, index) => (
                <Dialog
                    key={index}
                    content={dialog?.content ?? ""}
                    {...dialog}
                />
            ))}
        </Box>
    );
}
