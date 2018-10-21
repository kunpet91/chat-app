<template>
  <div class="application">
    <TheNavigationBar class="application__nav"></TheNavigationBar>
    <div class="application__view">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TheNavigationBar from './components/TheNavigationBar'

export default {
  name: 'app',
  data() {
    return {
      activeComponent: 'PhotosComponent'
    }
  },
  components: {
    'TheNavigationBar': TheNavigationBar
  }
}
</script>

<style lang="scss">
  .application {
    height: 100%;
    display: flex;
    flex-direction: column;
    &__nav {
      height: 24px;
    }
    &__view {
      flex: 1;
    }
    &__nav, &__view {
      position: relative;
    }
}
</style>
