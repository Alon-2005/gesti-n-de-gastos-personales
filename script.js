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
   [_{{{CITATION{{{_1{](https://github.com/santo52/juridico-laravel/tree/c9f395328d30d67b0e7c46416c65978263dea926/public%2Fphp%2Finformes%2Fprocesos_activos%2Fprocesos_activos.php)[_{{{CITATION{{{_2{](https://github.com/Ryuggo/HEPL-School/tree/24b7b690b2ee1ea7bd26ebc801bb8175a57d06cf/B2%2FJavaScript%2Fphp%2Ffooter.php)



 
