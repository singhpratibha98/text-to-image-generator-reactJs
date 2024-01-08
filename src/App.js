import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const API_TOKEN = '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'; 

  useEffect(() => {
    if (inputText) {
      axios
        .post(
          'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
          {
            inputs: inputText,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
            responseType: 'blob', // Set responseType to 'blob' to get binary data
          }
        )
        .then((response) => {
          const imageUrl = URL.createObjectURL(response.data);
          setImageURL(imageUrl);
        })
        .catch((error) => {
          console.error('Error generating image:', error);
          setImageURL('Error generating image:');
        });
    }
  }, [inputText]);

  return (
    <div style={{display:"flex", justifyContent:'center' , paddingTop:"50px",minHeight:"100vh", backgroundColor:"pink" , backgroundSize:"cover" }}>
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h1  >Image Generation App</h1>
        <form>
          <input style={{padding: "10px", color:"orange"}}
            type="text"
            placeholder="Enter text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        
        {imageURL && (
          <div >
            <img width={400} src={imageURL} alt="Generated" style={{marginTop:"40px"}} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;