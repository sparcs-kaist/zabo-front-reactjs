/* Selectors */
import { createSelector } from "reselect"

//import { mediaSizes } from "lib/variables"

const decodedTokenSelector = state => state.getIn(["auth", "jwt"])
const emailSelector = state => state.getIn(["auth", "info", "email"])
const userInfoSelect = state => state.getIn(["user", "info"])
const locationSelector = state => state.getIn(["router", "location"])
//const deviceSelector = state => state.getIn(["base", "window", "width"])
const ratesSelector = state => state.getIn(["market", "rates"])

const isDecodedTokenAlive = decoded => {
	if (decoded && decoded.get("exp")) {
		return 1000 * decoded.get("exp") - new Date().getTime() >= 5000
	}
	return false
}

const decodedTokenLifetime = decoded => {
	if (decoded && decoded.get("exp")) {
		const remain = decoded.get("exp") * 1000 - Date.now()
		return remain > 0 ? remain : 0
	}
	return 0
}

export const isAuthenticated = createSelector(decodedTokenSelector, isDecodedTokenAlive)

export const tokenTimeLeft = createSelector(decodedTokenSelector, decodedTokenLifetime)

export const getUserState = createSelector(userInfoSelect, info => info.get("state"))

//export const isTwoFactorNeeded = createSelector(
//	decodedTokenSelector,
//	access => isDecodedTokenAlive(access) && !access.get("authorized")
//)

export const getCurrencyPair = createSelector(locationSelector, location =>
	location.get("pathname").substring(10)
)

//export const getDevice = createSelector(deviceSelector, width => {
//	let device = "mobile"
//	if (mediaSizes.tablet < width) device = "tablet"
//	if (mediaSizes.desktop < width) device = "desktop"
//	return device
//})
