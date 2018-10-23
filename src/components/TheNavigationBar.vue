<template>
  <nav class="navigation">
      <router-link tag="button"
                   class="navigation__item btn btn--blue"
                   v-for="tab in tabs" 
                   v-bind:key="tab.id"
                   :to="`${tab.url}`">
                   <span v-on:click="onTabClicked(tab.text)">{{tab.text}}</span>
      </router-link>
  </nav>
</template>

<script>
export default {
  name: 'TheNavigationBar',
  data() {
    return {
      tabs: [
        {
          id: 0,
          text: 'Chat',
          url:'/'
        },
        {
          id: 1,
          text: 'Photos',
          url:'/photos'
        },
        {
          id: 2,
          text: 'Settings',
          url:'/settings'
        }
      ]
    }
  },
  methods: {
    onTabClicked(tab) {
      this.$store.commit('setActiveTab', tab);
    }
  }
}
</script>
<style lang="scss">
  @import "../scss/_buttons.scss";
  .navigation {
    width: 100%;
    display: flex;
    &__item {
      height: 100%;
      flex-grow: 1;
      flex-basis: 0;
      &.router-link-exact-active {
        background-color: #0061a2;
      }
    }
  }
</style>

