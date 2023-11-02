<template>
    <div
        style="height: 12000px;width:100%;"
    >
        <button
        @click="()=>{
            formData.news = 120
        }"
        >更改数据</button>
    </div>
</template>
<script setup lang="ts" >
import {ref} from 'vue'
import {useNote} from '../../hook/note/note'
import {as,ab} from './data'
const formData = ref<any>(as)
useNote(formData)

</script>
<style scoped ></style>