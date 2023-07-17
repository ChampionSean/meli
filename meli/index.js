import {MeliService} from "./meliService.js";
import {startConnection} from "./connection.js";
import amqp from "amqplib";

startConnection()
const meliService = new MeliService()

amqp.connect('amqp://localhost').then(connection =>{
    console.log('starting connection')
    connection.createChannel()
        .then(channel => {
            const queue = 'items'

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
                meliService.startProcess(msg.content.toString());
            }, {
                noAck: true
            });
        })
})







