# data-observer
# 表单数据动态监测器



#### 背景
在前端的开发工作中经常会遇到调试表单数据的需求，表单字段一但增加到100多个的大表单时，就会为找视图上面的每个字段的key值而耗费一定的时间和精力，也会经常遇到字段和视图的label错位的情况。
基于上述问题，在开发的时间，我经常会在边上另外写一个浮动的盒子，将一个大表单的数据对象使用 `JSON.stringify`和`<pre>`将数据格式到这个盒子中，以便在观察数据的变化。便于提高开发调试效率。
在不断的使用和顺手优化中，便想到，我遇到这样问题，那么别人也会在开发过程中。遇到这样的问题。于是，顺手把这个组件抽离出来，上传的NPM上，让大家使用。

#### 实现思路
![/assets/1.png](assets/1.png)

开发中用到的技术

js原生 es6 `Class`封装
`highlight.js` 代码高亮
`MutationObserver` 接口提供了监视对DOM树做更改的能力。
DOM中有节点变化的时候可以监听到，并对监听到新的更改NodeList和旧的NodeList做对比。来找出修改的节点。




#### 如何使用

##### 安装

`npm install star-note`
` yarn add star-note `

##### 使用
在vue中封装hook方法
``` javascript 
export function useNote(data:Ref<any>){

    if(import.meta.env.MODE === "development"){

        const noteApp = new StarNote({y:90})

         noteApp.update(data.value)

        watch(()=>data.value,()=>{
            noteApp && noteApp.update(data.value)
        },{
          deep:true  
        })
    }

    return 
}
````



#### 待完善

1. 窗口可以调整大小功能
2. 记忆上次的位置功能







