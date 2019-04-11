import React, { Component } from 'react';
import '../courseListing/CourseContainer.css';

class UserContainer extends Component { //mock-up
  render() {
    const {
      username
      //img
    } = "jenny"//= this.props.info;

    const index = "0"//this.props.index;

    return (
        <div className="col-sm-6 col-md-4 col-lg-3 px-4">
        <div
          className="card shadow mb-5"
          data-toggle="modal"
          data-target={`#modal${index}`.toLowerCase()}
        >
          <div className="modal" id={`modal${index}`.toLowerCase()}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title pt-3 pb-3"> {"Jenny"} </h5>
                  <button className="close">&times;</button>
                </div>

                <div className="modal-body">
                  <p className="modal-text"> {"description"} </p>
                  <hr />
                  <strong className="modal-text">Instructor: </strong>

                  <a className="modal-text" href="#">
                    {"tutor_display"}
                  </a>
                  <p className="modal-text"> {"descriptionProfile"} </p>
                  <hr />
                  <strong className="modal-text">location: </strong>
                  <span className="modal-text"> {"location"}</span>
                  <br />
                  <strong className="modal-text">Duration:</strong>
                  <span className="modal-text"> {"duration"} </span>
                  <br />

                  <strong className="modal-text">Fee: </strong>
                  <span className="modal-text">฿{"fee"}</span>
                </div>

                <div className="modal-footer">

                  <button className="btn btn-secondary">Delete</button>
                </div>
              </div>
            </div>
          </div>

          <img
            className="card-img-top img-fluid"
            src={require('../../img/user_pic.jpg')} //{img}
            alt="unable to load file"
          />

          <div className="card-body course-card-body">
            <h5 className="card-title">{"User ID : 001"}</h5>
            <hr />
            <strong className="card-text">Username: </strong>
            <span className="card-text"> {"Jenny"} </span>
            <strong className="card-text">Role: </strong>
            <span className="card-text"> {"Tutor"} </span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserContainer;
