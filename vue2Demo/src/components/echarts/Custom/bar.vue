<template>
  <div class="customBar">
    <div class="titleIcon">性别</div>
    <div class="rateWrap">
      <div class="top">
        <span><span class="sex">男</span><span class="num">546</span>45%</span>
        <span><span class="sex">女</span><span class="num">546</span>45%</span>
      </div>
      <div class="bottom" :style="`grid-template-columns: ${'30%'} auto`">
        <div class="bar left"></div>
        <div class="bar right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomBar',
};
</script>

<style lang="less" scoped>
.customBar {
  display: flex;
  align-items: center;
  padding: 0.12rem;
  background-color: #f7f9ff;
  border-radius: 0.04rem;

  .titleIcon {
    margin-right: 0.1rem;
    width: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
    text-align: center;
    vertical-align: middle;
    color: #fff;
    font-size: 0.12rem;
    border-radius: 0.04rem;
    background-color: #376df7;
  }

  .rateWrap {
    flex: 1;

    .top {
      display: flex;
      justify-content: space-between;
      font-size: 0.12rem;
      line-height: 0.16rem;
      color: #7b7b84;

      .sex {
        margin-right: 0.04rem;
        font-weight: 500;
        color: #3e3e40;
      }

      .num {
        position: relative;
        color: #376df7;
        margin-right: 0.06rem;

        &::after {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: -0.04rem;
          content: '';
          width: 1px;
          height: 0.08rem;
          background-color: #d5d7dc;
        }
      }
    }

    .bottom {
      display: grid;
      grid-column-gap: 2%;
      margin-top: 0.04rem;

      .bar {
        position: relative;

        &.left {
          background: #0063f2;
          border-top-left-radius: 0.04rem;
          border-bottom-left-radius: 0.04rem;

          &::after {
            position: absolute;
            top: 0;
            right: -0.03rem;
            content: '';
            width: 0.04rem;
            height: 100%;
            background: center/contain url(../../../assets/images/svgs/blue.svg) no-repeat;
          }
        }

        &.right {
          background: #f8c541;
          border-top-right-radius: 0.04rem;
          border-bottom-right-radius: 0.04rem;

          &::before {
            position: absolute;
            top: 0;
            left: -0.03rem;
            content: '';
            width: 0.04rem;
            height: 100%;
            background: center/contain url(../../../assets/images/svgs/yellow.svg) no-repeat;
          }
        }
      }
    }
  }

  .left,
  .right {
    height: 0.08rem;
  }
}
</style>
