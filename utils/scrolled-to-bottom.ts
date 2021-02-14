const scrolledToBottom = () => {
	const scrollTop =
		(document.documentElement && document.documentElement.scrollTop) ||
		document.body.scrollTop

	const scrollHeight =
		(document.documentElement && document.documentElement.scrollHeight) ||
		document.body.scrollHeight

	const clientHeight =
		document.documentElement.clientHeight || window.innerHeight

	return Math.ceil(scrollTop + clientHeight) >= scrollHeight - 400
}

export default scrolledToBottom
