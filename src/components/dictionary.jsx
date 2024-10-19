import React, { useState } from 'react';
import useSearchStore from './store/store'; 
import './dictionary.css';
const Dictionary = () => {
  const [input, setInput] = useState('');
  const { definitions, error, fetchDefinitions } = useSearchStore();

  
  const handleSearch = () => {
    if (input.trim()) {
      fetchDefinitions(input);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="dictionary-container">
      <h1 className="dictionary-title">Dictionary</h1>

      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="dictionary-input"
        placeholder="Enter a word"
      />

      
      <button className="dictionary-button" onClick={handleSearch}>
        Search
      </button>

      
      {error && <p className="dictionary-error">{error}</p>}

     
      {definitions.length > 0 && (
        <div className="dictionary-result">
          <h2>{definitions[0].word}</h2>
          {definitions[0].meanings.map((meaning, index) => (
            <div key={index}>
              <p>
                <strong>{meaning.partOfSpeech}:</strong> {meaning.definitions[0].definition}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dictionary;
