"use client";
import { useState } from "react";
import { styles } from "./Header.style";
import { Box, Typography, Button } from "@mui/material";
import AttributesDisplay from "@/app/components/AttributesDisplay";
import Dialog from "@/app/components/Dialog";
import { HeaderProps, NameAndDescription } from "@/app/general/interfaces";

export default function Header({ text }: HeaderProps) {
    const [openAttribute, setOpenAttribute] = useState<boolean>(false);
    const [openData, setOpenData] = useState<boolean>(false);
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
                    {text}
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
                    <AttributesDisplay<NameAndDescription>
                        headers={["name", "description"]}
                        rows={[
                            { name: "name1", description: "description1" },
                            { name: "name2", description: "description2" },
                        ]}
                    />
                }
            ></Dialog>
            <Dialog
                title="Sample of Data"
                content=""
                open={openData}
                setOpen={setOpenData}
                children={
                    <AttributesDisplay<NameAndDescription> // TODO: change
                        headers={["name", "description"]} // TODO: change
                        rows={[
                            // TODO: change
                            { name: "name1", description: "description1" },
                            { name: "name2", description: "description2" },
                        ]}
                    />
                }
            ></Dialog>
        </Box>
    );
}
