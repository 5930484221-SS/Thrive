import React, { Component } from 'react'
import CowBg from '../CowBg';
import './myCourses.css';
import '../courseListing/CourseContainer.css';
import books from './books.svg';
import teacher from './teacher.svg';
import CourseContainer from '../courseListing/CourseContainer';
import MyCoursesContainer from './MyCoursesContainer';

export default class MyCourses extends Component {
   
  render() {
  
    return (
      <div>
        <CowBg />
        <div class="topic">
            <h1 class="display-4">My Courses</h1>
            <hr />
        </div>
            <span class="display-4 topic" style={{fontSize:"30px"}}> As a Tutor</span> 
            <img src={teacher} style={{width:"40px",height:"auto"}}/>
            <br />
            <MyCoursesContainer />
        
            <br />
            <br />
            <span class="display-4 topic" style={{fontSize:"30px"}}> As a Learner</span>
            <img src={books} style={{width:"40px",height:"auto"}}/>
            <MyCoursesContainer />
       



      </div>
    )
  }
}