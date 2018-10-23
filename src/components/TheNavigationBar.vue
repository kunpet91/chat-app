<template>
  <nav class="navigation">
      <router-link tag="button"
                   class="navigation__item btn btn--blue"
                   v-bind:class="{'btn--blinking': tab.id == 'chat' && hasNewMessage}"
                   v-for="tab in tabs" 
                   v-bind:key="tab.id"
                   v-on:click.native="onTabClick(tab.id)"
                   :to="`${tab.url}`">{{tab.text}}</router-link>
  </nav>
</template>

<script>
// the component stores the paths for the tabs
export default {
  name: 'TheNavigationBar',
  data() {
    return {
      tabs: [
        {
          id: 'chat',
          text: 'Chat',
          url:'/'
        },
        {
          id: 'photos',
          text: 'Photos',
          url:'/photos'
        },
        {
          id: 'settings',
          text: 'Settings',
          url:'/settings'
        }
      ]
    }
  },
  methods: {
    // sets the active tab in the store
    onTabClick(tab) {
      this.$store.commit('setActiveTab', tab);
    }
  },
  computed: {
    // get information from the store if there is a new message notification
    hasNewMessage() {
      return this.$store.state.hasNewMessage;
    }
  }
}
</script>
<style scoped lang="scss">
  .navigation {
    width: 100%;
    display: flex;
    &__item {
      height: 100%;
      flex-grow: 1;
      flex-basis: 0;
      border: 1px solid #0061a2;
      &.router-link-exact-active {
        background-color: #0061a2;
      }
    }
  }
</style>

