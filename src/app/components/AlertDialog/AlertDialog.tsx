"use client";
import { AlertDialogProps } from "@/app/general/interfaces";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default function AlertDialog({
    title,
    content,
    open,
    setOpen,
}: AlertDialogProps) {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
