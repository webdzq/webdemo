

import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  // add this method

  render() {
    console.log('boys');
    return (
      <div className="boy">
        <h2>我的男神们：</h2>
        <ul>
          <li><NavLink to="/boys/宋仲基">宋仲基</NavLink></li>
          <li><NavLink to="/boys/吴亦凡">吴亦凡</NavLink></li>

        </ul>
        {this.props.children}
      </div>
    )
  }
})
