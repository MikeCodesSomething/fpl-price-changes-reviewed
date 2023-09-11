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
          row.appendChild(cell);
        });

        table.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Error fetching Google Sheets data: ", error);
    });