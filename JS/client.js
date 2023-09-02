$(document).ready(function () {
  const employeeForm = $("#employeeForm");
  const submitBtn = $("#submitBtn");
  const monthlyCostDisplay = $("#monthlyCost");
  const employeeTable = $("#employeeTable tbody");

  let totalMonthlyCost = 0;

  submitBtn.click(function () {
    // Get input values
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const idNumber = $("#idNumber").val();
    const jobTitle = $("#jobTitle").val();
    const annualSalary = Number($("#annualSalary").val());

    // Calculate monthly cost and update total
    const monthlySalary = annualSalary / 12;
    totalMonthlyCost += monthlySalary;

    // Clear input fields
    $("#firstName").val("");
    $("#lastName").val("");
    $("#idNumber").val("");
    $("#jobTitle").val("");
    $("#annualSalary").val("");

    // Append employee information to the table
    employeeTable.append(`
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${idNumber}</td>
                <td>${jobTitle}</td>
                <td>$${annualSalary.toFixed(2)}</td>
                <td><button class="deleteBtn">Delete</button></td>
            </tr>
        `);

    // Update total monthly cost on the DOM
    monthlyCostDisplay.text(`$${totalMonthlyCost.toFixed(2)}`);
    //used toFixed(2) to round to nearest 2 decimal places

    // Applying red background if monthly total greater than 20,000
    if (totalMonthlyCost > 20000) {
      monthlyCostDisplay.addClass("redBackground");
    } else {
      monthlyCostDisplay.addClass("normalBackground");
      //trying to remove the red background, but would have to add it to the delete button i think
    }
  });

  // Handle delete button click
  employeeTable.on("click", ".deleteBtn", function () {
    const row = $(this).closest("tr");
    //console.log(this); used to make sure it targeted the delete button
    // $(this) referring to this button that was clicked;
    //closest('tr) looking for the closest table row

    const salaryCell = row.find("td:nth-child(5)");
    //console.log('salaryCell', salaryCell);
    //searching in the row -> .find -> finding <td> element -> looking for 5th child which is annual salary

    const annualSalary = Number(salaryCell.text());

    totalMonthlyCost -= annualSalary / 12;

    row.remove(); // removes entire table row
    //return confirm('Are you sure?') tried adding a confirm, but couldn't get it
    // to update monthly cost after confirming

    // Update total monthly cost on the DOM
    monthlyCostDisplay.text(`$${totalMonthlyCost.toFixed(2)}`);
  });
});
