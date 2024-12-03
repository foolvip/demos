<template>
  <div class="common-layout">
    <el-container>
      <el-header class="pageHeader">Header</el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu :default-active="activeMenu" :collapse="isCollapse"
             :collapse-transition="false"
              :unique-opened="true" :router="true"  mode="vertical">
              <!-- <navbar-item v-for="menu in menuList" :key="menu.path" :item="menu" /> -->
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <RouterView v-slot="{ Component }">
            <KeepAlive>
              <component :is="Component" v-if="route.meta.keepAlive" :key="route.fullPath" class="keep-alive" />
            </KeepAlive>
            <component :is="Component" v-if="!route.meta.keepAlive" :key="route.fullPath" />
          </RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const Router = useRouter()
  console.log('3333', Router.options.routes)
// const menuList = []
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
// 测边栏是否折叠
const isCollapse = inject('isSidebarCollapse', false)

</script>
<style lang="scss" scoped>
.pageHeader {
  background-color: aquamarine;
}
</style>
