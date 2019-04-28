import React, { Component } from 'react';
// react plugin used to create charts
import './dashboard.css';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import querystring from 'query-string';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from 'reactstrap';

import { chart1_2_options } from './chart.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: [],
      register: [],
      request: [],
      tableData: []
    };
  }

  data1(canvas) {
    const { index, register } = this.state;
    let ctx = canvas.getContext('2d');

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

    return {
      labels: index,
      datasets: [
        {
          label: 'My First dataset',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#1f8ef1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#1f8ef1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: register
        }
      ]
    };
  }

  data2(canvas) {
    const { index, request } = this.state;
    let ctx = canvas.getContext('2d');

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

    return {
      labels: index,
      datasets: [
        {
          label: 'Data',
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#1f8ef1',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#1f8ef1',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: request
        }
      ]
    };
  }

  async componentDidMount() {
    document.body.classList.add('background-dashboard');
    const response = await axios({
      method: 'POST',
      crossDomain: true,
      url: 'http://localhost:8000/api/dashboard',
      data: querystring.stringify({
        token: window.localStorage.token,
        nrows: 10
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // "Access-Control-Allow-Origin": "*"
      }
    });
    //console.log(response);
    this.setState({
      index: response.data.chartData.index,
      register: response.data.chartData.register,
      request: response.data.chartData.request,
      tableData: response.data.tableData
    });
  }

  componentWillUnmount() {
    document.body.classList.remove('background-dashboard');
  }

  render() {
    const { tableData } = this.state;
    return (
      <div className="content">
        <Row className="my-5">
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">
                      The number of the registration
                    </h5>
                    <CardTitle tag="h2">Registration</CardTitle>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={this.data1.bind(this)}
                    options={chart1_2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">The number of the Request</h5>
                <CardTitle tag="h2">Request</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={this.data2.bind(this)}
                    options={chart1_2_options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">request collection</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Course</th>
                      <th className="text-center">Learner</th>
                      <th>Timestamp</th>
                      <th className="text-center">Tutor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.course_name}</td>
                        <td>{row.learner}</td>
                        <td>{row.requestTimestamp}</td>
                        <td>{row.tutor}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
