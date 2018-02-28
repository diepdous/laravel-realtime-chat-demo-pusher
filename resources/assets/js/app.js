/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));
Vue.component('chat-message', require('./components/ChatMessage.vue'));
Vue.component('chat-log', require('./components/ChatLog.vue'));
Vue.component('chat-composer', require('./components/ChatComposer.vue'));

const app = new Vue({
    el: '#app',
    data: {
        messages: [],
        usersInRoom: []
    },
    methods: {
        addMessage(message) {
            // Add to existing messages
            this.messages.push(message);

            // Persist to the database etc
            var room_id = $('#room_id').text();
            axios.post('/messages', message).then(response => {
                axios.get('/messages/' + room_id).then(response => {
                    this.messages = response.data;
                });
            })
        },
        removeMessage(message) {
            var room_id = $('#room_id').text();
            var id = message.id;
            console.log("remove begin");
            axios.get('/message/delete/' + id).then(response => {
                axios.get('/messages/' + room_id).then(response => {
                    this.messages = response.data;
                });
            });
        }
    },
    created() {
        var room_id = $('#room_id').text();
        console.log(room_id);
        axios.get('/messages/' + room_id).then(response => {
            this.messages = response.data;
        });

        Echo.join('room_' + room_id)
            .here((users) => {
                this.usersInRoom = users;
            })
            .joining((user) => {
                this.usersInRoom.push(user);
            })
            .leaving((user) => {
                this.usersInRoom = this.usersInRoom.filter(u => u != user)
            })
            .listen('MessagePosted', (e) => {
                this.messages.push({
                    message: e.message.message,
                    user: e.user
                });

                axios.get('/messages/' + room_id).then(response => {
                    this.messages = response.data;
                });
            })
            .listen('DeleteMessage', (e) => {
                var id = message.id;

                //delete mess in dtb
                axios.get('/messages/' + room_id).then(response => {
                    this.messages = response.data;
                });
            })
        ;
    }
});
