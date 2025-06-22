"use client";
import { Grid, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { styles } from "./ChatButton.style";

export default function ChatButton() {
    return (
        <Grid item xs={2}>
            <IconButton type="submit" sx={styles.button}>
                <SendIcon />
            </IconButton>
        </Grid>
    )
}
