const fs = require('fs')

const readFile = () => require('../data.json')

const writeToFile = (data) => {
    try {
        const sData = JSON.stringify(data)
        fs.writeFileSync('src/data.json', sData, 'utf-8')
        return true
    }
    catch { return false }
}

const validateObject = (data) => {
    try {
        const props = ['id', 'title', 'description', 'completed', 'important', 'deadLine', 'created', 'lastUpdate']
        return !(props.map(x => data.hasOwnProperty(x)).filter(x => !x).length)
    }
    catch { return false }
}

module.exports = {
    getAll: () => readFile(),
    get: (id) => {
        try {
            if (!id) return null

            return readFile().filter(x => x.id === id)[0]

        } catch { return null }

    },
    insert: (data) => {
        try {
            const aData = readFile()

            let id = 1
            if (aData.length) {
                const ids = aData.map(x => x.id)
                id = Math.max(...ids) + 1
            }

            data = {
                ...data,
                id,
                created: Date.now(),
                lastUpdate: Date.now()
            }
            if (!validateObject(data)) return null

            aData.push(data)
            return writeToFile(aData) ? data.id : null
        }
        catch { return null }
    },
    update: (id, data) => {
        try {
            if (!id) return false

            const aData = readFile()
            const pData = aData.filter(x => x.id === id)[0]
            if (!pData) return false

            const nData = aData.filter(x => x.id !== id)

            data = {
                ...data,
                id,
                created: pData.created,
                lastUpdate: Date.now()
            }

            if (!validateObject(data)) return false

            nData.push(data)
            nData.sort((a, b) => a.id - b.id)

            return writeToFile(nData)
        }
        catch { return false }
    },
    delete: (id) => {
        try {
            if (!id) return false
            const aData = readFile()

            const pData = aData.filter(x => x.id === id)[0]
            if (!pData) return false

            const nData = aData.filter(x => x.id !== id)
            return writeToFile(nData)
        }
        catch { return false }
    }
}