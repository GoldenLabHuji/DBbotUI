"use client";
import { CustomButtonProps } from "@/app/general/interfaces";
import { Button, ButtonProps } from "@mui/material";
import { styles } from "./CustomButton.style";

export default function CustomButton({
    text,
    ...props
}: CustomButtonProps & ButtonProps) {
    return (
        <Button {...props} color="primary" variant="contained">
            {text}
        </Button>
    );
}
