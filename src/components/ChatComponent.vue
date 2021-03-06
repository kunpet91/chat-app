<template>
  <div class="chat">
    <div class="chat__box">
      <div class="chat__box__messages">
            <div class="chat__box__messages__message"
                 v-for="(msg, index) in messages"
                 v-bind:class="'chat__box__messages__message--' + msg.type"
                 :key="index">
                <p v-if="msg.type !== 'sent'"
                   class="chat__box__messages__message__user">{{ msg.user }}</p>
                <div class="chat__box__messages__message__text"
                     v-bind:class="'chat__box__messages__message__text--' + msg.type">{{ msg.message }}</div>
            </div>
      </div>      
    </div>
    <div class="chat__sender">
        <form v-on:submit.prevent="onSendMessage" class="chat__sender__form">
            <input type="text" v-model="message"
             class="chat__sender__form__input"
             maxlength=100>
            <button type="submit"
             class="btn btn--blue chat__sender__form__btn"
             :disabled="!message">Send</button>
        </form>
    </div>
  </div>
</template>

<script>

export default {
  // this component is loading the messages and send new messages using the store
  name: 'ChatComponent',
    data() {
        return {
            user: this.$store.state.nickName,
            message: '',
            chatBoxElement: null
        }
    },
    computed: {
      // messages from the store
      messages() {
        return this.$store.state.messages;
      }
    },
    methods: {
        // sends a new message using the store
        onSendMessage() {
            const data = {
                user: this.user,
                message: this.message,
                type: 'sent'             
            };

            this.$store.dispatch('sendNewMessage', data);
            this.message = '';
          
            // scroll to the bottom when new message is sent
            this.scrollDownToNewestMessages();

        },
        scrollDownToNewestMessages() {
            let chatBoxElement = this.chatBoxElement;
            setTimeout(() => {
              chatBoxElement.scrollTop = chatBoxElement.scrollHeight - chatBoxElement.clientHeight; 
            }, 100);
        }
    },
    mounted() {
        // set flag to false when chat component is mounted
        this.$store.commit('setHasNewMessage', false);
      
        this.chatBoxElement = document.querySelector('.chat__box');
        // scroll down to the newest messages when component is mounted
        this.scrollDownToNewestMessages();
    }
}
</script>
<style scoped lang="scss">
  @import "../scss/_colors.scss";
  .chat {
    height: 100%;
    display: flex;
    flex-direction: column;
    &__box {
      flex-grow: 1;
      overflow-y: auto;
      &__messages {
        padding: 20px;
        &__message {
          margin-bottom: 10px;
          &--sent {
            text-align: right;
          }
          &--received {
            text-align: left;
          }
          &__user {
            font-weight: bold;
          }
          &__text {
            display: inline-block;
            border-radius: 4px;
            padding: 4px 6px;
            max-width: 80%; 
            &--sent {
              background-color: $textSentBg;      
            }
            &--received {
              background-color: $textReceivedBg;  
            }                  
          }
          &__user, &__text {
            font-size: 18px;
            color: $textColor;
          }
        }
      }
    }
    &__sender {
      height: 40px;
      &__form {
        height: 100%;
        display: flex;
        border-top: 3px solid black;
        &__input {
          flex-grow: 1;
          padding: 4px;
          font-size: 18px;
        }
        &__btn {
          padding: 0 24px;
        }
      }
    }
  }

</style>

