import React, { Component } from 'react'
import {
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	View,
	AsyncStorage,
	Dimensions
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { NavigationActions, DrawerItems } from 'react-navigation'

import *as actions from '../services/redux/actions'
import { connect } from 'react-redux'
import store from '../services/redux/store'
import { storeMainNavigator, login } from '../services/redux/action'
const { height, width } = Dimensions.get('window')

import * as firebase from 'firebase'

import Reactotron from 'reactotron-react-native'

const resetAction = NavigationActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({
			routeName: "Login"
		})
	]
})
class Item extends Component {
	render() {
		return (
			<TouchableNativeFeedback {...this.props}>
				<View style={[styles.item, this.props.style]}>
					<Text style={[{ color: 'white', fontSize: 20, fontWeight: 'bold' }, this.props.textStyle]}>{this.props.value}</Text>
				</View>
			</TouchableNativeFeedback>
		)
	}
}
class DrawerItem extends Component {
	async logout() {

		try {

			await firebase.auth().signOut()

			// Navigate to login view
			store.dispatch(login(false))
			AsyncStorage.setItem('isLogin', 'false').then(() => {
				console.log('success')
			}).catch(() => {
				console.log('fail')
			})
			this.props.loginNavigator.navigate('Splash')

		} catch (error) {
			console.log(error)
		}

	}
	render() {
		return (
			<LinearGradient colors={['#192f6a', '#fda085', '#f6d365']} style={styles.container}>
				<Item value={'Home'} style={{ marginTop: (height / 2 - 50) }} />
				<Item value={'Logout'} style={{ borderBottomColor: 'red', borderTopColor: 'red', marginBottom: 10 }}
					textStyle={{ color: 'red' }}
					onPress={() => {
						this.logout()
					}} />
			</LinearGradient>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	item: {
		height: 50,
		width: 200,
		borderBottomWidth: 1,
		borderBottomColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'white',
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

function mapStateToProps({ mainNavigator, loginNavigator }) {
	return {
		mainNavigator: mainNavigator,
		loginNavigator: loginNavigator
	}
}

export default connect(mapStateToProps, actions)(DrawerItem)