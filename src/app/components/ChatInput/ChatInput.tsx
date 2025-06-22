import { Grid, TextField } from "@mui/material";

export default function ChatInput() {
    return (
        <Grid item>
            <TextField
                size="small"
                fullWidth
                placeholder="Type a message"
                variant="outlined"
                name="input"
                color="primary"
            />
        </Grid>
    );
}
