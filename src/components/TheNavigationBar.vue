<template>
  <nav class="navigation">
      <router-link tag="button"
                   class="navigation__item btn btn--blue"
                   v-for="link in links" 
                   v-bind:key="link.id"
                   :to="`${link.page}`">{{link.text}}</router-link>
  </nav>
</template>

<script>
export default {
  name: 'TheNavigationBar',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Chat',
          page:'/'
        },
        {
          id: 1,
          text: 'Photos',
          page:'/photos'
        },
        {
          id: 2,
          text: 'Settings',
          page:'/settings'
        }
      ]
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
    }
  }
</style>

