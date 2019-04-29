import React, { Component } from "react";
import "../courseListing/CourseContainer.css";
import swal from "sweetalert";
import loaderIcon from "../../img/loaderIcon.gif";
import ipAddress from "../../configIpAddress"

import axios from "axios";
import querystring from "query-string";

class CourseContainer extends Component {
  constructor() {
    super();
    this.state = {
      sendingRequest: false,
      courseList: []
    };
  }

  async componentDidMount() {
    try {
      const response = await axios({
        method: "GET",
        crossDomain: true,
        url: ipAddress + "/api/get_courses",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
          // "Access-Control-Allow-Origin": "*"
        }
      });
      this.setState({ courseList: response.data.courses, isLoading: false });
    } catch (error) {
      console.log("fetch fails, please refresh the page");
    }
  }

  onDelete = async () => {
    try {
      swal({
        text: "Deleting this course...",
        icon: loaderIcon,
        buttons: false
      });
      await axios({
        method: "POST",
        url: ipAddress + "/api/delete_course", //delete_course(request) on database
        crossDomain: true,
        data: querystring.stringify({
          token: window.localStorage.token,
          id: this.props.info._id
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      await swal({
        text: "Delete successfully",
        icon: "success"
      });
    } catch (error) {
      swal.stopLoading();
      swal.close();
      console.log(error);
      if (error.response.status === 403) {
        swal({
          text: error.response.data,
          icon: "error"
        });
      } else {
        swal({
          text: error.response.status + " " + error.response.statusText,
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
    const { courseList } = this.state;

    const index = this.props.index;

    return (
      <div className="col-sm-6 col-md-4 col-lg-3 px-4">
        <div
          className="card shadow mb-5"
          data-toggle="modal"
          data-target={`#modal${index}`.toLowerCase()}
        >
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

        {/* course container modal */}
        <div
          className="modal fade"
          id={`modal${index}`.toLowerCase()}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title pt-3 pb-3"> {topic} </h5>
                <button className="close" data-dismiss="modal">
                  &times;
                </button>
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
                <button
                  type="button"
                  className="btn btn-orange"
                  data-toggle="modal"
                  data-target="#rating"
                  data-dismiss="modal"
                >
                  See more review
                </button>
                <button
                  data-dismiss="modal"
                  className="btn btn-danger"
                  onClick={this.onDelete}
                >
                  Delete this course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseContainer;
