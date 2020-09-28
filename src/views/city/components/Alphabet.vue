<template>
  <ul class="alphabet-list" ref="bar">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @click="handleLetterClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      {{ item }}
    </li>
    <div
      class="active-letter"
      :style="{ top: activeLetterTop + 'px' }"
      v-show="activeLetter"
    >
      <span>{{ activeLetter }}</span>
    </div>
  </ul>
</template>

<script>
export default {
  name: 'Alphabet',
  data () {
    return {
      letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      activeLetter: '',
      activeLetterTop: 0,
      startY: 0,
      touchActive: false,
      timer: null
    }
  },
  mounted () {
    this.startY = this.$refs.bar.offsetTop + this.$refs.A[0].offsetTop || 0 // 字母A距离文档边框顶部的高度
  },
  methods: {
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText)
    },
    handleTouchStart () {
      this.touchActive = true
    },
    handleTouchMove (e) {
      if (this.touchActive) {
        // 节流，减少频繁触发带来的资源消耗
        if (this.timer) return
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY || e.touches[0].pageY
          const index = Math.floor((touchY - this.startY) / 18) // 18 为字母的高度，通过此计算出字母的下标值
          if (index >= 0 && index <= this.letters.length) {
            this.activeLetter = this.letters[index]
            this.activeLetterTop = this.$refs.A[0].offsetTop + index * 18 // 字母A偏离导航栏顶部高度作为初始值，加上滑动到其他字母距离字母顶部边框的高度，实现圆形气泡跟随
            this.$emit('change', this.activeLetter)
          }
          this.timer = null
        }, 30)
      }
    },
    handleTouchEnd () {
      this.touchActive = false
      this.activeLetter = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.alphabet-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 2.5rem;
  right: 0;
  bottom: 0;
  width: 0.5rem;

  .item {
    line-height: 0.36rem;
    text-align: center;
    color: #00bcd4;
  }

  .active-letter {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: -360%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: #CCC;

    span {
      font-size: 0.6rem;
      color: #FFF;
    }
  }
}
</style>
