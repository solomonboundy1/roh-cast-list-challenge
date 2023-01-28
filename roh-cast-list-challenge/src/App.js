import Axios from "axios";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // I came across a CORS issue while trying to make the api call,
  // to resolve this I installed a chrome extention that could bypass the CORS issue called
  // allow-cors-access-control

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [creatives, setCreatives] = useState([]);
  const [cast, setCast] = useState([]);
  const [date, setDate] = useState("");

  let castNum = 14; // number from 'included' part of json file to find date and cast info

  const getData = () => {
    Axios.get(
      "https://www.roh.org.uk/api/event-details?slug=turandot-by-andrei-serban"
    ).then((response) => {
      console.log(response);
      setTitle(response.data.data.attributes.title);
      setShortDesc(response.data.data.attributes.shortDescription);
      setDate(
        new Date(
          response.data.included[castNum].attributes.date
        ).toLocaleDateString()
      );
    });
  };
  return (
    <div className="App">
      <button onClick={getData}>getData</button>
      {title}
      {date}
      {shortDesc}
    </div>
  );
}

export default App;
