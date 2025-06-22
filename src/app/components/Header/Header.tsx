"use client";
import { useState } from "react";
import { styles } from "./Header.style";
import { Box, Typography, Link, IconButton, AppBar, Toolbar, Menu, MenuItem, Tooltip } from "@mui/material";
import Table from "@/app/components/Table";
import Dialog from "@/app/components/Dialog";
import MenuIcon from '@mui/icons-material/Menu';
import TextSnippetIcon from '@mui/icons-material/TextSnippetTwoTone';
import DownloadIcon from '@mui/icons-material/DownloadTwoTone';
import DatasetIcon from '@mui/icons-material/DatasetTwoTone';
import HelpIcon from '@mui/icons-material/HelpTwoTone';
import EmailIcon from '@mui/icons-material/EmailTwoTone';
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
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
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
        <Box sx={styles.box}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={styles.title}>
                        {bot?._details.name as string}
                    </Typography>
                    <Box sx={styles.mobileMode}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={styles.mobileMenuIcon}
                        >
                            <MenuItem key={1} onClick={() => setOpenAttribute(true)}>
                                <Typography textAlign="center">
                                    {HEADER_TEXTS.buttons.attributes}
                                </Typography>
                            </MenuItem>
                            <MenuItem key={2} onClick={() => setOpenData(true)}>
                                <Typography textAlign="center">
                                    {HEADER_TEXTS.buttons.data}
                                </Typography>
                            </MenuItem>
                            <MenuItem key={3} onClick={() => downloadCSV(csv, "data.csv")}>
                                <Typography textAlign="center">
                                    {HEADER_TEXTS.buttons.download}
                                </Typography>
                            </MenuItem>
                            <MenuItem key={4} onClick={() => setOpenHelp(true)}>
                                <Typography textAlign="center">
                                    {HEADER_TEXTS.buttons.help}
                                </Typography>
                            </MenuItem>
                            <MenuItem key={5} onClick={() => setOpenMail(true)}>
                                <Typography textAlign="center">
                                    {HEADER_TEXTS.buttons.mail}
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={styles.desktopMode}>
                        <Tooltip title={HEADER_TEXTS.buttons.attributes}>
                            <IconButton key={1} onClick={() => setOpenAttribute(true)}>
                                <TextSnippetIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={HEADER_TEXTS.buttons.data}>
                            <IconButton key={2} onClick={() => setOpenData(true)}>
                                <DatasetIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={HEADER_TEXTS.buttons.download}>
                            <IconButton key={3} onClick={() => downloadCSV(csv, "data.csv")}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={HEADER_TEXTS.buttons.help}>
                            <IconButton key={4} onClick={() => setOpenHelp(true)}>
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={HEADER_TEXTS.buttons.mail}>
                            <IconButton key={5} onClick={() => setOpenMail(true)}>
                                <EmailIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
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
