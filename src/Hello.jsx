import { useState, useEffect } from "react";
import { C } from "./Constants";
export function Hello() {
  const [data, setData] = useState({});
  useEffect(() => { getData()}, []);

  async function getData() {
    const res = await fetch(`${C.ROOT_URL}/hello`);
    const data = await res.json();
    setData(data);
  }
  return (
    <>
      <h1>Hello</h1>
      <h2>{data.id}</h2>
      <h2>{data.name}</h2>
      <button onClick={getData}>Refresh</button>
    </>
  );
}