import React from "react";
import './App.css';
var txt = require("./first-names.txt")
const App = () => {

  const getOccuurances = () => {
    fetch(window.location.origin + txt)
      .then((r) => r.text())
      .then(text => {
        // Parse firstname text file to string
        let documentParseToStringPhase = text.toString()
        // Construct array to send names in array formate
        let constructArray = documentParseToStringPhase.split("\r")
        // API call to download occurances
        fetch("http://localhost:3001/name-count", {
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          body: JSON.stringify({ firstNames: constructArray })
        })
          .then(response => response.blob())
          .then(blob => URL.createObjectURL(blob))
          .then(uril => {
            //Download link code
            var link = document.createElement("a");
            link.href = uril;
            link.download = "oliver-text.txt";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
      })

  }

  return (
    <div className="App">
      <header className="App-header">
        <section className="p75 my-account">
          <button className="button" onClick={getOccuurances}>Click here to download Occuurances</button>
        </section >
      </header>
    </div>
  );
}



export default App;