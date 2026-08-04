let budget = 0;
let expenses = 0;
let editRow = null;
let editAmount = 0;

const budgetBtn = document.getElementById("budgetBtn");
const expenseBtn = document.getElementById("expenseBtn");

budgetBtn.addEventListener("click", setBudget);
expenseBtn.addEventListener("click", addExpense);

function setBudget() {
    budget = Number(document.getElementById("budget").value);

    if (budget <= 0 || isNaN(budget)) {
        alert("Please enter a valid budget");
        return;
    }

    document.getElementById("totalBudget").innerText = budget;
    updateBalance();

    document.getElementById("budget").value = "";
}

function addExpense() {

    let title = document.getElementById("title").value.trim();
    let amount = Number(document.getElementById("amount").value);

    if (title === "" || amount <= 0 || isNaN(amount)) {
        alert("Please enter title and amount");
        return;
    }

    // Update Existing Expense
    if (editRow) {

        expenses = expenses - editAmount + amount;

        editRow.cells[0].innerText = title;
        editRow.cells[1].innerText = amount;

        editRow = null;
        editAmount = 0;

        expenseBtn.innerText = "Check Amount";

    } else {

        expenses += amount;

        let table = document.getElementById("expenseTable");

        let row = table.insertRow();

        row.insertCell(0).innerText = title;
        row.insertCell(1).innerText = amount;

        row.insertCell(2).innerHTML =
            `<i class="fa-solid fa-pen-to-square edit-btn"></i>`;

        row.insertCell(3).innerHTML =
            `<i class="fa-solid fa-trash delete-btn"></i>`;

    }

    document.getElementById("totalExpense").innerText = expenses;

    updateBalance();

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";

}

document.getElementById("expenseTable").addEventListener("click", function(e){

    let row = e.target.closest("tr");

    if(!row) return;

    // Delete
    if(e.target.classList.contains("delete-btn")){

        let amount = Number(row.cells[1].innerText);

        expenses -= amount;

        document.getElementById("totalExpense").innerText = expenses;

        updateBalance();

        row.remove();

    }

    // Edit
    if(e.target.classList.contains("edit-btn")){

        editRow = row;

        editAmount = Number(row.cells[1].innerText);

        document.getElementById("title").value = row.cells[0].innerText;
        document.getElementById("amount").value = row.cells[1].innerText;

        expenseBtn.innerText = "Update Expense";

    }

});

function updateBalance(){

    document.getElementById("balance").innerText = budget - expenses;

    if((budget - expenses) < 0){
        document.getElementById("balance").style.color = "red";
    }else{
        document.getElementById("balance").style.color = "white";
    }

}