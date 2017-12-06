import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyCuL_qdTK_eRXaiWMvkWqA4Oa38NiLrJUM",
  authDomain: "chatterbox-42b7b.firebaseapp.com",
  databaseURL: "https://chatterbox-42b7b.firebaseio.com",
  projectId: "chatterbox-42b7b",
  storageBucket: "chatterbox-42b7b.appspot.com",
  messagingSenderId: "32516467065"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">

        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="sidebar-title">ChatterBox</h1>
            {/* New Room Button */}
          </div>
          <div className="sidebar-body">
            <p className="room-name">Room Name</p>
          </div>
        </div>

        {/* ChatSpace */}
        <div className="chatspace">
          <div class="chatspace-header">
            <h2>Current Room Name</h2>
          </div>
          <div class="message-list container">
            <div class="message-item">
              <p class="message-username">message.username
                <span class="message-timestamp">message.sentAt</span>
              </p>
              <p class="message-content">message.content</p>
            </div>
          </div>
          <div class="new-message-field">
            <input type="text" name="input" placeholder="Type your message here" class="message-box" style="width:500px;" />
              <button class="btn-new-message" type="button">Send message</button>
            </div>
        </div>

      </div>
    );
  }
}

export default App;
