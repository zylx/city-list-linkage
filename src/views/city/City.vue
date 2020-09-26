<template>
  <div>
    <search :citiesList="citiesList"/>
    <list
      :citiesList="citiesList"
      :letter="letter"
    />
    <alphabet @change="letterSelect" />
  </div>
</template>

<script>
import Search from './components/Search'
import List from './components/List'
import Alphabet from './components/Alphabet'
export default {
  name: 'City',
  data () {
    return {
      letter: '',
      citiesList: {}
    }
  },
  created () {
    this.getCityInfo()
  },
  methods: {
    getCityInfo () {
      this.$axios.get('./mock/cities.json')
        .then(res => {
          const { status, data } = res
          if (status === 200 && data) {
            this.citiesList = data
          }
        })
        .catch(err => {
          console.log('getCityInfo -> err', err)
        })
    },
    letterSelect (letter) {
      this.letter = letter
    }
  },
  components: {
    Search,
    List,
    Alphabet
  }
}
</script>