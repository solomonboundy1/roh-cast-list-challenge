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
      filterCreatives(response.data.included);
      const Ids = response.data.included[castNum].relationships.cast.data;
      filterCast(Ids, response.data.included);
    });
  };

  function filterCreatives(arr) {
    let creatives = arr.filter((x) => {
      return x.type === "creatives";
    });
    setCreatives(creatives);
  }

  function filterCast(Ids, arr) {
    let result = [];
    for (let i = 0; i < Ids.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (Ids[i].id === arr[j].id) {
          result.push(arr[j]);
        }
      }
    }
    setCast(result);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {title}
      {date}
      {shortDesc.slice(3, -4)}
      {creatives.map((x) => (
        <li key={x.attributes.id}>
          {x.attributes.name} - {x.attributes.role}
        </li>
      ))}

      {cast.length > 0 ? (
        <div>
          {cast.map((person) => (
            <li key={person.id}>
              {person.attributes.name}: {person.attributes.role}
            </li>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default App;
