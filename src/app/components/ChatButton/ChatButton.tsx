"use client";
import { Grid } from "@mui/material";
import CustomButton from "@/app/components/CustomButton";
import SendIcon from "@mui/icons-material/Send";
import { styles } from "./ChatButton.style";
import { GENERAL_BUTTONS_TEXTS } from "@/app/general/constants";

export default function ChatButton() {
    return (
        <Grid item xs={2}>
            <CustomButton
                sx={styles.button}
                endIcon={<SendIcon />}
                type="submit"
                text={GENERAL_BUTTONS_TEXTS.send}
            />
        </Grid>
    );
}
