export default
`function render(qMatrix) {
    // Clear the tbody
    tbody.innerHTML = "";

    // Iterate through each row of the qMatrix
    for(var row = 0; row < qMatrix.length; row++) {
        // Get current row data
        var currentRow = qMatrix[row];
        // Create a row
        var tr = document.createElement("tr");
        // Iterate through each column of the row
        for(var col = 0; col < currentRow.length; col++) {
            // Get current cell data
            var currentCell = currentRow[col];
            // Create a cell
            var td = document.createElement("td");
            // Add text value to the cell
            td.innerHTML = currentCell.qText;
            
            // Check if dimension, then add metadata
            if(col < dimensionInfo.length) {
                // Add a selectable class
                td.className = "selectable";
                // Add metadata for the selection
                td.setAttribute("dim-col",col);
                td.setAttribute("dim-index", currentCell.qElemNumber);
            }
            
            // Append the cell to the row
            tr.appendChild(td);
        }
        // append the row to the table body
        tbody.appendChild(tr);
    }

    // Add click functions to ".selectable" items
    $element.find(".selectable").on("click", function() {
        // Get the dimension column number
        var dimCol = parseInt(this.getAttribute("dim-col"));
        
        // Get the dimension value index
        var dimInd = parseInt(this.getAttribute("dim-index"));

        // Call selectValues with these values
        backendApi.selectValues(dimCol, [dimInd],true);
    });
}`