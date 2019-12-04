import store from "store"
import * as authActions from "store/reducers/auth"
import { bindActionCreators } from "redux"
import storage from "lib/storage"
import axios from "lib/axios"

const pwaInstallPromptListener = () => {
	window.addEventListener("beforeinstallprompt", e => {
		// Prevent Chrome 67 and earlier from automatically showing the prompt
		e.preventDefault()
		// Stash the event so it can be triggered later.
		window.deferredPrompt = e
		// Update UI notify the user they can add to home screen
		window.pwaPromptActive = true
		document.body.classList.add("pwa-prompt-active")
		if (window.onPWAPromptActive) {
			window.onPWAPromptActive()
		}
	})
}

export default () => {
	;(function() {
		var throttle = function(type, name, obj) {
			obj = obj || window
			var running = false
			var func = function() {
				if (running) {
					return
				}
				running = true
				requestAnimationFrame(function() {
					obj.dispatchEvent(new CustomEvent(name))
					running = false
				})
			}
			obj.addEventListener(type, func)
		}

		/* init - you can init any event */
		throttle("resize", "optimizedResize")
		throttle("scroll", "optimizedScroll")
	})()

	pwaInstallPromptListener()

	const AuthActions = bindActionCreators(authActions, store.dispatch)

	const token = storage.getItem("token")
	axios.updateToken(token)

	if (token) {
		AuthActions.checkAuth(token)
	}
}
