import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('javascript', javascript);


interface ParamsInt {
    x?:number,y?:number
}

/**
 *  
 *  @param {number} options.x 初始化在视口上x的坐标 默认 30px
 *  @param {number} options.y 初始化在视口上y的坐标 默认 视口右侧30px
 */
export default class StarNote {

    data = {}
    oldData = {}

    dom:Record<string,HTMLDivElement> ={
        container:document.createElement('div'),
        header:document.createElement('div'),
        body:document.createElement('div'),
        closeBtn:document.createElement('div'),
        resizeHandlerBtn:document.createElement('div'),

    }

    hlContainer = {
        pre:document.createElement('pre'),
        code:document.createElement('code'),
    }

    scrrenWidth = document.documentElement.clientWidth
    scrrenHeight = document.documentElement.clientHeight
 
    containerWidth:number = 300
    containerHeight:number = 420
    titleHeight:number = 30
    x:number = document.documentElement.clientWidth - this.containerWidth - 30
    y:number = 30

    constructor({
        x,y
    }:ParamsInt){

        const {x : lx, y : ly} = this.getLocationPosition()

        this.x = lx || x || document.documentElement.clientWidth - this.containerWidth - 30

        this.y = ly || y || 30

        const {w,h} = this.getLocationBoxSize()
        this.containerWidth = w  
        this.containerHeight = h  

        this.init()
    }

    private init(){
        const {pre,code} = this.hlContainer
        // this.dom.container = document.createElement('div')
        // this.dom.header = document.createElement('div')
        // this.dom.body = document.createElement('div')
        this.dom.container.appendChild(this.dom.header)
        this.dom.container.appendChild(this.dom.body)
        this.dom.container.appendChild(this.dom.resizeHandlerBtn)
        this.dom.body.appendChild(pre)
        pre.appendChild(code)
        this.dom.header.appendChild(this.dom.closeBtn)
        this.dom.closeBtn.innerHTML = 'x'
        document.body.appendChild(this.dom.container)
        this.initStyle()
        this.initEvent()
    }
    private initStyle(){

        const {container,header,closeBtn,body,resizeHandlerBtn} = this.dom
      
        container.style.width  =  this.containerWidth + 'px'
        container.style.height =  this.containerHeight + 'px'  
        container.style.position = 'absolute';
        container.style.top ='0px'
        container.style.left = '0px'
        container.style.transform = `translate(${this.x}px, ${this.y}px)`
        header.style.height = this.titleHeight + 'px'
        header.style.display = 'flex'
        header.style.justifyContent = 'flex-end';
        header.style.backgroundColor = 'rgb(234, 179, 8)';
        header.style.padding = '0px 10px 0px 10px'
        header.style.alignItems = 'center'
        header.style.cursor = 'move'

        closeBtn.style.width = '12px'
        closeBtn.style.height = '12px'
        closeBtn.style.lineHeight = '12px'
        closeBtn.style.cursor = 'pointer'
        closeBtn.style.userSelect = 'none'
        body.style.height = (this.containerHeight - this.titleHeight) + 'px'
        body.style.padding = '20px'
        body.style.backgroundColor = 'rgb(250, 204, 21)'
        body.style.boxSizing = 'border-box'
        body.style.overflow = 'auto'
        body.style.position = 'relative'


        resizeHandlerBtn.style.width ='20px'
        resizeHandlerBtn.style.height ='20px'
        resizeHandlerBtn.style.position ='absolute'
        resizeHandlerBtn.style.right = '0px'
        resizeHandlerBtn.style.bottom = '0px'
        // resizeHandlerBtn.style.backgroundColor = 'rgb(200, 204, 21)'
        resizeHandlerBtn.style.cursor = 'se-resize'

       


    }
    // private oldNodeList:any[] = []
    private initEvent(){
        const {container,header,closeBtn,resizeHandlerBtn} = this.dom
        const {code} = this.hlContainer
        header.onmousedown = (e:MouseEvent)=>{

            let sx = e.clientX
            let sy = e.clientY
            console.log("鼠标按下：",sx,sy)
            const rect = container.getBoundingClientRect()
            window.onmousemove = (e:MouseEvent)=>{
                let x = e.clientX
                let y = e.clientY
                let dx = x - sx
                let dy = y - sy
                this.x = rect.left + dx
                this.y = rect.top + dy
                this.containerMove()
            }

            window.onmouseup =()=>{
                window.onmousemove = null
                window.onmouseup = null
            }
        }

        window.onresize = ()=>{
            this.scrrenWidth = document.documentElement.clientWidth
            this.scrrenHeight = document.documentElement.clientHeight
            this.containerMove()
        }


        closeBtn.onclick =()=>{
            this.dom.container.remove()
        }


        const muob = new MutationObserver(()=>{
            // console.log(mut[0])
            // if(this.oldNodeList.length === 0){
            //     console.log("初始化的，不做了")
            //     this.oldNodeList = Array.prototype.slice.call(mut[0].addedNodes)
            //     return
            // }
            // if(this.oldData !== this.data){
            //     console.log("引用地址不一样，不做了")
            //     this.oldNodeList = Array.prototype.slice.call(mut[0].addedNodes)
            //     return
            // }
            // // 节点代码分析
            // const oldNodeList =  this.oldNodeList
            // const newNodeList = Array.prototype.slice.call(mut[0].addedNodes) 


            // if(oldNodeList.length === newNodeList.length){
            //     for(let i = 0; i < oldNodeList.length; i ++){
            //         if(oldNodeList[i].innerHTML !== newNodeList[i].innerHTML){
            //             newNodeList[i].scrollIntoView({behavior:'smooth',block:'center'})
            //             newNodeList[i].style.backgroundColor = '#000'
            //             newNodeList[i].style.color = '#fff'
            //             newNodeList[i].style.padding = '2px'
            //             newNodeList[i].previousElementSibling.style.backgroundColor = '#000'
            //             newNodeList[i].previousElementSibling.style.color = '#fff'
            //             newNodeList[i].previousElementSibling.style.padding = '2px'
            //         }

            //     }
            // }

            // if(oldNodeList.length < newNodeList.length){

            // }

            // if(oldNodeList.length>newNodeList.length){

            // }


            // this.oldNodeList = Array.prototype.slice.call(mut[0].addedNodes)
            // return

            const  changeItem = Array.prototype.slice.call(this.hlContainer.code.querySelectorAll('.change-item'))
            console.log("changeItem:",changeItem)
            changeItem.forEach((node:HTMLSpanElement)=>{
                node.scrollIntoView({block:'center',behavior:'smooth'})
            })

        })

        muob.observe(code,{
            subtree:true,
            childList:true
        })

        resizeHandlerBtn.onmousedown = (e:MouseEvent)=>{

           const sx = e.clientX
           const sy = e.clientY

           const crect = this.dom.container.getBoundingClientRect()
           this.hlContainer.pre.style.userSelect = 'none'
           window.onmousemove = (e:MouseEvent)=>{
                const ex = e.clientX
                const ey = e.clientY
                const disx = ex - sx
                const disy = ey - sy
                const w = crect.width + disx
                const h = crect.height + disy
                this.containerResize(w,h)
           }

           window.onmouseup = ()=>{
                this.hlContainer.pre.style.userSelect = 'auto'
                window.onmousemove = null
                window.onmouseup = null
               
           }

        }

        let oldCode:string
        hljs.addPlugin({
            'after:highlight':(item)=>{
                // console.log('字符串对比：',item.code  === oldCode)
                // console.log('引用地址对比：',this.data === this.oldData)
                const addressIsSame = this.data === this.oldData
                const codeIsSame = item.code  === oldCode
                const arr = item.code?.split('\n') as string[]
                const oldArr = !oldCode?[]:oldCode?.split('\n')
                const notIndexs:number[] = []
                
                if(oldArr.length === arr.length){
                    for(let i = 0; i < arr?.length ; i++){
                        if(arr[i] !== oldArr[i]){
                            notIndexs.push(i)
                        }
                    }
                }

                if(oldArr.length > arr.length){
                    
                }
                
                
                console.log("notIndexs:",notIndexs)
                const res = item.value
                .split('\n')
                // 增加索引
                .map((item,index)=>`${index}.&nbsp;&nbsp;${item}`)
                // 过滤变更的值加样式标记
                .map((citem,index)=>{
                    // 引用地址不一样直接换  字符一样 且 引用地址一样 直接输出不用处理
                    if(!addressIsSame || (codeIsSame && addressIsSame)){
                        return citem
                    }
                    return notIndexs.includes(index)? `<span class='change-item' style="color:#fff;background-color:black;">${citem.replace(/hljs-string|hljs-number/g,'')}</span>`: citem
                })
                item.value = res.join('\n')
                oldCode = item.code as string
                
            }
        })
    }

