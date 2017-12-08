import { combineReducers } from 'redux'

import { STORE_DATA, STORE_MAIN_NAVIGATOR, STORE_WEEK_DATE } from './actions'

function data(state=null, action){
	switch(action.type){
		case STORE_DATA: {
			return action.data
		}
		default: {
			return state
		}
	}
}

function mainNavigator(state=null, action){
	switch(action.type){
		case STORE_MAIN_NAVIGATOR: {
			return action.navigator
		}
		default: {
			return state
		}
	}
}

function weekDate(state=null, action){
	switch(action.type){
		case STORE_WEEK_DATE: {
			return action.date
		}
		default: {
			return state
		}
	}
}

export default combineReducers({
	data,
	mainNavigator,
	weekDate
})