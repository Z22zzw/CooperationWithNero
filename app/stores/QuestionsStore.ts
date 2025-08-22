import { defineStore } from 'pinia'
export const useQuestionStore = defineStore('question', {
    state: () => ({
        cache: new Map<string, Map<string, string>>()
    }),
    actions: {
        set(questionId: string, tabName: string, rawAnswer: string) {
            this.$patch((state) => {
                if (!state.cache.has(questionId)) {
                    state.cache.set(questionId, new Map())
                }
                state.cache.get(questionId)!.set(tabName, rawAnswer)
            })
        },
        get(questionId: string, tabName: string): string | undefined {
            return this.cache.get(questionId)?.get(tabName)
        },
        has(questionId: string, tabName: string): boolean {
            return this.cache.has(questionId) && this.cache.get(questionId)!.has(tabName)
        },
        delete(questionId: string, tabName: string): boolean {
            const tabMap = this.cache.get(questionId)
            if (tabMap) {
                return tabMap.delete(tabName)
            }
            return false
        },
        show() {
            console.group('[QuestionStore] Current Cache')
            this.cache.forEach((tabMap, questionId) => {
                console.group(`Question ID: ${questionId}`)
                tabMap.forEach((answer, tabName) => {
                    const truncated = answer.length > 100
                        ? answer.slice(0, 100) + '...'
                        : answer
                    console.log(`  ${tabName}: "${truncated}"`)
                })
                console.groupEnd()
            })
            console.groupEnd()
        },
        clear() {
            this.cache = new Map()
        }
    }
})