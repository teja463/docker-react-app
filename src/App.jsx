import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  useEffect(() => { getData()}, []);

  async function getData() {
    const res = await fetch("http://localhost:8080/hello");
    const data = await res.json();
    setData(data);
  }
  return (
    <>
      <h1>Hello</h1>
      <h2>{data.name}</h2>
      <h2>{data.time}</h2>
    </>
  );
}

export default App;
