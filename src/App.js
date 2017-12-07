import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList/RoomList';
import RoomModal from './components/Modals/RoomModal';

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
  constructor(props){
    super(props);

    this.state = {
      isOpen: false
    };
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
modalStyle
  render() {
    return (
      <div className="App">
        <div className="wrap">

          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <h1 className="sidebar-title">ChatterBox</h1>
              {/* New Room Button */}
              <button type="button" className="new-room" onClick={this.toggleModal}>New Room</button>
              <RoomModal show={this.state.isOpen}
                onCancel={this.toggleModal}
                firebase={firebase} />
            </div>
            <div className="sidebar-body">
              {/* Room List - pass firebase in props */}
              <RoomList firebase={firebase}/>
            </div>
          </div>

          {/* ChatSpace */}
          <div className="chatspace">
            <div className="chatspace-header">
              <h2>Current Room Name</h2>
            </div>
            <div className="message-list container">
              {/* Messages */}
              <div className="message-body">
                <p className="username">message.username
                  <span className="timestamp">   message.sentAt</span>
                </p>
                <p className="content">message.content</p>
              </div>
              {/* Messages */}
            </div>
            <div className="new-message-field">
              <input type="text" name="input" placeholder="Type your message here" />
              <button className="btn-new-message" type="button">Send message</button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
