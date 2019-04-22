import React from "react";
import clock from "../../img/clock.svg";

import axios from "axios";
import querystring from "query-string";

export const NOTIFICATION_TYPE = {
  REQUESTED: "REQUESTED",
  ACCEPTED: "ACCEPTED",
  DECLINED: "DECLINE",
  PAID: "PAID"
};

const onAccept = _id => {
  axios({
    method: "POST",
    url: "http://127.0.0.1:8000/api/set_flag",
    crossDomain: true,
    data: querystring.stringify({
      token: window.localStorage.token,
      id: _id,
      flag: NOTIFICATION_TYPE.ACCEPTED
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

const onDecline = _id => {
  axios({
    method: "POST",
    url: "http://127.0.0.1:8000/api/set_flag",
    crossDomain: true,
    data: querystring.stringify({
      token: window.localStorage.token,
      id: _id,
      flag: NOTIFICATION_TYPE.DECLINED
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
    case NOTIFICATION_TYPE.REQUESTED:
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
                    onClick={() => onAccept(_id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn btn-outline-danger btn-lg"
                    style={{ margin: "20px 40px 20px 10px", width: "30%" }}
                    onClick={() => onDecline(_id)}
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

    case NOTIFICATION_TYPE.PAID:
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
    case NOTIFICATION_TYPE.REQUESTED:
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

    case NOTIFICATION_TYPE.ACCEPTED:
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
                  <span className="text-info font-weight-bold">{" " + topic + " "}</span>course
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
    case NOTIFICATION_TYPE.DECLINED:
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
                  Tutor<span className="text-success font-weight-bold">
                    {` ${tutor} `}
                  </span>
                  had declined
                  <span className="text-info font-weight-bold">
                    {` ${topic} `}
                  </span>course
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
