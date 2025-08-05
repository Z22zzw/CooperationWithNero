// composables/useReadState.ts
import { useState } from '#app'

export const useReadState = () => {
    return useState<boolean>('isRead', () => false)
}