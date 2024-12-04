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
import { HEADER_TEXTS } from "@/app/general/constants";
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
    const sampleRows = _.sampleSize(rows, HEADER_TEXTS.general.sampleSize);

    const attributesRows = botColumns?.map((column) => ({
        name: column.displayName,
        description: column._description,
    }));

    const csv = convertToCSV(rows);

    const dataButtons = [
        {
            onClick: () => setOpenAttribute(true),
            text: HEADER_TEXTS.buttons.attributes,
        },
        { onClick: () => setOpenData(true), text: HEADER_TEXTS.buttons.data },
        {
            onClick: () => downloadCSV(csv, "data.csv"),
            text: HEADER_TEXTS.buttons.download,
        },
    ];

    const helpButtons = [
        { onClick: () => setOpenHelp(true), text: HEADER_TEXTS.buttons.help },
        { onClick: () => setOpenMail(true), text: HEADER_TEXTS.buttons.mail },
    ];

    const dialogs = [
        {
            open: openAttribute,
            setOpen: setOpenAttribute,
            title: HEADER_TEXTS.dialogs.attributes,
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
            title: HEADER_TEXTS.dialogs.data,
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
            title: HEADER_TEXTS.dialogs.help,
            content: helpDescription ?? HEADER_TEXTS.general.noHelpDescription,
        },
        {
            open: openMail,
            setOpen: setOpenMail,
            title: HEADER_TEXTS.dialogs.mail,
            children: (
                <Link href={`mailto:${mailInfo}`}>
                    {mailInfo ?? HEADER_TEXTS.general.noMailProvided}
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
