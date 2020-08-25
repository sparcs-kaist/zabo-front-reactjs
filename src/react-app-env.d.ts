/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test' | 'ci'
        PUBLIC_URL: string
        EXTEND_ESLINT: string
        NODE_PATH: string
    }
}
interface Window {
    Stripe: any
}
