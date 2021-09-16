import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import reducer from './reducers'
import './assets/styles/App.scss'
import App from './routes/App'
import { ViewTypes } from './components/TaskList'
import { SortingTypes, SortDirectionTypes } from './components/Sorting'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const initialState = {
    ToDos: [
        {
            id: 1,
            title: "To do 1",
            description: "Description to do 1",
            completed: false,
            important: false,
            created: 1631653559478,
            lastUpdate: 1631653559478,
            deadLine: null
        },
        {
            id: 2,
            title: "b To do 2",
            description: "Description to do 2",
            completed: false,
            important: false,
            created: 1631653559478,
            lastUpdate: 1631653559478,
            deadLine: 1636264800000
        },
        {
            id: 3,
            title: "To do 3",
            description: "Description to do 3 ax",
            completed: false,
            important: false,
            created: 1631653559478,
            lastUpdate: 1631653559478,
            deadLine: null
        },
        {
            id: 4,
            title: "a To ax do 4",
            description: "Description to do 4",
            completed: true,
            important: true,
            created: 1631653559478,
            lastUpdate: 1631653559478,
            deadLine: null
        },
        {
            id: 5,
            title: "c To do 5",
            description: "Description to do 5 ax",
            completed: false,
            important: true,
            created: 1631653559478,
            lastUpdate: 1631653559478,
            deadLine: 1631653559478
        }
    ],
    Settings: {
        Filter: {
            Sections: {
                Overude: true,
                Next: true,
                NoDueDate: true,
                Completed: true,
            },
            Deadline: {
                Start: null,
                End: null,
            }
        },
        Sort: {
            SortingType: SortingTypes.TITLE.value,
            SortDirectionType: SortDirectionTypes.ASC
        },
        ViewType: ViewTypes.BOARD_VIEW,
        Search: {
            enabled: false,
            text: '',
        }
    }
}
const store = createStore(reducer, initialState, composeEnhancers())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('app'))