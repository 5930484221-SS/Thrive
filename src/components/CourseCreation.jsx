import axios from 'axios';
import querystring from 'query-string';
import React, { Component } from 'react';
import CowBg from './CowBg';

import './courseCreate.css';

class CourseCreation extends Component {
  field_topic = React.createRef();
  field_description = React.createRef();
  field_descriptionProfile = React.createRef();
  field_duration = React.createRef();
  field_fee = React.createRef();
  field_location = React.createRef();
  field_subject = React.createRef();
  field_tuition = React.createRef();
  state = {};

  onSubmit = async e => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'http://localhost:8000/api/create_course',
      crossDomain: true,
      data: querystring.stringify({
        token: localStorage.getItem('token'),

        topic: this.field_topic.current.value,
        description: this.field_description.current.value,
        descriptionProfile: this.field_descriptionProfile.current.value,
        duration: this.field_duration.current.value,
        fee: this.field_fee.current.value,
        location: this.field_location.current.value,
        subject: this.field_subject.current.value,
        tuition: this.field_tuition.current.value
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(response => alert('ok'))
      .catch(error => alert('failed'));
  };

  render() {
    return (
      <div>
        <CowBg />
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <div className="form-group col-md-11">
                <button
                  type="button"
                  className="btn btn-outline-dark uploadPic"
                >
                  Upload Image
                </button>
              </div>
              <div className="form-group col-md-11">
                <label htmlFor="descriptionProfile" className="topic">
                  Profile
                </label>
                <textarea
                  className="form-control"
                  id="descriptionProfile"
                  rows="15"
                  placeholder="Describe your profile"
                  ref={this.field_descriptionProfile}
                />
              </div>
            </div>
            <div className="form-group col-md-6">
              <div className="form-group">
                <label htmlFor="topic" className="topic">
                  Topic
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="topic"
                  placeholder="Enter topic here"
                  ref={this.field_topic}
                />
              </div>
              <br />

              <span className="topic">
                {' '}
                <span className="text-orange text-extra">A</span>
                bout <span className="text-orange text-slim">Course</span>{' '}
              </span>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  className="form-control"
                  id="subject"
                  ref={this.field_subject}
                >
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Astronomy</option>
                  <option>Basic Science</option>
                  <option>Thai</option>
                  <option>Social</option>
                  <option>GAT-Thai</option>
                  <option>GAT-Eng</option>
                  <option>English</option>
                  <option>France</option>
                  <option>China</option>
                  <option>Japanese</option>
                  <option>Korea</option>
                  <option>Pat1</option>
                  <option>Pat2</option>
                  <option>Pat3</option>
                  <option>CU-TEP</option>
                  <option>TU GET</option>
                </select>
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Describe your course"
                  ref={this.field_description}
                />

                <label htmlFor="location">Location</label>
                <textarea
                  className="form-control"
                  id="location"
                  rows="3"
                  placeholder="ex: Sukhumvit Line, Siam"
                  ref={this.field_location}
                />

                <label htmlFor="duration">Duration</label>
                <textarea
                  className="form-control"
                  id="duration"
                  rows="3"
                  placeholder="Date and Time"
                  ref={this.field_duration}
                />
              </div>
              <br />

              <span className="topic"> Charge </span>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="tuition">Tuition/Hour</label>
                  <input
                    type="number"
                    className="form-control"
                    id="tuition"
                    step="10"
                    ref={this.field_tuition}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="fee">Joining fee</label>
                  <input
                    type="number"
                    className="form-control"
                    id="fee"
                    step="10"
                    ref={this.field_fee}
                  />
                </div>
              </div>
            </div>

            <input
              className="btn btn-warning btn-lg btn-block"
              type="submit"
              value="Create Course"
            />

            <br />
          </div>
        </form>
      </div>
    );
  }
}

export default CourseCreation;
