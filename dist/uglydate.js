window["UglyDate"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utility = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventDispatcher = function () {
	function EventDispatcher() {
		_classCallCheck(this, EventDispatcher);

		this.initChannels();
	}

	_createClass(EventDispatcher, [{
		key: 'initChannels',
		value: function initChannels() {
			this.channels = {};
		}
	}, {
		key: 'initChannel',
		value: function initChannel(channel) {
			this.channels[channel] = [];
		}
	}, {
		key: 'getListenersForChannel',
		value: function getListenersForChannel(channel) {
			if (!this.channels[channel]) {
				this.initChannel(channel);
			}

			return this.channels[channel];
		}
	}, {
		key: 'addEventListener',
		value: function addEventListener(channel, callback) {
			var listeners = this.getListenersForChannel(channel);
			listeners.push(callback);
		}
	}, {
		key: 'removeEventListener',
		value: function removeEventListener(channel, callback) {
			var listeners = this.getListenersForChannel(channel);
			var idx = listeners.indexOf(callback);

			if (idx !== -1) {
				listeners.splice(idx, 1);
			}
		}
	}, {
		key: 'hasEventListener',
		value: function hasEventListener(channel, callback) {
			var listeners = this.getListenersForChannel(channel);
			var idx = listeners.indexOf(callback);

			return idx !== -1;
		}
	}, {
		key: 'dispatchEvent',
		value: function dispatchEvent(event) {
			var _this = this;

			var type = event.type;

			var listeners = this.getListenersForChannel(type);

			(0, _utility.forEach)(listeners, function (idx, listener) {
				listener.call(_this, event);
			});
		}
	}, {
		key: 'removeAllListenersForChannel',
		value: function removeAllListenersForChannel(channel) {
			this.initChannel(channel);
		}
	}, {
		key: 'removeAllListeners',
		value: function removeAllListeners() {
			this.initChannels();
		}
	}]);

	return EventDispatcher;
}();

exports.default = EventDispatcher;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var forEach = exports.forEach = function forEach(array, callback, scope) {
	for (var i = 0; i < array.length; i++) {
		callback.call(scope, i, array[i]);
	}
};

var visibilityClassString = exports.visibilityClassString = function visibilityClassString() {
	return 'uglydate-hide';
};

var withinRangeClassString = exports.withinRangeClassString = function withinRangeClassString() {
	return 'js-uglydate-is-day-within-range';
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

(function(global) {
  'use strict';

  var dateFormat = (function() {
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|'[^']*'|'[^']*'/g;
      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      var timezoneClip = /[^-+\dA-Z]/g;
  
      // Regexes and supporting functions are cached through closure
      return function (date, mask, utc, gmt) {
  
        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
          mask = date;
          date = undefined;
        }
  
        date = date || new Date;
  
        if(!(date instanceof Date)) {
          date = new Date(date);
        }
  
        if (isNaN(date)) {
          throw TypeError('Invalid date');
        }
  
        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
  
        // Allow setting the utc/gmt argument via the mask
        var maskSlice = mask.slice(0, 4);
        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
          mask = mask.slice(4);
          utc = true;
          if (maskSlice === 'GMT:') {
            gmt = true;
          }
        }
  
        var _ = utc ? 'getUTC' : 'get';
        var d = date[_ + 'Date']();
        var D = date[_ + 'Day']();
        var m = date[_ + 'Month']();
        var y = date[_ + 'FullYear']();
        var H = date[_ + 'Hours']();
        var M = date[_ + 'Minutes']();
        var s = date[_ + 'Seconds']();
        var L = date[_ + 'Milliseconds']();
        var o = utc ? 0 : date.getTimezoneOffset();
        var W = getWeek(date);
        var N = getDayOfWeek(date);
        var flags = {
          d:    d,
          dd:   pad(d),
          ddd:  dateFormat.i18n.dayNames[D],
          dddd: dateFormat.i18n.dayNames[D + 7],
          m:    m + 1,
          mm:   pad(m + 1),
          mmm:  dateFormat.i18n.monthNames[m],
          mmmm: dateFormat.i18n.monthNames[m + 12],
          yy:   String(y).slice(2),
          yyyy: y,
          h:    H % 12 || 12,
          hh:   pad(H % 12 || 12),
          H:    H,
          HH:   pad(H),
          M:    M,
          MM:   pad(M),
          s:    s,
          ss:   pad(s),
          l:    pad(L, 3),
          L:    pad(Math.round(L / 10)),
          t:    H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],
          tt:   H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],
          T:    H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],
          TT:   H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],
          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
          W:    W,
          N:    N
        };
  
        return mask.replace(token, function (match) {
          if (match in flags) {
            return flags[match];
          }
          return match.slice(1, match.length - 1);
        });
      };
    })();

  dateFormat.masks = {
    'default':               'ddd mmm dd yyyy HH:MM:ss',
    'shortDate':             'm/d/yy',
    'mediumDate':            'mmm d, yyyy',
    'longDate':              'mmmm d, yyyy',
    'fullDate':              'dddd, mmmm d, yyyy',
    'shortTime':             'h:MM TT',
    'mediumTime':            'h:MM:ss TT',
    'longTime':              'h:MM:ss TT Z',
    'isoDate':               'yyyy-mm-dd',
    'isoTime':               'HH:MM:ss',
    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    timeNames: [
      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
  };

function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

/**
 * Get the ISO 8601 week number
 * Based on comments from
 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
 *
 * @param  {Object} `date`
 * @return {Number}
 */
function getWeek(date) {
  // Remove time components of date
  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occurred and correct for it
  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
  return 1 + Math.floor(weekDiff);
}

/**
 * Get ISO-8601 numeric representation of the day of the week
 * 1 (for Monday) through 7 (for Sunday)
 * 
 * @param  {Object} `date`
 * @return {Number}
 */
function getDayOfWeek(date) {
  var dow = date.getDay();
  if(dow === 0) {
    dow = 7;
  }
  return dow;
}

/**
 * kind-of shortcut
 * @param  {*} val
 * @return {String}
 */
function kindOf(val) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (typeof val !== 'object') {
    return typeof val;
  }

  if (Array.isArray(val)) {
    return 'array';
  }

  return {}.toString.call(val)
    .slice(8, -1).toLowerCase();
};



  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return dateFormat;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = dateFormat;
  } else {
    global.dateFormat = dateFormat;
  }
})(this);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utility = __webpack_require__(1);

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_EventDispatcher) {
	_inherits(Header, _EventDispatcher);

	function Header() {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));

		_this.element = _this.dom();
		return _this;
	}

	_createClass(Header, [{
		key: 'dom',
		value: function dom() {
			var element = document.createElement("div");
			element.classList.add("js-uglydate-header");

			(0, _utility.forEach)(["S", "M", "T", "W", "Th", "F", "S"], function (idx, label) {
				var span = document.createElement("span");
				span.classList.add("js-uglydate-header-day");
				span.innerText = label;

				element.appendChild(span);
			});

			return element;
		}
	}]);

	return Header;
}(_EventDispatcher3.default);

