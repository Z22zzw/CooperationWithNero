// composables/useProjectState.ts
import { useState } from '#app'

export const useProjectState = () => {
    return useState<boolean>('isProject', () => false)
}