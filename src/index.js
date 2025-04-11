import Alumno from "./models/alumno.js"

import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"

import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"

import express  from "express"; 

import cors from "cors"; 


const app  = express();

const port = 3000;


app.use(cors());         

app.use(express.json());


app.get('/', (req, res) => {

    res.status(200).send('Ya estoy respondiendo!');

})

app.get('/saludar/:nombre', (req, res) => {

    res.status(200).send(`Hola ` + req.params.nombre);

})


app.get('/validarfecha/:anio/:mes/:dia', (req, res) => {

    var anio = req.params.anio
    var mes = req.params.mes
    var dia = req.params.dia
    var fechaIng = new Date(anio, mes, dia)

    if(Number.isNaN(fechaIng)){
        res.status(400).send(`Fecha inválida`)
    }
    else{
        if(Number.isNaN(fechaIng)){
            res.status(200).send(`Fecha válida`)
        }
        else{
            res.status(400).send(`Fecha inválida`)
        }

    }    
    
})

 app.get('/matematica/sumar', (req, res) => {

     res.status(200).send(`La suma da ` + sumar(parseInt(req.query.n1), parseInt(req.query.n2)))
 })

 app.get('/matematica/multiplicar', (req, res) => {

     res.status(200).send(`La multiplicación da ` + (multiplicar(parseInt(req.query.n1), parseInt(req.query.n2))))
})

app.listen(port, () => {

    console.log(`Listening on port ${port}`)

})

