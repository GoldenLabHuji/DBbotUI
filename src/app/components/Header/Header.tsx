"use client";
import { useState } from "react";
import { styles } from "./Header.style";
import { Box, Typography, Link } from "@mui/material";
import Table from "@/app/components/Table";
import Dialog from "@/app/components/Dialog";
import ButtonGroup from "@/app/components/ButtonGroup";
import {
    HeaderProps,
    NameAndDescription,
    generalObject,
} from "@/app/general/interfaces";
import { strOrNum } from "@/app/general/types";
import {
    SAMPLE_SIZE,
    HEADER_BUTTONS_TEXTS,
    NO_HELP_DESCRIPTION,
    NO_MAIL_PROVIDED,
    HEADER_DIALOGS_TITLES,
} from "@/app/general/constants";
import { getTableInfo, convertToCSV, downloadCSV } from "@/app/general/utils";
import _ from "lodash";

export default function Header({ bot }: HeaderProps) {
    const [openAttribute, setOpenAttribute] = useState<boolean>(false);
    const [openData, setOpenData] = useState<boolean>(false);
    const [openHelp, setOpenHelp] = useState<boolean>(false);
    const [openMail, setOpenMail] = useState<boolean>(false);

    const helpDescription = bot?._details.helpDescription;
    const mailInfo = bot?._details.mailInfo;
    const { botHeaders, botColumns, rows } = getTableInfo(bot);
    const sampleRows = _.sampleSize(rows, SAMPLE_SIZE);

    const attributesRows = botColumns?.map((column) => ({
        name: column.displayName,
        description: column._description,
    }));

    const csv = convertToCSV(rows);

    const dataButtons = [
        {
            onClick: () => setOpenAttribute(true),
            text: HEADER_BUTTONS_TEXTS.attributes,
        },
        { onClick: () => setOpenData(true), text: HEADER_BUTTONS_TEXTS.data },
        {
            onClick: () => downloadCSV(csv, "data.csv"),
            text: HEADER_BUTTONS_TEXTS.download,
        },
    ];
    const helpButtons = [
        { onClick: () => setOpenHelp(true), text: HEADER_BUTTONS_TEXTS.help },
        { onClick: () => setOpenMail(true), text: HEADER_BUTTONS_TEXTS.mail },
    ];

    const dialogs = [
        {
            open: openAttribute,
            setOpen: setOpenAttribute,
            title: HEADER_DIALOGS_TITLES.attributes,
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
            title: HEADER_DIALOGS_TITLES.data,
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
            title: HEADER_DIALOGS_TITLES.help,
            content: helpDescription ?? NO_HELP_DESCRIPTION,
        },
        {
            open: openMail,
            setOpen: setOpenMail,
            title: HEADER_DIALOGS_TITLES.mail,
            children: (
                <Link href={`mailto:${mailInfo}`}>
                    {mailInfo ?? NO_MAIL_PROVIDED}
                </Link>
            ),
        },
    ];

    return (
        <Box component="header" sx={styles.box}>
            <ButtonGroup buttonList={dataButtons} />
            <Box component="div" sx={styles.typContainer}>
                <Typography variant="h4" component="h1">
                    {bot?._details.name as string}
                </Typography>
            </Box>
            <ButtonGroup
                buttonList={helpButtons}
                containerStyle={styles.rightAlign}
                buttonStyle={styles.rightButton}
            />
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
