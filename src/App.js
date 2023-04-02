import { useState } from 'react';

import './App.css';
import cvPDF from './cv-march2023.pdf';

function App() {
  const [backgroundImage, setBackgroundImage] = useState("url('../40K-Terminators.jpg')");

  const handleChangeBackground = (faction) => {
    faction === "astartes" ? 
      setBackgroundImage("url('../40K-Terminators.jpg')") :
      setBackgroundImage("url('../40K-Tyranids.jpg')");
  };

  const containerStyles = {
    backgroundImage: backgroundImage
  };

  return (
    <div className="App">
      <main className="App-main" style={containerStyles}>
      <div className="faction-buttons">
          <FactionBtn faction="astartes" onClick={() => handleChangeBackground("astartes")} />
          <FactionBtn faction="tyranids" onClick={() => handleChangeBackground("tyranids")} />
        </div>
        <Me />
        <SynopsisGenerator />
      </main>
    </div>
  );
}

function Me() {
  return (
    <div className="Me">
      <h1>Tim Littlemore</h1>
      <h2>Senior Software Engineer | Infrastructure Engineer</h2>
      <p>All the details about how much I love 40K and how I'd love to work for Games Workshop.</p>
      <h2>About the site</h2>
      <ul>
        <li>React</li>
        <li>Deployed via AWS CDK</li>
        <li>Hosted on S3</li>
        <li>CloudFront CDN</li>
        <li>Link to repo</li>
      </ul>
      <div className="Cv">
        {/* Download button for csvPdf */}
        <a href={cvPDF} download="Tim-Littlemore-CV-March2023.pdf">Download my CV</a>
        </div>
    </div>
  )
}

function FactionBtn({faction, onClick }) {
  const factionText = faction === "astartes" ? "Loyal to the Emperor" : "Xenos scum";
  
  return (
    <>
    <button onClick={onClick}>
      {factionText}
    </button>
    </>
  )
}

function SynopsisGenerator() {
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://4zoml2ffdp26pyx35ruk7krt3u0duvmk.lambda-url.eu-west-2.on.aws/';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setResponse(json);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <div className="Me">
      <h2>Plan the next Black Library best seller…</h2>
      <p>Get OpenAI to create a synopsis for you:</p>
      <form onSubmit={handleSubmit}>
        <label>
        Write a synopsis for a Black Library novel about:
          <input type="text" name="prompt" onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Query the machine spirits</button>
      </form>
      {response && (
        <div>
          <h2>Your synopsis:</h2>
          <p>{response.choices[0].text}</p>
        </div>
      )}
    </div>
  );
}
  

export default App;
