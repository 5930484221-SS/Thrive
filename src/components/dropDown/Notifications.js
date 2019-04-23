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
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    Promise.all([
      this.fetchTutorTransactions(),
      this.fetchLearnerTransactions()
    ]).then(() => this.setState({ isLoading: false }));
    this.sortTransactions();
  }

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
          <TutorNotification info={noti} key={noti._id} />
        ));
        this.setState({ tutorTransactions });
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
          return <LearnerNotification reload ={this.componentDidMount} info={noti} key={noti._id} />;
        });
        this.setState({ learnerTransactions });
      })
      .catch(error => {
        console.log(error);
      });
  }

  sortTransactions() {}

  render() {
    const { tutorTransactions, learnerTransactions, isLoading } = this.state;
    return (
      <div>
        <MyCourseContentError>
          {tutorTransactions.concat(learnerTransactions)}
        </MyCourseContentError>
        {isLoading ? Loader : null}
      </div>
    );
  }
}
