import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch("https://www.swapi.tech/api/people/?page=1&limit=60");
  return res.json();
};

const People = () => {
  const { data, status } = useQuery("People", fetchPeople);
  const [page, setPage] = useState(1);
  console.log(data);
  return (
    <div>
      <h2>People</h2>
      {/* <p>{status}</p> */}
      <button onClick={() => setPage((old) => Math.max(old - 1, 1))}
      disabled={page === 1}
      >
        prev page
      </button>
      {page}
      <button onClick={() => {
        const lastElementUid = data.results[data.results.length-1].uid;
        const lastElementOfEachPage = page* 10;
        const uidOfLastPaginatedPage = data.results[lastElementOfEachPage -1].uid;
        const check = uidOfLastPaginatedPage === lastElementUid;
        return setPage((old) => check? old: old+1)}}
      disabled={data? data.results[page* 10 -1].uid === data.results[data.results.length-1].uid: false }>
        next page
      </button>

      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.results
            .filter((planet, index) => {
              const upperLimit = page * 10;
              const lowerLimit = 10 * (page - 1);
              return index >= lowerLimit && index < upperLimit;
            })
            .map((person) => (
              <Person
                key={person.name}
                person={{ name: person.name, url: person.url }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default People;
