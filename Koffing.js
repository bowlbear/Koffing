class Koffing {
    constructor(settings) {
        this.settings = settings
        this.log = () => {}
        if (this.settings.verbose === true) {
            this.log = require('ololog')
            this.perf = require('performance-measure')
        }
        this.log(`Starting Koffing v${require('./package.json').version}`)
        return new Promise(this.run.bind(this))
    }

    async run() {
        if (typeof this.settings.modules !== 'object')
            throw new Error(`Need to define modules object in koffing settings`)
        this.loadModules(...this.settings.modules)
    }

    async loadModules(...classFiles) {
        this.log(`Loading modules (${classFiles.join(', ')})`)
        let m
        if (this.perf) m = new this.perf()
        const requireModule = async (classFile) => {
            const cm = new (require(`./modules/${classFile}`))(this)
            this[cm.constructor.name] = cm
            return cm
        }

        return new Promise(async (resolve, reject) => {
            const modules = []
            for (let classFile of classFiles) {
                if (this.perf) m.start(`require ${classFile}`)
                const mod = await requireModule(classFile)
                mod.log = this.log
                if (this.perf) m.end(`require ${classFile}`)
                modules.push(mod)
            }

            for (let mod of modules) {
                if (this.perf) m.start(`init    ${mod.constructor.name}`)
                if (mod.init) await mod.init()
                if (this.perf) m.end(`init    ${mod.constructor.name}`)
            }

            if (this.perf) this.log(m.print())
            return modules
        })
    }
}

const koffing = new Koffing({
    modules: ['Simulator', 'Search', 'Random', 'Director'],
    verbose: true
})
