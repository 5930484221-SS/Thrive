import React, { Component } from "react";
import {
  TeachingCourseContainer,
  LearningCourseContainer
} from "./MyCourseContainer";
import MyCourseContentError from "./MyCourseContentError";
import Noti from "./Notifications";
import Loader from "../loader/Loader";

import CowBg from "../CowBg";
import "./myCourses.css";
import "../courseListing/CourseContainer.css";
import books from "../../img/books.svg";
import teacher from "../../img/teacher.svg";
import noti from "../../img/notification.svg";
import edu from "../../img/education.svg";

const TUTOR = "TUTOR";
const LEARNER = "LEARNER";
const NOTIFICATION = "NOTIFICATION";

class MyCourses extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      currentSubPage: TUTOR
    };
  }

  onSubNavClick = async event => {
    const currentSubPage = event.target.id;
    await this.setState({ currentSubPage: null });
    await this.setState({ currentSubPage });
  };

  renderContent() {
    const currentSubPage = this.state.currentSubPage;
    if (currentSubPage === TUTOR) {
      return <TeachingCourseContainer />;
    } else if (currentSubPage === LEARNER) {
      return <LearningCourseContainer />;
    } else if (currentSubPage === NOTIFICATION) {
      return <Noti />;
    } else {
      return [];
    }
  }

  render() {
    const { isLoading, currentSubPage } = this.state;
    return (
      <div>
        <CowBg />
        <div className="topic">
          <h1 className="display-4">
            {" "}
            <b>My Courses </b>
          </h1>
          <hr />
        </div>

        {/* sub navbar */}
        <div className="container mycoursePage">
          <div className="row text-center">
            <div className="col border-right">
              <a className="display-4 topic btn">
                {currentSubPage === TUTOR ? (
                  <span className="underline-on-hover">As a tutor</span>
                ) : (
                  <span id={TUTOR} onClick={this.onSubNavClick}>
                    As a tutor
                  </span>
                )}
              </a>
              <img src={edu} style={{ width: "40px", height: "auto" }} />
            </div>
            <div className="col border-right">
              <a className="display-4 topic btn">
                {currentSubPage === LEARNER ? (
                  <span className="underline-on-hover">As a learner</span>
                ) : (
                  <span id={LEARNER} onClick={this.onSubNavClick}>
                    As a learner
                  </span>
                )}
              </a>
              <img src={books} style={{ width: "40px", height: "auto" }} />
            </div>
            <div className="col">
              <a className="display-4 topic btn">
                {currentSubPage === NOTIFICATION ? (
                  <span className="underline-on-hover">Request/Response</span>
                ) : (
                  <span id={NOTIFICATION} onClick={this.onSubNavClick}>
                    Request/Response
                  </span>
                )}
              </a>
              {/* <img src={noti} style={{ width: "40px", height: "auto" }} /> */}
            </div>
          </div>
          <hr />

          {/* Content */}
          <div className="container">{this.renderContent()}</div>
        </div>

        {isLoading ? Loader : null}
      </div>
    );
  }
}

export default MyCourses;
