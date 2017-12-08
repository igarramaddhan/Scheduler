import React, { Component } from 'react'
import {
	View,
	FlatList,
	Text,
	StyleSheet,
	StatusBar
} from 'react-native'

import *as actions from '../services/redux/actions'
import { connect } from 'react-redux'
import store from '../services/redux/store'

const { storeData, storeMainNavigator } = actions

import Icon from 'react-native-vector-icons/MaterialIcons'

class Main extends Component {
	render() {
		return (
			<View style={styles.container}>
				<StatusBar translucent={true} backgroundColor="#0003" />
				<Text>
					Test
				</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		margin: 10,
		paddingVertical: 10
	}
})

function mapStateToProps(state) {
	return {
		state
	}
}

export default connect(mapStateToProps, actions)(Main)