module.exports = class BaseModule {
    constructor(koffing, settings = {}) {
        this.koffing = koffing
        this.koffing.settings = { ...settings, ...this.koffing.settings }
    }
}
