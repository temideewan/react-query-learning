import React from 'react'
import {useQuery} from 'react-query';
import Planet from './Planet'
import Person from './Person'


const fetchPeople = async() => {
    const res = await fetch('https://www.swapi.tech/api/people/');
    return res.json();
}


const People = () => {
    const {data, status} = useQuery('People', fetchPeople);
    console.log(data);
    return ( 
        <div>
            <h2>People</h2>
        {/* <p>{status}</p> */}
        {status === 'loading' && (
            <div>Loading data...</div>
        )}
        {status === 'error' && (
            <div>Error fetching data</div>
        )}
        {status === 'success' && (
            <div>
                
                {data.results.map(person => <Person key={person.name} person={{name:person.name, url:person.url}}/>)}
            </div>
        )}
        </div>
     );
}
 
export default People;