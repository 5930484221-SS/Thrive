import React, { Component } from "react";
import clock from "../../img/clock.svg";

export default class Noti extends Component {
  render() {
    return (
      <div>
        {/* 1.learner request to tutor */}
        <table style={{ marginBottom: "10px" }}>
          <tr className="h5">
            <td rowSpan="2" style={{ width: "10%" }}>
              <div
                class="circleBase type1"
                style={{ margin: "auto", marginRight: "20px" }}
              >
                <img src="https://i.udemycdn.com/course/240x135/705264_caa9_8.jpg" />
              </div>
            </td>
            <td style={{ textAlign: "left" }}>
              <span className="text-success font-weight-bold">
                _Learner_Name_
              </span>
              request course
              <span className="text-info font-weight-bold">_course_Name_</span>
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
              >
                Accept
              </button>
              <button
                className="btn btn btn-outline-danger btn-lg"
                style={{ margin: "20px 40px 20px 10px", width: "30%" }}
              >
                Decline
              </button>
            </td>
          </tr>
        </table>

        {/* 2.tutor accept learner request */}
        <table style={{ marginBottom: "10px" }}>
          <tr className="h5">
            <td rowSpan="2" style={{ width: "10%" }}>
              <div
                class="circleBase type1"
                style={{ margin: "auto", marginRight: "20px" }}
              >
                <img src="https://i.udemycdn.com/course/240x135/705264_caa9_8.jpg" />
              </div>
            </td>
            <td style={{ textAlign: "left" }}>
              <span className="text-success font-weight-bold">
                _Tutor_Name_
              </span>
              has been accept your
              <span className="text-info font-weight-bold">_course_Name_</span>
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
        </table>

        {/* 3.tutor decline learner request */}
        <table style={{ marginBottom: "10px" }}>
          <tr className="h5">
            <td rowSpan="2" style={{ width: "10%" }}>
              <div
                class="circleBase type1"
                style={{
                  margin: "auto",
                  marginBottom: "10px",
                  marginRight: "20px"
                }}
              >
                <img src="https://i.udemycdn.com/course/240x135/705264_caa9_8.jpg" />
              </div>
            </td>
            <td style={{ textAlign: "left" }}>
              <span className="text-success font-weight-bold">
                _Tutor_Name_
              </span>
              has been decline your
              <span className="text-info font-weight-bold">_course_Name_</span>
            </td>
            <td className="text-secondary text-right">
              <img src={clock} className="timeClk" />
              _time_
            </td>
          </tr>
          <tr>
            <td colSpan="2" />
          </tr>
        </table>

        {/* 4.learner request course response */}
        <table style={{ marginBottom: "10px" }}>
          <tr className="h5">
            <td rowSpan="2" style={{ width: "10%" }}>
              <div
                class="circleBase type1"
                style={{
                  margin: "auto",
                  marginBottom: "10px",
                  marginRight: "20px"
                }}
              >
                <img src="https://i.udemycdn.com/course/240x135/705264_caa9_8.jpg" />
              </div>
            </td>
            <td style={{ textAlign: "left" }}>
              Your has been request
              <span className="text-info font-weight-bold">_course_Name_</span>
            </td>
            <td className="text-secondary text-right">
              <img src={clock} className="timeClk" />
              _time_
            </td>
          </tr>
          <tr>
            <td colSpan="2" />
          </tr>
        </table>

        {/* 5. inform tutor that they has been pay */}
        <table style={{ marginBottom: "10px" }}>
          <tr className="h5">
            <td rowSpan="2" style={{ width: "10%" }}>
              <div
                class="circleBase type1"
                style={{
                  margin: "auto",
                  marginBottom: "10px",
                  marginRight: "20px"
                }}
              >
                <img src="https://i.udemycdn.com/course/240x135/705264_caa9_8.jpg" />
              </div>
            </td>
            <td style={{ textAlign: "left" }}>
              <span className="text-success font-weight-bold">
                _Learner_Name_
              </span>
              has been pay fee for
              <span className="text-info font-weight-bold">_course_Name_</span>
            </td>
            <td className="text-secondary text-right">
              <img src={clock} className="timeClk" />
              _time_
            </td>
          </tr>
          <tr>
            <td colSpan="2" />
          </tr>
        </table>
      </div>
    );
  }
}
