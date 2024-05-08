const tableData = [
    ['Cell 1', 'Cell 2'],
    ['Cell 3', 'Cell 4'],
];

function MyTable() {
    return (
        <table>
            <tbody>
            {/* Map through tableData to render rows */}
            {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {/* Map through each row to render cells */}
                    {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default MyTable;