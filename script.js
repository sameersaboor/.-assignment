let budget = 0;
let expenses = [];
let editIndex = -1;

const budgetInput = document.getElementById("budgetInput");
const budgetBtn = document.getElementById("budgetBtn");

const expenseTitle = document.getElementById("expenseTitle");
const expenseAmount = document.getElementById("expenseAmount");
const category = document.getElementById("category");
const expenseBtn = document.getElementById("expenseBtn");

const budgetText = document.getElementById("budget");
const expenseText = document.getElementById("expense");
const balanceText = document.getElementById("balance");

const expenseTable = document.getElementById("expenseTable");
const progressBar = document.getElementById("progressBar");
const warning = document.getElementById("warning");

const search = document.getElementById("search");
const resetBtn = document.getElementById("resetBtn");

loadData();

budgetBtn.onclick = () => {

    if (budgetInput.value == "") return;

    budget = Number(budgetInput.value);

    saveData();

    render();

    budgetInput.value = "";

};

expenseBtn.onclick = () => {

    const title = expenseTitle.value.trim();
    const amount = Number(expenseAmount.value);
    const cat = category.value;

    if (title == "" || amount <= 0) {
        alert("Enter valid expense.");
        return;
    }

    const item = {
        title,
        amount,
        category: cat,
        date: new Date().toLocaleDateString()
    };

    if (editIndex == -1) {

        expenses.push(item);

    } else {

        expenses[editIndex] = item;

        editIndex = -1;

        expenseBtn.innerText = "Add Expense";

    }

    expenseTitle.value = "";
    expenseAmount.value = "";

    saveData();

    render();

};

function render() {

    expenseTable.innerHTML = "";

    let totalExpense = 0;

    let keyword = search.value.toLowerCase();

    expenses.forEach((item, index) => {

        totalExpense += item.amount;

        if (!item.title.toLowerCase().includes(keyword)) return;

        expenseTable.innerHTML += `
<tr>

<td>${item.title}</td>

<td>${item.category}</td>

<td>Rs ${item.amount}</td>

<td>${item.date}</td>

<td>

<button onclick="editExpense(${index})">
✏️
</button>

<button onclick="deleteExpense(${index})">
🗑️
</button>

</td>

</tr>
`;

    });

    budgetText.innerText = "Rs " + budget;

    expenseText.innerText = "Rs " + totalExpense;

    balanceText.innerText = "Rs " + (budget - totalExpense);

    let percent = budget > 0 ? (totalExpense / budget) * 100 : 0;

    if (percent > 100) percent = 100;

    progressBar.style.width = percent + "%";

    if (totalExpense > budget) {

        warning.innerText = "⚠ Budget Exceeded";

        progressBar.style.background = "red";

    } else {

        warning.innerText = "";

        progressBar.style.background = "#00ff99";

    }

}

function editExpense(index) {

    expenseTitle.value = expenses[index].title;

    expenseAmount.value = expenses[index].amount;

    category.value = expenses[index].category;

    editIndex = index;

    expenseBtn.innerText = "Update Expense";

}

function deleteExpense(index) {

    if (confirm("Delete Expense?")) {

        expenses.splice(index, 1);

        saveData();

        render();

    }

}

search.addEventListener("keyup", render);

resetBtn.onclick = () => {

    if (confirm("Reset Everything?")) {

        budget = 0;

        expenses = [];

        saveData();

        render();

    }

};

function saveData() {

    localStorage.setItem("budget", budget);

    localStorage.setItem("expenses", JSON.stringify(expenses));

}

function loadData() {

    budget = Number(localStorage.getItem("budget")) || 0;

    expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    render();

}
// ===========================
// SAVE DATA
// ===========================
function saveData() {
    localStorage.setItem("budget", budget);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// ===========================
// LOAD DATA
// ===========================
function loadData() {
    budget = Number(localStorage.getItem("budget")) || 0;
    expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    render();
}

// ===========================
// EDIT EXPENSE
// ===========================
function editExpense(index) {

    expenseTitle.value = expenses[index].title;
    expenseAmount.value = expenses[index].amount;
    category.value = expenses[index].category;

    editIndex = index;

    expenseBtn.innerHTML = "Update Expense";

}

// ===========================
// DELETE EXPENSE
// ===========================
function deleteExpense(index) {

    if(confirm("Delete this expense?")){

        expenses.splice(index,1);

        saveData();

        render();

    }

}

// ===========================
// SEARCH
// ===========================
search.addEventListener("keyup",render);

// ===========================
// RESET
// ===========================
resetBtn.onclick=()=>{

    if(confirm("Reset All Data?")){

        budget=0;

        expenses=[];

        editIndex=-1;

        budgetText.innerHTML="Rs 0";
        expenseText.innerHTML="Rs 0";
        balanceText.innerHTML="Rs 0";

        progressBar.style.width="0%";

        warning.innerHTML="";

        localStorage.clear();

        render();

    }

};

// ===========================
// THEME TOGGLE
// ===========================
const themeBtn=document.getElementById("themeBtn");

if(themeBtn){

themeBtn.onclick=()=>{

document.body.classList.toggle("light");

};

}

// ===========================
// DOWNLOAD CSV
// ===========================
const downloadBtn=document.getElementById("downloadBtn");

if(downloadBtn){

downloadBtn.onclick=()=>{

let csv="Name,Category,Amount,Date\n";

expenses.forEach(item=>{

csv+=`${item.title},${item.category},${item.amount},${item.date}\n`;

});

const blob=new Blob([csv],{type:"text/csv"});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="Budget_Report.csv";

link.click();

};

}

// ===========================
// START APP
// ===========================
loadData();
