import React, { Component } from 'react'

export default class MyCoursesContainer extends Component {
  render() {
    return (
      <div>
        <div className="col-sm-6 col-md-4 col-lg-3">

                <div className="card-body" >
                <h5 className="card-title">topic</h5>
                <hr />
                <strong className="card-text">Instructor: </strong>
                <span className="card-text"> Mosttiee </span>
                <hr />
                <strong className="card-text limitP">Score: </strong>
                <i className="star icon"></i>
                <i className="half star icon"></i><br />
                </div>

                <div className="card-footer d-flex">
                <h5>subject</h5>
                <h5 className="ml-auto">฿tuition</h5>
                </div>
            </div>

      </div>
    )
  }
}
