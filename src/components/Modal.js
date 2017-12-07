import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {
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
          {this.props.children}

          <div className="footer">
            <button onClick={this.props.onCancel}>Cancel</button>
            <button onClick={this.props.onCreate}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.PropTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;
