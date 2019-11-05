import {TablePosition} from "./utils";
import clearCell from "./clearCell";

/**
 * Delete the column associated with the given cell key in a table
 */
function removeColumnByKey(editor, opts, key) {
    const {value} = editor;

    const pos = TablePosition.create(opts, value.document, key);
    const {table} = pos;

    const colIndex = pos.getColumnIndex();

    const rows = table.nodes;

    // Remove the cell from every row
    if (pos.getWidth() > 1) {
        rows.forEach(row => {
            const cell = row.nodes.get(colIndex);
            editor.removeNodeByKey(cell.key, {normalize: false});
        });
    } else {
        // If last column, clear text in cells instead
        rows.forEach(row => {
            row.nodes.forEach(cell => {
                cell.nodes.forEach(node => clearCell(editor, opts, cell));
            });
        });
    }

    // Replace the table
    return editor;
}

export default removeColumnByKey;
