/* index.jsx is where we import and use the root component MainView */
import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';
// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

import MainView from './components/main-view/main-view';

//Create store to hold application state via reducer arguments
const store = createStore(moviesApp, devToolsEnhancer());
console.log(store.getState());
// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
