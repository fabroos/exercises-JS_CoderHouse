// un algoritmo que contiene ciclo, emplea cierta instruccion reiterada cantidad de veces, con un limite claro.
alert("Hola, bienvenido!!\n Vamos a armar el arbol de navidad!!");
let h = 0;
let star = ""
while(h <= 1){
    h = parseInt(prompt("cual altura quieres que tenga el arbol?\n¡la altura debe ser por lo menos de 2!\n consejo: di una altura de mas de 4 y el arbol se vera mejor"))
    if(h > 1){
        for(var i=0; i<=(h * 2) - 1; i += 2){
            for(var k = 1; k < h - i / 2; k++){
                star += "_";
            };
            for(var j=0; j<=i; j++) {
                star += "*";
            };
            for(var k = 1; k < h - i / 2; k++){
                star += "_";
            };
            star += "\n"
            };
            for(var i=0; i < 2; i++){
            for(var k = 1; k < h  ; k++){
                star += "_";
            };
                star += "#";
            for(var k = 1; k < h  ; k++){
                star += "_";
            };
            if( i < 1)star += "\n"
            };
    }
}

alert(star);
