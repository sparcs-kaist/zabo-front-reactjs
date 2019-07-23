let throttled = false // are we currently throttled?
const delay = 250
let listeners = []

function getDimensions() {
	console.log("getDimensions", listeners)
	const width = window.innerWidth
	const height = window.innerHeight
	listeners.forEach(listener => {
		listener({
			width, height
		})
	})
}

// window.resize event listener
window.addEventListener('resize', function() {
	// only run if we're not throttled
	if (!throttled) {
		// actual callback action
		getDimensions();
		// we're throttled!
		throttled = true;
		// set a timeout to un-throttle
		setTimeout(function() {
			throttled = false;
		}, delay);
	}
});

export const addWindowResizeListener = (listener) => {
	listeners.push(listener)
	return () => listeners.filter(x => x !== listener)
}
