// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig:{
        public:{
            apiBase:"http://localhost:5267",
        }
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: [
        '@fortawesome/fontawesome-free/css/all.min.css',
        'element-plus/dist/index.css'
    ],
    modules: [
        '@element-plus/nuxt'
    ],
})
