export const forEach = (array, callback, scope) => {
	for(var i=0;i<array.length;i++) {
		callback.call(scope, i, array[i])
	}
}

export const visibilityClassString = () => {
	return 'uglydate-hide'
}

export const withinRangeClassString = () => {
	return 'js-uglydate-is-day-within-range'
}