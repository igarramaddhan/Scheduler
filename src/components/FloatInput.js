import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TextInput,
	Animated
} from 'react-native';


export default class FloatInput extends Component {
	state = {
		value: "",
		isFocused: false
	}

	componentWillMount() {
		this._animateIsFocus = new Animated.Value(this.state.value === '' ? 0 : 1)
	}

	handleTextChange(value) {
		this.setState({ value: value })
	}

	handleFocus() {
		this.setState({ isFocused: true })
	}

	handleBlur() {
		this.setState({ isFocused: false })
	}

	componentDidUpdate() {
		Animated.timing(this._animateIsFocus, {
			toValue: (this.state.isFocused || this.state.value) ? 1 : 0,
			duration: 200
		}).start();
	}

	render() {
		const { label, secure, ...props } = this.props;
		const { isFocused } = this.state;
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
			<View style={{ paddingTop: 18, marginTop: 10, marginBottom: 10 }}>
				<Animated.Text style={labelStyle}>{label}</Animated.Text>
				<TextInput
					value={this.state.value}
					onChangeText={(value) => {
						this.handleTextChange(value)
						this.props.onChangeText(value)
					}}
					underlineColorAndroid="transparent"
					style={{
						height: 40, 
						fontSize: 18, 
						color: "#fff", 
						borderBottomWidth: 1, 
						borderBottomColor: '#0C555C',
						fontFamily: 'Boogaloo'
					}}
					onFocus={this.handleFocus.bind(this)}
					onBlur={this.handleBlur.bind(this)}
					secureTextEntry={secure}
				/>
			</View>
		)
	}
}