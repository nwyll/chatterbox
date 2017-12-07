import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ''
    };

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

  createRoom = () => {
    this.roomsRef.push({
      name: this.state.newRoomName
    });
  }

  render() {
    return (
      <div className="room-list">
        {
          this.state.rooms.map( (room) =>
            <p key={room.key} className="room-name">{ room.name }</p>
          )
        }

        <div className="room-form">
          {/* <h3>Create a new room:</h3> */}
          <form>
            <label>
              Create a new room:
              <input type="text" placeholder="Enter room name"
                value={this.state.newRoomName}
                onChange={this.newRoomName} />
            </label><br/><br/>
            <button type="submit" onClick={this.createRoom}>Create Room</button>
          </form>
        </div>
      </div>
    );
  }
}

export default RoomList;
