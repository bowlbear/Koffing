const faker = require('faker')
const { chromium, firefox } = require('playwright')
const expect = require('expect')

const Person = require('../classes/Person')

module.exports = class Simulator extends require('./Base') {
    constructor(koffing) {
        super(koffing, {
            simulatePersonQuantity: 22
        })
    }

    async init() {
        this.log(`Going to simulate ${this.koffing.settings.simulatePersonQuantity} fake people`)

        this.persons = []
        for (let i = 0; i < this.koffing.settings.simulatePersonQuantity; i++) {
            const person = await this.createPerson()
            this.log(`Created ${person.username} ${person.username}`)
            this.persons.push(person)
        }
    }

    async createPerson() {
        return new Person()
    }

    async startBrowsing(person) {
        await this.restartBrowser()
        this.log(await this.koffing.Search.query('yeetin'))
    }

    async clickRandom() {
        const hrefs = await page.evaluate(() => {
            return Array.from(document.links).map((item) => item.href)
        })
        this.log(hrefs)
    }

    async goto(url) {
        await this.page.goto(url)
    }

    async restartBrowser() {
        if (this.browser) {
            await this.browser.close()
        }
        this.browser = await this.settings.chromium.launch({
            headless: this.settings.headless,
            slowMo: this.settings.slowMo
        })
        this.page = await this.browser.newPage()
    }
}
