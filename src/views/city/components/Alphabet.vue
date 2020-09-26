<template>
  <ul class="alphabet-list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @click="handleLetterClick"
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
  methods: {
    handleLetterClick (e) {
      console.log(e.target.innerText)
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
  top: 1.58rem;
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
