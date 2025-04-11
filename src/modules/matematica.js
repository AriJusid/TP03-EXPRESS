const PI = 3.14
var array = ["dos", "cuatro", "ocho", "diez"]

const sumar = (x, y) =>{
    return x + y;
}

function restar(x,y){
    return x-y;
    
}

const multiplicar = (a, b) =>{
    return a * b;
}

function dividir(x,y){
    if(y != 0){
        return x/y;
    }
    else{
        console.log("No es posible hacer la división.")
    }
    
}

export{PI, sumar, multiplicar, restar, dividir, array}