// funcion que realize para que el codigo quedara mas legible, transforma un entero(porcentaje) en su respectivo decimal

function PorcToFloat(p) {
    return p / 100
}


// funcion que pide datos y calcula el valor del interes, se la pasa por parametro un booleano para saber si debe calcular el interes compuesto o simple
function interesCalculator(compound){
    let amount = parseFloat(prompt("cual es el monto inicial a invertir"))
    let duration = parseInt(prompt("a cuantos años quieres calcular el total ganado"))
    let interest = PorcToFloat(parseFloat(prompt("porcentaje de ganancia anual")))
    console.log(interest / 100)
    return compound ? Math.round((amount * ((1 + interest)** duration))) : Math.round((amount * ((1 + interest) * duration)))
}

// funcion que pide los datos y calcula valor de las cuotas
function feeCalculator(){
    let amount = parseFloat(prompt("cual es el monto del producto"));
    let duration = parseInt(prompt("en cuantas cuotas se hara"));
    let interest = PorcToFloat(parseFloat(prompt("porcentaje de interes del producto")));
    return (amount + (amount * interest)) / duration
}


// funcion menu para la ejecucion de las tareas
function main(){
    let op = 0;
    while(op != 4){
        op = parseInt(prompt("Ingresa el numero de la opcion a realizar: \n 1- Simulador de interes\n 2- Simulador de interes compuesto\n 3- Calculadora de cuotas\n 4- Salir"));
        switch(op){
            case 1: alert("el total de tu inversion sera: " + interesCalculator(false))
            break;
            case 2: alert("el total de tu inversion sera: " + interesCalculator(true))
            break;
            case 3: alert("el valor de cada cuota sera: " + feeCalculator())
            break;
            case 4: 
            return
            default: alert("La opcion ingresada es invalida")
            break;
        }
    }
}

main()