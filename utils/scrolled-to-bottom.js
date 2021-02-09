const scrolledToBottom = () => {
	var scrollTop =
		(document.documentElement && document.documentElement.scrollTop) ||
		document.body.scrollTop

	var scrollHeight =
		(document.documentElement && document.documentElement.scrollHeight) ||
		document.body.scrollHeight

	var clientHeight = document.documentElement.clientHeight || window.innerHeight

	return Math.ceil(scrollTop + clientHeight) >= scrollHeight - 400
}

export default scrolledToBottom
