import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import App from './src/App';

import { Provider } from 'react-redux'
import store from './src/services/redux/store'

export default class Main extends Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}
}

AppRegistry.registerComponent('Scheduler', () => Main);
