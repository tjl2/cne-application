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
      <h2 className="centred">Senior Software Engineer | Infrastructure Engineer</h2>
      <p>
        I was excited to see the role of Cloud Native Engineer open up recently.
        As a massive fan of Warhammer 40,000, I'd love to work for Games Workshop!
      </p>
      <p>
        As you will see from my CV, I've got over 20 years of experience in software development
        and infrastructure engineering. I've worked in the web development and deployment space
        for my whole career, so have a great depth of experience in most areas of the stack,
        along with lots of experience in the DevOps space. I've been involved in cloud technologies
        for the last 10 years, using both AWS and Azure in my career. Additionally, I spent a few
        years spearheading GitHub's Enterprise Quality Engineering team, where I was responsible
        for building end-to-end testing frmaeworks and automating the deployment and provisioning
        of our on-premise GitHub Enterprise instances on AWS and Azure.<br />
        I feel like these experiences have given me a great breadth of knowledge and experience
        that I think is a great fit for the role.
      </p>
      <h2>About the site</h2>
      <p>
        Having most of my web development experience in backend, server-side technologies
        (Ruby on Rails & Elixir Phoenix applications deployed as containers is my usual stack),
        I wanted to give myself a weekend hack challenge to build a single page app using some 
        of the technologies listed in the job description. The site is written in React,
        utilising the AWS CDK to deploy it to S3 and CloudFront. Wanting to make this a truly
        cloud-native app, I also utilised a serverless function that makes requests to the
        OpenAI API to <a href="#synopsis-generator">generate a synopsis for a Warhammer 40,000 Black Library novel!</a>
      </p>
      <p>
        Having not used React, built a Lambda function or deployed with CDK before, this was
        a great learning experience for me – I'm really pleased to have deployed something in
        this short timeframe. My previous development and infrastructure experiences definitely
        helped me to get up to speed quickly.
      </p>
      <p>
        You can see the GitHub repository for the React site at &nbsp;
        <a href="https://github.com/tjl2/cne-application">github.com/tjl2/cne-application</a>
        &nbsp;and the CDK code at&nbsp;
        <a href="https://github.com/tjl2/cne-application-cdk">github.com/tjl2/cne-application-cdk</a>.
      </p>
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://4zoml2ffdp26pyx35ruk7krt3u0duvmk.lambda-url.eu-west-2.on.aws/';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };
    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      const json = await response.json();
      setResponse(json);
      setIsLoading(false);
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
      <h2 id="synopsis-generator">Plan the next Black Library best seller…</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Write a synopsis for a Warhammer 40,000 Black Library novel about:<br />
          <input type="text" name="prompt" onChange={handleChange} placeholder="Henry Cavill leading the Adeptus Custodes" />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
        {isLoading ? 'Machine spirits working…' : 'Query the heretical AI'}
        </button>
      </form>
      {response && (
        <div>
          <h2>Your synopsis:</h2>
          <p className="synopsis">{response.choices[0].text}</p>
        </div>
      )}
    </div>
  );
}
  

export default App;
