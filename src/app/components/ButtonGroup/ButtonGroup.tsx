"use client";
import { ButtonGroupProps } from "@/app/general/interfaces";
import { styles } from "./ButtonGroup.style";
import { Box } from "@mui/material";
import CustomButton from "@/app/components/CustomButton";

export default function ButtonGroup({
    buttonList,
    buttonStyle,
    containerStyle,
}: ButtonGroupProps) {
    return (
        <Box
            component="div"
            sx={{ ...styles.buttonsContainer, ...containerStyle }}
        >
            {buttonList.map((button, index) => (
                <CustomButton
                    key={index}
                    sx={{ ...styles.button, ...buttonStyle }}
                    {...button}
                />
            ))}
        </Box>
    );
}
