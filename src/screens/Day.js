import React, { Component } from 'react'
import {
	View,
	FlatList,
	Text,
	StyleSheet,
	StatusBar,
	Alert
} from 'react-native'

import EventItem from '../components/EventItem'

import *as actions from '../services/redux/actions'
import { connect } from 'react-redux'
import store from '../services/redux/store'

const { storeData, storeMainNavigator } = actions

import Icon from 'react-native-vector-icons/MaterialIcons'

class Day extends Component {
	constructor() {
		super()
		this.state = {
			today: {
				day: '',
				date: ''
			},
			days: []
		}
	}
	componentWillMount() {
		const { state: { weekDate }, day } = this.props
		let today = { day: '', date: '' }
		weekDate.map((val, idx) => {
			if(val[0]==day){
				today.day = val[0]
				today.date = val[1]
			}
		})
		this.setState({ today: today })
	}
	componentDidMount() {
		const { day, state: { data } } = this.props
		const { today } = this.state
		let event = []
		let date = new Date()
		date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
		data.map((val, idx) => {
			if(val.day==today.day && val.date == today.date){
				event = [...event, val]
			}
		})
		event.sort(function (a, b) {
			return a.time.substr(0, 5).split(':').join('') - b.time.substr(0, 5).split(':').join('')
		})
		this.setState({ days: event })

	}
	render() {
		return (
			<View style={styles.container}>
				<StatusBar translucent={true} backgroundColor="#0003" />
				<FlatList
					data={this.state.days}
					renderItem={({ item }) => <EventItem data={item} />}
					keyExtractor={(item, index) => index}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		paddingVertical: 10,
	}
})

function mapStateToProps(state) {
	return {
		state
	}
}

export default connect(mapStateToProps, actions)(Day)