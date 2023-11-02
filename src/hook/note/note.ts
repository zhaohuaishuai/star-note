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
 
        if(!noteApp){
            noteApp = new StarNote({y:90})
            noteApp.update(data.value)
        }
 
    })

    function cr(){
        if(!noteApp){
            noteApp = new StarNote({y:90})
            noteApp.update(data.value)
        }
    }

    onActivated(()=>{
     
        noteApp = new StarNote({y:90})
        noteApp.update(data.value)
    })

    onUnmounted(() => {
 
        noteApp &&  noteApp.destory()
        window.removeEventListener('dblclick',cr)
    });
    onDeactivated(()=>{
        
        noteApp && noteApp.destory()
        window.removeEventListener('dblclick',cr)
    })
    

    return 
}




