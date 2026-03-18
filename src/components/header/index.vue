<template>
  <header class="header">
    <nav class="header--nav">
     <button @click="pushRouter"><img :src="arrowLeft" alt="icon arrow left"></button>
     <h2>{{ allprops?.props?.title }}</h2>
     <img :src="logautIcon" alt="icon home" class="header--nav--img-home" @click="logaut">
    </nav>
  </header>
</template>

<script setup>
import {useRouter} from "vue-router"
import arrowLeft from "../../assets/arrow-left.svg"
import logautIcon from "../../assets/box-arrow-right.svg"

const router = useRouter()

const allprops = defineProps({
    props: Object
})

const pushRouter = () =>{
    router.push(allprops?.props?.ruot) 
}

const logaut =()=>{
    router.push("/")
}


</script>

<style lang="scss" scoped>
.header{
    padding: 15px 8px;

    &--nav{
        display: flex;
        align-items: center;
        justify-content:space-between;
        
        button{
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background: none;
            padding: 7px;

            img{
                width: 24px;
                height: 24px;
            }

        }

        &--img-home{
            width: 24px;
            height: 24px;
            
        }

    }

}
</style>
