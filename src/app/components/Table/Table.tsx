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

export default function Table<T>({ rows, headers }: TableProps<T>) {
    return (
        <TableContainer component={Paper}>
            <MUITable sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
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
