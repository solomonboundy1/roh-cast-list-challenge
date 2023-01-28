import Axios from "axios";
import "./App.css";

function App() {
  // I came across a CORS issue while trying to make the api call,
  // to resolve this I installed a chrome extention that could bypass the CORS issue called
  // allow-cors-access-control

  const getData = () => {
    Axios.get(
      "https://www.roh.org.uk/api/event-details?slug=turandot-by-andrei-serban"
    ).then((response) => {
      console.log(response);
    });
  };
  return (
    <div className="App">
      <button onClick={getData}>getData</button>
    </div>
  );
}

export default App;
