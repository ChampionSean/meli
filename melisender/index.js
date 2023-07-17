import {Parser} from "./parseFile.js";
import amqp from "amqplib";


amqp.connect('amqp://localhost')
    .then(connection => {
            connection.createChannel()
                .then(channel => {
                    const queue = 'items'
                    let parser = new Parser()
                    let listItems = parser.parseFile()
                    listItems.forEach(item => {

                        channel.sendToQueue(queue, Buffer.from(item ));
                        console.log(" [x] Sent %s", item);
                    })
                })
        }
    );