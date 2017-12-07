import React, { Component } from 'react';
import propTypes from 'prop-types';

class RoomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };

    this.newRoomName = this.newRoomName.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({rooms: this.state.rooms.concat( room )});
    });
  }

  newRoomName =  (event) => {
    this.setState({ newRoomName: event.target.value});
  }

  createRoom = (event) => {
    event.preventDefault();
    this.roomsRef.push({
      name: this.state.newRoomName
    });
    this.props.onCancel();
  }
  render() {
    // Renders nothing if the show prop is false
    if(!this.props.show) {
      return null;
    }

    //Gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      padding: 50
    };

    //Modal window
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 300,
      minHeight: 200,
      margin: '0 auto',
      padding: 30
    };

    return(
      <div style={backdropStyle}>
        <div style={modalStyle}>
          <div className="modal-header">
            <h2>Create a new room</h2>
          </div>
          <form>
            <input type="text" value={this.state.newRoomName} placeholder="Enter a room name"
              onChange={this.newRoomName} />
          </form>
          <div className="footer">
            <button onClick={this.props.onCancel}>Cancel</button>
            <button onClick={this.createRoom}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

RoomModal.propTypes = {
  onCancel: propTypes.func.isRequired,
  show: propTypes.bool,
  children: propTypes.node
};

export default RoomModal;