exports.default = Header;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(5).default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utility = __webpack_require__(1);

var _DateSelector = __webpack_require__(6);

var _DateSelector2 = _interopRequireDefault(_DateSelector);

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_EventDispatcher) {
	_inherits(Main, _EventDispatcher);

	function Main(params) {
		_classCallCheck(this, Main);

		var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this));

		var options = Object.assign({}, {
			selector: "[data-uglydate]",
			startDateSelector: "[data-uglydate-start-date]",
			endDateSelector: "[data-uglydate-end-date]"
		}, params);

		var selector = options.selector;


		var elements = document.querySelectorAll(selector);
		_this.dateSelectors = [];

		(0, _utility.forEach)(elements, function (idx, element) {
			var startDateSelector = options.startDateSelector,
			    endDateSelector = options.endDateSelector;

			var dateSelector = new _DateSelector2.default(element, { startDateSelector: startDateSelector, endDateSelector: endDateSelector });
			dateSelector.addEventListener("open", _this.dispatchEvent.bind(_this));
			dateSelector.addEventListener("close", _this.dispatchEvent.bind(_this));
			dateSelector.addEventListener("change", _this.dispatchEvent.bind(_this));
			_this.dateSelectors.push(dateSelector);
		});
		return _this;
	}

	return Main;
}(_EventDispatcher3.default);

exports.default = Main;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Calendar = __webpack_require__(7);

var _Calendar2 = _interopRequireDefault(_Calendar);

var _DateInput = __webpack_require__(11);

var _DateInput2 = _interopRequireDefault(_DateInput);

var _NavButton = __webpack_require__(12);

var _NavButton2 = _interopRequireDefault(_NavButton);

var _DisplayDate = __webpack_require__(13);

