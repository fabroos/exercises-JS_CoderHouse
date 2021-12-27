// Algoritmo condicional: es una serie de pasos, a seguir que segun ciertos parametros se cumplen o no, ha de seguir ciertos pasos definidos o otros pasos definidos


alert("Generador de usuario\nLa mecanica es sencilla\n si el numero es par: se mostrara el numero par y los 2 proximos numeros pares\n si es impar: se mostrara el numero y el anterior y el siguiente impar")
// input 

let number = parseInt( prompt("escribe un numero!"));

// process and output
if(number % 2 === 0){
    alert("el numero " + number + " es par\nsus proximos pares son: " + (number + 2) + " y " + (number + 4))
}else{
    alert("el numero " + number + " es impar\nsu anterior impar es: " + (number - 2) + "\n y su siguiente impar es: " + (number + 2))
}