import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.getRoomMessages = this.getRoomMessages.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
// console.log(nextProps.activeRoomId);
    this.setState(() => {
      return{ messages: [] }
    });
    this.getRoomMessages(nextProps.activeRoomId);
  }

  getRoomMessages(activeRoomId) {
    const roomMessages = this.messagesRef.orderByChild("roomId").equalTo(activeRoomId);

    roomMessages.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState(() => {
        return { messages: this.state.messages.concat( message ) }
      });
// console.log(this.state.messages);
    });
// console.log(this.state.messages);
  }

  createMessage(e) {
    e.preventDefault();
    const newMessage = e.target.elements.newMessage.value;

    if (newMessage) {
      this.messaegesRef.push({
        username: this.props.username,
        content: newMessage,
        sentAt: this.props.firebase.ServerValue.TIMESTAMP,
        roomId: this.props.activeRoomId
      });
      e.target.elements.newMessage.value = '';

      //call getRoomMessages again?
    }
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
        {/* New Message */}
        <form onSubmit={this.createMessage}>
          <input type="text" name="newMessage" placeholder="Type your message here" />
          <button type="submit">Send message</button>
        </form>
      </div>
    );
  }
}

export default MessageList
