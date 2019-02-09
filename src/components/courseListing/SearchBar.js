import React from 'react';

import './CourseContainer.css';

export default props => (
  <div className="row">
    <div className="col-md-2" />
    <div className="col-md-8">
      <div className="input-group">
        <input
          type="text"
          className="form-control search-form"
          placeholder="Search Tutor"
          onChange={e => props.onChange(e)}
          value={props.searchValue}
        />
        <div className="input-group-append">
          <button className="btn btn-dark search-btn">Search</button>
        </div>
      </div>
    </div>
  </div>
);
