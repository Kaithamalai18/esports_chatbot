import React, { useState } from 'react';
import axios from 'axios';
import './ChatInterface.css';

function ChatInterface() {
  const [prompt, setPrompt] = useState(''); // Input state
  const [response, setResponse] = useState(''); // Assistant's response
  const [loading, setLoading] = useState(false); // Loader state

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!prompt) {
      alert("Please enter a prompt!");
      return;
    }

    setLoading(true);
    setResponse(''); // Clear previous response

    try {
      // Making the API request with the correct headers
      const res = await axios.post(
        'https://5wbwlavbhh.execute-api.ap-south-1.amazonaws.com/test', // Your API invoke URL
        {
          prompt: prompt, // Sending the prompt to the Lambda function
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setResponse(res.data.response); // Display the response
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error: Could not get response from the assistant');
    }
    
    setLoading(false);
    setPrompt(''); // Clear input after submit
  };

  return (
    <div className="chat-container">
      <h1>VALORANT Digital Assistant</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your question..."
          className="chat-input"
        />
        <button type="submit" className="chat-submit">
          Send
        </button>
      </form>
      <div className="response-container">
        {loading ? <p>Loading...</p> : <p>{response}</p>}
      </div>
    </div>
  );
}

export default ChatInterface;
