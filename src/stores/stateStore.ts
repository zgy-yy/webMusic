import { defineStore } from 'pinia'
import { ref } from 'vue'

const useStateStore = defineStore('state', () => {
  const isLoading = ref(true)
  const animationState = ref()

  return {
    isLoading,
    animationState
  }
})

export default useStateStore
