<template>
  <div class="echarts">
    <div class="map-contianer">
      <MapChart />
    </div>
  </div>
</template>

<script>
import User from '@/api/user';
import MapChart from '@/components/echarts/Map/index.vue';

export default {
  components: {
    MapChart,
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {},
  created() {
    this.login();
  },
  methods: {
    async login() {
      const res = await User.login(this.username, this.password);
      console.log(res);
    },
  },
};
</script>

<style lang="less">
@media (min-width: 1024px) {
  .echarts {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
}
</style>
