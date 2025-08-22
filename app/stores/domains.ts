import { defineStore } from 'pinia'
export  const useDomains=defineStore('domain',{
    state:()=>({
        domains:{}
    }),
    actions:{
        set(domainId: string, name:string,url:string,API_KEY?:string){
            this.domains[domainId] = {
                name:name,
                url:url,
                API_KEY:API_KEY,
            }
        },
        get(domainId){
            return this.domains[domainId]||null
        }
    }
})