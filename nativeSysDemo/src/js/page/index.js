import '../../css/page/index.less'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'
import App from './modules/App'
import Boys from './modules/Boys'
import Girls from './modules/Girls'
import Boy from './modules/Boy'
import Home from './modules/Home'
import IndexBoy from './modules/IndexBoy'

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/boys" component={Boys}>
			 <IndexRoute component={IndexBoy}/>
      <Route path=":boyName" component={Boy}/>
    </Route>
    <Route path="/girls" component={Girls}/>
    </Route>
  </Router>
), document.getElementById('app'));