var _DisplayDate2 = _interopRequireDefault(_DisplayDate);

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateSelector = function (_EventDispatcher) {
	_inherits(DateSelector, _EventDispatcher);

	function DateSelector(element, params) {
		_classCallCheck(this, DateSelector);

		var _this = _possibleConstructorReturn(this, (DateSelector.__proto__ || Object.getPrototypeOf(DateSelector)).call(this));

		var startDateSelector = params.startDateSelector,
		    endDateSelector = params.endDateSelector;


		_this.element = element;

		_this.startDate = new _DateInput2.default(element.querySelector(startDateSelector));
		_this.endDate = new _DateInput2.default(element.querySelector(endDateSelector));

		_this.displayDate = new _DisplayDate2.default(_this.startDate.inputElement.cloneNode(true));
		_this.displayDate.addEventListener("click", _this.handleDisplayDateClick.bind(_this));
		_this.element.appendChild(_this.displayDate.element);

		_this.calendar = new _Calendar2.default(_this.dateConstraints());

		_this.calendar.addEventListener("open", _this.handleCalendarOpen.bind(_this));
		_this.calendar.addEventListener("close", _this.handleCalendarClose.bind(_this));
		_this.calendar.addEventListener("dayHover", _this.handleCalendarDayHover.bind(_this));
		_this.calendar.addEventListener("dayClick", _this.handleCalendarDayClick.bind(_this));
		_this.calendar.addEventListener("doneClick", _this.handleCalendarDoneClick.bind(_this));
		_this.calendar.addEventListener("currentVisibleMonthUpdated", _this.handleCurrentVisibleMonthUpdated.bind(_this));

		// next prev buttons
		_this.nextButton = new _NavButton2.default();
		_this.prevButton = new _NavButton2.default();

		_this.nextButton.addEventListener("click", _this.handleNextButtonClick.bind(_this));
		_this.nextButton.addClass("next-button");

		_this.prevButton.addEventListener("click", _this.handlePrevButtonClick.bind(_this));
		_this.prevButton.addClass("prev-button");

		_this.calendar.element.appendChild(_this.nextButton.element);
		_this.calendar.element.appendChild(_this.prevButton.element);

		_this.element.appendChild(_this.calendar.element);

		_this.handleCurrentVisibleMonthUpdated({ currentVisibleMonth: 0 });

		window.addEventListener("resize", _this.handleWindowResize.bind(_this), false);
		_this.handleWindowResize();
		return _this;
	}

	_createClass(DateSelector, [{
		key: 'handlePrevButtonClick',
		value: function handlePrevButtonClick(evt) {
			this.calendar.prevVisibleMonth();
		}
	}, {
		key: 'handleNextButtonClick',
		value: function handleNextButtonClick(evt) {
			this.calendar.nextVisibleMonth();
		}
	}, {
		key: 'handleCalendarOpen',
		value: function handleCalendarOpen(evt) {
			this.lastSelectedStartDayCell = this.selectedStartDayCell;
			this.lastSelectedEndDayCell = this.selectedEndDayCell;

			this.dispatchEvent({ type: "open" });
		}
	}, {
		key: 'handleCalendarClose',
		value: function handleCalendarClose(evt) {
			this.lastSelectedStartDayCell = null;
			this.lastSelectedEndDayCell = null;

			this.dispatchEvent({ type: "close" });
		}
	}, {
		key: 'handleCalendarDayClick',
		value: function handleCalendarDayClick(evt) {
			var dayCell = evt.dayCell;


			if (this.selectedStartDayCell && this.selectedEndDayCell) {
				this.resetSelectedDayCells();
			}

			if (this.selectedStartDayCell) {
				if (evt.dayCell.getDate().getTime() < this.selectedStartDayCell.getDate().getTime()) {
					this.resetSelectedDayCells();
				}
			}

			if (!this.selectedStartDayCell) {
				this.selectStartDayCell(dayCell);
			} else if (!this.selectedEndDayCell) {
				this.selectEndDayCell(dayCell);
			}
		}
	}, {
		key: 'handleCalendarDayHover',
		value: function handleCalendarDayHover(evt) {
			var dayCell = evt.dayCell;


			if (!this.selectedStartDayCell || this.selectedEndDayCell) {
				return;
			}

			this.rangeUpdated(this.selectedStartDayCell, dayCell);
		}
	}, {
		key: 'handleCalendarDoneClick',
		value: function handleCalendarDoneClick(evt) {
			if (this.selectedStartDayCell && this.selectedEndDayCell) {
				this.valuesUpdated();
			} else if (this.selectedStartDayCell) {
				if (this.lastSelectedStartDayCell && this.lastSelectedEndDayCell) {
					this.selectStartDayCell(this.lastSelectedStartDayCell);
					this.selectEndDayCell(this.lastSelectedEndDayCell);
				} else {
					this.resetSelectedDayCells();
				}
			}

			this.calendar.close();
		}
	}, {
		key: 'handleCurrentVisibleMonthUpdated',
		value: function handleCurrentVisibleMonthUpdated(evt) {
			var currentVisibleMonth = evt.currentVisibleMonth;


			if (currentVisibleMonth == 0) {
				this.prevButton.disable();
			} else {
				this.prevButton.enable();
			}

			var totalRange = this.calendar.getTotalRange();
			if (currentVisibleMonth == totalRange - 2) {
				this.nextButton.disable();
			} else {
				this.nextButton.enable();
			}
		}
	}, {
		key: 'handleDisplayDateClick',
		value: function handleDisplayDateClick(evt) {
			this.calendar.toggle();
		}
	}, {
		key: 'handleWindowResize',
		value: function handleWindowResize(evt) {
			// handle resize
			var vw = window.innerWidth;

			var breakpoint = this.element.dataset.uglydateLargeScreenWidth;
			if (!breakpoint) {
				return;
			}

			var lastMode = this.mode;
			this.mode = vw >= breakpoint ? "desktop" : "mobile";

			if (this.mode != lastMode) {
				this.modeUpdated();
			}
		}
	}, {
		key: 'dateConstraints',
		value: function dateConstraints() {
			var minDate = this.startDate.getMinimumDate();
			var maxDate = this.endDate.getMaximumDate();

			return { minDate: minDate, maxDate: maxDate };
		}
	}, {
		key: 'modeUpdated',
		value: function modeUpdated() {
			this.decideDOMPosition();
			this.recalculateDimensions();
			this.decideScrollPosition();
		}
	}, {
		key: 'decideDOMPosition',
		value: function decideDOMPosition() {
			var parentNode = this.mode == "desktop" ? this.element : document.body;
			this.calendar.appendTo(parentNode);
		}
	}, {
		key: 'recalculateDimensions',
		value: function recalculateDimensions() {
			if (this.mode != "desktop") {
				return;
			}

			this.calendar.computeMonthDimensions();
		}
	}, {
		key: 'decideScrollPosition',
		value: function decideScrollPosition() {
			if (this.mode == "mobile") {
				this.calendar.updateVisibleMonths(0);
			} else {
				this.calendar.updateVisibleMonths(this.calendar.currentVisibleMonth);
			}
		}
	}, {
		key: 'resetSelectedDayCells',
		value: function resetSelectedDayCells() {
			this.clearRange();
			this.clearStartDayCell();
			this.clearEndDayCell();
		}
	}, {
		key: 'clearStartDayCell',
		value: function clearStartDayCell() {
			if (this.selectedStartDayCell) {
				this.selectedStartDayCell.deselect();
				this.selectedStartDayCell = null;
			}
		}
	}, {
		key: 'clearEndDayCell',
		value: function clearEndDayCell() {
			if (this.selectedEndDayCell) {
				this.selectedEndDayCell.deselect();
				this.selectedEndDayCell = null;
			}
		}
	}, {
		key: 'selectStartDayCell',
		value: function selectStartDayCell(dayCell) {
			this.clearStartDayCell();

			this.selectedStartDayCell = dayCell;
			this.selectedStartDayCell.select("start");
		}
	}, {
		key: 'selectEndDayCell',
		value: function selectEndDayCell(dayCell) {
			if (!this.selectedStartDayCell) {
				console.warn("Trying to set an end date without a start date. Ignorning.");
				return;
			}

			this.clearEndDayCell();
			this.selectedEndDayCell = dayCell;
			this.selectedEndDayCell.select("end");

			this.rangeUpdated(this.selectedStartDayCell, this.selectedEndDayCell);
			this.valuesUpdated();

			if (this.mode == "desktop") {
				this.calendar.close();
			}
		}
	}, {
		key: 'clearRange',
		value: function clearRange() {
			this.calendar.clearRange();
		}
	}, {
		key: 'rangeUpdated',
		value: function rangeUpdated(startDayCell, endDayCell) {
			this.clearRange();
			this.calendar.rangeUpdated(startDayCell, endDayCell);
		}
	}, {
		key: 'valuesUpdated',
		value: function valuesUpdated() {
			var startDate = this.selectedStartDayCell.getDate();
			var endDate = this.selectedEndDayCell.getDate();
			var type = "change";

			this.startDate.valueUpdated(startDate);
			this.endDate.valueUpdated(endDate);
			this.displayDate.valueUpdated(startDate, endDate);
			this.dispatchEvent({ type: type, startDate: startDate, endDate: endDate });
		}
	}]);

	return DateSelector;
}(_EventDispatcher3.default);

