// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr:true,
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    css: [
        '@fortawesome/fontawesome-free/css/all.min.css',
        'element-plus/dist/index.css'
    ],
    modules: [
        '@element-plus/nuxt',
        '@pinia/nuxt'
    ],
})
