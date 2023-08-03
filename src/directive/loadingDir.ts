import type { Directive } from 'vue'
import { h, render } from 'vue'
import Loading from '@/components/Loading.vue'

const loading: Directive = {
  created(el: HTMLElement, binding) {
    const loadingNode = h(Loading)
    if (binding.value) {
      render(loadingNode, el)
    }
  },
  beforeUpdate(el: HTMLElement, binding) {
    const loadingNode = h(Loading)
    if (binding.value) {
      render(loadingNode, el)
    } else {
      render(null, el)
    }
  }
}

export default loading
