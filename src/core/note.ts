import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import tp from 'highlight.js/lib/languages/tp.js'
import 'highlight.js/styles/a11y-dark.min.css';
import './index.less'
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('tp',tp)

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
        logoBtn:document.createElement('div'),
        resizeHandlerBtn:document.createElement('div'),
        footer:document.createElement('div'),
        popInfo:document.createElement('div')


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
    footerHeight:number = 30
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
        const CONTAINER_ID = 'star_note_observer'
        const prevCon = document.querySelector("#"+CONTAINER_ID)
        if(prevCon){
            prevCon.remove()

        }
        this.dom.container.id = CONTAINER_ID

        this.dom.container.appendChild(this.dom.header)
        this.dom.container.appendChild(this.dom.body)
        this.dom.container.appendChild(this.dom.footer)
        this.dom.container.appendChild(this.dom.resizeHandlerBtn)
        this.dom.container.appendChild(this.dom.popInfo)
        this.dom.popInfo.innerHTML = `<ul>
                                            <li>
                                            <span>路径：</span>
                                            <span class="hljs-string">0.name.cat</span>
                                            </li>
                                        </ul>`
        this.dom.body.appendChild(pre)
        pre.appendChild(code)
        this.dom.header.appendChild(this.dom.logoBtn)
        this.dom.header.appendChild(this.dom.closeBtn)
        
        this.dom.closeBtn.innerHTML = 'x'
        document.body.appendChild(this.dom.container)
        this.initStyle()
        this.initEvent()
    }
    private initStyle(){

        const {container,header,closeBtn,body,resizeHandlerBtn,logoBtn,footer,popInfo} = this.dom
        popInfo.classList.add('pop-info')

        container.classList.add('star-container','theme-1')
        header.classList.add('header')
        footer.classList.add('footer')
        closeBtn.classList.add('close')
        logoBtn.classList.add('logo')

        footer.style.height = this.footerHeight + 'px'
        container.style.zIndex = '9999'
        container.style.width  =  this.containerWidth + 'px'
        container.style.height =  this.containerHeight + 'px'  
        container.style.position = 'fixed';
        container.style.top ='0px'
        container.style.left = '0px'
        container.style.transform = `translate(${this.x}px, ${this.y}px)`
        header.style.height = this.titleHeight + 'px'
        body.classList.add('body')
        body.style.height = (this.containerHeight - this.titleHeight - this.footerHeight) + 'px'
        
        
        resizeHandlerBtn.classList.add("drag-controll")
    }
    // private oldNodeList:any[] = []
    private initEvent(){
        const {container,header,closeBtn,resizeHandlerBtn} = this.dom
        const {code} = this.hlContainer
        header.onmousedown = (e:MouseEvent)=>{
            let sx = e.clientX
            let sy = e.clientY
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
            
            const  changeItem = Array.prototype.slice.call(this.hlContainer.code.querySelectorAll('.change-item'))
            changeItem.forEach((node:HTMLSpanElement)=>{
                node.scrollIntoView({block:'center',behavior:'smooth'})
            })

            this.hlContainer.code.querySelectorAll('.hljs-string,.hljs-number,.change-item').forEach((node:HTMLSpanElement)=>{
                node.addEventListener('mouseenter',(ev:MouseEvent)=>{
                    const target = ev.target as HTMLSpanElement
                    const x = ev.clientX
                    const y = ev.clientY
                   
                    if(target){
                        type keyType = keyof typeof this.shadowPathData
                        const path = this.shadowPathData[target.dataset.index as keyType] as string
                        const reg = /\s*".+":\s"(.+)",{0,}/g
                        const reg1= /\s*"(.+)": (\[|\{)/g
                        this.dom.popInfo.classList.add('active')
                        this.dom.popInfo.style.transform = `translate(${x}px, ${y}px)`
                        this.setPath(path.replace(reg,"$1").replace(reg1,"$1"))
                    }
                })
                node.addEventListener('mouseleave',()=>{
                    this.dom.popInfo.classList.remove('active')
                })
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
                if(item.language === 'tp')return item
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
                    for(let i = 0; i < oldArr?.length ; i++){
                        if(arr[i] !== oldArr[i]){
                            notIndexs.push(i)
                            break;
                        }
                    }
                }
                if(oldArr.length <  arr.length){
                    for(let i = 0; i < arr?.length ; i++){
                        if(arr[i] !== oldArr[i]){
                            // 这个是变了对象的
                            const objReg = /"[a-zA-Z-]+":\s*("[a-zA-Z-]*"|\d+),{0,1}/g
                            if(objReg.test(arr[i])){
                                notIndexs.push(i+1)
                                break
                            }
                            notIndexs.push(i)
                            break;
                        }
                    }
                }
                const reg = /\n*\d*\./g
                const keyReg = /(?<=<span class="hljs-string")(?=>&quot;(.*)&quot;<\/span>:)/g
                const valueReg = /(?<=: <span class="(hljs-number|hljs-string)")(?=>(.*)<\/span>)/g
                const arrayReg = /(?<=\[\s*)(\d+\.\s+{{0,1}<span class="(hljs-string|hljs-number)"(>).+<\/span>,*\s*)+\s(?=\d+\.\s+\])/g

                const res = item.value
                .split('\n')
                // 增加索引
                .map((item)=>{
                    return item.replace(reg,'')
                })
                // key 和 value 打标
                .map((item,index)=>{
                    return item.replace(keyReg,` data-atr="key" data-index=${index} `)
                    .replace(valueReg,` data-atr="value" data-index=${index} `)
                })
                // 过滤变更的值加样式标记
                .map((citem,index)=>{
                    // 引用地址不一样直接换  字符一样 且 引用地址一样 直接输出不用处理
                    if(!addressIsSame || (codeIsSame && addressIsSame)){
                        return `${index}.${citem}`
                    }
                    return notIndexs.includes(index)? `${index}.${citem.replace(/(hljs-string|hljs-number)"/g,'change-item" ')}`: `${index}.${citem}`
                })
                item.value = res.join('\n').replace(arrayReg,(item)=>{
                    return item.split('\n').map((citem,index)=>{
                        const reg = /(?<=\d+\.\s+<span class="(hljs-number|hljs-string)")>/g
                        return citem.replace(reg,' data-atr="arry-value-'+ index +'">')
                    }).join('\n')
                })
                oldCode = item.code as string
            }
        })



        code.addEventListener('click',(e:Event)=>{
           
            if(!(e.target && ['hljs-string','hljs-number','change-item'].includes((e.target as HTMLSpanElement).className))){
                return
            }
            const targetEl = e.target as HTMLSpanElement
            
            navigator.clipboard.writeText(targetEl.innerText.replace(/"/g,'')).then(()=>{

                targetEl.setAttribute('copy-text','复制成功')

                setTimeout(()=>{
                    targetEl.removeAttribute('copy-text')
                },1000)

            }).catch((err)=>{
           
                targetEl.setAttribute('copy-text','复制失败')
                setTimeout(()=>{
                    targetEl.removeAttribute('copy-text')
                },1000)
            })

        })


        



    }

    private containerMove(){
        const { container } = this.dom
 

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

    private shadowPathData:string[] = []
    
    /**
     * 数据更新
     * @param {Object} data 
     */
    public update(data:any){
        
        this.oldData = this.data
        this.data = data
        const { code } = this.hlContainer
        
        // 克隆一个影子对象,他的值存成属性的路径
        const jsonshadowpath = JSON.stringify(this.addPath(JSON.parse(JSON.stringify(data))),null,2)
        const shadowPathhj = hljs.highlight(jsonshadowpath,{language:'tp'})
        this.shadowPathData = shadowPathhj.code?.split('\n') as string[]
        const json = JSON.stringify(data,null,2)
        const hj = hljs.highlight(json,{language:'javascript'})
       

       
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
        this.dom.body.style.height = (h - this.titleHeight - this.footerHeight) + 'px'
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


    public addPath(obj:any, path:any[] = []) {
        if (Array.isArray(obj)) {
            obj.map((item, idx) => this.addPath(item, [...path, idx]))
        } else if (typeof obj === "object") {
            // obj[objectPathKey] = path;
            for (const key in obj) {
                obj[key] = this.addPath(obj[key], [...path, key])
            }
        }
        if(typeof obj !== 'object' && !Array.isArray(obj)){
            obj = path.join(".")
        }
    
        return obj
    }

    setPath(path:string){

        const pathel = this.dom.popInfo.querySelector('ul li:nth-child(1) span:nth-child(2)') as HTMLSpanElement
        
        if(pathel){
            pathel.innerText = path
        }
    }
}








