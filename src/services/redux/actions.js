export const STORE_DATA = 'storeData'
export const STORE_MAIN_NAVIGATOR = 'storeMainNavigator'
export const STORE_WEEK_DATE = 'storeWeekDate'

export function storeData(data) {
	return {
		type: STORE_DATA,
		data
	}
}

export function storeMainNavigator(navigator) {
	return {
		type: STORE_MAIN_NAVIGATOR,
		navigator
	}
}

export function storeWeekDate(date) {
	return {
		type: STORE_WEEK_DATE,
		date
	}
}