import React, { Component } from 'react'

import {Alert} from 'react-native'

import MainScreen from './routes/router'

import { connect } from 'react-redux'

import store from './services/redux/store'

import *as actions from './services/redux/actions'

const { storeData, storeMainNavigator, storeWeekDate } = actions

let data = require('./data.json')


export default class App extends Component {
	componentWillMount() {
		store.dispatch(storeData(data))
		Date.prototype.getWeek = function (start) {
			start = start || 0
			let today = new Date(this.setHours(0, 0, 0, 0))
			let day = today.getDay() - start
			let date = today.getDate() - day
			today.toLocaleDateString('en-EN', {day})
			let x = []
			for (let index = 0; index < 7; index++) {
				let d = new Date(today.setDate(date + index))
				x = [...x, d]
			}
			return x
		}
		let Dates = new Date().getWeek()
		let weekDay = []
		let DAY = [
			'sunday',
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday'
		]
		Dates.map((e, idx) => {
			let x = e.getDate() + '-' + (e.getMonth() + 1) + '-' + e.getFullYear()
			let y = DAY[e.getDay().toString()]
			weekDay = [...weekDay, [y, x]]
		})
		store.dispatch(storeWeekDate(weekDay))
	}
	render() {
		return (
			<MainScreen />
		)
	}
}