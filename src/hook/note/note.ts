import { watch,Ref,onUnmounted,onActivated,onDeactivated, onMounted } from 'vue'

import StarNote from '../../core/note'

export function useNote(data:Ref<any>){
    
    let noteApp :any
    watch(()=>data.value,()=>{
        noteApp && noteApp.update(data.value)
    },{
        deep:true  
    })

    onMounted(()=>{
        console.log("onMounted note")
        if(!noteApp){
            noteApp = new StarNote({y:90})
            noteApp.update(data.value)
        }
        window.addEventListener('dblclick',cr)
    })

    function cr(){
        if(!noteApp){
            noteApp = new StarNote({y:90})
            noteApp.update(data.value)
        }
    }

    onActivated(()=>{
        console.log("onActivated note")
        noteApp = new StarNote({y:90})
        noteApp.update(data.value)
    })

    onUnmounted(() => {
        console.log("onUnmounted note")
        noteApp &&  noteApp.destory()
        window.removeEventListener('dblclick',cr)
    });
    onDeactivated(()=>{
        console.log("onDeactivated note")
        noteApp && noteApp.destory()
        window.removeEventListener('dblclick',cr)
    })
    

    return 
}




