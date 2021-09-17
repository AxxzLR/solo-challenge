import { actionTypes } from '../actions'

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_VIEW_TYPE:
            return {
                ...state,
                Settings: {
                    ...state.Settings,
                    ViewType: action.payload
                }
            }
        case actionTypes.SET_ENABLED_SEARCH:
            return {
                ...state,
                Settings: {
                    ...state.Settings,
                    Search: {
                        enabled: action.payload,
                        text: ''
                    }
                }
            }
        case actionTypes.SET_SEARCH_TEXT:
            return {
                ...state,
                Settings: {
                    ...state.Settings,
                    Search: {
                        ...state.Settings.Search,
                        text: action.payload
                    }
                }
            }
        case actionTypes.SET_SORT_DIRECTION:
            return {
                ...state,
                Settings: {
                    ...state.Settings,
                    Sort: {
                        ...state.Settings.Sort,
                        SortDirectionType: action.payload
                    }
                }
            }
        case actionTypes.SET_SORTING_TYPE:
            return {
                ...state,
                Settings: {
                    ...state.Settings,
                    Sort: {
                        ...state.Settings.Sort,
                        SortingType: action.payload
                    }
                }
            }
        case actionTypes.SET_ENABLED_SECTION:
            return {
                ...state,
                Settings: {
                    ...state.Settings,
                    Filter: {
                        ...state.Settings.Filter,
                        Sections: {
                            ...state.Settings.Filter.Sections,
                            [action.payload.key]: action.payload.value
                        }
                    }
                }
            }
        case actionTypes.SET_DEADLINE_FILTER:
            return {
                ...state,
                Settings: {
                    ...state.Settings,
                    Filter: {
                        ...state.Settings.Filter,
                        Deadline: {
                            ...state.Settings.Filter.Deadline,
                            [action.payload.key]: action.payload.value
                        }
                    }
                }
            }
        case actionTypes.SET_TO_DOS:
            return {
                ...state,
                ToDos: action.payload
            }
        case actionTypes.SET_EDITOR_CONFIG:
            return {
                ...state,
                Editor: {
                    ModeEditType: action.payload.modeEdit,
                    values: action.payload.values
                }
            }
        case actionTypes.SET_EDITOR_VALUES:
            return {
                ...state,
                Editor: {
                    ...state.Editor,
                    values: {
                        ...state.Editor.values,
                        [action.payload.key]: action.payload.value
                    }
                }
            }
        case actionTypes.CLEAN_EDITOR_CONFIG:
            return {
                ...state,
                Editor: {}
            }
        default:
            return state
    }
}

export default reducer