import React from 'react';

const ReadmeDisplay = ({ readme }) => {
  return (
    <div>
      <h2>Generated README</h2>
      <pre>{readme}</pre>
    </div>
  );
};

export default ReadmeDisplay;
