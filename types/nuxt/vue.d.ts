import { UA } from 'nuxt-user-agent/lib/types'
import Vue from 'vue'
import { Gtag } from '@/types/gtag'

declare module '@nuxt/vue-app' {
  interface Context {
    $ua: UA
    $gtag: Gtag
  }
}

declare module '@nuxt/types' {
  interface Context {
    $ua: UA
    $gtag: Gtag
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $ua: UA
    $gtag: Gtag
  }
}

declare module 'vuex' {
  interface Store<S> {
    $ua: UA
    $gtag: Gtag
  }
}

declare module '@vue/composition-api' {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] }
  }
}
