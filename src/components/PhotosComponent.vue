<template>
  <div class="photo-container">
    <div class="photo-container__item" v-for="image in images" :key="image.id"
         v-bind:style="{ transform: 'translateX('+ image.translateX + '%)'}">
      <img class="photo-container__item__img" v-bind:src="image.src"/>
    </div>
    <a class="arrow arrow--left" role="button"
       v-on:click="onPrevImage"
       v-if="activeIndex > 0"></a>
    <a class="arrow arrow--right" role="button"
       v-on:click="onNextImage"></a>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  name: 'PhotosComponent',
  data() {
    return {
      width: this.$store.state.settingsWidth,
      height: this.$store.state.settingsHeight,
      images: this.$store.state.images,
      activeIndex: this.$store.state.activeIndex
    }
  },
  methods: {
    getNewImage() {
      this.images.push({
        id: this.images.length,
        //src: 'https://wallpaperbrowse.com/media/images/750814.jpg',
        //src: 'http://lorempixel.com/' + this.width + '/' + this.height
        src: 'https://picsum.photos/' + this.width + '/' + this.height + '?image=' + Math.floor(Math.random() * 999)
        //src: 'https://www.nationalgeographic.com/content/dam/photography/photos/000/000/6.ngsversion.1467942028599.adapt.1900.1.jpg'
      });
    },
    onNextImage() {
      this.activeIndex++;
      if (!this.images[this.activeIndex]) {
        this.getNewImage();
      }

       this.$store.commit('updateImages', this.images);
       this.$store.commit('updateActiveIndex', this.activeIndex);

      this.transformImages(this.activeIndex);
    },
    transformImages(index) { 
      this.images.forEach(element => {
        Vue.set(element, 'translateX', (element.id - index) * 100)
      });
    },
    onPrevImage() {
      if (this.activeIndex === 0) {
        return;
      }

      this.activeIndex--;
      this.$store.commit('updateActiveIndex', this.activeIndex);
      this.transformImages(this.activeIndex);
    }
  },
  mounted() {
    if (!this.images.length) {
      this.getNewImage();
    } else {
      this.transformImages(this.activeIndex);
    }
  }
}
</script>
<style lang="scss">
  @import "../scss/_buttons.scss";
  @import "../scss/_mixin.scss";
  .photo-container {
    position: relative;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    &__item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: transform 0.3s ease-in-out;
      &__img {
        max-width: 100%;
        max-height: 100%;
        margin: 0 auto;
        display: block;
        @include centerWithAbsolute(true, true);
      }
    }
    .arrow {
      @include centerWithAbsolute(false, true);  
    }
  }
</style>

