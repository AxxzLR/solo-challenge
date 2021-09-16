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
    ToDos: [],
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