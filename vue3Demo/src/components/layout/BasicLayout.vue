<template>
  <n-space vertical>
    <n-switch v-model:value="collapsed" />
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          :options="menuOptions"
        />
      </n-layout-sider>
      <n-layout>
        <router-view>
          <template #default="{ Component, route }">
            <component v-if="route.meta.noKeepAlive" :is="Component"></component>
            <keep-alive v-else>
              <component :is="Component"></component>
            </keep-alive>
          </template>
        </router-view>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import type { Component } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
import {routes} from '@/router/index'
console.log('router---routes-:', routes)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon || BookmarkOutline) })
}

const getMenuOptions= (menus: MenuOption[]) => {
  const menuOptions = menus.map(item => {
    let newItem = {...item }
    if (item.children && item.children.length === 1) {
      newItem = {...item.children[0]}
    }
    const itemMenu = {
      // label: item.meta ? item.meta.title : item.children ? item.children[0].meta.title : '',
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: newItem.name,
            },
          },
          { default: () => newItem.meta ? newItem.meta.title : '' }
        ),
      key: newItem.name,
      disabled:  newItem.meta ? newItem.meta.disabled : false,
      icon: renderIcon(newItem.meta ? newItem.meta.icon : '')
    }
    if (newItem.children && newItem.children.length === 1) {
      itemMenu.children = getMenuOptions(newItem.children)
    }
    if (newItem.children && newItem.children.length > 1) {
      itemMenu.children = getMenuOptions(newItem.children)
    }
    console.log(itemMenu, 'itemMenu335')
    return itemMenu
  })

  return menuOptions;
}

const menu = routes.slice(1)
const menuOptions = getMenuOptions(menu)

// const menuOptions: MenuOption[] = [
//   {
//     label: '且听风吟',
//     key: 'hear-the-wind-sing',
//     href: 'https://baike.baidu.com/item/%E4%B8%94%E5%90%AC%E9%A3%8E%E5%90%9F/3199'
//   },
//   {
//     label: '1973年的弹珠玩具',
//     key: 'pinball-1973',
//     // disabled: true,
//     children: [
//       {
//         label: '鼠',
//         key: 'rat'
//       }
//     ]
//   },
//   {
//     label: '寻羊冒险记',
//     key: 'a-wild-sheep-chase',
//     disabled: true
//   },
//   {
//     label: '舞，舞，舞',
//     key: 'dance-dance-dance',
//     children: [
//       {
//         type: 'group',
//         label: '人物',
//         key: 'people',
//         children: [
//           {
//             label: '叙事者',
//             key: 'narrator'
//           },
//           {
//             label: '羊男',
//             key: 'sheep-man'
//           }
//         ]
//       },
//       {
//         label: '饮品',
//         key: 'beverage',
//         children: [
//           {
//             label: '威士忌',
//             key: 'whisky',
//             href: 'https://baike.baidu.com/item/%E5%A8%81%E5%A3%AB%E5%BF%8C%E9%85%92/2959816?fromtitle=%E5%A8%81%E5%A3%AB%E5%BF%8C&fromid=573&fr=aladdin'
//           }
//         ]
//       },
//       {
//         label: '食物',
//         key: 'food',
//         children: [
//           {
//             label: '三明治',
//             key: 'sandwich'
//           }
//         ]
//       },
//       {
//         label: '过去增多，未来减少',
//         key: 'the-past-increases-the-future-recedes'
//       }
//     ]
//   }
// ]
const collapsed = ref(true)

const renderMenuLabel = (option: MenuOption) => {
  if ('href' in option) {
    return h(
      'a',
      { href: option.href, target: '_blank' },
      option.label as string
    )
  }
  return option.label as string
}
const renderMenuIcon = (option: MenuOption) => {
  // 渲染图标占位符以保持缩进
  if (option.key === 'sheep-man')
    return true
  // 返回 falsy 值，不再渲染图标及占位符
  if (option.key === 'food')
    return null
  return h(NIcon, null, { default: () => h(BookmarkOutline) })
}

const expandIcon = () => {
  return h(NIcon, null, { default: () => h(CaretDownOutline) })
}
</script>