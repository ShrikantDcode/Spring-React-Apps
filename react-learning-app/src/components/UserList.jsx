import React, { useState } from "react";
import { useQuery } from "react-query";

const UserList = () => {
  const [page, setPage] = useState(1);
  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/");
    return res.json();
  };
  const { data, status } = useQuery(["users", page], fetchUsers);
  
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

        {status === "loading" && (
          <div>
            <h2 style={{ color: "indigo" }}>Loading ...</h2>
          </div>
        )}
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
      {
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
      }
    </div>
  );
};

export default UserList;
