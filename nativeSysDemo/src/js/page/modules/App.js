
import NavLink from './NavLink';

import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
          <ul className="app">
            <li><NavLink to="/boys">男神</NavLink></li>
            <li><NavLink to="/girls">女神</NavLink></li>
            <li><NavLink to="/" onlyActiveOnIndex={true}>home</NavLink></li>
          </ul>
          {this.props.children}
      </div>
    )
  }
});
