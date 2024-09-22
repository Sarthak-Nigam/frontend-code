import React, { useState } from 'react';
import { Select, Input, Button, Alert, Card } from '@/components/ui/';
import { CheckCircle2, XCircle } from 'lucide-react';

const API_URL = 'https://your-backend-url.vercel.app/bfhl'; // Replace with your actual backend URL

const App = () => {
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
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <Card className="mt-4 p-4">
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
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bajaj Finserv Health Dev Challenge</h1>
      <Input
        className="mb-4"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='Enter JSON (e.g., { "data": ["A","C","z"] })'
      />
      <Button onClick={handleSubmit} className="mb-4">Submit</Button>
      
      {error && <Alert variant="destructive" className="mb-4">{error}</Alert>}
      
      {response && (
        <Select
          className="mb-4"
          placeholder="Select options to display"
          isMulti
          options={[
            { value: 'Alphabets', label: 'Alphabets' },
            { value: 'Numbers', label: 'Numbers' },
            { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
          ]}
          onChange={(selectedOptions) => setSelectedOptions(selectedOptions.map(option => option.value))}
        />
      )}
      
      {renderResponse()}
      
      {response && (
        <Card className="mt-4 p-4">
          <h2 className="text-xl font-bold mb-2">Additional Info:</h2>
          <p>User ID: {response.user_id}</p>
          <p>Email: {response.email}</p>
          <p>Roll Number: {response.roll_number}</p>
          <p>Is Success: {response.is_success ? <CheckCircle2 className="inline text-green-500" /> : <XCircle className="inline text-red-500" />}</p>
          {response.file_valid !== undefined && (
            <>
              <p>File Valid: {response.file_valid ? <CheckCircle2 className="inline text-green-500" /> : <XCircle className="inline text-red-500" />}</p>
              {response.file_valid && (
                <>
                  <p>File MIME Type: {response.file_mime_type}</p>
                  <p>File Size: {response.file_size_kb} KB</p>
                </>
              )}
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default App;
