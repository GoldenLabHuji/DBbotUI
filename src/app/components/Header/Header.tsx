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
} from "@/app/general/constants";

export default function Header({ bot }: HeaderProps) {
    const [openAttribute, setOpenAttribute] = useState<boolean>(false);
    const [openData, setOpenData] = useState<boolean>(false);

    const botHeaders = bot?._data.headers;
    const botColumns = bot?._data.columns;

    const rows: generalObject<strOrNum>[] = botHeaders.map((_, index) => {
        const row: generalObject<strOrNum> = {};
        botColumns.forEach((col) => {
            row[col.displayName] = col.rows[index];
        });
        return row;
    });

    const sampleRows = rows.slice(0, SAMPLE_SIZE);

    const attributesRows = botColumns?.map((column) => ({
        name: column.displayName,
        description: column._description,
    }));

    return (
        <Box component="header" sx={styles.box}>
            <Box component="div" sx={styles.buttonContainer}>
                <CustomButton
                    sx={styles.attributeButton}
                    onClick={() => setOpenAttribute(true)}
                    text={ATTRIBUTES_BUTTON_TEXT}
                />
            </Box>
            <Box component="div" sx={styles.typContainer}>
                <Typography variant="h4" component="h1">
                    {bot?._details.name as string}
                </Typography>
            </Box>
            <Box component="div" sx={styles.dataContainer}>
                <CustomButton
                    sx={styles.dataButton}
                    onClick={() => setOpenData(true)}
                    text={SAMPLE_BUTTON_TEXT}
                />
            </Box>
            <Dialog
                title="Details of Attributes"
                content=""
                open={openAttribute}
                setOpen={setOpenAttribute}
                children={
                    <Table<NameAndDescription>
                        headers={["name", "description"]}
                        rows={attributesRows}
                    />
                }
            ></Dialog>
            <Dialog
                title="Sample of Data"
                content=""
                open={openData}
                setOpen={setOpenData}
                children={
                    <Table<generalObject<strOrNum>>
                        headers={botHeaders}
                        rows={sampleRows}
                    />
                }
            ></Dialog>
        </Box>
    );
}
