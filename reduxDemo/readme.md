1、三者调用关系

用户产生action-->store.dispatch(action)-->reducer(state,action)-->store.getState();
2、三大原则
先打个预防针，大家可能暂时不明白，到后面你会发现原来redux一直都围绕着这三大原则

一、单一数据源

二、state是只读的

三、使用纯函数来执行
什么是纯函数？

给出同样的参数返回都返回与之对应相同的结果，结果不依赖任何隐藏信息、执行将改变状态的程序的执行，也不能依赖任何外部i/o的输入。
结果值不会产生任何语义上可观察的副作用或输出，例如或输出到I/O装置。(执行有副作用的操作，如路由跳转)



http://www.jianshu.com/p/0e42799be566
https://github.com/lewis617/react-redux-tutorial