<template>
  <div>
    <div class="search">
      <input
        v-model="keyword"
        class="search-input"
        type="text"
        placeholder="输入城市名或拼音"
      />
    </div>
    <div class="search-content" ref="search" v-show="keyword">
      <ul>
        <li
          class="search-item border-bottom"
          v-for="item of searchList"
          :key="item.id"
          @click="handleCityClick(item.name)"
        >
          {{ item.name }}
        </li>
        <li class="search-item border-bottom" v-show="hasNoData">
          您输入的内容没有匹配项
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BScroll from 'better-scroll'
export default {
  name: 'Search',
  props: {
    citiesList: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      keyword: '',
      timer: null,
      searchList: []
    }
  },
  computed: {
    hasNoData () {
      return !this.searchList.length
    }
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        const result = []
        if (this.keyword.trim().length) {
          for (const i in this.citiesList) {
            this.citiesList[i].forEach(item => {
              if (item.spell.indexOf(this.keyword) > -1 || item.name.indexOf(this.keyword) > -1) {
                result.push(item)
              }
            })
          }
        }
        this.searchList = result
      }, 200)
    }
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.search, {
      click: true
    })
  },
  methods: {
    handleCityClick (city) {
      this.keyword = ''
      this.changeCity(city)
    },
    ...mapActions(['changeCity'])
  }
}
</script>

<style lang="stylus" scoped>
.search {
  height: 0.72rem;
  padding: 0.2rem 0.1rem 0.1rem;
  background-color: #00bcd4;

  .search-input {
    box-sizing: border-box;
    width: 100%;
    height: 0.62rem;
    padding: 0 0.1rem;
    line-height: 0.62rem;
    border-radius: 0.06rem;
    text-align: center;
    color: #666;
  }
}

.search-content {
  position: absolute;
  top: 1.02rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 1;
  background-color: #efefef;

  .search-item {
    line-height: 0.62rem;
    padding-left: 0.2rem;
    background-color: #fff;
    color: #666;
  }
}
</style>
