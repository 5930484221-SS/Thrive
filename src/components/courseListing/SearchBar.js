import React from 'react';

import './CourseContainer.css';

export default props => (
  <div className="row">
    <div className="col">
      <form onSubmit={props.onSearch}>
        <div className="input-group">
          <input
            type="text"
            className="form-control search-form"
            placeholder={props.placeHolder}
            onChange={e => props.onChange(e)}
            value={props.searchValue}
          />
          <div className="input-group-append">
            <input
              type="submit"
              className="btn btn-dark search-btn"
              value="Search"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
);
