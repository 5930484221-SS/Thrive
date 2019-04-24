import React, { Component } from "react";
import "./CourseContainer.css";
import swal from "sweetalert";
import loaderIcon from "../../img/loaderIcon.gif";

import axios from "axios";
import querystring from "query-string";

class CourseContainer extends Component {
  onRequest = async () => {
    try {
      swal({
        text: "Sending the request to Tutor...",
        icon: loaderIcon,
        buttons: false
      });
      await axios({
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
      });
      await swal({
        text:
          "Your request is sent successfully to the tutor.\n You can check the request/response in My Course page",
        icon: "success"
      });
    } catch (error) {
      swal.stopLoading();
      swal.close();
      if (error.response.status === 403) {
        swal({
          text: error.response.data,
          icon: "error"
        });
      } else {
        swal({
          text: error.response.status+" " + error.response.statusText,
          icon: "error"
        });
      }
    }
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
    );
  }
}

export default CourseContainer;
