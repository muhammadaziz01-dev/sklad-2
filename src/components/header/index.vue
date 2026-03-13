<template>
  <header class="header">
    <nav class="header--nav">
     <button @click="pushRouter"><img :src="arrowLeft" alt="icon arrow left"></button>
     <h2>Меню</h2>
     <img :src="iconHome" alt="icon home" class="header--nav--img-home">
    </nav>
  </header>
</template>

<script setup>
import {useRouter} from "vue-router"
import iconHome from "../../assets/iconHome.svg"
import arrowLeft from "../../assets/arrow-left.svg"
const router = useRouter()

const pushRouter = () =>{
    router.push('/') 
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
