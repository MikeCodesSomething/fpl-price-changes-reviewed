fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRbLHukC_yBzeaturQs00p2leMZ25MJz6zhQAYegpMcKCaTj_YwHmvEIc4XDSnyJEb3d4zf5-Eaa2AH/pub?gid=1521535147&single=true&output=csv")
    .then(response => response.text()) // Convert the response to text
    .then(data => {
      // Parse the CSV data
      const rows = data.split('\n'); // Split the data into rows   
      const columns = rows[0].split(','); // Split the data into columns
      const dataObjects = [];

      // Loop through the rows,
      for (let i = 0; i < rows.length; i++) {
        const currentRow = rows[i].split(',');
        const rowData = {};

        // Loop through the columns and create an object with key-value pairs
        for (let j = 0; j < columns.length; j++) {
          rowData[columns[j]] = currentRow[j];
        }

        // Push the object into the dataObjects array
        dataObjects.push(rowData);
      }

      // Populate table
      const table = document.getElementById("data-table");
    
      dataObjects.forEach((rowData,index) => {
        //Create a header row and data rows
        const row =  document.createElement("tr");
      
        columns.forEach(column => {
          const cell = document.createElement(index === 0 ? "th" : "td");
          cell.textContent = rowData[column];
          cell.setAttribute('data-cell',dataObjects[0][column]);
          row.appendChild(cell);
        });

        table.appendChild(row);
      }
      )

    // Hide default hidden rows
    toggleHiddenRows([3,4,9,10]);
    // Highlight the highest value in specified rows after the data is imported
    highlightHighestValues([1,6,7,12]);
    // Highlight the lowest value in specified rows after the data is imported
    highlightLowestValues([2,3,4,5,8,9,10,11]);
    //Add roles to table DOM elements
    AddTableARIA();

  })
  .catch(error => {
    console.error("Error fetching Google Sheets data: ", error);
  });

function toggleHiddenRows(inputRows) {
  const table = document.getElementById("data-table");
  const rows = table.getElementsByTagName("tr");
  console.log(rows);
  for (let i = 0; i < inputRows.length; i++) {
    rows[inputRows[i]].classList.toggle("hidden")
  }

}

function highlightHighestValues(inputRows) {
  const table = document.getElementById("data-table");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < inputRows.length; i++) {
    const cells = rows[inputRows[i]].getElementsByTagName("td");
    let maxCellValue = -Infinity;
    let maxCellIndex = -1;

    for (let j = 0; j < cells.length; j++) {
      const cellValue = parseFloat(cells[j].textContent);

      if (!isNaN(cellValue) && cellValue > maxCellValue) {
        maxCellValue = cellValue;
        maxCellIndex = j;
      }
    }

    if (maxCellIndex !== -1) {
      cells[maxCellIndex].classList.add("highlight");
    }
  }
}

function highlightLowestValues(inputRows) {
  const table = document.getElementById("data-table");
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < inputRows.length; i++) {
    const cells = rows[inputRows[i]].getElementsByTagName("td");
    let minCellValue = Infinity; 
    let minCellIndex = -1;

    for (let j = 0; j < cells.length; j++) {
      const cellValue = parseFloat(cells[j].textContent);

      if (!isNaN(cellValue) && cellValue < minCellValue) {
        minCellValue = cellValue;
        minCellIndex = j;
      }
    }

    if (minCellIndex !== -1) {
      cells[minCellIndex].classList.add("highlight"); 
    }
  }
}


//For accessibility we add roles to the table with a standard script.
function AddTableARIA() {
  try {
    var allTables = document.querySelectorAll('table');
    for (var i = 0; i < allTables.length; i++) {
      allTables[i].setAttribute('role','table');
    }
    var allCaptions = document.querySelectorAll('caption');
    for (var i = 0; i < allCaptions.length; i++) {
      allCaptions[i].setAttribute('role','caption');
    }
    var allRowGroups = document.querySelectorAll('thead, tbody, tfoot');
    for (var i = 0; i < allRowGroups.length; i++) {
      allRowGroups[i].setAttribute('role','rowgroup');
    }
    var allRows = document.querySelectorAll('tr');
    for (var i = 0; i < allRows.length; i++) {
      allRows[i].setAttribute('role','row');
    }
    var allCells = document.querySelectorAll('td');
    for (var i = 0; i < allCells.length; i++) {
      allCells[i].setAttribute('role','cell');
    }
    var allHeaders = document.querySelectorAll('th');
    for (var i = 0; i < allHeaders.length; i++) {
      allHeaders[i].setAttribute('role','columnheader');
    }
    // this accounts for scoped row headers
    var allRowHeaders = document.querySelectorAll('th[scope=row]');
    for (var i = 0; i < allRowHeaders.length; i++) {
      allRowHeaders[i].setAttribute('role','rowheader');
    }
  } catch (e) {
    console.log("AddTableARIA(): " + e);
  }
}

