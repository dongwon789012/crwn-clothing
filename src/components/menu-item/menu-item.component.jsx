import React from "react";
import { withRouter } from "react-router-dom";

import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
/*withRouter라는 하이오더컴포넌트를 썼기 때문에 MenuItem 컴포넌트가 history match 등의 객체를 이용할 수 있음
하이오더 컴포넌트는 프롭이 아니라 컴포넌트를 argument로 전달받아 수정된 컴포넌트를 렌더링하는 것임.*/
