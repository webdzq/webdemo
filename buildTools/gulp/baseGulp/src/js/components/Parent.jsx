var React = require('react');
var Child = require('./Child.jsx');

var Parent = React.createClass({
    render: function(){
        return (
            <div>
                <div> Hello parent</div>
                <Child/>
            </div>
        )
    }
});

module.exports = Parent;