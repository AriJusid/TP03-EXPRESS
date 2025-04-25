import axios from "axios";

const APIKEY = "78296dac"; 
const RESULTADOSCONSOLA = 10


const OMDBSearchByPage = async (searchText, page) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : []

    };

    try{
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&p=${page}`;

    const apiResponse = await axios.get(requestString);
    if(apiResponse.data.Response === "True"){
        console.log("entró")
        returnObject.respuesta = true
        returnObject.cantidadTotal = parseInt(apiResponse.data.totalResults)
        returnObject.datos = apiResponse.data.Search
    }

    else{
        returnObject.respuesta = false
        returnObject.datos = []
    }
  
    }
    catch{
        console.log("error")
         returnObject.respuesta = false;
         returnObject.datos = [];
    }
    return returnObject;

};


const OMDBSearchComplete = async (searchText) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : []

    };

    
    try{

        let paginaReturn  = await OMDBSearchByPage(searchText, 1)

        
        var cantPages = Math.ceil(paginaReturn.cantidadTotal / RESULTADOSCONSOLA)

        if(cantPages > 1){
            returnObject = paginaReturn

            for(var i = 2; i < cantPages; i++){

                paginaReturn = await OMDBSearchByPage(searchText, 1)
                returnObject.datos = returnObject.datos.concat(paginaReturn.datos)
                                    
            }

            returnObject.cantidadTotal = returnObject.datos.length

        }else{            
            returnObject = paginaReturn

        }

       
        
    }
    catch(error){console.log(error)}

  return returnObject;

};


const OMDBGetByImdbID = async (imdbID) => {

  let returnObject = {

      respuesta     : false,

      cantidadTotal : 0,

      datos         : {}

    };

    try{
        const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;
        const apiResponse = await axios.get(requestString);
        console.log(apiResponse.data)
        if(apiResponse.data.Response === "True"){
            returnObject.respuesta = true
            returnObject.datos = apiResponse.data
        }
    
        else{returnObject.respuesta = false}
      
        }
        catch{
            console.log("error")
        }
  return returnObject;

};



export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};