import React, { Component } from 'react';
import './CourseContainer.css';

class CourseContainer extends Component {
  render() {
    const {
      topic,
      description,
      descriptionProfile,
      subject,
      duration,
      location,
      tuition,
      fee,
      img
    } = this.props.info;

    const index = this.props.index;

    return (
      <div className="col-sm-6 col-md-4 col-lg-3 ">
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
                    {' '}
                    Mosttiee{' '}
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
                  <button className="btn btn-secondary">Reserve</button>
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
            <span className="card-text"> Mosttiee </span>
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
