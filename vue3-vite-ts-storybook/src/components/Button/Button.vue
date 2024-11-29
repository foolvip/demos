<template>
  <div>
    <button type="button" :class="classes" @click="onClick" :style="style">{{ label }} </button>
    <div class="sb-content">
      storybook组件内容
    </div>
    <!-- <el-tabs v-model="state.status" @tab-click="handleClick">
            <el-tab-pane
                :label="`全部（${state.data.sum || 0}）`"
                name=""
            ></el-tab-pane>
            <el-tab-pane
                :label="`成功（${state.data.sucCount || 0}）`"
                name="1"
            ></el-tab-pane>
            <el-tab-pane
                :label="`导出中（${state.data.processingCount || 0}）`"
                name="2"
            ></el-tab-pane>
            <el-tab-pane
                :label="`导出失败（${state.data.failCount || 0}）`"
                name="3"
            ></el-tab-pane>
        </el-tabs> -->
  </div>
</template>

<script lang="ts" setup>
import './button.css';
import { computed, onMounted, reactive } from 'vue';
import api from '@/api'

const emit = defineEmits<{
  (e: 'click', id: number): void;
}>();

const classes = computed(() => ({
  'storybook-button': true,
  'storybook-button--primary': props.primary,
  'storybook-button--secondary': !props.primary,
  [`storybook-button--${props.size || 'medium'}`]: true,
}));

const style = computed(() => ({
  backgroundColor: props.backgroundColor
}));

const onClick = () => {
  emit("click", 1)
};

interface DownloadManageProps {
  userId: string;
  /**
   * The label of the button
   */
   label: string,
  /**
   * primary or secondary button
   */
  primary?: boolean,
  /**
   * size of the button
   */
  size?: 'small' | 'medium' | 'large',
  /**
   * background color of the button
   */
  backgroundColor?: string,

  reqParams?:{[propName: string]: any};
  reqHeaders?: {[propName: string]: any};
  config?: {[propName: string]: any};
}

const props = defineProps<DownloadManageProps>()
  const state = reactive({
    count: 0,
    results: [],
    page: 1,
    pageSize: 10,
    status: '',
    data: {} as any
})


onMounted(() => {
    queryList()
})

const queryList = (status = '') => {
    api.queryDownloadTaskList({
        status: status === '0' ? '' : status,
        page: state.page,
        pageSize: state.pageSize,
        userId: props.userId
    }).then((res: any) => {
        const { data } = res.result || {}
        state.count = data?.count || 0
        state.results = data?.results || []
        state.data = res.result
    })
}
// const handleClick = () => {
//     state.page = 1
//     queryList(state.status)
// }

</script>