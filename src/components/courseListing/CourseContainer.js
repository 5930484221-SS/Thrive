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
    return (
      // <div className="card-deck col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 py-3">
      <div className="card">
        <img className="card-img-top" src={img} alt="unable to load file" />

        <div className="card-body">
          <h5 className="card-title">{topic}</h5>
          <hr />
          <p className="card-text limitP">{description}</p>
          <strong className="card-text">Instructor: </strong>
          <p className="card-text limitP">{descriptionProfile}</p>
          <strong className="card-text">Duration:</strong>
          <p className="card-text">{duration}</p>
          <strong className="card-text">location: </strong>
          <p className="card-text">{location}</p>
          <strong className="card-text">Fee: </strong>
          <p className="card-text">฿{fee}</p>
        </div>

        <div className="card-footer d-flex">
          <h5>{subject}</h5>
          <h5 className="ml-auto">฿{tuition}</h5>
        </div>
      </div>
      // </div>
    );
  }
}

export default CourseContainer;
