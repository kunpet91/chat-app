<template>
  <nav class="navigation">
      <router-link tag="button"
                   class="navigation__item"
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
  .navigation {
    width: 100%;
    display: flex;
    height: 30px;
    &__item {
      height: 100%;
      text-align: center;
      flex-grow: 1;
      flex-basis: 0;
      font-size: 14px;
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>

