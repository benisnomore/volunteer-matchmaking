fetch("final_results.csv")
  .then(res => res.text())
  .then(text => {
    const rows = Papa.parse(text, { skipEmptyLines: true }).data;
    const table = document.getElementById("resultsTable");

    let html = "<tr>";
    rows[0].forEach(h => html += `<th>${h}</th>`);
    html += "</tr>";

    for (let i = 1; i < rows.length; i++) {
      html += "<tr>";

      rows[i].forEach((cell, index) => {
        if (index === 2) { // Suitable Students column
          if (cell.toLowerCase().includes("no suitable")) {
            html += `<td class="no-match">No suitable students found</td>`;
          } else {
            const students = cell.split(",").map(s => s.trim());
            html += `<td><div class="students">`;
            students.forEach(s =>
              html += `<span class="student-chip">${s}</span>`
            );
            html += `</div></td>`;
          }
        } else {
          html += `<td>${cell}</td>`;
        }
      });

      html += "</tr>";
    }

    table.innerHTML = html;
  });
