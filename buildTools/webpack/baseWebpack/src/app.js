import './index.less';
import React from 'react';
import ReactDom from 'react-dom';
let World = React.createClass({
    render(){
        return (
            <span>react es6 World is beautiful!Yes...!</span>
        )
    }
});

let Hello = React.createClass({
    render(){
        return (
            <div>
                <h1>Hello,boy!</h1>
                <World />
            </div>
        )
    }
});
class MyApp extends React.Component {
    render() {
        return <Hello/>
    }
}

ReactDom.render(<MyApp />,
    document.getElementById("app"));