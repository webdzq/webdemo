import React from 'react';
import ReactDOM from 'react-dom'
import {createStore,combineReducers,applyMiddleware} from 'Redux';
import { Button,Input } from 'antd';

const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const SETFILTER = 'SETFILTER';
const FILTER = {
  SHOW_ALL:'SHOW_ALL',
  SHOW_COMPLETE:'SHOW_COMPLETE',
  SHOW_ACTIVE:'SHOW_ACTIVE'
}
//ation:动作
function addTodo(text){
  return {
    type:ADD_TODO,
    text
  }
}
function completeTodo(index){
  return {
    type:COMPLETE_TODO,
    index
  }
}
function selectFilter(filter){
    return {
        type:SETFILTER,
        filter
    }
}
//reducer-重组state
var initState = {
  filter:'SHOW_ALL',
  todos:[]
}
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, {
        text: action.text,
        completed: false
      }];
    case COMPLETE_TODO:
      return [
        ...state.slice(0, parseInt(action.index)),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(parseInt(action.index)+ 1)
      ];
    default:
      return state;
  }
}
function setFilter(state = FILTER.SHOW_ALL,action){
  switch(action.type){
    case SETFILTER:
      return action.filter;
    default:
      return state;
  }
}
var todoApp = combineReducers({
  filter:setFilter,
    todos:todos
});
//dispath-执行任务
var store = createStore(todoApp);
console.log('添加吃饭');
store.dispatch(addTodo('吃饭'));
console.log('添加睡觉');
store.dispatch(addTodo('睡觉'));
console.log('完成吃饭');
store.dispatch(completeTodo(0));
console.log('添加打豆豆');
store.dispatch(addTodo('打豆豆'));
console.log('完成睡觉');
store.dispatch(completeTodo(0));
//react
var AddTodoCom = React.createClass({
    getInitialState:function(){
      return {
        items:store.getState()
      }
    },
    componentDidMount:function(){
      var unsubscribe = store.subscribe(this.onChange);
    },
    onChange:function(){
      this.setState({
        items:store.getState()
      });
    },
    handleSelect:function(e){

      store.dispatch(selectFilter(e.currentTarget.dataset.select))
      e.currentTarget.classList.add('select');
    },
    handleClick:function(e){
      //console.log(this.refs.todo,e.currentTarget);
      var addInput = ReactDOM.findDOMNode(this.refs.todo).querySelector('input');
      //console.log(addInput,addInput.value);
      var addText = addInput.value.trim();
      if(addText){
        store.dispatch(addTodo(addText));
        addInput.value = '';
      }
      else{
        alert('请输入内容');
      }
    },
    handleComplete:function(e){
      //console.log(e.currentTarget.dataset.index);
      store.dispatch(completeTodo(e.currentTarget.dataset.index))
      e.currentTarget.classList.add('complete');
    },
    render:function(){

      return(
            <div className='warp'>
            <div>女神的每一天：</div>
            <Input size="small" className="todos" type='text' ref='todo'/>
            <Button onClick={this.handleClick}>'☠'添加</Button>
            <ul>
            {
              this.state.items.todos.filter(function(item){
                switch(this.state.items.filter){
                  case 'SHOW_ALL':
                    return true;
                  case 'SHOW_COMPLETE':
                    return item.completed;
                  case 'SHOW_ACTIVE':
                    return !item.completed;
                }
              }.bind(this)).map(function(item){
                var index = this.state.items.todos.indexOf(item);
                 return item.completed?<li className='complete' data-index={index}>{item.text}</li> : <li data-index={index} onClick={this.handleComplete}>{item.text}</li>;
              }.bind(this))
            }
            </ul>
            <Button onClick={this.handleSelect}  data-select='SHOW_ALL'>所有事情</Button>
            <Button onClick={this.handleSelect} data-select='SHOW_COMPLETE'>已完成</Button>
            <Button onClick={this.handleSelect} data-select='SHOW_ACTIVE'>正在进行</Button>
          </div>
        );
    }
});

export default React.createClass({

  render() {

        return <AddTodoCom />

  }

});
