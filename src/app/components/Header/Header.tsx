"use client";
import { useState } from "react";
import { styles } from "./Header.style";
import { Box, Typography } from "@mui/material";
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
} from "@/app/general/constants";
import { getTableInfo, convertToCSV, downloadCSV } from "@/app/general/utils";
import _ from "lodash";

export default function Header({ bot }: HeaderProps) {
    const [openAttribute, setOpenAttribute] = useState<boolean>(false);
    const [openData, setOpenData] = useState<boolean>(false);
    const [openHelp, setOpenHelp] = useState<boolean>(false);

    const helpDescription = bot?._details.helpDescription;
    const { botHeaders, botColumns, rows } = getTableInfo(bot);
    const sampleRows = _.sampleSize(rows, SAMPLE_SIZE);

    const attributesRows = botColumns?.map((column) => ({
        name: column.displayName,
        description: column._description,
    }));

    const csv = convertToCSV(rows);

    const buttons = [
        { onClick: () => setOpenAttribute(true), text: ATTRIBUTES_BUTTON_TEXT },
        { onClick: () => setOpenData(true), text: SAMPLE_BUTTON_TEXT },
        { onClick: () => setOpenHelp(true), text: "Help!" },
        {
            onClick: () => downloadCSV(csv, "data.csv"),
            text: "Download Full Data", // I know to move it to resource, need to merge another PR first
        },
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
