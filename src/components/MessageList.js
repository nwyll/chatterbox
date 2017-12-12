import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentWillReceiveProps(nextProps) {
// console.log(nextProps.activeRoomId);
    this.setState({ messages: []});
    this.getRoomMessages(nextProps.activeRoomId);
  }

  getRoomMessages(activeRoomId) {
    const roomMessages = this.messagesRef.orderByChild("roomId").equalTo(activeRoomId);
    roomMessages.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message )});
// console.log(this.state.messages);
    });
// console.log(this.state.messages);
  }

    render () {
    return(
      <div className="message-list container">
        {
          this.state.messages.map((message, index) =>
            <div key={index} className="message-body">
              <p className="username">{message.username}
                <span className="timestamp">{message.sentAt}</span>
              </p>
              <p className="content">{message.content}</p>
            </div>
          )
        }
      </div>
    );
  }
}

export default MessageList
