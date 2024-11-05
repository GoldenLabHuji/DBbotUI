"use client";
import { Grid } from "@mui/material";
import CustomButton from "@/app/components/CustomButton";
import SendIcon from "@mui/icons-material/Send";

export default function ChatButton() {
    return (
        <Grid item xs={2}>
            <CustomButton
                sx={{ width: "120%" }}
                endIcon={<SendIcon />}
                type="submit"
                text="Send"
            />
        </Grid>
    );
}
