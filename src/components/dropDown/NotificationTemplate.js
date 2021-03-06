import React from "react";
import clock from "../../img/clock.svg";
import StripeCheckout from "react-stripe-checkout";
import swal from "sweetalert";
import ipAddress from "../../configIpAddress";
import loaderIcon from "../../img/loaderIcon.gif";

import axios from "axios";
import querystring from "query-string";

export const NOTIFICATION_TYPE = {
  wr: "wr",
  wp: "wp",
  d: "d",
  s: "s"
};

const onAccept = async _id => {
  try {
    swal({
      text: "Processing...",
      icon: loaderIcon,
      buttons: false
    });
    await axios({
      method: "POST",
      url: ipAddress + "/api/accept",
      crossDomain: true,
      data: querystring.stringify({
        token: window.localStorage.token,
        id: _id
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    await swal({
      text: "The request has been accepted",
      icon: "success"
    });
  } catch (error) {
    swal.stopLoading();
    swal.close();
    console.log(error.response);
    swal({
      text: error.response.status + " " + error.response.statusText,
      icon: "error"
    });
  }
};

const onDecline = async _id => {
  try {
    swal({
      text: "Processing...",
      icon: loaderIcon,
      buttons: false
    });
    await axios({
      method: "POST",
      url: ipAddress + "/api/decline",
      crossDomain: true,
      data: querystring.stringify({
        token: window.localStorage.token,
        id: _id
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    await swal({
      text: "The request has been declined",
      icon: "success"
    });
  } catch (error) {
    swal.stopLoading();
    swal.close();
    swal({
      text: error.response.status + " " + error.response.statusText,
      icon: "error"
    });
  }
};

const onCheckout = async(checkoutToken, _id, fee, courseId) => {
  try {
    swal({
      text: "Processing...",
      icon: loaderIcon,
      buttons: false
    });
    await axios({
      method: "POST",
      url: ipAddress + "/api/charge",
      crossDomain: true,
      data: querystring.stringify({
        token: window.localStorage.token,
        request_id: _id,
        card_token: checkoutToken.id,
        amount: fee * 100,
        currency: "THB",
        course_id: courseId
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    await swal({
      text: "The payment has been successfully processed",
      icon: "success"
    });
  } catch (error) {
    swal.stopLoading();
    swal.close();
    console.log(error.response);
    swal({
      text: error.response.status + " " + error.response.statusText,
      icon: "error"
    });
  }   
};

//--------- Tutor-----------------------
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
              </tr>
              <tr>
                <td colSpan="2">
                  <button
                    className="btn btn btn-outline-success btn-lg"
                    style={{ margin: "20px 40px 20px 10px", width: "30%" }}
                    onClick={async () => {
                      await onAccept(_id);
                      props.reload();
                    }}
                    name={NOTIFICATION_TYPE.wp}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn btn-outline-danger btn-lg"
                    style={{ margin: "20px 40px 20px 10px", width: "30%" }}
                    onClick={async () => {
                      await onDecline(_id);
                      props.reload();
                    }}
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
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );

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
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );

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
                  Learner
                  <span className="text-success font-weight-bold">
                    {" " + learner + " "}
                  </span>
                  had paid fee for your
                  <span className="text-info font-weight-bold">
                    {" " + topic + " "}
                  </span>
                  course
                </td>
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
};

//---------- Learner--------------------
export const LearnerNotification = props => {
  const { tutor, flag, course, _id } = props.info;
  const { img, topic, fee } = course;
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
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );

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
              </tr>
              <tr>
                <td colSpan="2">
                  <StripeCheckout
                    stripeKey="pk_test_IQqSzL2RDKzgQnK2dJUc4kvo00b2cmxd73"
                    amount={fee * 100}
                    image={img}
                    currency="THB"
                    token={async token => {
                      await onCheckout(token, _id, fee, course._id);
                      props.reload();
                    }}
                    name={"Buy " + topic + " course"}
                    description={"Instruction by " + tutor}
                    ComponentClass="form-group"
                  >
                    <button
                      className="btn btn btn btn-outline-warning btn-lg"
                      style={{ margin: "20px 40px 20px 10px", width: "30%" }}
                    >
                      Pay for fee
                    </button>
                  </StripeCheckout>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );

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
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );

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
                  Your payment for
                  <span className="text-info font-weight-bold">
                    {" " + topic}
                  </span>
                  {" course has been successfully processed"}
                </td>
              </tr>
              <tr>
                <td colSpan="2" />
              </tr>
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
};
