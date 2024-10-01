import React, { useState } from 'react';
import { marked } from 'marked';

const MarkdownPreview = () => {
    const [input, setInput] = useState('');

    return (
        <div>
            <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Type your README here..." 
                rows="10" 
                cols="50"
            />
            <div 
                className="markdown-body" 
                dangerouslySetInnerHTML={{ __html: marked(input) }}
            />
        </div>
    );
};

export default MarkdownPreview;
