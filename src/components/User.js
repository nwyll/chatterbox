import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);

    this.state = {
      currentUser: ''
    }

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });

    var user = this.props.firebase.auth().currentUser;
    this.setState(() => {
      return { currentUser: user }
    });
  }

  handleSignOut() {
    this.props.firebase.auth().signOut().then(function() {
      alert('Bye! See you next time on Chatterbox.')
    });

    this.setState(() => {
      return { currentUser: '' }
    });
  }

  render() {
    let buttonElement = (<button onClick={this.handleSignIn}>Sign In</button>);
    if(this.state.currentUser) {
      buttonElement = (
        <div>Hi, {this.state.currentUser.displayName}
          <button onClick={this.handleSignOut}>Sign Out</button>
        </div>
      );
    }

    return (
      <div>
        {buttonElement}
      </div>
    );
  }
}

export default User;