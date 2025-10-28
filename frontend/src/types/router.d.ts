import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: Array<'admin' | 'controller' | 'user'>
    layout?: 'admin' | 'default' | 'auth' | 'controller'
  }
}
