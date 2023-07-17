import fs from "fs";


export class Parser {

    parseFile() {
        return this.parse(fs.readFileSync('/home/due/Documents/meli.csv', 'utf8'));
    }

    parse(str) {
        let list = []
        let item = ''
        for(let i = 0; i < str.length; i++) {
            //console.log(str[i])
            if(!(str[i] === ',') && !(str[i] === '\n') && !(str[i] === '\r')) {
                //console.log('entro primero item ' + item)
                item = item + str[i]

            }
            if(str[i] === '\n' || str[i] === '\r') {
                //console.log('entro segundo item ' + item)
                if(!(item === '')){
                    list.push(item)
                }
                item = ''
            }
        }
        list.shift()
        return list
    }

}

