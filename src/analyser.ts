// const audio =  document.querySelector("#audio") as HTMLAudioElement
const audio =  new Audio('https://m701.music.126.net/20231024140927/092ea3a62408fb58d2a9bb38e0471f53/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/30600161906/b107/7ede/f00e/7684dda0d6d206b3a9c256efbf3db087.m4a')
audio.crossOrigin = 'anonymous'
const adBtn = document.querySelector("#play")
adBtn?.addEventListener("click",()=>{
    audio.play()
})

const audioContext = new AudioContext() 

const analyser = audioContext.createAnalyser()

const source = audioContext.createMediaElementSource(audio)

source.connect(analyser)

analyser.fftSize = 512

const bufferLength = analyser.frequencyBinCount

console.log("bufferLength:",bufferLength)

const dataArray = new Uint8Array(bufferLength)


audio.addEventListener('play',()=>{
    console.log("开始播放了")
    requestAnimationFrame(draw)
})


audio.addEventListener('timeupdate',()=>{
    // console.log(dataArray)
})


const canvas = document.querySelector("#canvas") as HTMLCanvasElement

const canvasCtx = canvas.getContext('2d') as CanvasRenderingContext2D 

const WIDTH = 300
const HEIGHT = 150

function draw(){
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
    analyser.getByteTimeDomainData(dataArray)
    canvasCtx.fillStyle = "rgb(200,200,200)"
    canvasCtx.fillRect(0,0,WIDTH,HEIGHT)
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0,0,0)"
    canvasCtx.beginPath()
    const sliceWidth = (WIDTH *1)/bufferLength
    let x = 0
    for(let i = 0 ; i <bufferLength;i++){
       
        let v = dataArray[i]/128.0
        let y = (v*HEIGHT)/2
        if(i===0){
            canvasCtx.moveTo(x,y)
        }else{
            canvasCtx.lineTo(x,y)
        }
        x+=sliceWidth 
    }
    canvasCtx.lineTo(canvas.width, canvas.height/2);
    canvasCtx.stroke();
    requestAnimationFrame(draw)
}
