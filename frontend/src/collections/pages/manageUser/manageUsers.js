

import React, {  useContext,useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './manageUsers.css';
import '../../../App.css';
import Table from './materialtable';
import { Sidebar } from '../../sidebar/sidebar';
import UsernameTypewriter from '../../components/UsernameTypewriter'; 
import io from 'socket.io-client'; 
import SocketContext from './SocketContext';

function ManageUsers() {
  const col = [
    { field: "id", title: " ID" },
    { field: "fName", title: "First Name" },
    { field: "lName", title: "Last Name" },
    { field: "email", title: "Email" },
    { field: "username", title: "User Name" },
    { field: "status", title: "Account Status" },
    { field: "role", title: "Role" },
  ];

 
  const [newMessage, setNewMessage] = useState('');

  const token = localStorage.getItem('token');
  const { id } = jwtDecode(token);

  const socket = io.connect('http://localhost:8080');

  // useEffect(() => {
  //   socket.on("recieveMessage", (data) => {
  //     console.log(data);
  //     alert(data.message);  // coming back from BE and alerting to all the users but the sender
  //   });

  //   // Clean up the Socket.IO connection when the component unmounts
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket]);

  // const socket = useContext(SocketContext);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("recieveMessage", (data) => {
  //       console.log(data);
  //       alert(data.message);  // Alerting to all the users but the sender
  //     });

  //     // Clean up the event listener when the component unmounts
  //     return () => {
  //       socket.off("recieveMessage");
  //     };
  //   }
  // }, [socket]);


  const handleSendMessage = async () => {
    try {
      // Check if the newMessage is empty
      if (newMessage.trim() === '') {
        // Show an alert or handle the empty message case accordingly
        alert('Please enter a message before sending.');
        return;
      }

      // Emit a message event to the Socket.IO server
      socket.emit('sendMessage', { message: newMessage, senderId: id });

      // Save the message to the database
      const response = await fetch(`http://localhost:8080/user/request/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage, senderId: id }),
      });

      if (response.ok) {
        console.log('Message sent and saved successfully');
       
        alert('Message sent and saved successfully');
      } else {
        console.error('Failed to send and save message');
     
        alert('Failed to send and save message');
      }
    } catch (error) {
      console.log('Error sending and saving message:', error);
      
      alert('Error sending and saving message');
    } finally {
      // Reset the message input
      setNewMessage('');
    }
  };

  const backgroundimg = new URL("../Shoe_Images/footwearbg.jpg", import.meta.url);
  const backgroundimg2 = new URL("../Shoe_Images/bgimg.jpg", import.meta.url);
  return (

    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
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
      <div className="form-container">
        <div className="writer">
          <UsernameTypewriter />
        </div>
        
        {/* New message area */}
        <div className="new-message-container">
          <textarea
            className='new-message-textarea'
            placeholder='Type a message to send all the users ...'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className='send-message-button' onClick={handleSendMessage}>
            Send Message
          </button>
        </div>

        <div className="fadein">
        <Table col={col} />
      </div>
      </div>
    </div>
  );
}

export { ManageUsers };
