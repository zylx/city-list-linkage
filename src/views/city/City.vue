<template>
  <div>
    <search />
    <list />
    <alphabet />
  </div>
</template>

<script>
import Search from './components/Search'
import List from './components/List'
import Alphabet from './components/Alphabet'
export default {
  name: 'City',
  components: {
    Search,
    List,
    Alphabet
  }
}
</script>