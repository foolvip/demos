import { defineAsyncComponent, AsyncComponentLoader } from 'vue'
import AsyncLoading from '@/components/Loading/index.vue'

/**
 * * 异步加载组件
 * @param loader
 * @returns
 */
export const loadAsyncComponent = (loader: AsyncComponentLoader<any>) =>
  defineAsyncComponent({
    loader,
    loadingComponent: AsyncLoading,
    delay: 20,
  })
  
// export const loadSkeletonAsyncComponent = (loader: AsyncComponentLoader<any>) =>
//   defineAsyncComponent({
//     loader,
//     loadingComponent: AsyncSkeletonLoading,
//     delay: 20,
//   })
