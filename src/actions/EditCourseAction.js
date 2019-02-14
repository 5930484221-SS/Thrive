import {  COURSE_SET } from "./types";

export const EditCourseAction = course => {
    return {
      type: COURSE_SET,
      payload: course
    };
  };