import React, { Component } from "react";
import "./CourseContainer.css";

import axios from "axios";
import querystring from "query-string";

class CourseContainer extends Component {
  constructor() {
    super();
    this.state = {
      sendingRequest: false
    };
  }

  onRequest = async () => {
    await this.setState({ sendingRequest: true });
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/create_reserve",
      crossDomain: true,
      data: querystring.stringify({
        token: window.localStorage.token,
        tutor: this.props.info.tutor,
        courseId: this.props.info._id
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(this.setState({ sendingRequest: true }))
      .catch(error => {
        // alert("Failed to Delete the course\n" + error);
        console.log(error.response);
      });
  };

  render() {
    const {
      topic,
      description,
      descriptionProfile,
      subject,
      duration,
      location,
      tuition,
      tutor_display,
      fee,
      img
    } = this.props.info;

    const index = this.props.index;
    console.log(this.state);
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 px-4">
        {this.state.sendingRequest ? (
          <p>ygaeuto;ityoerihzao;ghreruo;i</p>
        ) : null}
        <div>
          <div
            className="card shadow mb-5"
            data-toggle="modal"
            data-target={`#modal${index}`.toLowerCase()}
          >
            <div className="modal" id={`modal${index}`.toLowerCase()}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title pt-3 pb-3"> {topic} </h5>
                    <button className="close">&times;</button>
                  </div>

                  <div className="modal-body">
                    <p className="modal-text"> {description} </p>
                    <hr />
                    <strong className="modal-text">Instructor: </strong>

                    <a className="modal-text" href="#">
                      {tutor_display}
                    </a>
                    <p className="modal-text"> {descriptionProfile} </p>
                    <hr />
                    <strong className="modal-text">location: </strong>
                    <span className="modal-text"> {location}</span>
                    <br />
                    <strong className="modal-text">Duration:</strong>
                    <span className="modal-text"> {duration} </span>
                    <br />

                    <strong className="modal-text">Fee: </strong>
                    <span className="modal-text">฿{fee}</span>
                  </div>

                  <div className="modal-footer">
                    <button className="btn btn-orange">See more review</button>

                    <button
                      className="btn btn-secondary"
                      onClick={this.onRequest}
                    >
                      Request reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <img
              className="card-img-top img-fluid"
              src={img}
              alt="unable to load file"
            />

            <div className="card-body course-card-body">
              <h5 className="card-title">{topic}</h5>
              <hr />
              <strong className="card-text">Instructor: </strong>
              <span className="card-text"> {tutor_display} </span>
              <hr />
              <strong className="card-text limitP">Score: </strong>

              <i className="star icon" />
              <i className="half star icon" />
              <br />
            </div>

            <div className="card-footer d-flex">
              <h5>{subject}</h5>
              <h5 className="ml-auto">฿{tuition}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseContainer;
