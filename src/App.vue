<template>
  <div class="application">
    <TheNavigationBar class="application__nav"></TheNavigationBar>
    <div class="application__view">
      <router-view/>
    </div>
  </div>
</template>

<script>

// TheNavigatorBar component is used in the App component, it's always accessable on the top of the page
// The 3 main components (Chat, Photos, Settings) are loaded into the DOM using router

import TheNavigationBar from './components/TheNavigationBar'

export default {
  name: 'app',
  components: {
    'TheNavigationBar': TheNavigationBar
  },
  mounted() {
    // init socket in the store
    this.$store.dispatch('socketInit');
    // store current tab
    this.$store.commit('setActiveTab', this.$route.name);
  }
}
</script>

<style lang="scss">
  @import "./scss/_styles.scss";
  .application {
    height: 100%;
    display: flex;
    flex-direction: column;
    &__nav {
      height: 40px;
    }
    &__view {
      height: calc(100% - 40px);
      background-color: $appBg;
    }
    &__nav, &__view {
      position: relative;
    }
  }
  
  

</style>
