import React from 'react'
import {useQuery} from 'react-query';
import Planet from './Planet'


const fetchPlanets = async(greeting) => {
    console.log(greeting.queryKey[1]);
    const res = await fetch('https://www.swapi.tech/api/planets');
    return res.json();
}


const Planets = () => {
    const {data, status} = useQuery(['planets', 123], fetchPlanets, {staleTime: 2000,cacheTime:10, onSuccess:()=> console.log('data has been fetched successfully bruh')});
    console.log(data);
    return ( 
        <div>
            <h2>Planets</h2>
        {/* <p>{status}</p> */}
        {status === 'loading' && (
            <div>Loading data...</div>
        )}
        {status === 'error' && (
            <div>Error fetching data</div>
        )}
        {status === 'success' && (
            <div>
                
                {data.results.map(planet => <Planet key={planet.name} planet={{name:planet.name, url:planet.url}}/>)}
            </div>
        )}
        </div>
     );
}
 
export default Planets;