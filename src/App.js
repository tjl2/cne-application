import { useState } from 'react';
import './App.css';

function App() {
  const [backgroundImage, setBackgroundImage] = useState("");

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
        <a href="https://timlittlemore.s3-eu-west-1.amazonaws.com/Tim+Littlemore+CV.pdf" target="_blank" rel="noreferrer">
          <button>Download CV</button>
        </a>
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

export default App;
