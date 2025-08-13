// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        // 明确使用 CommonJS 而非 ESM
        preset: 'node-server', // 或 'node'、'node-cluster'
    },
    ssr:true,
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
