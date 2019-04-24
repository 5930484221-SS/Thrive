import React, { Component } from 'react';
import '../courseListing/CourseContainer.css';

class UserContainer extends Component {
  constructor(props) {
    super(props);
  }

  async deleteUser(user) {
    // call deleteUser API

    this.props.refresh();
  }

  async grantAdmin(user) {
    // call grantAdmin API

    this.props.refresh();
  }

  render() {
    const {
      username,
      firstName,
      lastName,
      nickname,
      displayName,
      address,
      phoneNumber,
      email,
      contact,
      isAdmin
    } = this.props.info;

    const { index } = this.props;
    console.log('rerender');
    return (
      <div>
        <div>
          <span className="h6 mb-1">{displayName}</span>
          <button
            data-toggle="modal"
            data-target={`#userModal${index}`.toLowerCase()}
            className="btn btn-secondary float-right"
          >
            More
          </button>
        </div>

        <small>username: {username}</small>

        <div className="modal" id={`userModal${index}`.toLowerCase()}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title pt-3 pb-3"> {username} </h5>
                <button data-dismiss="modal" className="close">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-6 modal-text">
                    <strong>First Name: </strong>
                    {firstName}
                  </div>
                  <div className="col-sm-6">
                    <strong>Last Name: </strong>
                    {lastName}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 modal-text">
                    <strong>Display Name: </strong>
                    {displayName}
                  </div>
                  <div className="col-sm-6">
                    <strong>Nick Name: </strong>
                    {nickname}
                  </div>
                </div>
                <div className="modal-text">
                  <strong>Address: </strong>
                  {address}
                </div>
                <div className="modal-text">
                  <strong>Phone Number: </strong>
                  {phoneNumber}
                </div>
                <div className="modal-text">
                  <strong>Email: </strong>
                  {email}
                </div>
                <div className="modal-text">
                  <strong>Contact: </strong>
                  {contact}
                </div>
                <br />

                <div className="modal-footer">
                  {!isAdmin && (
                    <button className="btn btn-primary">Grant Admin</button>
                  )}

                  <button className="btn btn-danger">Delete User</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserContainer;
