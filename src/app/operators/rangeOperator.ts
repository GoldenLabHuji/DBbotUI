export function rangeOperator(
    cell: number,
    minValue: number,
    maxValue: number
) {
    return cell >= minValue && cell <= maxValue;
}
