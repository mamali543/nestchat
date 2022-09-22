/*Here we create a new Vue.js instance and create some 
    basic variables we will later use in our layout.*/
const app = new Vue({
    el: '#app',
    data: {
     title: 'Nestjs Chat',
     name: '',
     text: '',
     messages: [],
     alerts: [],
     socket: { chat: null, alerts: null}
    },
    methods: {
/*the sendMesage() function which gets the input from our layout 
and emits it to our server using the same event if the input is correct.*/
     sendChatMessage() {
      if(this.validateInput()) {
       const message = {
       name: this.name,
       text: this.text
      }
      this.socket.chat.emit('chatToServer', message)
      this.text = ''
      this.name = ''
     }
    },
    receivedAlertMessage(alert) {
        this.alerts.push(alert);

    },
    receivedChatMessage(message) {
        this.messages.push(message);
    },
    validateInput() {
     return this.name.length > 0 && this.text.length > 0
    }
   },
//the created() function will be executed whenever the frontend is created
    created() {
/*in this method, we instantiate our socket variable using the socketio 
library we will later import in our frontend*/
     this.socket.chat = io('http://localhost:3000/chat')
/*We also add an event listener on our socket which listens
 for the msgToClient event we created earlier in our server.*/
     this.socket.chat.on('chatToClient', (message) => {
      this.receivedChatMessage(message)
     })

     this.socket.alerts = io('http://localhost:3000/alert')
     this.socket.alerts.on('alertToClient', (alert) => {
        this.receivedAlertMessage(alert)
       })
    }
   })