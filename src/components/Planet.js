import React, {useEffect, useState} from 'react'
const fetchIndividualPlanet = async (url) => {
    const res= await fetch(url);
    if(!res.ok){
        throw new Error('something went wrong while calling data');
    } else{

        const response = await res.json();
        return response;
    }
}


const Planet = ({planet}) => {

    const [thePlanet, setThePlanet] = useState(null);

    useEffect( ()=>{
        async function fetchData(){
        const resp = await fetchIndividualPlanet(planet.url);
        setThePlanet(resp);
    }

    fetchData();
    },[planet.url])
   
    return ( 
        <div className="card">
            <h3>{planet.name}</h3>
            <p>Population - {thePlanet && thePlanet.result.properties.population}</p>
            <p>Terrain - {thePlanet && thePlanet.result.properties.terrain}</p>
        </div>
     );
}
 
export default Planet;