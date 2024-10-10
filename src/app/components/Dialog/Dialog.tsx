"use client";
import { DialogProps } from "@/app/general/interfaces";
import {
    Button,
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
                <Button onClick={() => setOpen(false)} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </MuiDialog>
    );
}