exports.default = DateSelector;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utility = __webpack_require__(1);

var _Header = __webpack_require__(3);

var _Header2 = _interopRequireDefault(_Header);

var _Footer = __webpack_require__(8);

var _Footer2 = _interopRequireDefault(_Footer);

var _Month = __webpack_require__(9);

var _Month2 = _interopRequireDefault(_Month);

var _DayCell = __webpack_require__(10);

var _DayCell2 = _interopRequireDefault(_DayCell);

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_EventDispatcher) {
	_inherits(Calendar, _EventDispatcher);

	function Calendar(constraints) {
		_classCallCheck(this, Calendar);

		var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this));

		_this.dayCells = [];
		_this.constraints = constraints;
		_this.currentVisibleMonth = 0;

		_this.element = _this.dom();
		_this.element.classList.add((0, _utility.visibilityClassString)());
		return _this;
	}

	_createClass(Calendar, [{
		key: 'appendTo',
		value: function appendTo(parentNode) {
			if (this.element.parentNode != parentNode) {
				if (this.element.parentNode) {
					this.element.parentNode.removeChild(this.element);
				}

				parentNode.appendChild(this.element);
			}
		}
	}, {
		key: 'computeMonthDimensions',
		value: function computeMonthDimensions() {
			var _this2 = this;

			this.element.style.display = "block";
			requestAnimationFrame(function () {
				_this2.computedMonthDimensions = _this2.element.querySelector(".js-uglydate-month-container").getBoundingClientRect();
				_this2.element.style.display = "";
			});
		}
	}, {
		key: 'getTotalRange',
		value: function getTotalRange() {
			var _constraints = this.constraints,
			    minDate = _constraints.minDate,
			    maxDate = _constraints.maxDate;


			var yearsBetween = maxDate.getFullYear() - minDate.getFullYear();
			var monthsBetween = maxDate.getMonth() - minDate.getMonth();

			return monthsBetween + yearsBetween * 12;
		}
	}, {
		key: 'dom',
		value: function dom() {
			var element = document.createElement("div");
			element.classList.add("js-uglydate-calendar");

			var header = new _Header2.default();
			var footer = new _Footer2.default();

			element.appendChild(header.element);
			element.appendChild(footer.element);
			element.appendChild(this.calendarElement());

			footer.addEventListener("doneClick", this.handleDoneClick.bind(this));

			return element;
		}
	}, {
		key: 'toggle',
		value: function toggle() {
			if (this.element.classList.contains((0, _utility.visibilityClassString)())) {
				this.open();
			} else {
				this.close();
			}
		}
	}, {
		key: 'open',
		value: function open() {
			this.element.classList.remove((0, _utility.visibilityClassString)());
			this.element.offsetWidth; // force a DOM recalulation

			this.element.classList.add("js-uglydate-in");

			this.dispatchEvent({ type: "open" });
		}
	}, {
		key: 'close',
		value: function close() {
			var _this3 = this;

			this.element.classList.remove("js-uglydate-in");

			// one desktop we keep it around a beat just to acknowledge result. even w/ no animation this is nice.
			var timeoutDuration = 100;
			if (false) {
				timeoutDuration = 500;
			}

			setTimeout(function () {
				_this3.element.classList.add((0, _utility.visibilityClassString)());
			}, timeoutDuration);

			this.dispatchEvent({ type: "close" });
		}
	}, {
		key: 'calendarElement',
		value: function calendarElement() {
			var _constraints2 = this.constraints,
			    minDate = _constraints2.minDate,
			    maxDate = _constraints2.maxDate;

			var range = this.getTotalRange();

			// scroll viewport
			var element = document.createElement("div");
			element.classList.add("js-uglydate-calendar-scroll-viewport");

			// container
			var containerElement = document.createElement("div");
			containerElement.classList.add("js-uglydate-calendar-container-element");
			element.appendChild(containerElement);

			var currentMonth = new Date(minDate.getTime());
			currentMonth.setDate(1);
			currentMonth.setHours(0);
			currentMonth.setMinutes(0);
			currentMonth.setSeconds(0);
			currentMonth.setMilliseconds(0);

			for (var i = 0; i <= range; i++) {
				var month = new _Month2.default(currentMonth);

				// add a container to store the calendar
				var dayContainerElement = document.createElement("div");
				dayContainerElement.classList.add("js-uglydate-day-container");
				month.element.appendChild(dayContainerElement);

				// figure out the day the calendar should start
				var currentDate = month.getDate();
				var monthStartDay = month.date.getDay();
				currentDate.setDate(currentDate.getDate() - monthStartDay);

				// figure out the end of the month
				var monthEndDay = month.getDate();
				monthEndDay.setMonth(monthEndDay.getMonth() + 1);
				monthEndDay.setDate(monthEndDay.getDate() - 1);

				// figure out what today is
				var today = new Date();
				today.setHours(0);
				today.setMinutes(0);
				today.setSeconds(0);
				today.setMilliseconds(0);

				// each calendar has 6 rows, one for each week.
				for (var j = 0; j < 6; j++) {

					// each week has 7 days.
					for (var k = 0; k < 7; k++) {
						var dayDate = new Date(currentDate.getTime());

						var isLastDayOfMonth = dayDate.getTime() === monthEndDay.getTime();
						var isPriorMonth = dayDate.getTime() < currentMonth.getTime();
						var isNextMonth = dayDate.getTime() > monthEndDay.getTime();
						var isToday = dayDate.getTime() === today.getTime();
						var isOutsideRange = dayDate.getTime() < minDate.getTime() || dayDate.getTime() >= maxDate.getTime();

						var dayCell = new _DayCell2.default(dayDate, { isToday: isToday, isPriorMonth: isPriorMonth, isNextMonth: isNextMonth, isLastDayOfMonth: isLastDayOfMonth, isOutsideRange: isOutsideRange });

						dayCell.addEventListener("hover", this.handleDayCellHover.bind(this));
						dayCell.addEventListener("click", this.handleDayCellClick.bind(this));

						dayContainerElement.appendChild(dayCell.element);
						this.dayCells.push(dayCell);

						currentDate.setDate(currentDate.getDate() + 1);
					}
				}

				containerElement.appendChild(month.element);
				currentMonth.setMonth(currentMonth.getMonth() + 1);
			}

			return element;
		}
	}, {
		key: 'prevVisibleMonth',
		value: function prevVisibleMonth() {
			this.updateVisibleMonths(this.currentVisibleMonth - 1);
		}
	}, {
		key: 'nextVisibleMonth',
		value: function nextVisibleMonth() {
			this.updateVisibleMonths(this.currentVisibleMonth + 1);
		}
	}, {
		key: 'updateVisibleMonths',
		value: function updateVisibleMonths(index) {
			if (index < 0 || index > this.getTotalRange() - 1) {
				return;
			}

			if (!this.computedMonthDimensions) {
				return;
			}

			this.currentVisibleMonth = index;
			var x = this.computedMonthDimensions.width * this.currentVisibleMonth;
			this.element.querySelector(".js-uglydate-calendar-container-element").style.transform = "translate3d(-" + x + "px,0,0)";

			this.dispatchEvent({ type: "currentVisibleMonthUpdated", currentVisibleMonth: this.currentVisibleMonth });
		}
	}, {
		key: 'clearRange',
		value: function clearRange() {
			var withinRangeCells = this.dayCells.filter(function (dayCell) {
				return dayCell.isWithinRange();
			});

			(0, _utility.forEach)(withinRangeCells, function (idx, dayCell) {
				dayCell.setOutsideRange();
			});
		}
	}, {
		key: 'rangeUpdated',
		value: function rangeUpdated(startDayCell, endDayCell) {
			var startIndex = this.dayCells.indexOf(startDayCell);
			var endIndex = this.dayCells.indexOf(endDayCell);

			for (var i = startIndex; i <= endIndex; i++) {
				this.dayCells[i].setWithinRange();
			}
		}
	}, {
		key: 'handleDoneClick',
		value: function handleDoneClick(evt) {
			this.dispatchEvent(evt);
		}
	}, {
		key: 'handleDayCellHover',
		value: function handleDayCellHover(evt) {
			this.dispatchEvent({ type: "dayHover", dayCell: evt.dayCell });
		}
	}, {
		key: 'handleDayCellClick',
		value: function handleDayCellClick(evt) {
			this.dispatchEvent({ type: "dayClick", dayCell: evt.dayCell });
		}
	}]);

	return Calendar;
}(_EventDispatcher3.default);

