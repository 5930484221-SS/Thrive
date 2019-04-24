import React, { Component } from "react";
import "./CourseContainer.css";

import axios from "axios";
import querystring from "query-string";

class RateReviewContainer extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    

    return (
      <div>
        <div className="card disabled-hover">
          <h5 className="card-body pt-3 pb-3">Score: 
          <i className="star icon" />
          <i className="star icon" />
          <i className="star icon" />
          </h5>
          <h5 className="card-body pt-3 pb-3">Review: สอนดีมากก เข้าใจในเนื้อหา</h5>
          <h5 className="card-footer pt-3 pb-3">Reviewed by: Beambeam</h5>
        </div>

        <div className="card disabled-hover">
          <h5 className="card-body pt-3 pb-3">Score: 
          <i className="star icon" />
          <i className="star icon" />
          <i className="half star icon" />
          </h5>
          <h5 className="card-body pt-3 pb-3">Review: ไม่ค่อยตรงเวลา และไม่ชดเวลาให้ สรุปเนื้อหากระชับ</h5>
          <h5 className="card-footer pt-3 pb-3">Reviewed by: Patja</h5>
        </div>

        <div className="card disabled-hover">
          <h5 className="card-body pt-3 pb-3">Score: 
          <i className="star icon" />
          </h5>
          <h5 className="card-body pt-3 pb-3">Review: ไม่ประทับใจ</h5>
          <h5 className="card-footer pt-3 pb-3">Reviewed by: TamTam</h5>
        </div>

  </div>
    );
  }
}

export default RateReviewContainer;
