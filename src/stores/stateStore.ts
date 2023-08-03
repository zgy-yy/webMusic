import { defineStore } from 'pinia'
import { ref } from 'vue'

const useStateStore = defineStore('state', () => {
  const isLoading = ref(true)
  const showNormalPlayer = ref(false)
  const animationState = ref()

  return {
    isLoading,
    showNormalPlayer,
    animationState
  }
})

export default useStateStore
