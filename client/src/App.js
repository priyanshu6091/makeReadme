import React, { useState } from 'react';
import axios from './axios';
import Form from './components/Form';
import ReadmeDisplay from './components/ReadmeDisplay';

const App = () => {
  const [readme, setReadme] = useState('');

  const handleGenerateReadme = async (repoLink) => {
    try {
      const response = await axios.post('/generate-readme', { repoLink });
      setReadme(response.data.readme);
    } catch (err) {
      console.error('Error generating README:', err);
    }
  };

  return (
    <div className="App">
      <h1>GitHub README Generator</h1>
      <Form onSubmit={handleGenerateReadme} />
      {readme && <ReadmeDisplay readme={readme} />}
    </div>
  );
};

export default App;
