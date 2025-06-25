const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const addBtn = document.getElementById('addBtn');
const transactionsList = document.getElementById('transactions');
const balanceSpan = document.getElementById('balance');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateUI() {
  transactionsList.innerHTML = '';
  let balance = 0;
  transactions.forEach(t => {
    const li = document.createElement('li');
    li.className = 'transaction-card';
    const icon = document.createElement('span');
    icon.className = 'transaction-icon ' + (t.amount < 0 ? 'expense' : 'income');
    icon.textContent = t.amount < 0 ? '−' : '+';
    const desc = document.createElement('span');
    desc.className = 'transaction-desc';
    desc.textContent = t.desc;
    const amount = document.createElement('span');
    amount.className = 'transaction-amount ' + (t.amount < 0 ? 'expense' : 'income');
    amount.textContent = (t.amount < 0 ? '' : '+') + t.amount;
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      transactions = transactions.filter(tx => tx.desc !== t.desc);
      updateUI();
    });
    li.appendChild(icon);
    li.appendChild(desc);
    li.appendChild(amount);
    li.appendChild(deleteBtn);
    transactionsList.appendChild(li);
    balance += t.amount;
  });
  balanceSpan.textContent = balance;
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction() {
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  if (desc && !isNaN(amount)) {
    transactions.push({ desc, amount });
    updateUI();
    descInput.value = '';
    amountInput.value = '';
  }
}

addBtn.addEventListener('click', addTransaction);
descInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') addTransaction(); });
amountInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') addTransaction(); });

updateUI();