import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList/RoomList';
import Modal from './components/Modal';

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

  createRoom = () => {
    this.setState({ isOpen: !this.state.isOpen });
    //firebase create new room
  }



  render() {
    return (
      <div className="App">
        <div className="css-table">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <h1 className="sidebar-title">ChatterBox</h1>
              {/* New Room Button */}
              <button type="button" className="new-room" onClick={this.toggleModal}>New Room</button>
              <Modal show={this.state.isOpen}
                onCancel={this.toggleModal}
                onCreate={this.createRoom}>
                <div className="modal-header">
                  <h2>Create a new room</h2>
                </div>
                <input type="text" placeholder="Enter a room name" />
              </Modal>
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
