// Algoritmo:  Conjunto de ordenes, ordenadas, y finitas para resolver un problema.

alert("Hola bienvenido, vamos a calcular cual sera la ganancia en tu plazo fijo");

let monto =  parseFloat(prompt("cual va a ser el monto a ingresar?"));

let meses = parseInt(prompt("Cuantos meses sera el plazo fijo?"));

let interes = parseFloat(prompt("cual es el interes anual? le pedimos que se expresado en forma numerica y no porcentual ejemplo: 0.30 (30%)"));

let total = monto * (interes * meses * 30 / 365);

alert("ha ganado $" + total + " por depositar $" + monto + " en " + meses * 30 + " dias en un plazo fijo que prometia una tasa anual del " + interes );

monto += total

alert("el monto final de este plazo fijo es de: $" + monto)