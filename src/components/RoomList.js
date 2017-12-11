import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
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

  render() {
    return (
      <div className="room-list">
        {
          this.state.rooms.map( (room) =>
            <p key={room.key}>
              <a className="room-name" onClick={(e) => this.props.openRoom(e, room)}>{ room.name }</a>
            </p>
          )
        }
      </div>
    );
  }
}

export default RoomList;
