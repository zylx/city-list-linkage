<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{ currentCity }}</div>
          </div>
        </div>
      </div>
      <div
        class="area"
        v-for="(items, key) of citiesList"
        :key="key"
        :ref="key"
      >
        <div class="title border-topbottom">{{ key }}</div>
        <ul class="item-list">
          <li
            class="item border-bottom"
            v-for="item of items"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'List',
  props: {
    letter: {
      type: String
    },
    citiesList: {
      type: Object,
      default: () => { }
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true
    })
  },
  computed: {
    ...mapState({
      currentCity: 'city'
    })
  },
  watch: {
    letter () {
      if (this.letter) {
        const element = this.$refs[this.letter] && this.$refs[this.letter][0]
        this.scroll.scrollToElement(element)
      }
    }
  },
  methods: {
    handleCityClick (city) {
      this.changeCity(city)
      this.scroll.scrollToElement(this.$refs.wrapper)
    },
    ...mapActions(['changeCity'])
  }
}
</script>

<style lang="stylus" scoped>
.border-topbottom {
  &:before {
    border-color: #ccc;
  }

  &:after {
    border-color: #ccc;
  }
}

.border-bottom {
  &:before {
    border-color: #ccc;
  }
}

.list {
  position: absolute;
  top: 1.22rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  .title {
    padding-left: 0.2rem;
    line-height: 0.54rem;
    font-size: 0.26rem;
    color: #666;
    background-color: #eee;
  }

  .button-list {
    padding: 0.1rem 0.6rem 0.1rem 0.1rem;
    overflow: hidden;

    .button-wrapper {
      float: left;
      width: 33.33%;

      .button {
        margin: 0.1rem;
        padding: 0.1rem 0;
        border: 0.02rem solid #ccc;
        border-radius: 0.06rem;
        text-align: center;
      }
    }
  }

  .item-list {
    padding: 0 0.2rem;

    .item {
      line-height: 0.76rem;
      padding-left: 0.1rem;
    }
  }
}
</style>
