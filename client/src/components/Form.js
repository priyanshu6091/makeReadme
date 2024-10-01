import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [repoLink, setRepoLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(repoLink);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter GitHub repository link"
        value={repoLink}
        onChange={(e) => setRepoLink(e.target.value)}
        required
      />
      <button type="submit">Generate README</button>
    </form>
  );
};

export default Form;
