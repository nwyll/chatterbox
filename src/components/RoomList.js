import React, { Component } from 'react';

class RoomList extend Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

}

export default RoomList;
