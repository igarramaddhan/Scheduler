import React, { Component } from 'react'
import {
	View,
	FlatList,
	Text,
	StyleSheet,
	StatusBar,
	Dimensions,
	Animated,
	TimePickerAndroid,
	DatePickerAndroid,
	TextInput,
	Keyboard,
	Switch,
	TouchableNativeFeedback
} from 'react-native'

import *as actions from '../services/redux/actions'
import { connect } from 'react-redux'
import store from '../services/redux/store'

const { storeData, storeMainNavigator } = actions

import Icon from 'react-native-vector-icons/MaterialIcons'
import FloatInput from '../components/FloatInput'
import Picker from '../components/Picker'

const { width, height } = Dimensions.get('screen')

let data = require('../data.json')

class New extends Component {
	constructor() {
		super()
		this.state = {
			date: '',
			start: '',
			end: '',
			isFocused: false,
			isRepeat: false
		}
	}
	componentWillMount() {
		this._animateIsFocus = new Animated.Value(this.state.date === '' ? 0 : 1)
	}
	componentDidUpdate() {
		Animated.timing(this._animateIsFocus, {
			toValue: (this.state.isFocused || this.state.date) ? 1 : 0,
			duration: 200
		}).start();
	}
	handleFocus() {
		this.setState({ isFocused: true })
	}

	handleBlur() {
		this.setState({ isFocused: false })
	}
	async pickDate(callback) {
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				date: new Date(Date.now()),
				mode: 'default',
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				console.log(action, year, month, day)
				let x = day, y = month
				if (day < 10) {
					x = '0' + day
				}
				if (month < 10) {
					y = '0' + month
				}
				this.setState({ date: x + '-' + y + '-' + year })
				callback()
			}
		} catch ({ code, message }) {
			console.warn('Cannot open date picker', message);
		}
	}
	async pickTime(state, callback) {
		try {
			const { action, hour, minute } = await TimePickerAndroid.open({
				hour: 0,
				minute: 0,
				is24Hour: false, // Will display '2 PM'
			});
			if (action !== TimePickerAndroid.dismissedAction) {
				let x = hour, y = minute
				if (hour < 10) {
					x = '0' + hour
				}
				if (minute < 10) {
					y = '0' + minute
				}
				switch (state) {
					case 'start': {
						this.setState({ start: x + ':' + y })
					} break
					case 'end': {
						this.setState({ end: x + ':' + y })
					} break
				}
				callback()
			}
		} catch ({ code, message }) {
			console.warn('Cannot open time picker', message);
		}
	}
	submitSchedule(){
		data.push({
			title: "Kelas Test",
			time: this.state.start+'-'+this.state.end,
			detail: "Putra Pandu",
			date: this.state.date,
			location: "Gedung A2.2",
			day: "sunday"
		})
		console.log(data)
	}
	render() {
		const labelStyle = {
			position: 'absolute',
			left: 0,
			top: this._animateIsFocus.interpolate({
				inputRange: [0, 1],
				outputRange: [20, 0]
			}),
			fontSize: this._animateIsFocus.interpolate({
				inputRange: [0, 1],
				outputRange: [20, 15]
			}),
			color: this._animateIsFocus.interpolate({
				inputRange: [0, 1],
				outputRange: ['#0C555C', '#fff']
			}),
			fontFamily: 'Boogaloo'
		}
		return (
			<View style={styles.container}>
				<StatusBar translucent={true} backgroundColor="#0003" />
				<View style={styles.title_container}>
					<Text style={styles.title}>
						New Event
					</Text>
				</View>
				<View style={styles.form_container}>
					<FloatInput
						label="Title"
						backgroundColor="transparent"
						borderColor="black"
						textColor="black"
						width={200}
						height={60}
						onChangeText={(value) => this.setState({ userName: value })}
					/>
					<FloatInput
						label="Detail"
						backgroundColor="transparent"
						borderColor="black"
						textColor="black"
						width={200}
						height={60}
						onChangeText={(value) => this.setState({ userName: value })}
					/>
					<FloatInput
						label="Location"
						backgroundColor="transparent"
						borderColor="black"
						textColor="black"
						width={200}
						height={60}
						onChangeText={(value) => this.setState({ userName: value })}
					/>
					<View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
							<View style={styles.indicator}>
								<Text style={styles.form_text}>Date</Text>
							</View>
							<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Text style={styles.form_text}>Repeat</Text>
								<Switch
									onTintColor='#FF6861'
									tintColor='#fff'
									thumbTintColor='#FF6861'
									value={this.state.isRepeat}
									onValueChange={() => this.setState({ isRepeat: !this.state.isRepeat })}
								/>
							</View>
						</View>
						<Picker
							label="Date"
							backgroundColor="transparent"
							borderColor="black"
							textColor="black"
							width={200}
							height={60}
							action={(callback) => this.pickDate(callback)}
							value={this.state.date}
						/>
					</View>
					<View>
						<View style={styles.indicator}>
							<Text style={styles.form_text}>Time</Text>
						</View>
						<Picker
							label="Start"
							backgroundColor="transparent"
							borderColor="black"
							textColor="black"
							width={200}
							height={60}
							action={(callback) => this.pickTime('start', callback)}
							value={this.state.start}
						/>
						<Picker
							label="End"
							backgroundColor="transparent"
							borderColor="black"
							textColor="black"
							width={200}
							height={60}
							action={(callback) => this.pickTime('end', callback)}
							value={this.state.end}
						/>

					</View>
				</View>
				<TouchableNativeFeedback onPress={this.submitSchedule.bind(this)}>
					<View style={styles.button}>
						<Text style={styles.form_text}>Add Schedule</Text>
					</View>
				</TouchableNativeFeedback>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2E928A',
		paddingVertical: 10,
		alignItems: 'center'
	},
	title: {
		fontFamily: 'Boogaloo',
		color: '#fff',
		fontSize: 50
	},
	title_container: {
		alignSelf: 'center',
		padding: 20
	},
	form_container: {
		width: width,
		padding: 30
	},
	form_text: {
		fontFamily: 'Boogaloo',
		fontSize: 25,
		color: 'white'
	},
	text_input: {
		height: 40,
		fontSize: 18,
		color: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: '#0C555C',
		fontFamily: 'Boogaloo'
	},
	indicator: {
		padding: 10,
		alignSelf: 'flex-start',
		justifyContent: 'center',
		backgroundColor: '#FF6861',
		borderRadius: 5
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 56,
		width: width-50,
		backgroundColor: '#FF6861',
		borderRadius: 5
	}
})

function mapStateToProps(state) {
	return {
		state
	}
}

export default connect(mapStateToProps, actions)(New)