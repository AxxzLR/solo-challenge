export const actionTypes = {
    SET_VIEW_TYPE: 'SET_VIEW_TYPE',
    SET_ENABLED_SEARCH: 'SET_ENABLED_SEARCH',
    SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
    SET_SORT_DIRECTION: 'SET_SORT_DIRECTION',
    SET_SORTING_TYPE: 'SET_SORTING_TYPE',
    SET_ENABLED_SECTION: 'SET_ENABLED_SECTION',
    SET_DEADLINE_FILTER: 'SET_DEADLINE_FILTER'
}

export const setViewType = payload => (
    {
        type: actionTypes.SET_VIEW_TYPE,
        payload,
    }
)

export const setEnabledSearch = payload => (
    {
        type: actionTypes.SET_ENABLED_SEARCH,
        payload,
    }
)

export const setSearchText = payload => (
    {
        type: actionTypes.SET_SEARCH_TEXT,
        payload,
    }
)

export const setSortDirection = payload => (
    {
        type: actionTypes.SET_SORT_DIRECTION,
        payload,
    }
)

export const setSortingType = payload => (
    {
        type: actionTypes.SET_SORTING_TYPE,
        payload,
    }
)

export const setEnabledSection = payload => (
    {
        type: actionTypes.SET_ENABLED_SECTION,
        payload,
    }
)

export const setDeadlineFilter = payload => (
    {
        type: actionTypes.SET_DEADLINE_FILTER,
        payload,
    }
)