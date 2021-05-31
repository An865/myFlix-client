import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

function visibilityFilter(state = '', actions) {
    switch (actions.type) {
        case SET_FILTER:
            return actions.value;
        default:
            return state;
    }
}

function movies(state = [], actions) {
    switch (actions.type) {
        case SET_MOVIES:
            return actions.value;
        default:
            return state;
    }
}

/* combined reducer */
const moviesApp = combineReducers({
    visibilityFilter,
    movies,
});

export default moviesApp;
