export default class Alumno {
    constructor(username, DNI, edad) { 
    this.username = username
    this.DNI = DNI
    this.edad = edad
    }
    
    toString(){
    return ` Nombre:${this.username}, DNI:${this.DNI}, Edad: ${this.edad}`;
    }
    }