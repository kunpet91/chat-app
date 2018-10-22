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
        <form v-on:submit.prevent="sendMessage" class="chat__sender__form">
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

import io from 'socket.io-client';

export default {
  name: 'ChatComponent',
    data() {
        return {
            user: this.$store.state.nickName,
            message: '',
            messages: [],
            socket : io('https://frontend-test-server.prmrgt.com/'),
            chatBoxElement: null
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();

            const data = {
                user: this.user,
                message: this.message,
                type: 'sent'             
            };
            
            this.socket.emit('message', data);
            this.message = '';
            this.messages = [...this.messages, data];
          
            // scroll to the bottom in when new message is sent
            let chatBoxElement = this.chatBoxElement;
            setTimeout(() => {
              chatBoxElement.scrollTop = chatBoxElement.scrollHeight - chatBoxElement.clientHeight; 
            }, 100);          
        }
    },
    mounted() {
        this.chatBoxElement = document.querySelector('.chat__box');
        this.socket.on('message', (data) => {
            this.messages = [...this.messages, Object.assign(data, {type: 'received'})];
        });
    }
}
</script>
<style lang="scss">
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
            &--sent {
              background-color: #9cd7ff;      
            }
            &--received {
              background-color: #f1f1f1;  
            }                  
          }
          &__user, &__text {
            font-size: 18px;
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