exports.default = Calendar;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_EventDispatcher) {
	_inherits(Footer, _EventDispatcher);

	function Footer() {
		_classCallCheck(this, Footer);

		var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this));

		_this.element = _this.dom();
		return _this;
	}

	_createClass(Footer, [{
		key: "dom",
		value: function dom() {
			var element = document.createElement("div");

			var doneButton = document.createElement("div");
			doneButton.classList.add("js-uglydate-done-button");
			doneButton.innerText = "Done";
			doneButton.addEventListener("click", this.handleDoneClick.bind(this), false);

			element.appendChild(doneButton);

			element.classList.add("js-uglydate-footer");

			return element;
		}
	}, {
		key: "handleDoneClick",
		value: function handleDoneClick(evt) {
			evt.preventDefault();
			this.dispatchEvent({ type: "doneClick" });
		}
	}]);

	return Footer;
}(_EventDispatcher3.default);

exports.default = Footer;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dateformat = __webpack_require__(2);

var _dateformat2 = _interopRequireDefault(_dateformat);

var _Header = __webpack_require__(3);

var _Header2 = _interopRequireDefault(_Header);

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Month = function (_EventDispatcher) {
	_inherits(Month, _EventDispatcher);

	function Month(date) {
		_classCallCheck(this, Month);

		var _this = _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).call(this));

		_this.date = date;
		_this.element = _this.dom();
		return _this;
	}

	_createClass(Month, [{
		key: 'dom',
		value: function dom() {
			var element = document.createElement("div");
			element.classList.add("js-uglydate-month-container");

			var headerElement = document.createElement("div");
			headerElement.classList.add("js-uglydate-month-header");
			headerElement.innerHTML = (0, _dateformat2.default)(this.date, "mmmm");
			element.appendChild(headerElement);

			// for desktop, copy the M T W Th F thing
			element.appendChild(new _Header2.default().element);

			return element;
		}
	}, {
		key: 'getDate',
		value: function getDate() {
			return new Date(this.date.getTime());
		}
	}]);

	return Month;
}(_EventDispatcher3.default);

