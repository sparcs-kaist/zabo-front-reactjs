import { entries } from "./mock_data"

const ajax = (func, delay) => (...params) =>
	new Promise((res, rej) => {
		setTimeout(() => {
			res(func(...params))
		}, delay)
	})
export const getEntries = ajax((page = 0, perPage = 5) => {
	const index = (page * perPage) % entries.length
	return entries.slice(index, (index + perPage) % entries.length)
}, 1500)
