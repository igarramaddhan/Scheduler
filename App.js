/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Button,
	DatePickerAndroid,
	TimePickerAndroid,
	Alert
} from 'react-native';

import PushNotification from 'react-native-push-notification'

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
	'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
	'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
	
	onNotifAction(year, month, day, hour, minute) {
		PushNotification.localNotificationSchedule({
			message: "My Notification Message", // (required)
			date: new Date(year, month, day, hour, minute),
			vibrate: false
			// 	largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
			// 	smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
			// 	bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
			// 	subText: "This is a subText", // (optional) default: none
		});
	}
	async pickDate(){
		try {
			const {action, year, month, day} = await DatePickerAndroid.open({
			  // Use `new Date()` for current date.
			  // May 25 2020. Month 0 is January.
			  date: new Date(Date.now()),
			  mode: 'default',
			});
			if (action !== DatePickerAndroid.dismissedAction) {
			  // Selected year, month (0-11), day
			  //Alert.alert('date', `${year}, ${month}, ${day}, ${action}`)

			  this.pickTime(year, month,day)
			}
		  } catch ({code, message}) {
			console.warn('Cannot open date picker', message);
		  }
	}
	async pickTime(year, month, day){
		try {
			const {action, hour, minute} = await TimePickerAndroid.open({
			  hour: 0,
			  minute: 0,
			  is24Hour: false, // Will display '2 PM'
			});
			if (action !== TimePickerAndroid.dismissedAction) {
			  // Selected hour (0-23), minute (0-59)
			  this.onNotifAction(year, month, day, hour, minute)
			}
		  } catch ({code, message}) {
			console.warn('Cannot open time picker', message);
		  }
	}
	componentWillMount() {
		PushNotification.configure({

			// (required) Called when a remote or local notification is opened or received
			onNotification: function (notification) {
				console.log('NOTIFICATION:', notification);
			},
		});
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to React Native!
        </Text>
				<Text style={styles.instructions}>
					To get started, edit App.js
        </Text>
				<Text style={styles.instructions}>
					{instructions}
				</Text>
				<Button title='Test' onPress={() => this.pickDate()} />
				{/* <Button title='Pick Date' onPress={()=> this.pickDate()} /> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
