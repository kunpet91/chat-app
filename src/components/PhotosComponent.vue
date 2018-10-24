<template>
  <div class="photos"
       v-touch:swipe.left="onNextImage"
       v-touch:swipe.right="onPrevImage">
    <div class="photos__carousel"
        v-bind:style="{ width: carouselWidth + '%', height: carouselHeight + '%', top: ((100 - carouselHeight) / 2) + '%'}">
      <div class="spinner"></div>
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

// Component data is intiialized from the store.
// We only need the current values when the component is loaded because they won't change 
// in the store during photo navigation

import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'

// Vue2Touch Events is used for swipe events: 
// v-touch:swipe.left
// v-touch:swipe.right

// import the photos URI
import { photosUri } from '../other/urls.js'

Vue.use(Vue2TouchEvents)

export default {
  name: 'PhotosComponent',
  // computed could have been used, but these values won't change from other source,
  // so I just loaded them from the store in the data()
  data() {
    return {
      width: this.$store.state.photoWidth,
      height: this.$store.state.photoHeight,
      images: this.$store.state.images,
      activeIndex: this.$store.state.activeIndex,
      carouselWidth: this.$store.state.carouselWidth,
      carouselHeight: this.$store.state.carouselHeight,
      photosUrl: photosUri
    }
  },
  methods: {
    // it will push a new photo item into the images array with the given width/height
    // I used picsum for the photos because lorempixel was always down
    // Note:
    // Basic idea was to use a HTTP service (axios) to fetch the photos,
    // but I hadn't got permission or had CORS rejections,
    // so I just stored the images based on the URLs.
    // I put the a pseudo code of the basic idea in a comment

    // getNewImage() {
    //   this.$http.get(url).then((response) => {
    //     store image data based on the response in this.images
    //   })
    // },
    getNewImage() {
      this.images.push({
        id: this.images.length,
        width: this.width,
        height: this.height,
        src: this.photosUrl + this.width + '/' + this.height + '?image=' + Math.floor(Math.random() * 999)
      });
    },
    // navigates to the next photo.
    // if there isn't, it will load a new one.
    // after the value changes, it will notify the store.
    onNextImage() {
      this.activeIndex++;
      if (!this.images[this.activeIndex]) {
        this.getNewImage();
      }

       this.$store.commit('updateImages', this.images);
       this.$store.commit('updateActiveIndex', this.activeIndex);

      this.transformImages(this.activeIndex);
    },
    // this function positions the images with translateX using animation from CSS as well
    transformImages(index) { 
      this.images.forEach(element => {
        element.translateX = (element.id - index) * 100;
      });
    },
    // navigates to the previous photo.
    onPrevImage() {
      if (this.activeIndex === 0) {
        return;
      }

      this.activeIndex--;
      this.$store.commit('updateActiveIndex', this.activeIndex);
      this.transformImages(this.activeIndex);
    }
  },
  // after the component loaded, get an image if we don't have.
  // if we do, position them correctly
  mounted() {
    if (!this.images.length) {
      this.getNewImage();
    } else {
      this.transformImages(this.activeIndex);
    }
  }
}
</script>
<style scoped lang="scss">
  @import "../scss/_mixin.scss";
  @import "../scss/_colors.scss";
  .photos {
    user-select: none; 
    position: relative;
    width: 100%;
    height: 100%;
    &__carousel {
      position: relative;
      background-color: $carouselBg;
      height: 100%;
      width: 100%;
      margin: 0 auto;
      overflow-x: hidden;
      max-height: 100%;
      max-width: 100%;
      .spinner {
        z-index: 1;
        opacity: 0.7;
        @include centerWithAbsolute(true, true);
        transform: none;
      }      
      &__controls {
        z-index: 3;
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
        z-index: 2;
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

