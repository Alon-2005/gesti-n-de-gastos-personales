// Variables globales
let initialMoney = 0; // Dinero inicial
let totalBalance = 0; // Balance total actual
let totalSavings = 0; // Total ahorrado

// Actualizar balance
document.getElementById('update-balance').addEventListener('click', () => {
  const initialInput = parseFloat(document.getElementById('initial-money').value) || 0;
  const incomeInput = parseFloat(document.getElementById('income').value) || 0;
  const depositInput = parseFloat(document.getElementById('deposit').value) || 0;

  // Calcular el balance total
  initialMoney = initialInput; // Guardar el dinero inicial
  totalBalance = initialMoney + incomeInput + depositInput; // Sumar ingresos y depósitos

  // Mostrar en la interfaz
  document.getElementById('initial-display').textContent = initialMoney.toFixed(2);
  document.getElementById('current-display').textContent = totalBalance.toFixed(2);
});

// Calcular y actualizar ahorro
document.getElementById('update-savings').addEventListener('click', () => {
  const savingsPercentage = parseFloat(document.getElementById('savings-percentage').value) || 0;

  if (savingsPercentage < 0 || savingsPercentage > 100) {
    alert('Por favor, ingrese un porcentaje válido (0-100).');
    return;
  }

  // Calcular ahorro basado en el balance total
  totalSavings = (savingsPercentage / 100) * totalBalance;

  // Mostrar en la interfaz
  document.getElementById('savings-total').textContent = totalSavings.toFixed(2);
});

// Registrar gasto
document.getElementById('add-expense').addEventListener('click', () => {
  const expenseDate = document.getElementById('expense-date').value;
  const expenseDescription = document.getElementById('expense-description').value;
  const expenseAmount = parseFloat(document.getElementById('expense-amount').value) || 0;

  // Validaciones
  if (!expenseDate || !expenseDescription || expenseAmount <= 0) {
    alert('Por favor, complete todos los campos correctamente.');
    return;
  }

  if (expenseAmount > totalBalance - totalSavings) {
    alert('No tienes suficiente saldo disponible después de ahorrar.');
    return;
  }

  // Actualizar balance
  totalBalance -= expenseAmount;

  // Mostrar balance actualizado
  document.getElementById('current-display').textContent = totalBalance.toFixed(2);

  // Agregar gasto a la tabla
  const tableBody = document.querySelector('#expense-table tbody');
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${expenseDate}</td>
    <td>${expenseDescription}</td>
    <td>$${expenseAmount.toFixed(2)}</td>
  `;
  tableBody.appendChild(newRow);

  // Limpiar campos del formulario de gastos
  document.getElementById('expense-date').value = '';
  document.getElementById('expense-description').value = '';
  document.getElementById('expense-amount').value = '';
});

// Guardar datos en Local Storage
document.getElementById('save-balance').addEventListener('click', () => {
  const balanceData = { initialMoney, totalBalance };
  localStorage.setItem('balanceData', JSON.stringify(balanceData));
  alert('¡Balance guardado exitosamente!');
});

document.getElementById('save-savings').addEventListener('click', () => {
  localStorage.setItem('savingsData', totalSavings.toFixed(2));
  alert('¡Ahorro guardado exitosamente!');
});

document.getElementById('save-expenses').addEventListener('click', () => {
  const expenses = [];
  const tableRows = document.querySelectorAll('#expense-table tbody tr');
  tableRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    expenses.push({
      date: cells[0].textContent,
      description: cells[1].textContent,
      amount: parseFloat(cells[2].textContent.replace('$', '')),
    });
  });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  alert('¡Gastos guardados exitosamente!');
});

// Cargar datos al iniciar la página
window.addEventListener('load', () => {
  const savedBalance = JSON.parse(localStorage.getItem('balanceData'));
  if (savedBalance) {
    initialMoney = savedBalance.initialMoney;
    totalBalance = savedBalance.totalBalance;

    // Mostrar datos guardados
    document.getElementById('initial-money').value = initialMoney;
    document.getElementById('initial-display').textContent = initialMoney.toFixed(2);
    document.getElementById('current-display').textContent = totalBalance.toFixed(2);
  }

  const savedSavings = parseFloat(localStorage.getItem('savingsData')) || 0;
  if (savedSavings) {
    totalSavings = savedSavings;
    document.getElementById('savings-total').textContent = totalSavings.toFixed(2);
  }

  const savedExpenses = JSON.parse(localStorage.getItem('expenses'));
  if (savedExpenses) {
    const tableBody = document.querySelector('#expense-table tbody');
    savedExpenses.forEach(expense => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.description}</td>
        <td>$${expense.amount.toFixed(2)}</td>
      `;
      tableBody.appendChild(newRow);
    });
  }
});
