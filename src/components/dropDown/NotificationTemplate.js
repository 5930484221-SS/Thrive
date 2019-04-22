import React from "react";
import clock from "../../img/clock.svg";

import axios from "axios";
import querystring from "query-string";

export const NOTIFICATION_TYPE = {
  wr: "wr",
  wp: "wp",
  d: "d",
  s: "s"
};

const onResponse = (event, _id) => {
  axios({
    method: "POST",
    url: "http://127.0.0.1:8000/api/set_flag",
    crossDomain: true,
    data: querystring.stringify({
      token: window.localStorage.token,
      id: _id,
      flag: event.target.name
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(console.log)
    .catch(error => {
      console.log(error);
    });
};

export const TutorNotification = props => {
  const { learner, flag, course, _id } = props.info;
  const { img, topic } = course[0];
  switch (flag) {
    case NOTIFICATION_TYPE.wr:
      return (
        <div>
          <table style={{ marginBottom: "10px" }}>
            <tbody>
              <tr className="h5">
                <td rowSpan="2" style={{ width: "10%" }}>
                  <div
                    className="circleBase type1"
                    style={{ margin: "auto", marginRight: "20px" }}
                  >
                    <img src={course[0].img} />
                  </div>
                </td>
                <td style={{ textAlign: "left" }}>
                  {"Learner "}
                  <span className="text-success font-weight-bold">
                    {learner + " "}
                  </span>
                  had requested your
                  <span className="text-info font-weight-bold">
                    {" " + course[0].topic + " "}
                  </span>
                  course
                </td>
                <td className="text-secondary text-right">
                  <img src={clock} className="timeClk" />
                  _time_
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button
                    className="btn btn btn-outline-success btn-lg"
                    style={{ margin: "20px 40px 20px 10px", width: "30%" }}
                    onClick={event => onResponse(event, _id)}
                    name={NOTIFICATION_TYPE.wp}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn btn-outline-danger btn-lg"
                    style={{ margin: "20px 40px 20px 10px", width: "30%" }}
                    onClick={event => onResponse(event, _id)}
                    name={NOTIFICATION_TYPE.d}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
      break;

    case NOTIFICATION_TYPE.wp:
      return (
        <div>
          <table style={{ marginBottom: "10px" }}>
            <tbody>
              <tr className="h5">
                <td rowSpan="2" style={{ width: "10%" }}>
                  <div
                    className="circleBase type1"
                    style={{
                      margin: "auto",
                      marginBottom: "10px",
                      marginRight: "20px"
                    }}
                  >
                    <img src={img} />
                  </div>
                </td>
                <td style={{ textAlign: "left" }}>
                  You had accepted request the
                  <span className="text-info font-weight-bold">
                    {" " + topic}
                  </span>
                  {" course from Learner "}
                  <span className="text-success font-weight-bold">
                    {learner}
                  </span>
                </td>
                <td className="text-secondary text-right">
                  <img src={clock} className="timeClk" />
                  _time_
                </td>
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );
      break;

    case NOTIFICATION_TYPE.d:
      return (
        <div>
          <table style={{ marginBottom: "10px" }}>
            <tbody>
              <tr className="h5">
                <td rowSpan="2" style={{ width: "10%" }}>
                  <div
                    className="circleBase type1"
                    style={{
                      margin: "auto",
                      marginBottom: "10px",
                      marginRight: "20px"
                    }}
                  >
                    <img src={img} />
                  </div>
                </td>
                <td style={{ textAlign: "left" }}>
                  You had declined request the
                  <span className="text-info font-weight-bold">
                    {" " + topic}
                  </span>
                  {" course from Learner "}
                  <span className="text-success font-weight-bold">
                    {learner}
                  </span>
                </td>
                <td className="text-secondary text-right">
                  <img src={clock} className="timeClk" />
                  _time_
                </td>
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );
      break;

    case NOTIFICATION_TYPE.s:
      return (
        <div>
          {" "}
          <table style={{ marginBottom: "10px" }}>
            <tbody>
              <tr className="h5">
                <td rowSpan="2" style={{ width: "10%" }}>
                  <div
                    className="circleBase type1"
                    style={{
                      margin: "auto",
                      marginBottom: "10px",
                      marginRight: "20px"
                    }}
                  >
                    <img src={img} />
                  </div>
                </td>
                <td style={{ textAlign: "left" }}>
                  <span className="text-success font-weight-bold">
                    _Learner_Name_
                  </span>
                  has been pay fee for
                  <span className="text-info font-weight-bold">
                    _course_Name_
                  </span>
                </td>
                <td className="text-secondary text-right">
                  <img src={clock} className="timeClk" />
                  _time_
                </td>
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );
      break;
    default:
      return null;
      break;
  }
};

export const LearnerNotification = props => {
  const { tutor, flag, course } = props.info;
  const { img, topic } = course[0];
  switch (flag) {
    case NOTIFICATION_TYPE.wr:
      return (
        <div>
          <table style={{ marginBottom: "10px" }}>
            <tbody>
              <tr className="h5">
                <td rowSpan="2" style={{ width: "10%" }}>
                  <div
                    className="circleBase type1"
                    style={{
                      margin: "auto",
                      marginBottom: "10px",
                      marginRight: "20px"
                    }}
                  >
                    <img src={img} />
                  </div>
                </td>
                <td style={{ textAlign: "left" }}>
                  You had requested to
                  <span className="text-info font-weight-bold">
                    {" " + topic}
                  </span>
                  {" course"}
                </td>
                <td className="text-secondary text-right">
                  <img src={clock} className="timeClk" />
                  _time_
                </td>
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );
      break;

    case NOTIFICATION_TYPE.wp:
      return (
        <div>
          <table style={{ marginBottom: "10px" }}>
            <tbody>
              <tr className="h5">
                <td rowSpan="2" style={{ width: "10%" }}>
                  <div
                    className="circleBase type1"
                    style={{ margin: "auto", marginRight: "20px" }}
                  >
                    <img src={img} />
                  </div>
                </td>
                <td style={{ textAlign: "left" }}>
                  Tutor
                  <span className="text-success font-weight-bold">
                    {" " + tutor + " "}
                  </span>
                  had accepted
                  <span className="text-info font-weight-bold">
                    {" " + topic + " "}
                  </span>
                  course
                </td>
                <td className="text-secondary text-right">
                  <img src={clock} className="timeClk" />
                  _time_
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button
                    className="btn btn btn btn-outline-warning btn-lg"
                    style={{ margin: "20px 40px 20px 10px", width: "30%" }}
                  >
                    Pay for fee
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
      break;
    case NOTIFICATION_TYPE.d:
      return (
        <div>
          <table style={{ marginBottom: "10px" }}>
            <tbody>
              <tr className="h5">
                <td rowSpan="2" style={{ width: "10%" }}>
                  <div
                    className="circleBase type1"
                    style={{
                      margin: "auto",
                      marginBottom: "10px",
                      marginRight: "20px"
                    }}
                  >
                    <img src={img} />
                  </div>
                </td>
                <td style={{ textAlign: "left" }}>
                  Tutor
                  <span className="text-success font-weight-bold">
                    {` ${tutor} `}
                  </span>
                  had declined
                  <span className="text-info font-weight-bold">
                    {` ${topic} `}
                  </span>
                  course
                </td>
                <td className="text-secondary text-right">
                  <img src={clock} className="timeClk" />
                  _time_
                </td>
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );
      break;
    
    case NOTIFICATION_TYPE.s:
      return (
        <div>
          <table style={{ marginBottom: "10px" }}>
            <tbody>
              <tr className="h5">
                <td rowSpan="2" style={{ width: "10%" }}>
                  <div
                    className="circleBase type1"
                    style={{
                      margin: "auto",
                      marginBottom: "10px",
                      marginRight: "20px"
                    }}
                  >
                    <img src={img} />
                  </div>
                </td>
                <td style={{ textAlign: "left" }}>
                  Paid successed
                  <span className="text-info font-weight-bold">
                    {" " + topic}
                  </span>
                  {" course"}
                </td>
                <td className="text-secondary text-right">
                  <img src={clock} className="timeClk" />
                  _time_
                </td>
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );
      break;
    

    default:
      return null;
      break;
  }
};
