<template>
  <div class="photos"
       v-touch:swipe.left="onNextImage"
       v-touch:swipe.right="onPrevImage">
    <div class="photos__carousel"
        v-bind:style="{ width: carouselWidth + '%', height: carouselHeight + '%', top: ((100 - carouselHeight) / 2) + '%'}">
      <div class="photos__carousel__item" v-for="image in images" :key="image.id"
          v-bind:style="{ transform: 'translateX('+ image.translateX + '%)'}">
        <img class="photos__carousel__item__img" v-bind:src="image.src"/>
      </div>
      <div class="photos__carousel__controls">
        <a class="arrow arrow--left" role="button"
          v-on:click="onPrevImage"
          v-if="activeIndex > 0"></a>
        <a class="arrow arrow--right" role="button"
          v-on:click="onNextImage"></a>
      </div>
    </div>    
  </div>
</template>

<script>

import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents)

export default {
  name: 'PhotosComponent',
  data() {
    return {
      width: this.$store.state.photoWidth,
      height: this.$store.state.photoHeight,
      images: this.$store.state.images,
      activeIndex: this.$store.state.activeIndex,
      carouselWidth: this.$store.state.carouselWidth,
      carouselHeight: this.$store.state.carouselHeight
    }
  },
  methods: {
    getNewImage() {
      this.images.push({
        id: this.images.length,
        width: this.width,
        height: this.height,
        src: 'https://picsum.photos/' + this.width + '/' + this.height + '?image=' + Math.floor(Math.random() * 999)
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
        element.translateX = (element.id - index) * 100;
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
  .photos {
    position: relative;
    width: 100%;
    height: 100%;
    &__carousel {
      position: relative;
      background-color: #f3f3f3;
      height: 100%;
      width: 100%;
      margin: 0 auto;
      overflow-x: hidden;
      max-height: 100%;
      max-width: 100%;
      &__controls {
        position: absolute;
        @include centerWithAbsolute(false, true); 
        width: 100%;
        padding: 8px;
        .arrow {
          &--left {
            float: left;
          }
          &--right {
            float: right;
          }          
        }   
      }
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
    }
  }
</style>

