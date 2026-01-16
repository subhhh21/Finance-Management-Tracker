const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function addTransaction(e) {
  e.preventDefault();
  const transaction = {
    id: Math.floor(Math.random() * 100000000),
    text: text.value,
    amount: +amount.value
  };
  transactions.push(transaction);
  updateUI();
  updateLocalStorage();
  text.value = '';
  amount.value = '';
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  updateUI();
}

function clearAll() {
  if (confirm("Kya aap saara data delete karna chahte hain?")) {
    transactions = [];
    updateLocalStorage();
    updateUI();
  }
}

function addTransactionDOM(t) {
  const sign = t.amount < 0 ? '-' : '+';
  const icon = t.amount < 0 ? 'fa-arrow-down' : 'fa-arrow-up';
  const item = document.createElement('li');
  
  item.innerHTML = `
    <div style="display:flex; align-items:center;">
        <i class="fa-solid ${icon}" style="color: ${t.amount < 0 ? '#f43f5e' : '#10b981'}; margin-right: 12px;"></i>
        <span>${t.text}</span>
    </div>
    <div>
        <span style="color: ${t.amount < 0 ? '#f43f5e' : '#10b981'}; font-weight:600;">${sign}₹${Math.abs(t.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${t.id})"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  `;
  list.appendChild(item);
}

function updateUI() {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const inc = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  const exp = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  balance.innerText = `₹${total}`;
  money_plus.innerText = `+₹${inc}`;
  money_minus.innerText = `-₹${exp}`;
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', addTransaction);
updateUI();