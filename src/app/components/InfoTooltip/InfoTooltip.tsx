"use client";
import { InfoTooltipProps } from "@/app/general/interfaces";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function InfoTooltip({ text }: InfoTooltipProps) {
    return (
        <Tooltip title={text}>
            <IconButton>
                <InfoIcon />
            </IconButton>
        </Tooltip>
    );
}
