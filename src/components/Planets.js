import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async ({ queryKey }) => {
  const page = queryKey[1];
  const res = await fetch(
    `https://www.swapi.tech/api/planets?page=1&limit=60`
  );
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", 1], fetchPlanets, {
    staleTime: 2000,
    
    onSuccess: () => console.log("data has been fetched successfully bruh"),
  });
  console.log(data);
  
  return (
    <div>
      
      <h2>Planets</h2>
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
            .map((planet) => (
              <Planet
                key={planet.name}
                planet={{ name: planet.name, url: planet.url }}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
