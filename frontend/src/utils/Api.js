const BASE_URL = 'http://localhost:3000/api/'

let LOADING = null
let LOADING_CLASS = null
export const setLoading = (element, elementClass) => {
    LOADING = element
    LOADING_CLASS = elementClass
}
const onRequest = () => {
    if (LOADING)
        LOADING.classList.add(LOADING_CLASS)
}
const postRequest = () => {
    if (LOADING)
        LOADING.classList.remove(LOADING_CLASS)
}

async function callApi(endpoint, options = {}, headers = {}) {
    try {
        onRequest()

        options.credentials = 'include'
        options.headers = {
            ...headers,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }

        const url = `${BASE_URL}${endpoint}`
        const response = await fetch(url, options)
        if (!response.ok) {
            const errorMessage = await response.text()
            switch (response.status) {
                case 400:
                case 401:
                case 500:
                    if (errorMessage)
                        throw new Error(errorMessage)
                    else
                        throw new Error(`Error ${response.status}`)
                case 404:
                    throw new Error('No se encontró la dirección de la API (404).')
                default:
                    throw new Error(`Error ${response.status} [${errorMessage}].`)
            }
        }
        const responseText = await response.text()
        const responseJson = responseText ? JSON.parse(responseText) : ""

        postRequest()
        return buildResponse.ok(responseJson)
    }
    catch (error) {
        postRequest()
        return buildResponse.error(error.message)
    }
}

const requestMethods = {
    GET(endpoint, params = []) {
        let endpointParams = endpoint

        params.forEach(element => {
            endpointParams = `${endpointParams}/${element}`
        })

        return callApi(endpointParams)
    },
    POST(endpoint, data) {
        const sData = JSON.stringify(data)
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            data: data,
        }
        return callApi(endpoint, options)
    },
    PUT(endpoint, ID, data) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            data: data,
        }
        const endpointParams = `${endpoint}/${ID}`
        return callApi(endpointParams, options)
    },
    DELETE(endpoint, ID) {
        const options = {
            method: 'DELETE',
        }
        const endpointParams = `${endpoint}/${ID}`
        return callApi(endpointParams, options)
    }
}

const buildResponse = {
    ok(data) {
        return { data, hasError: false, message: '' }
    },
    error(message) {
        return { data: null, hasError: true, message }
    }
}

export const Api = {
    Todos: {
        async GetAll() {
            const result = await requestMethods.GET('todos')
            return result
        },
        async Get(id) {
            const result = await requestMethods.GET('todos', [id])
            return result
        },
        async insert(data) {
            const result = await requestMethods.POST('todos', data)
            return result
        },
        async Update(id, data) {
            const result = await requestMethods.PUT('todos', id, data)
            return result
        },
        async Delete(id) {
            const result = await requestMethods.DELETE('todos', id)
            return result
        }
    },
}

