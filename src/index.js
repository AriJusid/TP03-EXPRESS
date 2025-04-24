import {sumar, restar, multiplicar, dividir} from "./modules/matematica.js"

import {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID} from "./modules/omdb-wrapper.js"

import Alumno from "./models/alumno.js";

import express  from "express"; 

import cors from "cors"; 


const app  = express();

const port = 3000;

const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido"  , "22888444", 20));

alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));

alumnosArray.push(new Alumno("Elba Calao"    , "32623391", 18));

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

    if(Number.isNaN(Date.parse(fechaIng))){
        res.status(400).send(`Fecha inválida`)
    }
    else{
            res.status(200).send(`Fecha válida`)
    }    
    
})

 app.get('/matematica/sumar', (req, res) => {

    if((!isNaN(parseInt(req.query.n1)) || !isNaN(parseInt(req.query.n2)))){
     res.status(200).send(`La suma da ` + sumar(parseInt(req.query.n1), parseInt(req.query.n2)))
    }
    else{
        res.status(400).send(`Ingreso inválido`)

    }
})

 app.get('/matematica/multiplicar', (req, res) => {

    if(!(isNaN(parseInt(req.query.n1)) || isNaN(parseInt(req.query.n2)))){

     res.status(200).send(`La multiplicación da ` + (multiplicar(parseInt(req.query.n1), parseInt(req.query.n2))))
    }
     else{
        res.status(400).send(`Ingreso inválido`)

    }
})

app.get('/matematica/restar', (req, res) => {
    if(!(isNaN(parseInt(req.query.n1)) || isNaN(parseInt(req.query.n2)))){

    res.status(200).send(`La resta da ` + (restar(parseInt(req.query.n1), parseInt(req.query.n2))))
    }
    else{
        res.status(400).send(`Ingreso inválido`)

    }
})

app.get('/matematica/dividir', (req, res) => {
    if(!(isNaN(parseInt(req.query.n1)) || isNaN(parseInt(req.query.n2)))){

        if (parseInt(req.query.n2) == 0){
            res.status(400).send(`El divisor no puede ser cero`)
        }
        else{
            res.status(200).send(`La división da ` + (dividir(parseInt(req.query.n1), parseInt(req.query.n2))))
        }
    }
    else{
        res.status(400).send(`Ingreso inválido`)

    }
})

app.get('/omdb/searchbypage', (req, res) => {
    res.status(200).send(OMDBSearchByPage(req.query.search, req.query.p).datos);
})

app.get('/omdb/searchcomplete', (req, res) => {
    res.status(200).send(OMDBSearchComplete(req.query.texto));
})

app.get('/omdb/getbyomdbid', (req, res) => {
    res.status(200).send(OMDBSearchComplete(req.query.imdbID));
})

app.get('/alumnos', (req, res) => {
    res.status(200).send(alumnosArray);
})

app.get('/alumnos/:dni', (req, res) => {

    var alumnoBuscado = null

    for (var i = 0; i < alumnosArray.length; i++){
        if (alumnosArray[i].DNI == req.params.dni){
            alumnoBuscado = alumnosArray[i]
        }
    }

    if (alumnoBuscado == null){
        res.status(404).send("DNI inexistente")
    }

    else{
        res.status(200).send(alumnoBuscado);
    }
})

app.post('/alumnos', (req, res) => {
    alumnosArray.push(new Alumno(req.body));
    res.json(alumnosArray);
})

app.delete('/alumnos', (req, res) => {
    const posAlumno = alumnosArray.findIndex(Alumno => Alumno.DNI === pareInt(req.body));
    if (alumnosArray[posAlumno] != null){
        alumnosArray.splice(alumnosArray[posAlumno], 1);
        res.status(200).send("Alumno borrado")
    }
    else{
        res.status(404).send("DNI inexistente")
    }

})

app.listen(port, () => {

    console.log(`Listening on port ${port}`)

})


