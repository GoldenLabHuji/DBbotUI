"use client";
import { useState } from "react";
import { styles } from "./Header.style";
import { Box, Typography, Button } from "@mui/material";
import Table from "@/app/components/Table";
import Dialog from "@/app/components/Dialog";
import {
    HeaderProps,
    NameAndDescription,
    generalObject,
} from "@/app/general/interfaces";
import { strOrNum } from "@/app/general/types";

export default function Header({ bot }: HeaderProps) {
    const [openAttribute, setOpenAttribute] = useState<boolean>(false);
    const [openData, setOpenData] = useState<boolean>(false);

    const botHeaders = bot?._data.headers;
    const botColumns = bot?._data.columns;

    const rows: generalObject<strOrNum>[] = [];

    [0, 1, 2, 3, 4].forEach((index) => {
        const row: generalObject<strOrNum> = {};
        botColumns.forEach((col) => {
            row[col.displayName] = col.rows[index];
        });
        rows.push(row);
    });

    const attributesRows = botColumns?.map((column) => ({
        name: column.displayName,
        description: column._description,
    }));

    return (
        <Box component="header" sx={styles.box}>
            <Box component="div" sx={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={styles.attributeButton}
                    onClick={() => setOpenAttribute(true)}
                >
                    Display Attributes
                </Button>
            </Box>
            <Box component="div" sx={styles.typContainer}>
                <Typography variant="h4" component="h1">
                    {bot?._details.name as string}
                </Typography>
            </Box>
            <Box component="div" sx={styles.dataContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={styles.dataButton}
                    onClick={() => setOpenData(true)}
                >
                    Display Data Sample
                </Button>
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
                        rows={rows}
                    />
                }
            ></Dialog>
        </Box>
    );
}
