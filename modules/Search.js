const DDG = require('duck-duck-scrape')

module.exports = class Search extends require('./Base') {
    constructor(koffing) {
        super(koffing)
    }

    async query(query) {
        return await DDG.search(query, {
            safeSearch: DDG.SafeSearchType.STRICT
        })
    }
}
