import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import RoomModal from './components/Modals/RoomModal';
import MessageList from './components/MessageList';
import User from './components/User';

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
      modalIsOpen: false,
      activeRoom: { name: 'JavaScript', key: "1" }
    };

    this.openRoom = this.openRoom.bind(this);
  }

  toggleModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  openRoom(e, room)  {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">

          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-header">
              <h1 className="sidebar-title">ChatterBox</h1>
              {/* SignIn/SignOut Button */}
              <User firebase={firebase} />
              {/* New Room Button */}
              <button type="button" className="new-room" onClick={this.toggleModal}>New Room</button>
              <RoomModal show={this.state.modalIsOpen}
                onCancel={this.toggleModal}
                firebase={firebase} />
            </div>
            <div className="sidebar-body">
              {/* Room List */}
              <RoomList firebase={firebase} openRoom={this.openRoom} />
            </div>
          </div>

          {/* ChatSpace */}
          <div className="chatspace">
            <div className="chatspace-header">
              <h2>{ this.state.activeRoom.name }</h2>
            </div>

            {/* Message List */}
            <MessageList firebase={firebase}
              activeRoomId={this.state.activeRoom.key} />

            {/* New Message */}
            <div className="new-message-field">
              <input type="text" name="input" placeholder="Type your message here" />
              <button className="btn-new-message" type="button">Send message</button>
            </div>
          </div>

      </div>
    );
  }
}

export default App;
