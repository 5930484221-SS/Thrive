import React, { Component } from "react";

export default class MyCourseContentError extends Component {
  constructor() {
    super();
  }
  render() {
    if (this.props.children.length === 0) {
      return (
        <div className="text-center">
          You didn't have any courses. Please creating/reserving a new one
        </div>
      );
    }
    return this.props.children;
  }
}
