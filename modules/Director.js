module.exports = class Director extends require('./Base') {
    constructor(koffing) {
        super(koffing)
    }

    async init() {
        this.log('Director starting')

        for (let person of this.koffing.Simulator.persons) {
            console.log(person)
            // await this.koffing.Simulator.startBrowsing(person)
        }
    }
}
