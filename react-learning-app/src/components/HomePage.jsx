import React, { useState } from "react";
import { useQuery } from "react-query";
import Counter from "./Counter";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [check, setCheck] = useState();

  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/"+page);
    
    return res.json();
  };

  const onSuccess = (data) => {
    //console.log("fetching success ! ",data);
    setCheck(new Date());
  }

  const onError = () => {
    console.log("fetching Error ! ");
  }


  const { data, status, isLoading, isFetching } = useQuery(["users", page], fetchUsers, 
  { 
    //cacheTime: 3000, // deafult cache time 5 mins
    //staleTime: 1000 * 60, //It won't fetch data again for 1 mins
    //refetchOnMount: true, //data fetched only once i.e. on component mount
    //refetchOnWindowFocus: false, //to avoid refetch on focus window
    //refetchOnReconnect: true, // refetch in case of network failure
    //refetchInterval: 3000, // 3 secs
    //refetchIntervalInBackground: true, //it fetches data even if window is not focused
    //enabled: false // Can be used along with refetch
    onSuccess
  });
 
  
  return (
    <div>
      <div style={{ width: "600px" }}>
        <div>
          <button onClick={() => setPage(page - 1)}>Prev</button>
          <span>{page}</span>
          {status !== "error" && (
            <button onClick={() => setPage(page + 1)}>Next</button>
          )}
        </div>

           
        {isLoading && (
          <div>
            <h2 style={{ color: "red" }}>Loading ...</h2>
          </div>
        )}
        {isFetching && <h3 style={{ color: "indigo" }}>is fetching...</h3>} 
        {status === "success" && (
          <div>
            <h2 style={{ color: "green" }}>Success</h2>
          </div>
        )}
        {status === "error" && (
          <div>
            <h2 style={{ color: "red" }}>404 Error</h2>
          </div>
        )}
      </div>
      <div
          key={data?.id}
          style={{
            border: "2px solid teal",
            minWidth: "600px",
            margin: "6px auto",
            padding: "10px",
            fontSize: "20px",
          }}>
          <span>{data?.name}</span>
        </div>
        <Counter />
        {/* <Link to="/">
                <button className="btn btn-primary">User List</button>
       </Link>       */}
    </div>
  );
};

export default HomePage;
