var createStore = Redux.createStore;
var combineReducers = Redux.combineReducers;
var applyMiddleware = Redux.applyMiddleware;
const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const SETFILTER = 'SETFILTER';
const FILTER = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETE: 'SHOW_COMPLETE',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

var actionAddTodo = {
    type: 'ADD_TODO',
    text: '吃饭'
};
var actionCompleteTodo = {
    type: 'COMPLETE_TODO',
    index: 2
};
var actionSelectFilter = {
    type: 'SETFILTER',
    filter: 'SHOW_ALL'
};

var createStore = Redux.createStore;
var combineReducers = Redux.combineReducers;
var applyMiddleware = Redux.applyMiddleware;
const ADD_TODO = 'ADD_TODO';
const COMPLETE_TODO = 'COMPLETE_TODO';
const SETFILTER = 'SETFILTER';
const FILTER = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETE: 'SHOW_COMPLETE',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}
//action 工厂的定义
function addTodo(text) {
    return {
        type: ADD_TODO,
        text
    }
}
function completeTodo(index) {
    return {
        type: COMPLETE_TODO,
        index
    }
}

function selectFilter(filter) {
    return {
        type: SETFILTER,
        filter
    }
}
//定义state
var initState = {
    filter: 'SHOW_ALL',
    todos: []
};
//reducer 更新state
//function todoApp(state = initState, action) {
//    switch (action.type) {
//        //改变state的filter，现实现实全部、完成、未完成的选择
//        case SETFILTER:
//            return Object.assign({}, state, {filter: action.filter});
//        //添加todo
//        case ADD_TODO:
//            return Object.assign({}, state, {
//                    //???
//                    todos: [...state.todos, {
//                        text: action.text,
//                        complete: false
//                    }]
//                }
//            );
//        //将对应index的任务变为完成状态
//        case COMPELETE_TODO:
//            return Object.assign({}, state, {
//                    todos: [...state.slice(0, parseInt(action.index)),
//                        Object.assign({}, state[action.index], {
//                            completed: true
//                        }), ...state.slice(parseInt(action.index) + 1)
//                    ]
//                }
//            );
//        default:
//            return state;
//
//    }
//}
//拆分reducer
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
//组合reducer
var todoApp = combineReducers({
    filter:setFilter,
    todos:todos
});
//创建并监听
var store = createStore(todoApp);

var unsubscribe = store.subscribe(()=>{
    console.log(store.getState());
});
//执行任务
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
console.log('setFilter');
store.dispatch(selectFilter(FILTER.SHOW_COMPLETE));
unsubscribe();








