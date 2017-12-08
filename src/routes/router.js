import {
	StackNavigator,
	DrawerNavigator,
	TabNavigator
} from 'react-navigation'

import Icon from 'react-native-vector-icons/MaterialIcons'

import React from 'react'

import {
	StatusBar
} from 'react-native'

import *as actions from '../services/redux/actions'
import { connect } from 'react-redux'
import store from '../services/redux/store'

import New from '../screens/New'
import Day from '../screens/Day'

var DAY = [
	'Sun',
	'Mon',
	'Tue',
	'Wed',
	'Thu',
	'Fri',
	'Sat'
]

let x = DAY[new Date().getDay()]

const Tab = TabNavigator({
	Sun: {
		screen: props => <Day day='sunday'/>
	},
	Mon: {
		screen: props => <Day day='monday'/>
	},
	Tue: {
		screen: props => <Day day='tuesday'/>
	},
	Wed: {
		screen: props => <Day day='wednesday'/>
	},
	Thu: {
		screen: props => <Day day='thursday'/>
	},
	Fri: {
		screen: props => <Day day='friday'/>
	},
	Sat: {
		screen: props => <Day day='saturday'/>
	},

}, {
		tabBarOptions: {
			indicatorStyle: {
				backgroundColor: '#2E928A',
			},
			activeTintColor: '#000',
			inactiveTintColor: '#aaa',
			style: {
				backgroundColor: '#fff'
			},
			labelStyle: {
				fontSize: 14,
				fontFamily: 'Boogaloo'
			}
		},
		initialRouteName: x
	})

// function mapStateToProps(state) {
// 	return {
// 		state
// 	}
// }
// const DaysTab = connect(mapStateToProps, actions)(Tab)

const MainScreen = StackNavigator({
	Home: {
		screen: Tab,
		navigationOptions: ({ navigation }) => ({
			headerTitle: 'Home',
			headerTitleStyle: {
				alignSelf: 'center',
				fontFamily: 'Boogaloo'
				
			},
			headerLeft: <Icon
				name='menu'
				size={30}
				color='#2E928A'
				onPress={() => console.log('test')}
				style={{ padding: 10 }} />,
			headerRight: <Icon
				name='add'
				size={30}
				color='#2E928A'
				onPress={() => navigation.navigate('New')}
				style={{ padding: 10 }} />,
		})
	},
	New: {
		screen: New,
		navigationOptions: ({ navigation }) => ({
			headerTintColor: '#fff',
			headerStyle: {
				backgroundColor: '#2E928A',
				paddingTop: StatusBar.currentHeight,
				height: 56 + StatusBar.currentHeight,
				elevation: 0,
			}
		})
	}
}, {
		navigationOptions: {
			headerStyle: {
				paddingTop: StatusBar.currentHeight,
				height: 56 + StatusBar.currentHeight,
				backgroundColor: '#fff',
				elevation: 0,
				shadowColor: '#5bc4ff',
				shadowOpacity: 0,
				shadowOffset: {
					height: 0,
				}
			},
		}
	})



export default MainScreen