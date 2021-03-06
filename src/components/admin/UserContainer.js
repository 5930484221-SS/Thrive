import React, { Component } from 'react';
import axios from 'axios';
import querystring from 'query-string';
import swal from 'sweetalert';
import loaderIcon from '../../img/loaderIcon.gif';
import '../courseListing/CourseContainer.css';
import ipAddress from "../../configIpAddress"

class UserContainer extends Component {
  constructor(props) {
    super(props);
  }

  async deleteUser() {
    // call deleteUser API
    try {
      swal({
        text: "Deleteing...",
        icon: loaderIcon,
        buttons: false
      });
      await axios({
        method: 'POST',
        url: ipAddress + '/api/delete_user',
        crossDomain: true,
        data: querystring.stringify({
          token: localStorage.getItem('token'),
          username: this.props.info.username
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      await swal({
        text: "Delete Successful!",
        icon: "success"
      });
      this.props.refresh();
    } catch (ex) {
      swal.stopLoading();
      swal.close();
      console.log(ex);
    }
  }

  async grantAdmin() {
    // call grantAdmin API
    try {
      swal({
        text: "Granting...",
        icon: loaderIcon,
        buttons: false
      });
      await axios({
        method: 'POST',
        url: ipAddress + '/api/add_admin',
        crossDomain: true,
        data: querystring.stringify({
          token: localStorage.getItem('token'),
          username: this.props.info.username
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      await swal({
        text: "Grant Successful!",
        icon: "success"
      });
      this.props.refresh();
    } catch (ex) {
      swal.stopLoading();
      swal.close();
      console.log(ex);
    }
  }

  render() {
    const {
      index,
      refresh,
      info: {
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
      }
    } = this.props;

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
                    <button
                      data-dismiss="modal"
                      onClick={() => this.grantAdmin(username, refresh)}
                      className="btn btn-primary"
                    >
                      Grant Admin
                    </button>
                  )}

                  <button
                    data-dismiss="modal"
                    onClick={() => this.deleteUser(username, refresh)}
                    className="btn btn-danger"
                  >
                    Delete User
                  </button>
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
