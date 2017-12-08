import React, { Component } from 'react'
import {
	View,
	FlatList,
	Text,
	StyleSheet,
	StatusBar,
	Dimensions
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get('screen')

class EventItem extends Component {
	componentWillMount() {
		//console.log(this.props)
	}
	render() {
		const { date, detail, location, time, title } = this.props.data
		return (
			<View style={styles.container}>
				<View style={styles.item}>
					<View style={styles.date}>
						<View style={[styles.time_container, { backgroundColor: '#0C555C' }]}>
							<Text style={[styles.date_text, { color: '#fff' }]}>{time.split('-')[0]}</Text>
						</View>
						<View style={[styles.time_container]}>
							<Text style={styles.date_text}>|</Text>
						</View>
						<View style={[styles.time_container, { backgroundColor: '#FF6861' }]}>
							<Text style={[styles.date_text, { color: '#fff' }]}>{time.split('-')[1]}</Text>
						</View>
					</View>
					<View style={styles.content}>
						<View style={styles.info_block}>
							<View style={[styles.time_container, { backgroundColor: '#2E928A' }]}>
								<Text style={[styles.content_text, { color: '#CCDFCC' }]}>{date}</Text>
							</View>
							<View style={[styles.time_container, { backgroundColor: '#FFC153', marginLeft: 2 }]}>
								<Text style={styles.content_text}>{location}</Text>
							</View>
						</View>
						<Text style={[styles.content_text, { fontSize: 20 }]}>{title}</Text>
						<Text style={[styles.content_text, { color: '#CCDFCC' }]}>{detail}</Text>
					</View>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: width
	},
	item: {
		width: width * .8,
		height: height * .12,
		backgroundColor: '#fff',
		borderBottomColor: '#CCDFCC',
		borderBottomWidth: 2,
		flexDirection: 'row',
		alignSelf: 'center'
	},
	date: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: .3
	},
	content: {
		justifyContent: 'center',
		flex: .7
	},
	date_text: {
		fontFamily: 'Boogaloo',
		fontSize: 15,
		color: '#000'
	},
	content_text: {
		fontFamily: 'Boogaloo',
		fontSize: 15,
		color: '#000'
	},
	info_block: {
		flexDirection: 'row'
	},
	time_container: {
		padding: 5,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default EventItem