exports.default = Month;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dateformat = __webpack_require__(2);

var _dateformat2 = _interopRequireDefault(_dateformat);

var _utility = __webpack_require__(1);

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DayCell = function (_EventDispatcher) {
	_inherits(DayCell, _EventDispatcher);

	function DayCell(date, params) {
		_classCallCheck(this, DayCell);

		var _this = _possibleConstructorReturn(this, (DayCell.__proto__ || Object.getPrototypeOf(DayCell)).call(this));

		_this.date = date;
		_this.params = params;
		_this.element = _this.dom();
		return _this;
	}

	_createClass(DayCell, [{
		key: 'dom',
		value: function dom() {
			var element = document.createElement("button");
			var _params = this.params,
			    isPriorMonth = _params.isPriorMonth,
			    isLastDayOfMonth = _params.isLastDayOfMonth,
			    isNextMonth = _params.isNextMonth,
			    isToday = _params.isToday,
			    isOutsideRange = _params.isOutsideRange;

			var isDisabledDate = isPriorMonth || isNextMonth || isOutsideRange;

			element.classList.add("js-uglydate-day");
			element.setAttribute("aria-label", (0, _dateformat2.default)(this.date, "mmmm d, yyyy"));
			element.date = new Date(this.date.getTime());

			if (isPriorMonth) {
				element.classList.add("js-uglydate-prev-month-day");
			}

			if (isLastDayOfMonth) {
				element.classList.add("js-uglydate-is-last-day-of-month");
			}

			if (isNextMonth) {
				element.classList.add("js-uglydate-next-month-day");
			}

			if (isToday) {
				element.classList.add("js-uglydate-is-today");
			}

			if (isDisabledDate) {
				element.classList.add("js-uglydate-is-disabled-date");
			}

			var dayButton = document.createElement("span");
			dayButton.classList.add("js-uglydate-day-button");
			dayButton.innerText = (0, _dateformat2.default)(this.date, "d");

			if (!isDisabledDate) {
				element.addEventListener("mouseover", this.handleHover.bind(this), false);
				element.addEventListener("click", this.handleClick.bind(this), false);
			}

			element.appendChild(dayButton);

			return element;
		}
	}, {
		key: 'deselect',
		value: function deselect() {
			this.element.classList.remove("js-uglydate-is-selected-start-day");
			this.element.classList.remove("js-uglydate-is-selected-start-day");
			this.element.classList.remove("js-uglydate-is-selected-day");
		}
	}, {
		key: 'select',
		value: function select(state) {
			this.element.classList.add("js-uglydate-is-selected-" + state + "-day");
			this.element.classList.add("js-uglydate-is-selected-day");
		}
	}, {
		key: 'setWithinRange',
		value: function setWithinRange() {
			this.element.classList.add((0, _utility.withinRangeClassString)());
		}
	}, {
		key: 'setOutsideRange',
		value: function setOutsideRange() {
			this.element.classList.remove((0, _utility.withinRangeClassString)());
		}
	}, {
		key: 'isWithinRange',
		value: function isWithinRange() {
			return this.element.classList.contains((0, _utility.withinRangeClassString)());
		}
	}, {
		key: 'getDate',
		value: function getDate() {
			return new Date(this.date.getTime());
		}
	}, {
		key: 'handleHover',
		value: function handleHover(evt) {
			evt.preventDefault();
			this.dispatchEvent({ type: "hover", dayCell: this });
		}
	}, {
		key: 'handleClick',
		value: function handleClick(evt) {
			evt.preventDefault();
			this.dispatchEvent({ type: "click", dayCell: this });
		}
	}]);

	return DayCell;
}(_EventDispatcher3.default);

