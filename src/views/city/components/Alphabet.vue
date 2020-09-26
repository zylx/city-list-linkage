<template>
  <ul class="alphabet-list">
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
  </ul>
</template>

<script>
export default {
  name: 'Alphabet',
  data () {
    return {
      letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      touchActive: false,
      startY: 0,
      timer: null
    }
  },
  updated () {
    this.startY = this.$refs.A[0].offsetTop || 0
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
          const touchY = e.touches[0].clientY - 110 // 字母A距离顶栏下边框得高度
          const index = Math.floor((touchY - this.startY) / 20) // 20 为字母的高度，通过此计算出字母的下标值
          if (index >= 0 && index <= this.letters.length) {
            this.$emit('change', this.letters[index])
          }
          this.timer = null
        }, 30)
      }
    },
    handleTouchEnd () {
      this.touchActive = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.alphabet-list {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 1.36rem;
  right: 0;
  bottom: 0;
  width: 0.5rem;

  .item {
    line-height: 0.4rem;
    text-align: center;
    color: #00bcd4;
  }
}
</style>
