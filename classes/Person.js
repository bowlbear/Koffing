const faker = require('faker')
const ololog = require('ololog')
const gd = require('gender-detection')

module.exports = class Person {
    constructor() {
        this.intent = 'INTENT_SEARCH_RANDOM_WORD'

        return this.genProfile()
    }

    getRandomIntent() {}

    genProfile() {
        return new Promise((resolve, reject) => {
            this.sex = faker.random.arrayElement(['male', 'female'])
            this.firstname = this.genColumn('name', 'firstName', this.sex)
            this.lastname = this.genColumn('name', 'lastName')
            this.city = this.genColumn('address', 'city')
            this.agent = faker.random.arrayElement(['firefox', 'chromium'])
            this.username = this.genColumn('internet', 'userName', this.sex)
            this.email = this.genColumn('internet', 'email', this.sex)
            resolve(this)
        })
    }

    genColumn(type, column, gender) {
        const gen = faker[type][column]()
        if (!gender) return gen
        let gdsensor = gd.detect(gen)
        if (column === 'email') gdsensor = gd.detect(gen.split('@')[0])
        if (gdsensor !== gender) return this.genColumn(type, column, gender)
        return gen
    }
}