    private containerMove(){
        const { container } = this.dom
        console.log(this.x,this.y)

        if(this.x<0){
            this.x = 0
        }

        if(this.x > (this.scrrenWidth - this.dom.container.clientWidth)){
            this.x = this.scrrenWidth - this.dom.container.clientWidth
        }


        if(this.y<0){
            this.y = 0
        }

        if(this.y > (this.scrrenHeight - this.dom.container.clientHeight)){
            this.y = this.scrrenHeight - this.dom.container.clientHeight
        }

        container.style.transform = `translate(${this.x}px, ${this.y}px)`
        this.setLocalPosition()
        // container.style.left = this.x +'px'
        // container.style.top = this.y +'px'
    }

    
    /**
     * 数据更新
     * @param {Object} data 
     */
    public update(data:any){
        
        this.oldData = this.data
        this.data = data
        const { code } = this.hlContainer
        const json = JSON.stringify(data,null,2)
        const hj = hljs.highlight(json,{language:'javascript'})
        
        console.log(hj)

        code.innerHTML = hj.value
    }

    private LOCAL_POSITION_POSITION= 'star_note_positon'
    /**
     * 存储位置
     */
    private setLocalPosition(){
        localStorage.setItem(this.LOCAL_POSITION_POSITION,JSON.stringify({x:this.x,y:this.y}))
    }
    /**
     * 获取位置 
     */
    private getLocationPosition():{x:number,y:number}{
        const res = localStorage.getItem(this.LOCAL_POSITION_POSITION)
        if(res){
            return JSON.parse(res)
        }
        return {x:this.x,y:this.y}
    }
    /**
     * 销毁实例
     */
    public destory(){
        this.dom.container.remove()
    }
    /**
     * 盒子大小尺寸
     */
    private LOCAL_POSITION_BOX_SIZE = 'LOCAL_POSITION_BOX_SIZE'
    /**
     * 变化盒子大小
     */
    private containerResize(w:number,h:number){

        const { container } = this.dom

        if(w < 100){
            w = 100
        }

        if(h < 100){
            h = 100
        }



        container.style.width = w + 'px'
        container.style.height = h + 'px'
        localStorage.setItem(this.LOCAL_POSITION_BOX_SIZE,JSON.stringify({w,h}))
        this.dom.body.style.height = (h - this.titleHeight) + 'px'
    }
    /**
     * 获取本地盒子大小
     */
    private getLocationBoxSize():{w:number,h:number}{
        const res = localStorage.getItem(this.LOCAL_POSITION_BOX_SIZE)
        if(res){
            return JSON.parse(res)
        }
        return {w: this.containerWidth,h:this.containerHeight}
    }
}





