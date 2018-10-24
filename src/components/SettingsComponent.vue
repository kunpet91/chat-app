<template>
  <div class="settings">
    <div class="settings__container">

      <div class="settings__container__accordion">
        <h4 class="settings__container__accordion__title"
            v-on:click="onToggleAccordion('photo')">Photo size settings
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
            v-on:click="onToggleAccordion('chat')">Chat settings
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
            v-on:click="onToggleAccordion('carousel')">Carousel size settings
            <a class="arrow arrow--bottom" role="button"
               v-bind:class="{'closed': !carouselSettingsVisible}"></a>            
            </h4>            
        <div class="settings__container__accordion__content" v-show="carouselSettingsVisible">
          <p class="settings__container__accordion__content__text">Width: 
            <span class="settings__container__accordion__content__text__inner">{{carouselWidth}}%</span>
          </p>
          <vue-slider v-model="carouselWidth"
                      v-bind:min="minCarouselDimension"
                      v-bind:max="maxCarouselDimension"
                      tooltip=false></vue-slider>
          <p class="settings__container__accordion__content__text">Height: 
            <span class="settings__container__accordion__content__text__inner">{{carouselHeight}}%</span>
          </p>
          <vue-slider v-model="carouselHeight"
                      v-bind:min="minCarouselDimension"
                      v-bind:max="maxCarouselDimension"
                      tooltip=false></vue-slider>    
        </div>  
      </div>   

    </div>   
  </div>
</template>

<script>

import vueSlider from 'vue-slider-component';

// the component stores data for the carousel settings, the photo settings and for the user name
export default {
  name: 'SettingsComponent',
  components: {
    vueSlider
  },  
  data() {
    return {
      minCarouselDimension: 50,
      maxCarouselDimension: 100,
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
    // toggle function for the 3 section
    onToggleAccordion(value) {
      switch (value) {
        case 'photo': 
          this.photoSettingsVisible = !this.photoSettingsVisible;
          break;
        case 'chat': 
          this.chatSettingsVisible = !this.chatSettingsVisible;
          break;
        case 'carousel': 
          this.carouselSettingsVisible = !this.carouselSettingsVisible;
          break;                    
      }
    },
    // update nickname if the input field wasn't empty on blur
    onBlur(e) {
      if (!e.target.value) {
        return;
      }

      this.nickName = this.nameModel;
      this.nameModel = '';
      this.$store.commit('updateNickName', this.nickName);
    }
  },
  // watchers are for the slider values.
  // if they have changed, the store will be notified
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
<style scoped lang="scss">
  @import "../scss/_colors.scss";
  .settings {
    user-select: none;
    overflow-y: auto;
    height: 100%;
    background-image: url('../assets/settings_alpha.png');
    background-repeat: repeat;
    background-size: 80%;    
    &__container {
      z-index: 2;
      padding: 0 4%;
      &__accordion {
        border: 2px solid $appBlue;
        border-radius: 16px;
        padding: 8px;
        margin: 24px 0;
        &__title {
          position: relative;
          font-size: 24px;
          font-weight: bold;
          color: $textColor;
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
            color: $textColor;
            &__inner {
              color: $appBlue;
            }          
          }
          &__input {
            display: block;
            margin-top: 8px;
            border: 2px solid $appBlue;
            padding: 4px;
            border-radius: 8px;
            color: $textColor;
            max-width: 100%;
          }
          .vue-slider-component {
            cursor: pointer;
          }
        }
      }      
    }
  }
</style>

