import { saveAs } from "file-saver";
import { parse } from "json2csv";
import { WordData } from "@/app/general/interfaces";
import { styles } from "@/app/components/CSVButton/CSVButton.style";
import CustomButton from "@/app/components/CustomButton";
import { GENERAL_BUTTONS_TEXTS } from "@/app/general/constants";

export default function CSVButton({ queryWords }: { queryWords: WordData[] }) {
    const handleDownload = () => {
        const csv = parse(queryWords);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "data.csv");
    };

    return (
        <CustomButton
            onClick={handleDownload}
            sx={styles.button}
            text={GENERAL_BUTTONS_TEXTS.downloadResults}
        />
    );
}
