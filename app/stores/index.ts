import {defineStore} from 'pinia'

export const useStore =  defineStore('main',{
    state: ()=>({
        isModalOpened: false,
    }),
    actions:{
        openModal(){
            this.isModalOpened = true
        },
        closeModal(){
            this.isModalOpened = false
        }
    }
})
