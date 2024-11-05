"use client";
import { DialogProps } from "@/app/general/interfaces";
import CustomButton from "@/app/components/CustomButton";
import {
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default function Dialog({
    title,
    content,
    open,
    setOpen,
    children,
}: DialogProps) {
    return (
        <MuiDialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <CustomButton
                    onClick={() => setOpen(false)}
                    autoFocus
                    text="Close"
                />
            </DialogActions>
        </MuiDialog>
    );
}
