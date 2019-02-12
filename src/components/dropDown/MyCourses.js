import React, { Component } from 'react'
import CowBg from '../CowBg';
import './myCourses.css';
import '../courseListing/CourseContainer.css';
import MyCoursesContainer from './MyCoursesContainer';
import books from '../../img/books.svg';
import teacher from '../../img/teacher.svg';

export default class MyCourses extends Component {
  constructor() {
    super()
    this.state = {
      courseByTutor: [],
    }
  }

  async componentDidMount() {
    const res = await fetch("http://127.0.0.1:8000/api/get_courses?tutor=beem")
    const data = await res.json()
    // console.log("json",JSON.stringify(data))
    console.log("obj", data)
    this.setState({courseByTutor:data.courses})


  }

  render() {
    console.log("state",this.state.courseByTutor)
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
            {this.state.courseByTutor.map((course, index)=>
              <MyCoursesContainer key={index} info={course} index={index} />
            )}
        </div>
        </div>
        <br />
        <br />
        <span class="display-4 topic" style={{ fontSize: "30px" }}> As a Learner</span>
        <img src={books} style={{ width: "40px", height: "auto" }} />
        <br />
        <br />
        {/* <MyCoursesContainer /> */}

      </div>
    )
  }
}