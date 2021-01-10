import React, {useEffect, useState} from 'react'
const fetchIndividualPerson= async (url) => {
    const res = await fetch(url);
    const response = await res.json();
    return response;
}


const Person = ({person}) => {

    const [thePerson, setThePerson] = useState(null);

    useEffect( ()=>{
        async function fetchData(){
        const resp = await fetchIndividualPerson(person.url);
        setThePerson(resp);
    }

    fetchData();
    },[person.url])
   
    return ( 
        <div className="card">
            <h3>{person.name}</h3>
            <p>Gender - {thePerson && thePerson.result.properties.gender}</p>
            <p>Birth year - {thePerson && thePerson.result.properties.birth_year}</p>
        </div>
     );
}
 
export default Person;