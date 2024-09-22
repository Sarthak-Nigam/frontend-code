'use client'

import React, { useState } from 'react';

// Replace this URL with your actual deployed backend URL
const API_URL = 'https://website-sarthaks-projects-5ddeb5c1.vercel.app/bfhl';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    setError('');
    setResponse(null);
    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="mt-4 p-4 border rounded">
        <h2 className="text-xl font-bold mb-2">Response:</h2>
        {selectedOptions.includes('Alphabets') && (
          <p>Alphabets: {response.alphabets.join(', ')}</p>
        )}
        {selectedOptions.includes('Numbers') && (
          <p>Numbers: {response.numbers.join(', ')}</p>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <p>Highest lowercase alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bajaj Finserv Health Dev Challenge</h1>
      <input
        className="w-full p-2 mb-4 border rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
      />
      <button onClick={handleSubmit} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
      
      {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
      
      {response && (
        <select
          className="mb-4 p-2 border rounded"
          multiple
          onChange={(e) => setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))}
        >
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
      )}
      
      {renderResponse()}
      
      {response && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">Additional Info:</h2>
          <p>User ID: {response.user_id}</p>
          <p>Email: {response.email}</p>
          <p>Roll Number: {response.roll_number}</p>
          <p>Is Success: {response.is_success ? "✅" : "❌"}</p>
          {response.file_valid !== undefined && (
            <>
              <p>File Valid: {response.file_valid ? "✅" : "❌"}</p>
              {response.file_valid && (
                <>
                  <p>File MIME Type: {response.file_mime_type}</p>
                  <p>File Size: {response.file_size_kb} KB</p>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
