const fs = require('fs')

module.exports = class Random extends require('./Base') {
    constructor(koffing) {
        super(koffing)
    }

    async word() {
        var lines = fs.readFileSync('./words.txt', 'utf-8').split('\n')
        return lines[Math.floor(Math.random() * lines.length)]
    }
}
