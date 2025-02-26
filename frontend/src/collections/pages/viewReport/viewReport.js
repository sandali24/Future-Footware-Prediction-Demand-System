

// src/collections/pages/viewReport/ViewReport.js

import React, { useState } from 'react';
import axios from 'axios'; // Axios for making HTTP requests

import { Sidebar } from '../../sidebar/sidebar'; // Sidebar component (not shown in this snippet)
import UsernameTypewriter from '../../components/UsernameTypewriter'; // UsernameTypewriter component (not shown in this snippet)

function ViewReport() {

  const [file, setFile] = useState(null); // State to hold the uploaded file
  const [predictions, setPredictions] = useState([]); // State to store prediction results

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file); // Append the uploaded file to the form data

    try {
      // Make a POST request to your backend API endpoint (replace with your actual endpoint)
      const response = await axios.post('/api/predict', formData);
      setPredictions(response.data.predictions); // Update state with prediction results
    } catch (error) {
      console.error('Error fetching predictions:', error);
    }
  };

  const backgroundimg = new URL("../Shoe_Images/footwearbg.jpg", import.meta.url);
  const backgroundimg2 = new URL("../Shoe_Images/bgimg.jpg", import.meta.url);

  return (
    <div className="App">
      <img 
        src={backgroundimg}
        alt="Background" 
        style={{ 
          position: 'fixed', 
          width: '20%', 
          height: '100vh', 
          objectFit: 'cover', 
          zIndex: -1
        }} 
      />

      <div 
        style={{ 
          position: 'fixed',
          width: '90%', 
          height: '100vh', 
          marginLeft: '20%',
          zIndex: -1,
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 100%, transparent 100%), url(${backgroundimg2})`,
          backgroundSize: 'cover',
          opacity: '0.5'
        }} 
      ></div>
      <Sidebar />
      <div className="content">
      <UsernameTypewriter style={{ position: 'fixed', top: '5px', right: '5px', color: 'yellow', fontSize: '16px', fontWeight: 'bold' }} />
        <div className="username-typewriter">
        </div>
        <h1 style={{ textAlign: 'center' }}>Coming Soon!</h1>
      </div>
    </div>
  );
};

export default ViewReport;