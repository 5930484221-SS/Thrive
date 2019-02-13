import React, { Component } from 'react'
import CowBg from '../CowBg';
import './myCourses.css';
import '../courseListing/CourseContainer.css';
import MyCoursesContainer from './MyCoursesContainer';
import books from '../../img/books.svg';
import teacher from '../../img/teacher.svg';
import Loader from "../loader/Loader";

export default class MyCourses extends Component {
  constructor() {
    super();
    this.state = {
      coursesAsTutor: [],
      coursesAsStudent: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({isLoading:true})
    this.fetchTutorCourses();
    // this.fetchStudentCourses();
  }

  async fetchTutorCourses() {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/get_courses?tutor=" +
          window.localStorage.username
      );
      const courses = await response.json();
      this.setState({coursesAsTutor:courses.courses,isLoading:false})
    } catch (error) {
      console.log(error);
    }
  }

  async fetchStudentCourses() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {coursesAsTutor,isLoading} = this.state;
    return (
      <div>
        <CowBg />
        <div className="topic">
          <h1 className="display-4">My Courses</h1>
          <hr />
        </div>

        <span className="display-4 topic" style={{ fontSize: "30px" }}> As a Tutor</span>
        <img src={teacher} style={{ width: "40px", height: "auto" }} />
        <br />
        <br />
        <div className="row">
          <div className="card-deck">
            {coursesAsTutor.map((course, index)=>
              <MyCoursesContainer key={index} info={course} index={index} />
            )}
        </div>
        </div>

        <br />
        <br />
        <span className="display-4 topic" style={{ fontSize: "30px" }}> As a Learner</span>
        <img src={books} style={{ width: "40px", height: "auto" }} />
        <br />
        <br />
        {isLoading ? Loader : null}
      </div>
    )
  }
}