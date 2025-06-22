"use client";
import { TableProps } from "@/app/general/interfaces";
import {
    Table as MUITable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import { styles } from "./Table.style";

export default function Table<T>({ rows, headers }: TableProps<T>) {
    return (
        <TableContainer component={Paper}>
            <MUITable stickyHeader sx={styles.table}>
                <TableHead>
                    <TableRow sx={styles.tableHead}>
                        {headers.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index} sx={styles.tableRow}>
                            {headers.map((header, index) => (
                                <TableCell
                                    key={index}
                                    component="th"
                                    scope="row"
                                >
                                    {row[header as keyof T] as string}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </MUITable>
        </TableContainer>
    );
}
