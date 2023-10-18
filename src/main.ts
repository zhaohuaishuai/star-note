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

        this.init()
    }

    private init(){
        const {pre,code} = this.hlContainer
        this.dom.container = document.createElement('div')
        this.dom.header = document.createElement('div')
        this.dom.body = document.createElement('div')
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
    private oldNodeList:any[] = []
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


        const muob = new MutationObserver((mut)=>{
            console.log(mut[0])
            if(this.oldNodeList.length === 0){
                this.oldNodeList = Array.prototype.slice.call(mut[0].addedNodes)
                return
            }
            // 节点代码分析
            const oldNodeList =  this.oldNodeList
            const newNodeList = Array.prototype.slice.call(mut[0].addedNodes) 

            if(oldNodeList.length === newNodeList.length){
                for(let i = 0; i < oldNodeList.length; i ++){

                    console.log("oldNodeList:",oldNodeList[i].innerHTML)
                    console.log("newNodeList:",newNodeList[i].innerHTML)
                    if(oldNodeList[i].innerHTML !== newNodeList[i].innerHTML){
                        console.log("new-node:",newNodeList[i])
                        newNodeList[i].scrollIntoView({behavior:'smooth'})
                        newNodeList[i].style.backgroundColor = '#000'
                        newNodeList[i].style.color = '#fff'
                        this.oldNodeList = Array.prototype.slice.call(mut[0].addedNodes)
                        return
                         
                    }

                }
            }

            if(oldNodeList.length < newNodeList.length){

            }

            if(oldNodeList.length>newNodeList.length){

            }


            this.oldNodeList = Array.prototype.slice.call(mut[0].addedNodes)
            return


            console.log(this.oldNodeList)
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
        

        console.log(data === this.data)

        const { code } = this.hlContainer
        const json = JSON.stringify(data,null,2)
        const hj = hljs.highlightAuto(json)

        this.data = data
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
     * 变化盒子大小
     */
    private containerResize(w:number,h:number){

        const { container } = this.dom

        if(w < this.containerWidth){
            w = this.containerWidth
        }

        if(h < this.containerHeight){
            h = this.containerHeight
        }



        container.style.width = w + 'px'
        container.style.height = h + 'px'
        this.dom.body.style.height = (h - this.titleHeight) + 'px'
    }
}


const starNote = new StarNote({x:100,y:100})
const as = {
    "id": 5,
    "name": "",
    "templateId": 149,
    "advertiserIdList": [
      "1774465345162247",
      "1774465345776648",
      "1767396488101000"
    ],
    "newsCondition": [
      {
        "name": "days",
        "el": "eq",
        "value": 30,
        "relation": ""
      }
    ],
    "news": 3,
    "topNCondition": [
      {
        "name": "days",
        "el": "eq",
        "value": 30,
        "relation": ""
      },
      {
        "name": "stat_cost",
        "el": "eq",
        "value": 4,
        "relation": "and"
      },
      {
        "name": "convert_cost",
        "el": "eq",
        "value": 4,
        "relation": "and"
      },
      {
        "name": "convert_cnt",
        "el": "eq",
        "value": 5,
        "relation": ""
      }
    ],
    "closeCondition": [
      {
        "name": "stat_cost",
        "el": "",
        "value": 7,
        "relation": "or"
      },
      {
        "name": "click_cnt",
        "el": "",
        "value": 2,
        "relation": ""
      },
      {
        "name": "convert_cnt",
        "el": "",
        "value": 2,
        "relation": "and"
      }
    ],
    "topN": 3,
    "newsDeliveryTime": "06:06",
    "topNDeliveryTime": "01:01",
    "checkFrequency": 4
  }
starNote.update(as)


document.onclick =()=>{
    as.topN = 300
    starNote.update(as)
}



