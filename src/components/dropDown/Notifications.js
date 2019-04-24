import React, { Component } from "react";
import { LearnerNotification, TutorNotification } from "./NotificationTemplate";
import MyCourseContentError from "./MyCourseContentError";
import Loader from "../loader/Loader";

import axios from "axios";
import querystring from "query-string";

export default class Notification extends Component {
  constructor() {
    super();
    this.state = {
      tutorTransactions: [],
      learnerTransactions: [],
      isLoading: false,
      Notifications: []
    };
  }

  componentDidMount = () => {
    this.setState({ isLoading: true});
    Promise.all([
      this.fetchTutorTransactions(),
      this.fetchLearnerTransactions()
    ])
      .then(()=>this.sortNotification())
  };

  fetchTutorTransactions() {
    return axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/get_tutor_transactions",
      crossDomain: true,
      data: querystring.stringify({
        token: window.localStorage.token
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        const tutorTransactions = response.data.requests.map(noti => (
          <TutorNotification
            info={noti}
            reload={this.componentDidMount}
            key={noti._id}
            lastest={this.getLatestNotiTime(noti)}
          />
        ));
        this.setState({ tutorTransactions });
        console.log(tutorTransactions);
      })
      .catch(error => {
        console.log(error);
      });
  }

  fetchLearnerTransactions() {
    return axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/get_learner_transactions",
      crossDomain: true,
      data: querystring.stringify({
        token: window.localStorage.token
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        const learnerTransactions = response.data.requests.map(noti => {
          return (
            <LearnerNotification
              info={noti}
              reload={this.componentDidMount}
              key={noti._id}
              lastest={this.getLatestNotiTime(noti)}
            />
          );
        });
        this.setState({ learnerTransactions });
        console.log(learnerTransactions);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getLatestNotiTime(info) {
    return Math.max.apply(
      NaN,
      [
        Date.parse(info.requestTimestamp),
        Date.parse(info.responseTimestamp),
        Date.parse(info.paymentTimestamp)
      ].filter(value => {
        return !Number.isNaN(value);
      })
    );
  }

  async sortNotification() {
    await this.setState({Notifications:[]})
    const { tutorTransactions, learnerTransactions } = this.state;
    this.setState({
      Notifications: tutorTransactions
        .concat(learnerTransactions)
        .sort((left, right) => {
          return right.props.lastest - left.props.lastest;
        }),
      isLoading: false
    });
  }

  render() {
    const { Notifications, isLoading } = this.state;
    console.log(this.state);
    return (
      <div>
        <MyCourseContentError>{Notifications}</MyCourseContentError>
        {isLoading ? Loader : null}
      </div>
    );
  }
}
