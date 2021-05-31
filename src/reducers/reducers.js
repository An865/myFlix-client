import { combineReducers } from 'redux';

import {
    SET_FILTER,
    SET_MOVIES,
    SET_USER,
    SET_FAVORITES,
} from '../actions/actions';

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

function user(state = '', actions) {
    switch (actions.type) {
        case SET_USER:
            return actions.value;
        default:
            return state;
    }
}

function favorites(state = '', actions) {
    switch (actions.type) {
        case SET_FAVORITES:
            return actions.value;
        default:
            return state;
    }
}

/* combined reducer */
const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user,
    favorites,
});

export default moviesApp;