exports.default = DayCell;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utility = __webpack_require__(1);

var _dateformat = __webpack_require__(2);

var _dateformat2 = _interopRequireDefault(_dateformat);

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateInput = function (_EventDispatcher) {
	_inherits(DateInput, _EventDispatcher);

	function DateInput(element) {
		_classCallCheck(this, DateInput);

		var _this = _possibleConstructorReturn(this, (DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call(this));

		_this.element = element;
		_this.element.classList.add((0, _utility.visibilityClassString)());

		var isInput = _this.element.tagName == "INPUT";
		_this.inputElement = isInput ? _this.element : _this.element.querySelector("input");

		_this.minDate = new Date(_this.inputElement.getAttribute("min"));
		_this.maxDate = new Date(_this.inputElement.getAttribute("max"));
		return _this;
	}

	_createClass(DateInput, [{
		key: 'getMinimumDate',
		value: function getMinimumDate() {
			return this.minDate;
		}
	}, {
		key: 'getMaximumDate',
		value: function getMaximumDate() {
			return this.maxDate;
		}
	}, {
		key: 'clearValue',
		value: function clearValue() {
			this.inputElement.value = "";
			this.changed();
		}
	}, {
		key: 'valueUpdated',
		value: function valueUpdated(date) {
			this.inputElement.value = (0, _dateformat2.default)(date, "yyyy-mm-dd");
			this.changed();
		}
	}, {
		key: 'changed',
		value: function changed() {
			var event = new Event('change', {
				'bubbles': true,
				'cancelable': true
			});
			this.dispatchEvent({ type: "change" });
			this.inputElement.dispatchEvent(event);
		}
	}]);

	return DateInput;
}(_EventDispatcher3.default);

exports.default = DateInput;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavButton = function (_EventDispatcher) {
	_inherits(NavButton, _EventDispatcher);

	function NavButton() {
		_classCallCheck(this, NavButton);

		var _this = _possibleConstructorReturn(this, (NavButton.__proto__ || Object.getPrototypeOf(NavButton)).call(this));

		_this.element = _this.dom();
		return _this;
	}

	_createClass(NavButton, [{
		key: "dom",
		value: function dom() {
			var element = document.createElement("button");
			element.classList.add("js-uglydate-nav-button");

			element.addEventListener("click", this.handleClick.bind(this), false);

			return element;
		}
	}, {
		key: "addClass",
		value: function addClass(label) {
			this.element.classList.add("js-uglydate-" + label);
		}
	}, {
		key: "handleClick",
		value: function handleClick(evt) {
			evt.preventDefault();
			this.dispatchEvent({ type: "click" });
		}
	}, {
		key: "enable",
		value: function enable() {
			this.element.classList.remove("js-uglydate-nav-button-disabled");
		}
	}, {
		key: "disable",
		value: function disable() {
			this.element.classList.add("js-uglydate-nav-button-disabled");
		}
	}]);

	return NavButton;
}(_EventDispatcher3.default);

exports.default = NavButton;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utility = __webpack_require__(1);

var _dateformat = __webpack_require__(2);

var _dateformat2 = _interopRequireDefault(_dateformat);

var _EventDispatcher2 = __webpack_require__(0);

var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisplayDate = function (_EventDispatcher) {
	_inherits(DisplayDate, _EventDispatcher);

	function DisplayDate(element) {
		_classCallCheck(this, DisplayDate);

		var _this = _possibleConstructorReturn(this, (DisplayDate.__proto__ || Object.getPrototypeOf(DisplayDate)).call(this));

		_this.element = element;
		_this.element.setAttribute("type", "text");
		_this.element.setAttribute("name", "full-date");
		_this.element.setAttribute("readonly", "readonly");
		_this.element.classList.add("js-uglydate-text-input");
		_this.element.setAttribute("id", "js-uglydate-text-input");

		_this.element.addEventListener("click", _this.handleClick.bind(_this), false);
		return _this;
	}

	_createClass(DisplayDate, [{
		key: 'handleClick',
		value: function handleClick(evt) {
			evt.preventDefault();
			this.dispatchEvent({ type: "click" });
		}
	}, {
		key: 'clearValue',
		value: function clearValue() {
			this.value = "";
			this.changed();
		}
	}, {
		key: 'valueUpdated',
		value: function valueUpdated(startDate, endDate) {
			var value = (0, _dateformat2.default)(startDate, "ddd, mmm d") + " - " + (0, _dateformat2.default)(endDate, "ddd, mmm d");

			if (startDate.getTime() == endDate.getTime()) {
				value = (0, _dateformat2.default)(startDate, "ddd, mmm d");
			}

			this.element.value = value;
			this.changed();
		}
	}, {
		key: 'changed',
		value: function changed() {
			var event = new Event('change', {
				'bubbles': true,
				'cancelable': true
			});

			this.dispatchEvent({ type: "change" });
			this.element.dispatchEvent(event);
		}
	}]);

	return DisplayDate;
}(_EventDispatcher3.default);

exports.default = DisplayDate;

/***/ })
/******/ ]);
//# sourceMappingURL=uglydate.js.map