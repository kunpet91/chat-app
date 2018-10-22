<template>
  <div class="settings">
    <div class="settings__container">

      <div class="settings__container__accordion">
        <h4 class="settings__container__accordion__title"
            v-on:click="togglePhotoSettings">Photo size settings
            <a class="arrow arrow--bottom" role="button"
               v-bind:class="{'closed': !photoSettingsVisible}"></a>
        </h4>
        <div class="settings__container__accordion__content" v-show="photoSettingsVisible">
          <p class="settings__container__accordion__content__text">Width: 
            <span class="settings__container__accordion__content__text__inner">{{imageWidth}}px</span>
          </p>
          <vue-slider v-model="imageWidth"
                      v-bind:min="minImageDimension"
                      v-bind:max="maxImageDimension"
                      tooltip=false></vue-slider>
          <p class="settings__container__accordion__content__text">Height: 
            <span class="settings__container__accordion__content__text__inner">{{imageHeight}}px</span>
          </p>
          <vue-slider v-model="imageHeight"
                      v-bind:min="minImageDimension"
                      v-bind:max="maxImageDimension"
                      tooltip=false></vue-slider>    
        </div>  
      </div>

      <div class="settings__container__accordion">
        <h4 class="settings__container__accordion__title"
            v-on:click="toggleChatSettings">Chat settings
            <a class="arrow arrow--bottom" role="button"
               v-bind:class="{'closed': !chatSettingsVisible}"></a>            
            </h4>
        <div class="settings__container__accordion__content" v-show="chatSettingsVisible">
          <p class="settings__container__accordion__content__text">Your nickname: 
            <span class="settings__container__accordion__content__text__inner">{{nickName}}</span>
          </p>
          <input v-model="nameModel" maxlength="20"
                class="settings__container__accordion__content__input"
                placeholder="Change it here!"
                v-on:blur="onBlur">
          
        </div>
      </div>

      <div class="settings__container__accordion">
        <h4 class="settings__container__accordion__title"
            v-on:click="toggleCarouselSettings">Carousel size settings
            <a class="arrow arrow--bottom" role="button"
               v-bind:class="{'closed': !carouselSettingsVisible}"></a>            
            </h4>            
        <div class="settings__container__accordion__content" v-show="carouselSettingsVisible">
          <p class="settings__container__accordion__content__text">Width: 
            <span class="settings__container__accordion__content__text__inner">{{carouselWidth}}%</span>
          </p>
          <vue-slider v-model="carouselWidth"
                      v-bind:min=50
                      v-bind:max=100
                      tooltip=false></vue-slider>
          <p class="settings__container__accordion__content__text">Height: 
            <span class="settings__container__accordion__content__text__inner">{{carouselHeight}}%</span>
          </p>
          <vue-slider v-model="carouselHeight"
                      v-bind:min=50
                      v-bind:max=100
                      tooltip=false></vue-slider>    
        </div>  
      </div>   

    </div>   
  </div>
</template>

<script>

import vueSlider from 'vue-slider-component';

export default {
  name: 'SettingsComponent',
  components: {
    vueSlider
  },  
  data() {
    return {
      minImageDimension: 200,
      maxImageDimension: 2000,
      imageWidth:  this.$store.state.photoWidth,
      imageHeight: this.$store.state.photoHeight,
      carouselWidth:  this.$store.state.carouselWidth,
      carouselHeight: this.$store.state.carouselHeight,      
      nickName: this.$store.state.nickName,
      nameModel: '',
      photoSettingsVisible: true,
      chatSettingsVisible: true,
      carouselSettingsVisible: true
    }
  },
  methods: {
    togglePhotoSettings() {
      this.photoSettingsVisible = !this.photoSettingsVisible;
    },
    toggleChatSettings() {
      this.chatSettingsVisible = !this.chatSettingsVisible;
    },
    toggleCarouselSettings() {
      this.carouselSettingsVisible = !this.carouselSettingsVisible;
    },    
    onBlur() {
      this.nickName = this.nameModel;
      this.nameModel = '';
      this.$store.commit('updateNickName', this.nickName);
    }
  },
  watch: {
  	'imageWidth': function(newVal) {
      this.$store.commit('updatePhotoWidth', newVal);
    },
    'imageHeight': function(newVal) {
      this.$store.commit('updatePhotoHeight', newVal);
    },
  	'carouselWidth': function(newVal) {
      this.$store.commit('updateCarouselWidth', newVal);
    },
    'carouselHeight': function(newVal) {
      this.$store.commit('updateCarouselHeight', newVal);
    }    
  }
}
</script>
<style lang="scss">

  .settings {
    overflow-y: auto;
    height: 100%;
    &__container {
      padding: 0 4%;
      &__accordion {
        border: 2px solid #3498db;
        border-radius: 16px;
        padding: 8px;
        margin: 24px 0;
        &__title {
          position: relative;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          .arrow {
            position: absolute;
            right: 12px;
            transition: transform ease 0.3s;
            &.closed {
              transform: rotate(180deg);
            }
          }
        }
        &__content {
          padding: 8px;
          &__text {
            font-size: 18px;
            &__inner {
              color: #3498db;
            }          
          }
          &__input {
            display: block;
            margin-top: 8px;
            border: 2px solid #3498db;
            padding: 4px;
          }
        }
      }      
    }
  }
</style>

