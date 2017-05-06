(function (exports) {
'use strict';

var CommonNetwork = {
	addHost: function addHost(uri) {
		return this.get('host') + uri;
	},
	addProtocol: function addProtocol(uri) {
		return this.get('protocol') + uri;
	},
	preloadImages: function preloadImages(dataArray, fields) {
		for (var i in dataArray) {
			for (var f in fields) {
				if (dataArray[i].hasOwnProperty(fields[f])) {
					var image = new Image();
					image.setAttribute('crossOrigin', 'anonymous');
					image.src = dataArray[i][fields[f]].indexOf('//') === 0 ? this.addProtocol(dataArray[i][fields[f]]) : dataArray[i][fields[f]];
				}
			}
		}
	},
	putFile: function putFile(upload /* object(file, onProgress, url)*/) {
		var _this = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			if (xhr.upload) {
				// progress bar
				if (upload.onProgress) {
					xhr.upload.addEventListener('progress', upload.onProgress, false);
				}
				// file received/failed
				xhr.responseType = 'json';
				xhr.onreadystatechange = function () /*e*/{
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							resolve(xhr.response);
						} else {
							reject(xhr.response);
						}
					}
				};
				// start upload
				xhr.withCredentials = true;
				xhr.open('PUT', upload.url, true);
				xhr.setRequestHeader('SessionID', _this.getSessionID());
				xhr.setRequestHeader('Content-Type', upload.file.type);
				xhr.setRequestHeader('X_FILENAME', encodeURIComponent(upload.file.name));
				xhr.send(upload.file);
			} else {
				reject();
			}
		});
	},

	requestJSON: function requestJSON(method, url, data) {
		var _this2 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.setRequestHeader('SessionID', _this2.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	getJSON: function getJSON(url, data) {
		var _this3 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', _this3.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	postJSON: function postJSON(url, data) {
		var _this4 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('POST', url);
			xhr.setRequestHeader('SessionID', _this4.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	putJSON: function putJSON(url, data) {
		var _this5 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('PUT', url);
			xhr.setRequestHeader('SessionID', _this5.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	deleteJSON: function deleteJSON(url, data) {
		var _this6 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest(); // new HttpRequest instance
			xhr.open('DELETE', url);
			xhr.setRequestHeader('SessionID', _this6.getSessionID());
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.responseType = 'json';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (status == 200) {
					resolve(xhr.response);
				} else {
					reject(xhr.response);
				}
			};
			var t = function t() {
				return reject(xhr.status);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	getHTML: function getHTML(url, data) {
		var _this7 = this;

		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.open('get', url, true);
			xhr.setRequestHeader('SessionID', _this7.getSessionID());
			xhr.responseType = 'text';
			xhr.withCredentials = true;
			xhr.onload = function () {
				var status = xhr.status;
				if (parseInt(status) === 200) {
					resolve(xhr.responseText);
				} else {
					reject(xhr.responseText);
				}
			};
			var t = function t(e) {
				return reject(e);
			};
			xhr.onerror = t;
			xhr.ontimeout = t;
			xhr.send(data);
		});
	},
	getSessionID: function getSessionID() {
		var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'SessionID';

		return this.getCookie(name);
	},
	getCookie: function getCookie(name) {
		var value = '; ' + document.cookie,
		    parts = value.split('; ' + name + '=');
		if (parts.length == 2) {
			return parts.pop().split(';').shift();
		} else {
			return null;
		}
	}
};

//dirty hack to remove no-console warning of eslint
/* global notFramework*/
var LOG = 'console';
var CommonLogs = {
	error: function error() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG;

			(_window$LOG = window[LOG]).error.apply(_window$LOG, arguments);
		}
	},
	log: function log() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG2;

			(_window$LOG2 = window[LOG]).log.apply(_window$LOG2, arguments);
		}
	},
	report: function report() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG3;

			(_window$LOG3 = window[LOG]).error.apply(_window$LOG3, arguments);
		}
	},
	trace: function trace() {
		if (!notFramework.notCommon.get('production')) {
			var _window$LOG4;

			(_window$LOG4 = window[LOG]).trace.apply(_window$LOG4, arguments);
		}
	},
	mute: function mute() {
		this.register('production', true);
	}
};

var MANAGER = Symbol('MANAGER');

var CommonShorts = {
	getAPI: function getAPI() {
		return this.getManager().getAPI();
	},
	setManager: function setManager(v) {
		this[MANAGER] = v;
	},
	getManager: function getManager() {
		return this[MANAGER];
	}
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* global jQuery */
var CommonObjects = {
	extend: function extend(defaults$$1, options) {
		var extended = {};
		var prop;
		for (prop in defaults$$1) {
			if (Object.prototype.hasOwnProperty.call(defaults$$1, prop)) {
				extended[prop] = defaults$$1[prop];
			}
		}
		for (prop in options) {
			if (Object.prototype.hasOwnProperty.call(options, prop)) {
				extended[prop] = options[prop];
			}
		}
		return extended;
	},
	completeAssign: function completeAssign(target) {
		for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			sources[_key - 1] = arguments[_key];
		}

		sources.forEach(function (source) {
			var descriptors = Object.keys(source).reduce(function (descriptors, key) {
				descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
				return descriptors;
			}, {});
			// by default, Object.assign copies enumerable Symbols too
			Object.getOwnPropertySymbols(source).forEach(function (sym) {
				var descriptor = Object.getOwnPropertyDescriptor(source, sym);
				if (descriptor.enumerable) {
					descriptors[sym] = descriptor;
				}
			});
			Object.defineProperties(target, descriptors);
		});
		return target;
	},
	extendWith: function extendWith(options) {
		for (var prop in options) {
			if (options.hasOwnProperty(prop)) {
				this[prop] = options[prop];
			}
		}
	},

	containsObj: function containsObj(big, small) {
		for (var t in small) {
			if (small.hasOwnProperty(t)) {
				if (!big.hasOwnProperty(t) || big[t] !== small[t]) {
					return false;
				}
			}
		}
		return true;
	},
	filter: function filter(obj, _filter) {
		if (_filter && obj) {
			return this.containsObj(obj, _filter);
		}
		return true;
	},
	findIconByFilter: function findIconByFilter(icons, filter) {
		var batch = [];
		for (var i = 0; i < icons.length; i++) {
			if (this.filter(icons[i].getData(), filter)) {
				batch.push(icons[i]);
			}
		}
		return batch;
	},
	equalObj: function equalObj(a, b) {
		var p;
		for (p in a) {
			if (typeof b[p] == 'undefined') {
				return false;
			}
		}
		for (p in a) {
			if (a[p]) {
				switch (_typeof(a[p])) {
					case 'object':
						{
							if (!this.equal(a[p], b[p])) {
								return false;
							}
							break;
						}
					case 'function':
						{
							if (typeof b[p] == 'undefined' || p != 'equals' && a[p].toString() != b[p].toString()) return false;
							break;
						}
					default:
						{
							if (a[p] != b[p]) {
								return false;
							}
						}
				}
			} else {
				if (b[p]) return false;
			}
		}

		for (p in b) {
			if (typeof a[p] == 'undefined') {
				return false;
			}
		}
		return true;
	},
	defineIfNotExists: function defineIfNotExists(obj, key, defaultValue) {
		if (!obj.hasOwnProperty(key)) {
			obj[key] = defaultValue;
		}
	},
	deepMerge: function deepMerge(obj1, obj2) {
		return jQuery.extend(true, {}, obj1, obj2);
	},

	registry: {},

	register: function register(key, val) {
		this.registry[key] = val;
	},

	get: function get$$1(key) {
		return this.registry.hasOwnProperty(key) ? this.registry[key] : null;
	},

	moveItem: function moveItem(array, old_index, new_index) {
		if (new_index >= array.length) {
			var k = new_index - array.length;
			while (k-- + 1) {
				array.push(undefined);
			}
		}
		array.splice(new_index, 0, array.splice(old_index, 1)[0]);
	}
};

var CommonStrings = {
	capitalizeFirstLetter: function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
	lowerFirstLetter: function lowerFirstLetter(string) {
		return string.charAt(0).toLowerCase() + string.slice(1);
	}
};

var CommonFunctions = {
	pipe: function pipe(data /* feed data */, funcs /* functions array */) {
		var result = void 0;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = funcs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var func = _step.value;

				result = func(result || data);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return result;
	}
};

var CommonDOM = {
	getAttributesStartsWith: function getAttributesStartsWith(el, startsWith) {
		var allElements = el.querySelectorAll('*');
		var list = [];
		for (var j = 0; j < allElements.length; j++) {
			for (var i = 0, atts = allElements[j].attributes, n = atts.length; i < n; i++) {
				if (atts[i].nodeName.indexOf(startsWith) === 0) {
					list.push(allElements[j]);
					break;
				}
			}
		}
		return list;
	}
};

var CommonApp = {
	startApp: function startApp(starter) {
		document.addEventListener('DOMContentLoaded', starter);
	},
	getApp: function getApp() {
		return this.get('app');
	}
};

/*
	список того что нужно подключить как общие
*/
var notCommon = Object.assign({}, CommonObjects);

notCommon.extendWith(CommonNetwork);
notCommon.extendWith(CommonStrings);
notCommon.extendWith(CommonLogs);
notCommon.extendWith(CommonShorts);
notCommon.extendWith(CommonFunctions);
notCommon.extendWith(CommonDOM);
notCommon.extendWith(CommonApp);

/*
	:property.sub1.func().funcProp
	 = return funcProp of function result of sub1 property of property of object
	:{::helperVal}.sub
	 = return sub property of object property with name retrieved from helperVal property of helpers object
	:{::helperFunc()}.sub
	= return sub property of object property with name retrieved from helperVal function result of helpers object.
	if helpersFunx return 'car' then source path becomes :car.sub

*/

var SUB_PATH_START = '{';
var SUB_PATH_END = '}';
var PATH_SPLIT = '.';
var PATH_START_OBJECT = ':';
var PATH_START_HELPERS = '::';
var FUNCTION_MARKER = '()';
var MAX_DEEP = 10;

var notPath = function () {
	function notPath() {
		classCallCheck(this, notPath);

		return this;
	}
	/*
 	input ':{::helperVal}.sub'
 	return ::helperVal
 */


	createClass(notPath, [{
		key: 'findNextSubPath',
		value: function findNextSubPath(path /* string */) {
			var subPath = '',
			    find = false;
			for (var i = 0; i < path.length; i++) {
				if (path[i] === SUB_PATH_START) {
					find = true;
					subPath = '';
				} else {
					if (path[i] === SUB_PATH_END && find) {
						if (find) {
							return subPath;
						}
					} else {
						subPath += path[i];
					}
				}
			}
			return find ? subPath : null;
		}
	}, {
		key: 'replaceSubPath',
		value: function replaceSubPath(path, sub, parsed) {
			var subf = SUB_PATH_START + sub + SUB_PATH_END;
			while (path.indexOf(subf) > -1) {
				path = path.replace(subf, parsed);
			}
			return path;
		}
	}, {
		key: 'parseSubs',
		value: function parseSubs(path, item, helpers) {
			var subPath = void 0,
			    subPathParsed = void 0,
			    i = 0;
			while (subPath = this.findNextSubPath(path)) {
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);
				path = this.replaceSubPath(path, subPath, subPathParsed);
				i++;
				if (i > MAX_DEEP) {
					break;
				}
			}
			return path;
		}
	}, {
		key: 'get',
		value: function get$$1(path, item, helpers) {
			switch (path) {
				case PATH_START_OBJECT:
					return item;
				case PATH_START_HELPERS:
					return helpers;
			}
			path = this.parseSubs(path, item, helpers);
			return this.getValueByPath(path.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, path, item, helpers);
		}
	}, {
		key: 'set',
		value: function set$$1(path, item, helpers, attrValue) {
			var subPath = void 0,
			    subPathParsed = void 0,
			    i = 0;
			while (subPath = this.findNextSubPath(path)) {
				subPathParsed = this.getValueByPath(subPath.indexOf(PATH_START_HELPERS) > -1 ? helpers : item, subPath, item, helpers);
				path = this.replaceSubPath(path, subPath, subPathParsed);
				if (i > MAX_DEEP) {
					break;
				}
			}
			this.setValueByPath(item, path, attrValue);
			if (item.isRecord && this.normilizePath(path).length > 1) {
				item.trigger('change', item, path, attrValue);
			}
		}
	}, {
		key: 'unset',
		value: function unset(path, item, helpers) {
			this.set(path, item, helpers, null);
		}
	}, {
		key: 'parsePathStep',
		value: function parsePathStep(step, item, helper) {
			var rStep = null;
			if (step.indexOf(PATH_START_HELPERS) === 0 && helper) {
				rStep = step.replace(PATH_START_HELPERS, '');
				if (rStep.indexOf(FUNCTION_MARKER) === rStep.length - 2) {
					rStep = step.replace(FUNCTION_MARKER, '');
					if (helper.hasOwnProperty(rStep)) {
						return helper[rStep](item, undefined);
					}
				} else {
					return helper[rStep];
				}
			} else {
				if (step.indexOf(PATH_START_OBJECT) === 0 && item) {
					rStep = step.replace(PATH_START_OBJECT, '');
					if (rStep.indexOf(FUNCTION_MARKER) === rStep.length - 2) {
						rStep = step.replace(FUNCTION_MARKER, '');
						if (item.hasOwnProperty(rStep)) {
							return item[rStep](item, undefined);
						}
					} else {
						return item[rStep];
					}
				}
			}
			return step;
		}

		//::fieldName.result
		//{}
		//{fieldName: 'targetRecordField'}
		////['targetRecordField', 'result']

	}, {
		key: 'parsePath',
		value: function parsePath(path, item, helper) {
			if (!Array.isArray(path)) {
				path = path.split(PATH_SPLIT);
			}
			for (var i = 0; i < path.length; i++) {
				path[i] = this.parsePathStep(path[i], item, helper);
			}
			return path;
		}
	}, {
		key: 'normilizePath',
		value: function normilizePath(path) {
			if (Array.isArray(path)) {
				return path;
			} else {
				while (path.indexOf(PATH_START_OBJECT) > -1) {
					path = path.replace(PATH_START_OBJECT, '');
				}
				return path.split(PATH_SPLIT);
			}
		}

		/*
  	small = ["todo"],
  	big = ["todo", "length"]
  	return true;
  	*/

	}, {
		key: 'ifFullSubPath',
		value: function ifFullSubPath(big, small) {
			if (big.length < small.length) {
				return false;
			}
			for (var t = 0; t < small.length; t++) {
				if (small[t] !== big[t]) {
					return false;
				}
			}
			return true;
		}
	}, {
		key: 'getValueByPath',
		value: function getValueByPath(object, attrPath, item, helpers) {
			attrPath = this.normilizePath(attrPath);
			var attrName = attrPath.shift(),
			    isFunction = attrName.indexOf(FUNCTION_MARKER) > -1;
			if (isFunction) {
				attrName = attrName.replace(FUNCTION_MARKER, '');
			}
			if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && typeof object[attrName] !== 'undefined' && object[attrName] !== null) {
				var newObj = isFunction ? object[attrName]({ item: item, helpers: helpers }) : object[attrName];
				if (attrPath.length > 0) {
					return this.getValueByPath(newObj, attrPath, item, helpers);
				} else {
					return newObj;
				}
			} else {
				return undefined;
			}
		}
	}, {
		key: 'setValueByPath',
		value: function setValueByPath(object, attrPath, attrValue) {
			attrPath = this.normilizePath(attrPath);
			var attrName = attrPath.shift();
			if (attrPath.length > 0) {
				if (!object.hasOwnProperty(attrName)) {
					object[attrName] = {};
				}
				this.setValueByPath(object[attrName], attrPath, attrValue);
			} else {
				object[attrName] = attrValue;
			}
		}
	}, {
		key: 'join',
		value: function join() {
			var args = Array.prototype.slice.call(arguments);
			return args.join(PATH_SPLIT);
		}
	}]);
	return notPath;
}();

var notPath$1 = new notPath();

var META_METHOD_INIT = Symbol('init');
var META_EVENTS = Symbol('events');
var META_DATA = Symbol('data');
var META_WORKING = Symbol('working');
var META_OPTIONS = Symbol('options');

var notBase = function () {
    function notBase(input) {
        classCallCheck(this, notBase);

        this[META_EVENTS] = {};
        this[META_DATA] = {};
        this[META_WORKING] = {};
        this[META_OPTIONS] = {};
        this[META_METHOD_INIT](input);
        return this;
    }

    createClass(notBase, [{
        key: META_METHOD_INIT,
        value: function value(input) {
            if (!input) {
                input = {};
            }
            if (input.hasOwnProperty('events')) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = input.events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var t = _step.value;

                        this.on.apply(this, toConsumableArray(t));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }

            if (input.hasOwnProperty('data')) {
                this.setData(input.data);
            }

            if (input.hasOwnProperty('working')) {
                this.setWorking(input.working);
            }

            if (input.hasOwnProperty('options')) {
                this.setOptions(input.options);
            }
        }
    }, {
        key: 'setCommon',
        value: function setCommon(what, args) {
            switch (args.length) {
                case 1:
                    {
                        /* set collection */
                        what = args[0];
                        break;
                    }
                case 2:
                    {
                        /* set collection element */
                        notPath$1.set(args[0] /* path */, what /* collection */, undefined /* helpers */, args[1] /* value */);
                        break;
                    }
            }
            return this;
        }
    }, {
        key: 'getCommon',
        value: function getCommon(what, args) {
            switch (args.length) {
                /* if we want get data by path */
                case 1:
                    {
                        return notPath$1.get(args[0], what);
                    }
                /* if we want get data by path with default value */
                case 2:
                    {
                        var res = notPath$1.get(args[0], what);
                        if (res === undefined) {
                            /* no data, return default value */
                            return args[1];
                        } else {
                            /* data, return it */
                            return res;
                        }
                    }
                /* return full collection */
                default:
                    {
                        return what;
                    }
            }
        }

        /*
        	CORE OBJECT
        		DATA - information
        		OPTIONS - how to work
        		WORKING - temporarily generated in proccess
        */

    }, {
        key: 'setData',
        value: function setData() {
            if (arguments.length === 1) {
                this[META_DATA] = arguments[0];
            } else {
                this.setCommon(this.getData(), arguments);
            }
            this.trigger('change');
            return this;
        }
    }, {
        key: 'getData',
        value: function getData() {
            return this.getCommon(this[META_DATA], arguments);
        }
    }, {
        key: 'setOptions',
        value: function setOptions() {
            if (arguments.length === 1) {
                this[META_OPTIONS] = arguments[0];
            } else {
                this.setCommon(this.getOptions(), arguments);
            }
            return this;
        }
    }, {
        key: 'getOptions',
        value: function getOptions() {
            return this.getCommon(this[META_OPTIONS], arguments);
        }
    }, {
        key: 'setWorking',
        value: function setWorking() {
            if (arguments.length === 1) {
                this[META_WORKING] = arguments[0];
            } else {
                this.setCommon(this.getWorking(), arguments);
            }
            return this;
        }
    }, {
        key: 'getWorking',
        value: function getWorking() {
            return this.getCommon(this[META_WORKING], arguments);
        }

        /*
        	EVENTS handling
        */

    }, {
        key: 'on',
        value: function on(eventNames, eventCallbacks, once) {
            var _this = this;

            if (!Array.isArray(eventNames)) {
                eventNames = [eventNames];
            }
            if (!Array.isArray(eventCallbacks)) {
                eventCallbacks = [eventCallbacks];
            }
            eventNames.forEach(function (name) {
                notCommon.defineIfNotExists(_this[META_EVENTS], name, []);
                _this[META_EVENTS][name].push({
                    callbacks: eventCallbacks,
                    once: once,
                    count: 0
                });
            });
            return this;
        }
    }, {
        key: 'trigger',
        value: function trigger() {
            var args = Array.from(arguments),
                eventName = args.shift();
            if (!Array.isArray(eventName)) {
                eventName = [eventName];
            }
            for (var g = 0; g < eventName.length; g++) {
                var name = eventName[g];
                if (this[META_EVENTS].hasOwnProperty(name)) {
                    for (var t = 0; t < this[META_EVENTS][name].length; t++) {
                        var event = this[META_EVENTS][name][t];
                        if (event.once) {
                            this.off(name, event.callbacks);
                        }
                        for (var h = 0; h < event.callbacks.length; h++) {
                            var _event$callbacks;

                            (_event$callbacks = event.callbacks)[h].apply(_event$callbacks, toConsumableArray(args));
                        }
                    }
                }
            }
            return this;
        }
    }, {
        key: 'off',
        value: function off(eventNames /* array of event names */, eventCallbacks /* array of callbacks */) {
            if (!Array.isArray(eventNames)) {
                eventNames = [eventNames];
            }
            if (!Array.isArray(eventCallbacks)) {
                eventCallbacks = [eventCallbacks];
            }
            for (var g = 0; g < eventNames.length; g++) {
                var name = eventNames[g];
                var targetId = -1;
                for (var h = 0; h < this[META_EVENTS][name].length; h++) {
                    var event = this[META_EVENTS][name][h];
                    if (targetId === -1 && eventCallbacks === event.callbacks) {
                        targetId = h;
                        break;
                    }
                }
                if (targetId > -1) {
                    this[META_EVENTS][name].splice(targetId, 1);
                }
            }
            return this;
        }
    }, {
        key: 'offAll',
        value: function offAll() {
            var events = Object.keys(this[META_EVENTS]);
            for (var t = 0; t < events.length; t++) {
                if (this[META_EVENTS].hasOwnProperty(events[t])) {
                    delete this[META_EVENTS][events[t]];
                }
            }
        }
    }]);
    return notBase;
}();

var OPT_MODE_HISTORY = Symbol('history');
var OPT_MODE_HASH = Symbol('hash');
var OPT_DEFAULT_CHECK_INTERVAL = 50;

var notRouter = function (_notBase) {
	inherits(notRouter, _notBase);

	function notRouter() {
		var _ret;

		classCallCheck(this, notRouter);

		var _this = possibleConstructorReturn(this, (notRouter.__proto__ || Object.getPrototypeOf(notRouter)).call(this));

		_this.setWorking({
			routes: [],
			mode: OPT_MODE_HISTORY,
			root: '/', //always in slashes /user/, /, /input/. and no /user or input/level
			initialized: false
		});
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notRouter, [{
		key: 'history',
		value: function history() {
			this.setWorking('mode', OPT_MODE_HISTORY);
		}
	}, {
		key: 'hash',
		value: function hash() {
			this.setWorking('mode', OPT_MODE_HASH);
		}
	}, {
		key: 'setRoot',
		value: function setRoot(root) {
			this.setWorking('root', root ? '/' + this.clearSlashes(root) + '/' : '/');
			return this;
		}
	}, {
		key: 'clearSlashes',
		value: function clearSlashes(path) {
			//first and last slashes removal
			return path.toString().replace(/\/$/, '').replace(/^\//, '');
		}
	}, {
		key: 'add',
		value: function add(re, handler) {
			if (typeof re == 'function') {
				handler = re;
				re = '';
			}
			var rule = {
				re: re,
				handler: handler
			};
			this.getWorking('routes').push(rule);
			return this;
		}
	}, {
		key: 'addList',
		value: function addList(list) {
			for (var t in list) {
				this.add(t, list[t]);
			}
			return this;
		}
	}, {
		key: 'remove',
		value: function remove(param) {
			for (var i = 0, r; i < this.getWorking('routes').length, r = this.getWorking('routes')[i]; i++) {
				if (r.handler === param || r.re === param) {
					this.getWorking('routes').splice(i, 1);
					return this;
				}
			}
			return this;
		}
	}, {
		key: 'flush',
		value: function flush() {
			this.setWorking({
				routes: [],
				mode: OPT_MODE_HISTORY,
				root: '/'
			});
			return this;
		}
	}, {
		key: 'isInitialized',
		value: function isInitialized() {
			return this.getWorking('initialized');
		}
	}, {
		key: 'setInitialized',
		value: function setInitialized() {
			var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			return this.setWorking('initialized', val);
		}
	}, {
		key: 'getFragment',
		value: function getFragment() {
			var fragment = '';
			if (this.getWorking('mode') === OPT_MODE_HISTORY) {
				if (!location) return '';
				fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
				fragment = fragment.replace(/\?(.*)$/, '');
				fragment = this.getWorking('root') != '/' ? fragment.replace(this.getWorking('root'), '') : fragment;
			} else {
				if (!window) return '';
				var match = window.location.href.match(/#(.*)$/);
				fragment = match ? match[1] : '';
			}
			return this.clearSlashes(fragment);
		}
	}, {
		key: 'checkLocation',
		value: function checkLocation() {
			var current = this.getWorking('current'),
			    fragment = this.getFragment(),
			    init = this.isInitialized();
			if (current !== fragment || !init) {
				this.setWorking('current', fragment);
				this.check(fragment);
				this.setInitialized();
			}
		}
	}, {
		key: 'hrefClick',
		value: function hrefClick() {
			//console.log(...arguments);
		}
	}, {
		key: 'getRoot',
		value: function getRoot() {
			return '';
		}
	}, {
		key: 'listen',
		value: function listen() {
			var loopInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : OPT_DEFAULT_CHECK_INTERVAL;

			this.setWorking('current', 'notInitialized');
			clearInterval(this.getWorking('interval'));
			this.setWorking('interval', setInterval(this.checkLocation.bind(this), loopInterval));
			window.addEventListener('popstate', this.hrefClick.bind(this));
			return this;
		}
	}, {
		key: 'check',
		value: function check(f) {
			var fragment = f || this.getFragment();
			for (var i = 0; i < this.getWorking('routes').length; i++) {
				var path = this.getWorking('root') + this.getWorking('routes')[i].re;
				var fullRE = this.clearSlashes(decodeURI(path));
				var match = fragment.match(fullRE);
				if (match) {
					match.shift();
					this.getWorking('routes')[i].handler.apply(this.host || {}, match);
					return this;
				}
			}
			return this;
		}
	}, {
		key: 'navigate',
		value: function navigate(path) {
			path = path ? path : '';
			switch (this.getWorking('mode')) {
				case OPT_MODE_HISTORY:
					{
						//console.log('push state', this.getFullRoute(path));
						history.pushState(null, null, this.getFullRoute(path));
						break;
					}
				case OPT_MODE_HASH:
					{
						window.location.href.match(/#(.*)$/);
						window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
						break;
					}
			}
			return this;
		}
	}, {
		key: 'getFullRoute',
		value: function getFullRoute() {
			var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

			return this.getWorking('root') + this.clearSlashes(path);
		}
	}, {
		key: 'getAllLinks',
		value: function getAllLinks() {
			var allElements = document.body.querySelectorAll('a');
			var list = [];
			for (var j = 0; j < allElements.length; j++) {
				for (var i = 0, atts = allElements[j].attributes, n = atts.length; i < n; i++) {
					if (atts[i].nodeName.indexOf('n-href') === 0) {
						list.push(allElements[j]);
						break;
					}
				}
			}
			return list;
		}
	}, {
		key: 'reRouteExisted',
		value: function reRouteExisted() {
			var list = this.getAllLinks();
			for (var t = 0; t < list.length; t++) {
				this.initRerouting(list[t], list[t].getAttribute('n-href'));
			}
			return this;
		}
	}, {
		key: 'initRerouting',
		value: function initRerouting(el, link) {
			var _this2 = this;

			if (!el.notRouterInitialized) {
				var fullLink = this.getFullRoute(link);
				el.setAttribute('href', fullLink);
				el.addEventListener('click', function (e) {
					e.preventDefault();
					_this2.navigate(link);
					return false;
				});
				el.notRouterInitialized = true;
			}
			return this;
		}
	}]);
	return notRouter;
}(notBase);

var notRouter$1 = new notRouter();

var notAPIOptions = {
	rps: 50,
	protocol: 'http',
	host: 'localhost',
	port: 9000
};

var notAPIQuee = function () {
	function notAPIQuee(requestsPerSecond) {
		classCallCheck(this, notAPIQuee);

		this.quee = [];
		this.int = null;
		this.requestsPerSecond = requestsPerSecond || 5;
		return this;
	}

	createClass(notAPIQuee, [{
		key: "run",
		value: function run() {
			this.int = window.setInterval(this.check.bind(this), 1000 / this.requestsPerSecond);
		}
	}, {
		key: "check",
		value: function check() {
			if (this.inProgress) {
				return;
			} else {
				if (this.quee.length > 0) {
					this.inProgress = true;
					var toCall = this.quee.shift();
					toCall();
				}
			}
		}
	}, {
		key: "next",
		value: function next() {
			this.inProgress = false;
		}
	}, {
		key: "add",
		value: function add(call) {
			this.quee.push(call);
		}
	}, {
		key: "pause",
		value: function pause() {
			window.clearInterval(this.int);
		}
	}, {
		key: "resume",
		value: function resume() {
			this.run();
		}
	}]);
	return notAPIQuee;
}();

var notAPI$1 = function (_notBase) {
	inherits(notAPI, _notBase);

	function notAPI(options) {
		var _ret;

		classCallCheck(this, notAPI);

		var _this = possibleConstructorReturn(this, (notAPI.__proto__ || Object.getPrototypeOf(notAPI)).call(this));

		_this.setOptions(notCommon.extend(notAPIOptions, options));
		_this.quee = new notAPIQuee(_this.getOptions('rps'));
		_this.quee.run();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notAPI, [{
		key: 'makeUrl',
		value: function makeUrl(parts) {
			return parts.join('/');
		}
	}, {
		key: 'queeRequest',
		value: function queeRequest(method, url, id, data, good, bad) {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				_this2.quee.add(_this2.makeRequest.bind(_this2, method, url, id, data, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'makeRequest',
		value: function makeRequest(method, url, id, data, good, bad) {
			var _this3 = this;

			notCommon.requestJSON(method, url, data).then(function (response) {
				_this3.quee.next();
				good && good(response);
			}).catch(function (response) {
				_this3.quee.next();
				bad && bad(response);
			});
		}
	}, {
		key: 'update',
		value: function update(obj, good, bad) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var id = obj.getId(),
				    modelName = obj.getModelName(),
				    url = _this4.makeUrl([_this4.getOptions('base'), modelName, id]),
				    data = obj.getJSON();
				_this4.quee.add(_this4.makeRequest.bind(_this4, 'post', url, id, data, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'put',
		value: function put(obj, good, bad) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				var modelName = obj.getModelName(),
				    data = obj.getJSON(),
				    url = _this5.makeUrl([_this5.getOptions('base'), modelName]);
				_this5.quee.add(_this5.makeRequest.bind(_this5, 'put', url, null, data, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'get',
		value: function get$$1(obj, good, bad) {
			var _this6 = this;

			return new Promise(function (resolve, reject) {
				var id = obj.getId(),
				    modelName = obj.getModelName(),
				    url = _this6.makeUrl([_this6.getOptions('base'), modelName, id]);
				_this6.quee.add(_this6.makeRequest.bind(_this6, 'get', url, id, null, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'list',
		value: function list(obj, good, bad) {
			var _this7 = this;

			return new Promise(function (resolve, reject) {
				var modelName = obj.getModelName(),
				    url = _this7.makeUrl([_this7.getOptions('base'), modelName]);
				_this7.quee.add(_this7.makeRequest.bind(_this7, 'get', url, null, null, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}, {
		key: 'delete',
		value: function _delete(obj, good, bad) {
			var _this8 = this;

			return new Promise(function (resolve, reject) {
				var id = obj.getId(),
				    modelName = obj.getModelName(),
				    url = _this8.makeUrl([_this8.getOptions('base'), modelName, id]);
				_this8.quee.add(_this8.makeRequest.bind(_this8, 'delete', url, id, null, function (responseOK) {
					good && good(responseOK);
					resolve(responseOK);
				}, function (responseFailed) {
					bad && bad(responseFailed);
					reject(responseFailed);
				}));
			});
		}
	}]);
	return notAPI;
}(notBase);

var notImage = function (_notBase) {
	inherits(notImage, _notBase);

	function notImage() {
		classCallCheck(this, notImage);
		return possibleConstructorReturn(this, (notImage.__proto__ || Object.getPrototypeOf(notImage)).call(this));
	}

	return notImage;
}(notBase);

var PROCESSOR_EXPRESSION_PREFIX = 'n-';
var TEMPLATE_TAG = 'nt';
var PROCESSOR_EXPRESSION_SEPARATOR = '-';
var PROCESSOR_EXPRESSION_CONDITION_POSTFIX = 'if';
var COMPONENT_ID_PREFIX = 'not_component_';
var PART_ID_PREFIX = 'not_part_';
var DEFAULT_PLACER = 'place';
var DEFAULT_PLACER_LOOP = 'placeAfter';

var OPTS = {
	PROCESSOR_EXPRESSION_PREFIX: PROCESSOR_EXPRESSION_PREFIX,
	TEMPLATE_TAG: TEMPLATE_TAG,
	PROCESSOR_EXPRESSION_SEPARATOR: PROCESSOR_EXPRESSION_SEPARATOR,
	PROCESSOR_EXPRESSION_CONDITION_POSTFIX: PROCESSOR_EXPRESSION_CONDITION_POSTFIX,
	DEFAULT_PLACER: DEFAULT_PLACER,
	COMPONENT_ID_PREFIX: COMPONENT_ID_PREFIX,
	PART_ID_PREFIX: PART_ID_PREFIX,
	DEFAULT_PLACER_LOOP: DEFAULT_PLACER_LOOP
};

var META_CACHE = Symbol('cache');

var notTemplateCache = function (_notBase) {
	inherits(notTemplateCache, _notBase);

	function notTemplateCache() {
		var _ret;

		classCallCheck(this, notTemplateCache);

		var _this = possibleConstructorReturn(this, (notTemplateCache.__proto__ || Object.getPrototypeOf(notTemplateCache)).call(this));

		_this[META_CACHE] = {};
		_this.setWorking('loading', []);
		_this.hideTemplates();
		_this.register();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notTemplateCache, [{
		key: 'hideTemplates',
		value: function hideTemplates() {
			var t = document.createElement('style');
			t.innerHTML = OPTS.TEMPLATE_TAG + '{display: none;}';
			document.head.appendChild(t);
		}
	}, {
		key: 'register',
		value: function register() {
			notCommon.register('templateCache', this);
		}
	}, {
		key: 'load',
		value: function load(map) {
			this.setWorking('loading', []);
			for (var i in map) {
				this.loadOne(i, map[i]);
			}
		}
	}, {
		key: 'loadOne',
		value: function loadOne(key, url, callback) {
			var oRequest = new XMLHttpRequest();
			oRequest.open('GET', url);
			oRequest.addEventListener('load', function (response) {
				var div = document.createElement('DIV');
				div.dataset.notTemplateName = key;
				div.dataset.notTemplateURL = url;
				div.innerHTML = response.srcElement.responseText;
				this.setOne(key, div);
				callback && callback(key, url, div);
			}.bind(this));
			oRequest.send();
		}
	}, {
		key: 'ifAllLoaded',
		value: function ifAllLoaded() {
			if (this.getWorking('loading').length === 0) {
				this.trigger('loaded');
			}
		}
	}, {
		key: 'setOne',
		value: function setOne(key, element) {
			if (element instanceof HTMLElement) {
				this[META_CACHE][key] = element;
			} else {
				this.addFromText(key, element);
			}
		}
	}, {
		key: 'get',
		value: function get$$1(key) {
			return this[META_CACHE].hasOwnProperty(key) ? this[META_CACHE][key].cloneNode(true) : null;
		}
	}, {
		key: 'getNames',
		value: function getNames() {
			return Object.keys(this[META_CACHE]);
		}
	}, {
		key: 'getByURL',
		value: function getByURL(url) {
			for (var i in this[META_CACHE]) {
				if (this[META_CACHE][i].src == url) {
					return this.get(i);
				}
			}
			return null;
		}
		/*----------------------------------------------------------------------------*/
		//	New API
		/*----------------------------------------------------------------------------*/

	}, {
		key: 'setLoaded',
		value: function setLoaded(key) {
			var t = this.getWorking('loading').indexOf(key);
			if (t > -1) {
				this.getWorking('loading').splice(t, 1);
			}
			this.getWorking('loaded').push('key');
		}
	}, {
		key: 'wrap',
		value: function wrap(key, url, innerHTML) {
			var cont = document.createElement(OPTS.TEMPLATE_TAG);
			cont.name = key;
			cont.src = url;
			cont.innerHTML = innerHTML;
			return cont;
		}
	}, {
		key: 'parseLib',
		value: function parseLib(text) {
			var cont = document.createElement('div');
			var result = {};
			cont.innerHTML = text;
			var notTemplatesElements = cont.querySelectorAll(OPTS.TEMPLATE_TAG);
			for (var elId = 0; elId < notTemplatesElements.length; elId++) {
				var el = notTemplatesElements[elId];
				if (el.parentNode === cont) {
					if (el.attributes.name && el.attributes.name.value) {
						result[el.attributes.name.value] = el;
					}
				}
			}
			return result;
		}
	}, {
		key: 'addLib',
		value: function addLib(lib) {
			for (var t in lib) {
				this.setOne(t, lib[t]);
			}
			return this;
		}
	}, {
		key: 'addFromURL',
		value: function addFromURL(key, url) {
			var _this2 = this,
			    _arguments = arguments;

			return new Promise(function (resolve, reject) {
				if (_this2.get(key)) {
					resolve(_this2.get(key));
				} else {
					//that.setLoading(key, url);
					notCommon.getHTML(url).then(function (templateInnerHTML) {
						var templateContEl = _this2.wrap(key, url, templateInnerHTML);
						_this2.setOne(key, templateContEl);
						resolve(_this2.get(key));
					}).catch(function () {
						notCommon.error('error loading template', key, url);
						reject.apply(undefined, _arguments);
					});
				}
			});
		}
	}, {
		key: 'addLibFromURL',
		value: function addLibFromURL(url) {
			var _this3 = this,
			    _arguments2 = arguments;

			return new Promise(function (resolve, reject) {
				notCommon.getHTML(url).then(function (templatesHTML) {
					var templates = _this3.parseLib(templatesHTML);
					_this3.addLib(templates);
					resolve(templates);
				}).catch(function (e) {
					notCommon.error('error loading templates lib', url, e);
					reject.apply(undefined, _arguments2);
				});
			});
		}
	}, {
		key: 'addFromDocument',
		value: function addFromDocument(selectorOrElement) {
			var el = typeof selectorOrElement === 'string' ? document.querySelector(selectorOrElement) : selectorOrElement;
			if (el.attributes.name && el.attributes.name.value) {
				if (el.tagName.toLowerCase() === OPTS.TEMPLATE_TAG.toLowerCase()) {
					this.setOne(el.attributes.name.value, el);
				}
			}
			return this;
		}
	}, {
		key: 'addFromText',
		value: function addFromText(key, templateInnerHTML) {
			var templateContEl = this.wrap(key, '', templateInnerHTML);
			this.setOne(key, templateContEl);
			return this;
		}
	}]);
	return notTemplateCache;
}(notBase);

var notTemplateCache$1 = new notTemplateCache();

var OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY = ['_id', 'id', 'ID'];
var DEFAULT_FILTER = {};
var DEFAULT_PAGE_NUMBER = 1;
var DEFAULT_PAGE_SIZE = 10;

var notInterface = function (_notBase) {
	inherits(notInterface, _notBase);

	function notInterface(manifest) {
		var _ret;

		classCallCheck(this, notInterface);

		var _this = possibleConstructorReturn(this, (notInterface.__proto__ || Object.getPrototypeOf(notInterface)).call(this, {}));

		_this.manifest = manifest;
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notInterface, [{
		key: 'parseLine',
		value: function parseLine(line, record, actionName) {
			var recordRE = ':record[',
			    fieldName = '';
			while (line.indexOf(recordRE) > -1) {
				var ind = line.indexOf(recordRE);
				var len = recordRE.length;
				var ind2 = line.indexOf(']');
				var startSlice = ind + len;
				var endSlice = ind2;
				fieldName = line.slice(startSlice, endSlice);
				if (fieldName == '') break;
				line = line.replace(':record[' + fieldName + ']', record.getAttr(fieldName));
			}
			line = line.replace(':modelName', this.manifest.model);
			line = line.replace(':actionName', actionName);
			return line;
		}
	}, {
		key: 'getURL',
		value: function getURL(record, actionData, actionName) {
			var line = this.parseLine(this.manifest.url, record, actionName) + (actionData.hasOwnProperty('postFix') ? this.parseLine(actionData.postFix, record, actionName) : '');
			return line;
		}
	}, {
		key: 'getID',
		value: function getID(record, actionData) {
			var resultId = void 0,
			    list = OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY,
			    prefixes = ['', this.manifest.model];
			if (actionData.hasOwnProperty('index') && actionData.index) {
				list = [actionData.index].concat(OPT_DEFAULT_INDEX_FIELD_NAME_PRIORITY);
			}
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = prefixes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var pre = _step.value;
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = list[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var t = _step2.value;

							if (record.hasOwnProperty(pre + t)) {
								resultId = record[pre + t];
								break;
							}
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2.return) {
								_iterator2.return();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return resultId;
		}
	}, {
		key: 'getActionsCount',
		value: function getActionsCount() {
			return this.getActions() ? Object.keys(this.getActions()).length : 0;
		}
	}, {
		key: 'getActions',
		value: function getActions() {
			return this.manifest && this.manifest.actions ? this.manifest.actions : {};
		}
	}, {
		key: 'setFindBy',
		value: function setFindBy(key, value) {
			var obj = {};
			obj[key] = value;
			return this.setFilter(obj);
		}
	}, {
		key: 'setFilter',
		value: function setFilter() {
			var filterData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_FILTER;

			return this.setWorking('filter', filterData);
		}
	}, {
		key: 'resetFilter',
		value: function resetFilter() {
			return this.setFilter({});
		}
	}, {
		key: 'getFilter',
		value: function getFilter() {
			return this.getWorking('filter');
		}
	}, {
		key: 'setSorter',
		value: function setSorter(sorterData) {
			return this.setWorking('sorter', sorterData);
		}
	}, {
		key: 'getSorter',
		value: function getSorter() {
			return this.getWorking('sorter');
		}
	}, {
		key: 'setPageNumber',
		value: function setPageNumber(pageNumber) {
			return this.setWorking('pageNumber', pageNumber);
		}
	}, {
		key: 'setPageSize',
		value: function setPageSize(pageSize) {
			return this.setWorking('pageSize', pageSize);
		}
	}, {
		key: 'setPager',
		value: function setPager() {
			var pageSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PAGE_SIZE;
			var pageNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_PAGE_NUMBER;

			return this.setWorking('pageSize', pageSize).setWorking('pageNumber', pageNumber);
		}
	}, {
		key: 'resetPager',
		value: function resetPager() {
			return this.setPager();
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			return {
				pageSize: this.getWorking('pageSize'),
				pageNumber: this.getWorking('pageNumber')
			};
		}
	}, {
		key: 'getModelName',
		value: function getModelName() {
			return this && this.manifest ? this.manifest.model : null;
		}
	}, {
		key: 'getActionData',
		value: function getActionData(actionName) {
			return this.getActions() && this.getActions()[actionName] ? this.getActions()[actionName] : null;
		}
	}, {
		key: 'collectRequestData',
		value: function collectRequestData(actionData) {
			var requestData = {};
			if (actionData.hasOwnProperty('data') && Array.isArray(actionData.data)) {
				for (var i = 0; i < actionData.data.length; i++) {
					var dataProviderName = 'get' + notCommon.capitalizeFirstLetter(actionData.data[i]);
					if (this[dataProviderName] && typeof this[dataProviderName] === 'function') {
						requestData = notCommon.extend(requestData, this[dataProviderName]());
					}
				}
			}
			return requestData;
		}
	}, {
		key: 'encodeRequest',
		value: function encodeRequest(data) {
			var p = '?';
			for (var t in data) {
				p += encodeURIComponent(t) + '=' + encodeURIComponent(data[t]) + '&';
			}
			return p;
		}

		//return Promise

	}, {
		key: 'request',
		value: function request(record, actionName) {
			var _this2 = this;

			var actionData = this.getActionData(actionName),
			    requestParams = this.collectRequestData(actionData),
			    requestParamsEncoded = this.encodeRequest(requestParams),
			    id = this.getID(record, actionData, actionName),
			    url = this.getURL(record, actionData, actionName);
			return notCommon.getAPI().queeRequest(actionData.method, url + requestParamsEncoded, id, JSON.stringify(record.getData())).then(function (data) {
				return _this2.afterSuccessRequest(data, actionData);
			});
		}
	}, {
		key: 'afterSuccessRequest',
		value: function afterSuccessRequest(data, actionData) {
			if (this && actionData && actionData.hasOwnProperty('isArray') && actionData.isArray) {
				for (var t = 0; t < data.length; t++) {
					data[t] = new notRecord(this.manifest, data[t]);
				}
			} else {
				data = new notRecord(this.manifest, data);
			}
			return data;
		}
	}]);
	return notInterface;
}(notBase);

var META_INTERFACE = Symbol('interface');
var META_PROXY = Symbol('proxy');
var META_CHANGE = Symbol('change');
var META_CHANGE_NESTED = Symbol('change.nested');
var META_SAL = ['getAttr', 'getAttrs', 'isProperty', 'isRecord', 'getManifest', 'setAttr', 'setAttrs', 'getData', 'setData', 'getJSON', 'on', 'off', 'trigger'];
var META_MAP_TO_INTERFACE = ['getActionsCount', 'getActions', 'setFindBy', 'resetFilter', 'setFilter', 'getFilter', 'setSorter', 'getSorter', 'resetSorter', 'setPageNumber', 'setPageSize', 'setPager', 'resetPager', 'getPager'];
var DEFAULT_ACTION_PREFIX = '$';
var META_RETURN_TO_ROOT = Symbol('returnToRoot');

var createPropertyHandlers = function createPropertyHandlers(owner) {
	return {
		get: function (target, key, context) {
			//notCommon.log(`proxy get "${key}"`, this, target, context);
			if (key === 'isProxy') {
				return true;
			}
			var resTarget = target;
			if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol') {
				if (this[key]) {
					resTarget = this;
				}
			} else {
				if (Object.keys(this).indexOf(key) > -1 || META_SAL.indexOf(key) > -1) {
					resTarget = this;
				}
			}
			return Reflect.get(resTarget, key, context);
		}.bind(owner),
		set: function (target, key, value /*, proxy*/) {
			//notCommon.log(`proxy set "${key}"`, typeof target[key]);

			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error('Invalid attempt to private "' + key + '" property');
			} else {
				var valueToReflect = value;
				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
					valueToReflect = new notProperty(this.getOptions('getRoot'), notPath$1.join(this.getOptions('path'), key), value);
				}
				var t = Reflect.set(target, key, valueToReflect);
				this.trigger('change', target, key, valueToReflect);
				return t;
			}
		}.bind(owner)
	};
};

var notProperty = function (_notBase) {
	inherits(notProperty, _notBase);

	function notProperty(getRoot, pathTo, item) {
		var _ret3;

		classCallCheck(this, notProperty);

		var _this = possibleConstructorReturn(this, (notProperty.__proto__ || Object.getPrototypeOf(notProperty)).call(this));

		if (typeof item === 'undefined' || item === null) {
			var _ret;

			return _ret = item, possibleConstructorReturn(_this, _ret);
		}
		if (item && (item.isProxy || item.isProperty)) {
			var _ret2;

			return _ret2 = item, possibleConstructorReturn(_this, _ret2);
		}
		_this.setOptions({
			getRoot: getRoot,
			path: pathTo
		});
		_this[META_PROXY] = new Proxy(item, createPropertyHandlers(_this));
		_this.setData(item);
		_this.isProperty = true;
		_this.on('change', _this[META_RETURN_TO_ROOT].bind(_this));
		return _ret3 = _this[META_PROXY], possibleConstructorReturn(_this, _ret3);
	}

	createClass(notProperty, [{
		key: META_RETURN_TO_ROOT,
		value: function value(proxy, key, _value) {
			var root = this.getOptions('getRoot')();
			root.trigger('change.nested', this[META_PROXY], this.getOptions('path'), key, _value);
		}
	}]);
	return notProperty;
}(notBase);

var createRecordHandlers = function createRecordHandlers(owner) {
	return {
		get: function (target, key, context) {
			//notCommon.log(`proxy get "${key}"`, this, target, context);
			if (key === 'isProxy' || key === 'isRecord') {
				return true;
			}
			var resTarget = target;
			if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol') {
				if (this[key]) {
					resTarget = this;
				}
			} else {
				if (Object.keys(this).indexOf(key) > -1 || META_SAL.indexOf(key) > -1 || META_MAP_TO_INTERFACE.indexOf(key) > -1) {
					resTarget = this;
				}
			}
			return Reflect.get(resTarget, key, context);
		}.bind(owner),
		set: function (target, key, value /*, proxy*/) {
			//notCommon.log(`record proxy set "${key}"`, this, target);
			//notCommon.trace();
			if (Object.keys(this).indexOf(key) > -1) {
				throw new Error('Invalid attempt to private "' + key + '" property');
			} else {
				var valueToReflect = value;
				if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
					valueToReflect = new notProperty(this.getOptions('getRoot'), notPath$1.join(this.getOptions('path'), key), value);
				}
				var t = Reflect.set(target, key, valueToReflect);
				this.trigger('change', target, key, valueToReflect);
				return t;
			}
		}.bind(owner)
	};
};

var notRecord = function (_notBase2) {
	inherits(notRecord, _notBase2);

	function notRecord(manifest, item) {
		var _ret8;

		classCallCheck(this, notRecord);

		var _this2 = possibleConstructorReturn(this, (notRecord.__proto__ || Object.getPrototypeOf(notRecord)).call(this));

		if (typeof item === 'undefined' || item === null) {
			var _ret4;

			return _ret4 = item, possibleConstructorReturn(_this2, _ret4);
		}
		if (item && item.isProxy) {
			var _ret5;

			notCommon.error('this is Proxy item');
			return _ret5 = item, possibleConstructorReturn(_this2, _ret5);
		}

		if (item && (item.isRecord || item.isProperty)) {
			var _ret6;

			return _ret6 = item, possibleConstructorReturn(_this2, _ret6);
		} else {
			if (Array.isArray(item)) {
				var _ret7;

				return _ret7 = _this2.createCollection(manifest, item), possibleConstructorReturn(_this2, _ret7);
			}
		}
		_this2.setOptions({});
		_this2[META_INTERFACE] = new notInterface(manifest);
		_this2.setData(_this2.initProperties(item));
		_this2.interfaceUp();
		_this2.isRecord = true;
		_this2[META_PROXY] = new Proxy(item, createRecordHandlers(_this2));
		//notCommon.log('proxy record created from ', item);
		_this2.on('change', _this2[META_CHANGE].bind(_this2));
		_this2.on('change.nested', _this2[META_CHANGE_NESTED].bind(_this2));
		return _ret8 = _this2[META_PROXY], possibleConstructorReturn(_this2, _ret8);
	}

	createClass(notRecord, [{
		key: 'initProperties',
		value: function initProperties(item) {
			var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

			if (typeof item !== 'undefined' && item !== null) {
				var keys = Object.keys(item);
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var key = _step.value;

						var curPath = path + (path.length > 0 ? '.' : '') + key;
						//notCommon.log('curPath', curPath);
						if (item.hasOwnProperty(key)) {
							if (_typeof(item[key]) === 'object' && item[key] !== null) {
								this.initProperties(item[key], curPath);
								item[key] = new notProperty(this.getRoot.bind(this), curPath, item[key]);
							} else {
								//notCommon.log(key, 'is own property, but not object');
							}
						} else {
								//notCommon.log(key, 'is not own property');
							}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
			return item;
		}
	}, {
		key: 'getRoot',
		value: function getRoot() {
			return this;
		}
	}, {
		key: 'createCollection',
		value: function createCollection(manifest, items) {
			var collection = [];
			for (var i = 0; i < items.length; i++) {
				collection.push(new notRecord(manifest, items[i]));
			}
			return collection;
		}
	}, {
		key: 'interfaceUp',
		value: function interfaceUp() {
			if (this[META_INTERFACE].getActionsCount() > 0) {
				var actions = this[META_INTERFACE].getActions();
				for (var i in actions) {
					this.actionUp(i, actions[i]);
				}
			}
		}
	}, {
		key: 'actionUp',
		value: function actionUp(index) {
			var _this3 = this;

			if (!this.hasOwnProperty([DEFAULT_ACTION_PREFIX + index])) {
				this[DEFAULT_ACTION_PREFIX + index] = function () {
					return _this3[META_INTERFACE].request(_this3, index);
				};
			}
		}
		/*
  -> 'path.to.key', valueOfKey
  <- ok, with one onChange event triggered
  */

	}, {
		key: 'setAttr',
		value: function setAttr(key, value) {
			return notPath$1.set(key, this[META_PROXY], {}, value);
		}

		/*
  ->
  {
  	'keyPath': value,
  	'key.subPath': value2,
  	'keyPath.0.title': value3
  }
  <- ok, with bunch of onChange events triggered
  */

	}, {
		key: 'setAttrs',
		value: function setAttrs(objectPart) {
			//notCommon.log('setAttrs', objectPart, Object.keys(objectPart));
			if (objectPart && (typeof objectPart === 'undefined' ? 'undefined' : _typeof(objectPart)) === 'object' && Object.keys(objectPart).length > 0) {
				for (var path in objectPart) {
					//notCommon.log('setAttrs one to go', path);
					this.setAttr(path, objectPart[path]);
				}
			}
		}

		/*
  -> 'pathToKey'
  <- value1
  	*/

	}, {
		key: 'getAttr',
		value: function getAttr(what) {
			//notCommon.log('getAttr', what);
			return notPath$1.get(what, this[META_PROXY], {});
		}

		/*
  -> ['pathToKey', 'path.to.key', 'simpleKey',...]
  <- [value1, value2, value3,...]
  */

	}, {
		key: 'getAttrs',
		value: function getAttrs(what) {
			var result = [];
			if (what && what.length > 0) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = what[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var path = _step2.value;

						result.push(this.getAttr(path));
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
			return result;
		}
	}, {
		key: 'getManifest',
		value: function getManifest() {
			if (this[META_INTERFACE]) {
				return this[META_INTERFACE].manifest;
			} else {
				return {};
			}
		}

		/*
  	handler for Proxy callbacks
  */

	}, {
		key: META_CHANGE,
		value: function value() {
			//notCommon.log('try to change', ...arguments);
		}
	}, {
		key: META_CHANGE_NESTED,
		value: function value() {
			//notCommon.log('try to change nested', ...arguments);
			//notCommon.trace();
			this.trigger('change', this[META_PROXY], notPath$1.join(arguments[1], arguments[2]), arguments[3]);
		}
	}, {
		key: 'setItem',
		value: function setItem(item) {
			this.setData(this.initProperties(item));
			this[META_PROXY] = new Proxy(item, createRecordHandlers(this));
			//notCommon.log('proxy created from ', item);
			this.off('change');
			this.off('change.nested');
			this.on('change', this[META_CHANGE].bind(this));
			this.on('change.nested', this[META_CHANGE_NESTED].bind(this));
			//notCommon.trace();
			return this[META_PROXY];
		}
	}, {
		key: 'setFindBy',
		value: function setFindBy() {
			var _META_INTERFACE;

			(_META_INTERFACE = this[META_INTERFACE]).setFindBy.apply(_META_INTERFACE, arguments);
			return this;
		}
	}, {
		key: 'setFilter',
		value: function setFilter() {
			var _META_INTERFACE2;

			(_META_INTERFACE2 = this[META_INTERFACE]).setFilter.apply(_META_INTERFACE2, arguments);
			return this;
		}
	}, {
		key: 'resetFilter',
		value: function resetFilter() {
			var _META_INTERFACE3;

			(_META_INTERFACE3 = this[META_INTERFACE]).resetFilter.apply(_META_INTERFACE3, arguments);
			return this;
		}
	}, {
		key: 'getFilter',
		value: function getFilter() {
			var _META_INTERFACE4;

			return (_META_INTERFACE4 = this[META_INTERFACE]).getFilter.apply(_META_INTERFACE4, arguments);
		}
	}, {
		key: 'setSorter',
		value: function setSorter() {
			var _META_INTERFACE5;

			(_META_INTERFACE5 = this[META_INTERFACE]).setSorter.apply(_META_INTERFACE5, arguments);
			return this;
		}
	}, {
		key: 'getSorter',
		value: function getSorter() {
			var _META_INTERFACE6;

			return (_META_INTERFACE6 = this[META_INTERFACE]).getSorter.apply(_META_INTERFACE6, arguments);
		}
	}, {
		key: 'setPageNumber',
		value: function setPageNumber() {
			var _META_INTERFACE7;

			(_META_INTERFACE7 = this[META_INTERFACE]).setPageNumber.apply(_META_INTERFACE7, arguments);
			return this;
		}
	}, {
		key: 'setPageSize',
		value: function setPageSize() {
			var _META_INTERFACE8;

			(_META_INTERFACE8 = this[META_INTERFACE]).setPageSize.apply(_META_INTERFACE8, arguments);
			return this;
		}
	}, {
		key: 'setPager',
		value: function setPager() {
			var _META_INTERFACE9;

			(_META_INTERFACE9 = this[META_INTERFACE]).setPager.apply(_META_INTERFACE9, arguments);
			return this;
		}
	}, {
		key: 'resetPager',
		value: function resetPager() {
			var _META_INTERFACE10;

			(_META_INTERFACE10 = this[META_INTERFACE]).resetPager.apply(_META_INTERFACE10, arguments);
			return this;
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			var _META_INTERFACE11;

			return (_META_INTERFACE11 = this[META_INTERFACE]).getPager.apply(_META_INTERFACE11, arguments);
		}
	}, {
		key: 'getModelName',
		value: function getModelName() {
			var _META_INTERFACE12;

			return (_META_INTERFACE12 = this[META_INTERFACE]).getModelName.apply(_META_INTERFACE12, arguments);
		}
	}]);
	return notRecord;
}(notBase);

var OPT_CONTROLLER_PREFIX = 'nc';
var OPT_RECORD_PREFIX = 'nr';

var notApp = function (_notBase) {
	inherits(notApp, _notBase);

	function notApp(options) {
		var _ret;

		classCallCheck(this, notApp);

		var _this = possibleConstructorReturn(this, (notApp.__proto__ || Object.getPrototypeOf(notApp)).call(this, { options: options }));

		notCommon.log('start app');
		notCommon.register('app', _this);
		_this.resources = {};
		_this.setWorking({
			interfaces: {},
			controllers: {},
			initController: null,
			currentController: null
		});
		_this.preInitRouter();
		_this.initManager();
		_this.initAPI();
		_this.initTemplates();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notApp, [{
		key: 'initManager',
		value: function initManager() {
			notCommon.setManager({
				setAPI: function setAPI(v) {
					this.api = v;
				},
				getAPI: function getAPI() {
					return this.api;
				}
			});
		}
	}, {
		key: 'initAPI',
		value: function initAPI() {
			notCommon.getManager().setAPI(new notAPI$1(this.getOptions('api') || {}));
		}
	}, {
		key: 'initTemplates',
		value: function initTemplates() {
			if (this.getOptions('templates')) {
				var prom = null;
				for (var t in this.getOptions('templates')) {
					if (t && this.getOptions('templates').hasOwnProperty(t)) {
						var url = this.getOptions('templates')[t];
						if (prom) {
							prom.then(notTemplateCache$1.addLibFromURL.bind(notTemplateCache$1, url));
						} else {
							prom = notTemplateCache$1.addLibFromURL(url);
						}
					}
				}
				if (prom) {
					prom.then(this.initManifest.bind(this)).catch(function (e) {
						notCommon.report('no templates lib', e);
					});
				} else {
					this.initManifest();
				}
			} else {
				this.initManifest();
			}
		}
	}, {
		key: 'initManifest',
		value: function initManifest() {
			var url = this.getOptions('manifestURL');
			notCommon.getJSON(url, {}).then(this.setInterfaceManifest.bind(this)).catch(notCommon.report.bind(this));
		}
	}, {
		key: 'preInitRouter',
		value: function preInitRouter() {
			this.setWorking('router', notRouter$1);
			this.getWorking('router').setRoot(this.getOptions('router.root'));
			notRouter$1.reRouteExisted();
		}
	}, {
		key: 'initRouter',
		value: function initRouter() {
			var routieInput = {};
			for (var t = 0; t < this.getOptions('router.manifest').length; t++) {
				var routeBlock = this.getOptions('router.manifest')[t],
				    paths = routeBlock.paths,
				    controller = routeBlock.controller;
				for (var i = 0; i < paths.length; i++) {
					routieInput[paths[i]] = this.bindController(controller);
				}
			}
			this.getWorking('router').addList(routieInput).listen(); //.navigate(this.getOptions('router.index'));
		}
	}, {
		key: 'setInterfaceManifest',
		value: function setInterfaceManifest(manifest) {
			this.setOptions('interfaceManifest', manifest);
			this.update();
		}
	}, {
		key: 'getInterfaceManifest',
		value: function getInterfaceManifest() {
			return this.getOptions('interfaceManifest');
		}
	}, {
		key: 'update',
		value: function update() {
			//нужно инициализировать
			//модели полученными интерфейсами
			this.updateInterfaces();
			//иницилицировать и запустить контроллер инициализации
			this.initController();
			if (this.allResourcesReady()) {
				this.startApp();
			}
		}
	}, {
		key: 'startApp',
		value: function startApp() {
			//создать контроллеры
			//роутер и привязать к нему контроллеры
			this.initRouter();
		}
	}, {
		key: 'bindController',
		value: function bindController(controllerName) {
			var app = this;
			return function () {
				new controllerName(app, arguments);
			};
		}
	}, {
		key: 'initController',
		value: function initController() {
			if (typeof this.getOptions('initController') !== 'undefined') {
				var initController = this.getOptions('initController');
				this.setWorking('initController', new initController(this));
			}
		}
	}, {
		key: 'getCurrentController',
		value: function getCurrentController() {
			return this.getWorking('currentController');
		}
	}, {
		key: 'setCurrentController',
		value: function setCurrentController(ctrl) {
			this.setWorking('currentController', ctrl);
			return this;
		}
	}, {
		key: 'updateInterfaces',
		value: function updateInterfaces() {
			var _this2 = this;

			this.clearInterfaces();
			var manifests = this.getOptions('interfaceManifest');
			if (manifests) {
				var _loop = function _loop(name) {
					var recordManifest = manifests[name];
					_this2.getWorking('interfaces')[name] = function (recordData) {
						return new notRecord(recordManifest, recordData);
					};
					window['nr' + notCommon.capitalizeFirstLetter(name)] = _this2.getWorking('interfaces')[name];
				};

				for (var name in manifests) {
					_loop(name);
				}
			}
		}
	}, {
		key: 'getRecordName',
		value: function getRecordName(name) {
			return OPT_RECORD_PREFIX + notCommon.capitalizeFirstLetter(name);
		}
	}, {
		key: 'getControllerName',
		value: function getControllerName(name) {
			return OPT_CONTROLLER_PREFIX + notCommon.capitalizeFirstLetter(name);
		}
	}, {
		key: 'getInterfaces',
		value: function getInterfaces() {
			return this.getWorking('interfaces');
		}
	}, {
		key: 'clearInterfaces',
		value: function clearInterfaces() {
			this.setWorking('interfaces', {});
			return this;
		}
	}, {
		key: 'waitThisResource',
		value: function waitThisResource(type, index) {
			if (!this.resources.hasOwnProperty(type)) {
				this.resources[type] = {};
			}
			this.resources[type][index] = false;
			return this.onResourceReady.bind(this, type, index);
		}
	}, {
		key: 'onResourceReady',
		value: function onResourceReady(type, index) {
			this.resources[type][index] = true;
			if (this.allResourcesReady()) {
				this.startApp();
			}
		}
	}, {
		key: 'allResourcesReady',
		value: function allResourcesReady() {
			var i, j;
			for (i in this.resources) {
				for (j in this.resources[i]) {
					if (!this.resources[i][j]) {
						return false;
					}
				}
			}
			return true;
		}
	}]);
	return notApp;
}(notBase);

var META_PROCESSORS = Symbol('processors');

var notTemplateProcessors = function (_notBase) {
	inherits(notTemplateProcessors, _notBase);

	function notTemplateProcessors() {
		var _ret;

		classCallCheck(this, notTemplateProcessors);

		var _this = possibleConstructorReturn(this, (notTemplateProcessors.__proto__ || Object.getPrototypeOf(notTemplateProcessors)).call(this));

		_this[META_PROCESSORS] = {};
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notTemplateProcessors, [{
		key: 'setProcessor',
		value: function setProcessor() /* key, value */{
			this.setCommon(this[META_PROCESSORS], arguments);
			return this;
		}
	}, {
		key: 'getProcessor',
		value: function getProcessor() /* key,  defaultValue */{
			return this.getCommon(this[META_PROCESSORS], arguments);
		}
	}, {
		key: 'clearProcessors',
		value: function clearProcessors() {
			this.setCommon(this[META_PROCESSORS], {});
			return this;
		}
	}, {
		key: 'add',
		value: function add() {
			if (arguments.length === 2) {
				this.setProcessor(arguments[0], arguments[1]);
			} else {
				if (arguments.length === 1 && _typeof(arguments[0]) === 'object') {
					for (var t in arguments[0]) {
						this.setProcessor(t, arguments[0][t]);
					}
				}
			}
		}
	}, {
		key: 'get',
		value: function get$$1() {
			return this.getProcessor.apply(this, arguments);
		}
	}, {
		key: 'clear',
		value: function clear() {
			this[META_PROCESSORS] = {};
			return this;
		}
	}]);
	return notTemplateProcessors;
}(notBase);

var notTemplateProcessors$1 = new notTemplateProcessors();

/*
 * Использует DOM поддерево в качестве шаблона.
 * Заполняет его данными.
 * Возвращает сгенерированные элементы
 *
 * */

/*

	<div n-template-name="vasya">
		<p><input type="text" n-value=":coolName"/></p>
		<p>Борис хрен попадешь и {{:coolName}}.</p>
	</div>

 */

var META_COMPONENTS = Symbol('components');

var notRenderer = function (_notBase) {
	inherits(notRenderer, _notBase);

	/*
 	input = {
 		data: notRecord,
 		template: element
 		options:{
 			helpers: object
 			// если задать, то сразу после загрузки будет отрендерено сюда
 			targetEl: HTMLElement(object) или html selector (string)
 		}
 	}
 */

	function notRenderer(input) {
		var _ret;

		classCallCheck(this, notRenderer);

		var _this = possibleConstructorReturn(this, (notRenderer.__proto__ || Object.getPrototypeOf(notRenderer)).call(this));

		_this[META_COMPONENTS] = {};
		_this.init(input);
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notRenderer, [{
		key: 'init',
		value: function init(input) {
			this.input = input;
			this.component = input.component;
			this.initData(input.data ? input.data : {});
			this.initOptions(input.options ? input.options : {});
			this.initWorking(input.template);
			this.initTemplate();
		}
	}, {
		key: 'initTemplate',
		value: function initTemplate() {
			this.setWorking('template', this.getWorking('getTemplate')());
		}
	}, {
		key: 'initData',
		value: function initData(val) {
			this.setData(val);
			if (this.getData().isRecord) {
				this.getData().on('change', this.onChange.bind(this));
			}
		}
	}, {
		key: 'initOptions',
		value: function initOptions(val) {
			this.setOptions(val);
		}
	}, {
		key: 'initWorking',
		value: function initWorking(template) {
			this.setWorking({
				getTemplate: template,
				partId: this.getOptions('partId') ? this.getOptions('partId') : OPTS.PART_ID_PREFIX + Math.random()
			});
		}
	}, {
		key: 'getBreadCrumps',
		value: function getBreadCrumps() {
			if (this.component) {
				return [].concat(toConsumableArray(this.component.getBreadCrumps()), [this.getWorking('partId')]);
			} else {
				return [this.getWorking('partId')];
			}
		}
	}, {
		key: 'render',
		value: function render() {
			this.clearStash();
			this.setWorkingMapping();
			this.execProcessors(this.getData());
			this.searchForSubTemplates();
			this.stashRendered();
		}
	}, {
		key: 'onChange',
		value: function onChange(proxy, key, value) {
			this.update(key);
			this.trigger('obsolete', proxy, key, value);
		}
	}, {
		key: 'update',
		value: function update(key) {
			this.execProcessors(this.getData());
			for (var t in this[META_COMPONENTS]) {
				var item = this[META_COMPONENTS][t],
				    ifPart = true;
				if (key) {
					if (item.getOptions('dataPath') === null) {
						continue;
					}
					var componentPath = notPath$1.normilizePath(item.getOptions('dataPath')),
					    changedPath = notPath$1.normilizePath(key);
					ifPart = notPath$1.ifFullSubPath(changedPath, componentPath);
				}

				if (ifPart) {
					item.update();
				}
			}
		}
	}, {
		key: 'setWorkingMapping',
		value: function setWorkingMapping() {
			this.setWorking('mapping', this.createMapping());
		}

		/*
  	Создаем карты соотвествия процессоров, путей данных в объекте и элементов шаблона.
  [{
  	el,
  	processor,
  	working,
  	item.property.path
  }]
  	*/

	}, {
		key: 'createMapping',
		value: function createMapping() {
			var result = this.findAllProcessors();
			return result;
		}
	}, {
		key: 'findAllProcessors',
		value: function findAllProcessors() {
			var procs = [],
			    els = notCommon.getAttributesStartsWith(this.getWorkingTemplateElement(), OPTS.PROCESSOR_EXPRESSION_PREFIX);
			for (var j = 0; j < els.length; j++) {
				for (var i = 0, atts = els[j].attributes, n = atts.length; i < n; i++) {
					if (atts[i].nodeName.indexOf(OPTS.PROCESSOR_EXPRESSION_PREFIX) === 0) {
						//notCommon.log(atts[i]);
						var procData = this.parseProcessorExpression(atts[i].nodeName);
						procData.element = els[j];
						procData.processorExpression = atts[i].nodeName;
						procData.attributeExpression = atts[i].value;
						procs.push(procData);
					}
				}
			}
			return procs;
		}
	}, {
		key: 'parseProcessorExpression',
		value: function parseProcessorExpression(processorExpression) {
			var result = {
				params: [],
				processorName: '',
				ifCondition: false
			};
			processorExpression = processorExpression.replace(OPTS.PROCESSOR_EXPRESSION_PREFIX, '');
			if (processorExpression.indexOf(OPTS.PROCESSOR_EXPRESSION_CONDITION_POSTFIX) === processorExpression.length - OPTS.PROCESSOR_EXPRESSION_CONDITION_POSTFIX.length) {
				result.ifCondition = true;
				processorExpression = processorExpression.replace(OPTS.PROCESSOR_EXPRESSION_SEPARATOR + OPTS.PROCESSOR_EXPRESSION_CONDITION_POSTFIX, '');
			}
			result.params = processorExpression.split(OPTS.PROCESSOR_EXPRESSION_SEPARATOR);
			result.processorName = result.params[0];
			result.params = result.params.slice(1);
			return result;
		}
	}, {
		key: 'execProcessors',
		value: function execProcessors(item, index) {
			var mapping = this.getWorking('mapping');
			if (mapping) {
				for (var i = 0; i < mapping.length; i++) {
					var procScope = mapping[i];
					procScope.attributeResult = this.getAttributeExpressionResult(procScope.attributeExpression, item, index);
					//notCommon.log('attributeResult', procScope.attributeResult);
					var procName = procScope.processorName,
					    proc = notTemplateProcessors$1.get(procName);
					if (proc) {
						proc(procScope, item, this.getOptions('helpers', {}));
						procScope.element.removeAttribute(procScope.processorExpression);
					} else {
						notCommon.error('no processor like', procName);
					}
				}
			}
			this.trigger('rendered');
		}
	}, {
		key: 'getAttributeExpressionResult',
		value: function getAttributeExpressionResult(path, item) {
			return notPath$1.get(path, item, this.getOptions('helpers', {}));
		}
	}, {
		key: 'clearSubTemplates',
		value: function clearSubTemplates() {
			this.destroySubs();
			this.setWorking('subs', []);
		}
	}, {
		key: 'destroySubs',
		value: function destroySubs() {
			if (this.getWorking('subs')) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.getWorking('subs')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var t = _step.value;

						t.destroy();
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.clearSubTemplates();
			for (var t = 0; t < this.getStash().length; t++) {
				var el = this.getStash()[t];
				if (el.parentNode) {
					el.parentNode.removeChild(el);
				}
			}
		}
	}, {
		key: 'ifSubElementRendered',
		value: function ifSubElementRendered(ntEl) {
			return ntEl.attributes.ntRendered && ntEl.attributes.ntRendered.value === 'true';
		}
	}, {
		key: 'searchForSubTemplates',
		value: function searchForSubTemplates() {
			this.clearSubTemplates();
			var subs = this.getWorkingTemplateElement().querySelectorAll(OPTS.TEMPLATE_TAG);
			//notCommon.log('sub templates', subs);
			for (var nt = 0; nt < subs.length; nt++) {
				if (!this.ifSubElementRendered(subs[nt])) {
					this.renderSub(subs[nt]);
				}
			}
		}
	}, {
		key: 'addSub',
		value: function addSub(ntEl) {
			ntEl.setAttribute('nt-rendered', true);
			this.getWorking('subs').push({
				targetEl: ntEl,
				path: ntEl.attributes.data ? ntEl.attributes.data.value : '',
				name: ntEl.attributes.name ? ntEl.attributes.name.value : '',
				src: ntEl.attributes.src ? ntEl.attributes.name.src : '',
				id: ntEl.attributes.id ? ntEl.attributes.id.value : OPTS.COMPONENT_ID_PREFIX + Math.random(),
				renderedList: []
			});
		}
	}, {
		key: 'renderSub',
		value: function renderSub(ntEl) {
			if (!ntEl) {
				return;
			}
			var details = {
				dataPath: ntEl.attributes.data ? ntEl.attributes.data.value : null,
				name: ntEl.attributes.name ? ntEl.attributes.name.value : '',
				src: ntEl.attributes.src ? ntEl.attributes.src.value : '',
				id: ntEl.attributes.id ? ntEl.attributes.id.value : OPTS.COMPONENT_ID_PREFIX + Math.random()
			},
			    options = {
				data: details.dataPath !== null ? this.getAttributeExpressionResult(details.dataPath, this.getData()) : null,
				template: {
					name: details.name,
					src: details.src
				},
				options: {
					helpers: this.getOptions('helpers', {}),
					targetEl: ntEl,
					name: details.name,
					renderAnd: 'placeAfter',
					id: details.id,
					ntEl: ntEl,
					dataPath: details.dataPath
				},
				owner: this
			};
			ntEl.setAttribute('id', details.id);
			ntEl.setAttribute('nt-rendered', true);
			this[META_COMPONENTS][details.id] = new notComponent(options);
		}
	}, {
		key: 'clearStash',
		value: function clearStash() {
			this.setWorking('stash', []);
		}
	}, {
		key: 'getWorkingTemplateElement',
		value: function getWorkingTemplateElement() {
			return this.getWorking('template');
		}
	}, {
		key: 'getStash',
		value: function getStash() {
			return this.getWorking('stash');
		}
	}, {
		key: 'stashRendered',
		value: function stashRendered() {
			var result = this.getWorkingTemplateElement();
			for (var t = 0; t < result.childNodes.length; t++) {
				this.addToStash(result.childNodes[t]);
			}
		}
	}, {
		key: 'replaceRendered',
		value: function replaceRendered() {
			//notCommon.log('replace stash');
			var result = this.getWorkingTemplateElement(),
			    stash = this.getStash(),
			    newStash = [],
			    anchor = stash.length > 0 ? stash[0] : this.getOptions('ntEl'),
			    parentNode = anchor.parentNode;
			for (var t = 0; t < result.childNodes.length; t++) {
				newStash.push(result.childNodes[t]);
			}
			for (var _t = 0; _t < newStash.length; _t++) {
				if (anchor.nextSibling) {
					anchor.parentNode.insertBefore(newStash[_t], anchor.nextSibling);
				} else {
					anchor.parentNode.appendChild(newStash[_t]);
				}
			}
			for (var _t2 = 0; _t2 < stash.length; _t2++) {
				parentNode.removeChild(stash[_t2]);
			}
			this.setWorking('stash', newStash);
		}
	}, {
		key: 'addToStash',
		value: function addToStash(node) {
			this.getStash().push(node);
		}
	}, {
		key: 'isData',
		value: function isData() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return this.getData() === data;
		}
	}, {
		key: 'hide',
		value: function hide() {}
	}, {
		key: 'show',
		value: function show() {}
	}]);
	return notRenderer;
}(notBase);

var place = {
	before: function before(targetEl /*, rendered*/) {
		var l = 0;
		while (targetEl.children.length - l) {
			if (targetEl.children[0].nodeName === 'NT') {
				//console.log('nt founded');
				l++;
			} else {
				//console.log('remove child ',targetEl.children[l]);
				targetEl.removeChild(targetEl.children[l]);
			}
		}
		targetEl.textContent = '';
	},
	beforeEach: function beforeEach() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			//console.log('append child ', rendered[i]);
			targetEl.appendChild(rendered[i]);
		}
	},
	afterEach: function afterEach() /*targetEl, rendered*/{},
	after: function after() /*targetEl, rendered*/{}
};

var placeAfter = {
	before: function before() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl.nextSibling);
		}
	},
	after: function after() /*targetEl, rendered*/{}
};

var placeBefore = {
	before: function before() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl);
		}
	},
	after: function after() /*targetEl, rendered*/{}
};

var placeFirst = {
	before: function before() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = rendered.length - 1; i > -1; i--) {
			//console.log('place first', i, rendered[i]);
			if (targetEl.children.length) {
				//console.log('append before first');
				targetEl.insertBefore(rendered[i], targetEl.children[0]);
			} else {
				//console.log('append as first');
				targetEl.appendChild(rendered[i]);
			}
		}
	},
	after: function after() /*targetEl, rendered*/{}
};

var placeLast = {
	before: function before() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.appendChild(rendered[i]);
		}
	},
	after: function after() /*targetEl, rendered*/{}
};

var replace = {
	before: function before() /*targetEl, rendered*/{},
	beforeEach: function beforeEach() /*targetEl, rendered*/{},
	main: function main(targetEl, rendered) {
		for (var i = 0; i < rendered.length; i++) {
			targetEl.parentNode.insertBefore(rendered[i], targetEl.nextSibling);
		}
	},
	afterEach: function afterEach() /*targetEl, rendered*/{},
	after: function after(targetEl /*, rendered*/) {
		if (targetEl.nodeName !== 'NT') {
			targetEl.parentNode.removeChild(targetEl);
		}
	}
};

var notPlacers = {
	place: place,
	placeAfter: placeAfter,
	placeBefore: placeBefore,
	placeFirst: placeFirst,
	placeLast: placeLast,
	replace: replace
};

var META_PARTS = Symbol('parts');
/*
	input = {
		data: notRecord or [notRecord],
		template: {
			html: html(string), 		//текст с html кодом шаблона
			el: HTMLElement(object), 	//DOM элемент
			src: src(string),			//ссылка на файл с шаблоном
			name: name(string)			//название шаблона для поиска в кэше notTemplateCache
		}
		options:{
			helpers: object
			// если задать, то сразу после загрузки будет отрендерено сюда
			targetEl: HTMLElement(object) или html selector (string)
			//а это как будем помещать результат рендеринга
			renderAnd: placeStyle(string) один из вариантов
					place		-	помещаем внутри целевого элемента
					replace		-	заменяем
					placeAfter	-	после
					placeBefore	-	до
					placeFirst	-	внутри первым дочерним
					placeLast	-	внутри последним дочерним
		}
	}
*/

var notComponent = function (_notBase) {
	inherits(notComponent, _notBase);

	function notComponent(input) {
		var _ret;

		classCallCheck(this, notComponent);

		var _this = possibleConstructorReturn(this, (notComponent.__proto__ || Object.getPrototypeOf(notComponent)).call(this, input));

		_this.resetParts();
		_this.on('ready', _this.render.bind(_this));
		_this.init(input);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notComponent, [{
		key: 'getBreadCrumps',
		value: function getBreadCrumps() {
			if (this.owner) {
				return [].concat(toConsumableArray(this.owner.getBreadCrumps()), [this.getOptions('id')]);
			} else {
				return [this.getOptions('id')];
			}
		}
	}, {
		key: 'init',
		value: function init(input) {
			this.input = input;
			this.owner = input.owner ? input.owner : null;
			this.initOptions(input.options ? input.options : {});
			this.initWorking(input);
			this.prepareTemplateElement(input.template ? input.template : null);
		}
	}, {
		key: 'initData',
		value: function initData(val) {
			this.setData(val);
		}
	}, {
		key: 'initEvents',
		value: function initEvents(list) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					this.on.apply(this, toConsumableArray(t));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'initOptions',
		value: function initOptions(val) {
			this.setOptions(val);
			if (!this.getOptions('id')) {
				this.setOptions('id', OPTS.COMPONENT_ID_PREFIX + Math.random());
			}
			if (!this.getOptions('ntEl')) {
				this.initMarkElement();
			}
		}
	}, {
		key: 'initMarkElement',
		value: function initMarkElement() {
			var markEl = document.createElement('nt');
			markEl.setAttribute('id', this.getOptions('id'));
			markEl.setAttribute('nt-rendered', true);
			this.setOptions('ntEl', markEl);
			var placer = this.getPlacer(this.getOptions('renderAnd')),
			    targetQuery = this.getOptions('targetQuery');
			if (targetQuery) {
				var target = document.querySelector(targetQuery);
				if (target) {
					this.setOptions('targetEl', target);
				}
			}

			if (!this.getOptions('targetEl')) {
				throw 'No target to place rendered';
			} else {
				placer.main(this.getOptions('targetEl'), [markEl]);
			}
		}
	}, {
		key: 'initWorking',
		value: function initWorking(val) {
			this.unsetReady(val);
		}
	}, {
		key: 'prepareTemplateElement',
		value: function prepareTemplateElement(val) {
			if (!val) {
				this.unsetReady();
			} else if (val.hasOwnProperty('html') && val.html) {
				this.setProtoTemplateElement(notTemplateCache$1.wrap('', '', val.html));
			} else if (val.hasOwnProperty('el') && val.el) {
				this.setProtoTemplateElement(val.el.cloneNode(true));
			} else if (val.hasOwnProperty('src') && val.src) {
				notTemplateCache$1.addFromURL(val.src, val.src).then(this.setProtoTemplateElement.bind(this)).catch(notCommon.report);
			} else if (val.hasOwnProperty('name') && val.name) {
				this.setProtoTemplateElement(notTemplateCache$1.get(val.name));
			}
		}
	}, {
		key: 'setProtoTemplateElement',
		value: function setProtoTemplateElement(cont) {
			if (cont) {
				this.setWorking('protoTemplateElement', cont);
				this.trigger('ready');
			} else {
				notCommon.error('Wrong template container element');
			}
		}
	}, {
		key: 'getProtoTemplateElement',
		value: function getProtoTemplateElement() {
			return this.getWorking('protoTemplateElement');
		}
	}, {
		key: 'getProtoTemplateElementClone',
		value: function getProtoTemplateElementClone() {
			return this.getWorking('protoTemplateElement').cloneNode(true);
		}
	}, {
		key: 'getWorkingTemplateElement',
		value: function getWorkingTemplateElement() {
			return this.getWorking('templateElement');
		}
	}, {
		key: 'resetWorkingTemplateElement',
		value: function resetWorkingTemplateElement() {
			return this.setWorking('templateElement', this.getProtoTemplateElement().cloneNode(true));
		}
	}, {
		key: 'setReady',
		value: function setReady() {
			this.setWorking('ready', true);
		}
	}, {
		key: 'unsetReady',
		value: function unsetReady() {
			this.setWorking('ready', false);
		}
	}, {
		key: 'isReady',
		value: function isReady() {
			return this.setWorking('ready');
		}
	}, {
		key: 'clearParts',
		value: function clearParts() {
			/* извещаем об удалении элементов */
			if (this[META_PARTS] && Array.isArray(this[META_PARTS]) && this[META_PARTS].length) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this[META_PARTS][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var t = _step2.value;

						if (t.destroy) {
							t.destroy();
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
			this.resetParts();
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.clearParts();
			if (this.getOptions('ntEl') && this.getOptions('ntEl').parentNode) {
				this.getOptions('ntEl').parentNode.removeChild(this.getOptions('ntEl'));
			}
			this.dead = true;
			this.offAll();
		}
	}, {
		key: 'resetParts',
		value: function resetParts() {
			this[META_PARTS] = [];
		}
	}, {
		key: 'getParts',
		value: function getParts() {
			return this[META_PARTS];
		}
	}, {
		key: 'addPart',
		value: function addPart(template) {
			this[META_PARTS].push(template);
		}
	}, {
		key: 'render',
		value: function render() {
			this.clearParts();
			if (this.getProtoTemplateElement()) {
				this.forEachData(this.renderPart.bind(this));
				this.placeRendered();
			}
			this.trigger('afterRender');
		}
	}, {
		key: 'update',
		value: function update() {
			this.removeObsoleteParts();
			if (this.getProtoTemplateElement()) {
				this.forEachData(this.renderPart.bind(this));
				this.placeRendered();
			}
			this.trigger('afterUpdate');
		}
	}, {
		key: 'placeRendered',
		value: function placeRendered() {
			if (this.getOptions('targetEl')) {
				var placer = this.getPlacer(this.getOptions('renderAnd'));
				placer.before(this.getOptions('targetEl'));
				this.forEachData(this.placePart.bind(this));
				placer.after(this.getOptions('targetEl'));
			} else {
				notCommon.error('no target element');
			}
		}
	}, {
		key: 'placePart',
		value: function placePart(data, index) {
			var part = this.getPartByData(data),
			    nodes = part && part.getStash ? part.getStash() : [],
			    targetEl = void 0,
			    lastNode = void 0,
			    placer = void 0;
			if (index === 0) {
				placer = this.getPlacer(this.getOptions('renderAnd'));
				targetEl = this.getOptions('targetEl');
			} else {
				placer = this.getPlacer(OPTS.DEFAULT_PLACER_LOOP);
				targetEl = this.getWorking('lastPlacedNode');
			}
			placer.main(targetEl, nodes);
			lastNode = targetEl;
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = nodes[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var t = _step3.value;

					if (t.nodeType === 1) {
						lastNode = t;
						lastNode.setAttribute('nt-component', this.getOptions('id'));
						lastNode.setAttribute('nt-part', part.getWorking('partId'));
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			this.setWorking('lastPlacedNode', lastNode);
		}
	}, {
		key: 'getPlacer',
		value: function getPlacer(method) {
			//notCommon.log('searching for placer', method);
			if (notPlacers.hasOwnProperty(method)) {
				return notPlacers[method];
			} else {
				return notPlacers[OPTS.DEFAULT_PLACER];
			}
		}
	}, {
		key: 'forEachData',
		value: function forEachData(func) {
			if (Array.isArray(this.getData())) {
				for (var t = 0; t < this.getData().length; t++) {
					func(this.getData()[t], t);
				}
			} else {
				func(this.getData(), 0);
			}
		}
	}, {
		key: 'forEachPart',
		value: function forEachPart(func) {
			if (Array.isArray(this.getParts())) {
				for (var t = 0; t < this.getParts().length; t++) {
					func(this.getParts()[t], t);
				}
			}
		}

		/*
  	если с данными не связан рендерер - создаем
  */

	}, {
		key: 'renderPart',
		value: function renderPart(data) {
			if (!this.getPartByData(data)) {
				//notCommon.log('creating part render');
				var renderer = new notRenderer({
					data: data,
					template: this.getProtoTemplateElementClone.bind(this),
					options: this.getOptions(),
					component: this
				});
				//renderer.on('obsolete', this.update.bind(this));
				this.addPart(renderer);
			} else {
				//notCommon.log('updating part render');
				this.updatePart(this.getPartByData(data));
			}
		}
	}, {
		key: 'updatePart',
		value: function updatePart(part) {
			part.update();
		}
	}, {
		key: 'removeObsoleteParts',
		value: function removeObsoleteParts() {
			//конвеер поиск актуальных - удаление остальных
			notCommon.pipe(undefined, // parts to search in, can be 'undefined'
			[this.findActualParts.bind(this), //first round, search for obsolete
			this.removeNotActualParts.bind(this)]);
		}

		/*
  	есть данные и есть рендерер - значит актуально,
  	нет данных и есть рендерер - значит старьё
  */

	}, {
		key: 'findActualParts',
		value: function findActualParts() {
			var _this2 = this;

			var actualParts = [];
			this.forEachData(function (data /*, index*/) {
				var part = _this2.getPartByData(data);
				if (part) {
					actualParts.push(part);
				}
			});
			return actualParts;
		}

		/*
  	удаляем все кроме актуальных
  */

	}, {
		key: 'removeNotActualParts',
		value: function removeNotActualParts(actualParts) {
			for (var t = 0; t < this.getParts().length; t++) {
				if (actualParts.indexOf(this.getParts()[t]) === -1) {
					this.getParts()[t].destroy();
					this.getParts().splice(t, 1);
					t--;
				}
			}
		}
	}, {
		key: 'getPartByData',
		value: function getPartByData(data) {
			for (var t in this.getParts()) {
				if (this.getParts()[t].isData(data)) {
					return this.getParts()[t];
				}
			}
			return false;
		}
	}, {
		key: 'show',
		value: function show() {}
	}, {
		key: 'hide',
		value: function hide() {}
	}]);
	return notComponent;
}(notBase);

var OPT_DEFAULT_CONTAINER_SELECTOR = '.page-content';
var OPT_DEFAULT_VIEWS_POSTFIX = '.html';
var OPT_DEFAULT_VIEW_NAME = 'default';
var OPT_DEFAULT_RENDER_FROM_URL = true;
var OPT_DEFAULT_PLURAL_NAME = 'Models';
var OPT_DEFAULT_SINGLE_NAME = 'Model';
var OPT_DEFAULT_MODULE_NAME = 'main';
var OPT_DEFAULT_RENDER_AND = 'place';

var notController = function (_notBase) {
	inherits(notController, _notBase);

	function notController(app) {
		var _ret;

		classCallCheck(this, notController);

		var _this = possibleConstructorReturn(this, (notController.__proto__ || Object.getPrototypeOf(notController)).call(this));

		notCommon.log('start controller');
		_this.app = app;
		_this.setWorking({
			ready: false,
			views: {},
			libs: {},
			viewName: OPT_DEFAULT_VIEW_NAME,
			helpers: {}
		});
		_this.setData({});
		_this.setOptions({
			moduleName: OPT_DEFAULT_MODULE_NAME,
			containerSelector: OPT_DEFAULT_CONTAINER_SELECTOR,
			prefix: _this.app.getOptions('paths.module'),
			postfix: OPT_DEFAULT_VIEWS_POSTFIX,
			renderFromURL: OPT_DEFAULT_RENDER_FROM_URL,
			names: {
				plural: OPT_DEFAULT_PLURAL_NAME,
				single: OPT_DEFAULT_SINGLE_NAME
			}
		});
		_this.on('ready', _this.initRender.bind(_this));
		/*
      сразу делаем доступными модели notRecord из nc`ControllerName` будут доступны как this.nr`ModelName`
  */
		var interfaces = _this.app.getInterfaces();
		_this.make = {};
		for (var t in interfaces) {
			if (interfaces.hasOwnProperty(t)) {
				_this.make[t] = interfaces[t];
			}
		}
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notController, [{
		key: 'initRender',
		value: function initRender() {
			this.render(this.getWorking('viewName'), this.getData(), this.getWorking('helpers'));
		}
	}, {
		key: 'render',
		value: function render() /* could be not represented */{
			var viewName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

			var _this2 = this;

			var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var helpers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			return new Promise(function (resolve, reject) {
				var view = _this2.getView(viewName);

				if (typeof view === 'undefined' || view === null) {
					reject('No view found', viewName);
				} else {
					view = notCommon.extend({}, view);
					// если place не указано, что возможно и разумно при не существовании
					// элемента, но известном идентификаторе
					if ((typeof view.targetEl === 'undefined' || view.targetEl === null) && typeof view.targetQuery !== 'undefined' && view.targetQuery !== null && view.targetQuery.length > 0) {
						view.targetEl = document.querySelector(view.targetQuery);
					} else {
						view.targetEl = document.querySelector(_this2.getOptions('containerSelector'));
					}
					view.data = data;
					if (typeof view.helpers !== 'undefined' && view.helpers !== null && Object.keys(view.helpers).length > 0) {
						view.helpers = notCommon.extend(view.helpers, helpers);
					} else {
						view.helpers = helpers;
					}
					//если нужно загружать шаблоны
					if (_this2.getOptions('renderFromURL')) {
						//и адрес не указан
						if (typeof view.templateURL === 'undefined' || view.templateURL == null || view.templateURL.length == 0) {
							var prefix = view.common ? _this2.app.getOptions('paths.common') : _this2.getModulePrefix(),
							    name = typeof view.name !== 'undefined' && view.name !== null && view.name.length > 0 ? view.name : viewName,
							    postfix = _this2.getOptions('postfix');
							//генерируем адрес по шаблону
							view.templateURL = [prefix, name].join('/') + postfix;
						}
					} else {
						//а если есть название шаблона, то
						if (view.hasOwnProperty('templateName')) {
							//...
							view.templateName = _this2.getOptions('prefix') + view.templateName + _this2.getOptions('postfix');
						}
					}
					_this2.setWorking('component', new notComponent({
						data: data,
						template: {
							name: view.templateName,
							src: view.templateURL
						},
						events: [['afterRender', resolve]],
						options: {
							targetEl: view.targetEl,
							helpers: helpers,
							renderAnd: view.renderAnd || OPT_DEFAULT_RENDER_AND
						}
					}));
				}
			});
		}
	}, {
		key: 'getApp',
		value: function getApp() {
			return this.app;
		}
	}, {
		key: 'setModel',
		value: function setModel(model) {
			this.setWorking('model', model);
			return this;
		}
	}, {
		key: 'getModel',
		value: function getModel() {
			return this.setWorking('model');
		}
	}, {
		key: 'setReady',
		value: function setReady() {
			var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			this.setWorking('ready', val);
			val ? this.trigger('ready') : this.trigger('busy');
		}
	}, {
		key: 'setView',
		value: function setView(name, view) {
			this.setWorking(notPath$1.join('views', name), view);
			return this;
		}
	}, {
		key: 'setViews',
		value: function setViews(views) {
			for (var t in views) {
				this.setWorking(notPath$1.join('views', t), views[t]);
			}
			return this;
		}
	}, {
		key: 'getView',
		value: function getView() {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

			return this.getWorking(notPath$1.join('views', name));
		}
	}, {
		key: 'setModuleName',
		value: function setModuleName(val) {
			this.setOptions('moduleName', val);
			return this;
		}
	}, {
		key: 'getModuleName',
		value: function getModuleName() {
			return this.getOptions('moduleName');
		}
	}, {
		key: 'getModulePrefix',
		value: function getModulePrefix() {
			return [this.app.getOptions('paths.modules'), this.getModuleName()].join('/');
		}
	}, {
		key: 'preloadLib',
		value: function preloadLib() {
			var _this3 = this;

			var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return new Promise(function (resolve, reject) {
				if ((typeof list === 'undefined' ? 'undefined' : _typeof(list)) !== 'object') {
					resolve();
				} else {
					_this3.setWorking('loading', []);

					var _loop = function _loop(t) {
						_this3.getWorking('loading').push(list[t]);
						_this3.make[list[t]]({}).$listAll().then(function (data) {
							if (!_this3.getOptions('libs')) {
								_this3.setOptions('libs', {});
							}
							_this3.getOptions('libs')[t] = data;
							if (_this3.getWorking('loading').indexOf(list[t]) > -1) {
								_this3.getWorking('loading').splice(_this3.getWorking('loading').indexOf(list[t]), 1);
							}
							if (_this3.getWorking('loading').length === 0) {
								resolve();
							}
						}).catch(function (err) {
							notCommon.report(err);
							reject();
						});
					};

					for (var t in list) {
						_loop(t);
					}
					if (_this3.getWorking('loading').length === 0) {
						resolve();
					}
				}
			});
		}
	}, {
		key: 'queeUpload',
		value: function queeUpload(name, list) {
			//hash (fieldName=>filesList)
			if (!this.getWorking('uploadQuee')) {
				this.setWorking('uploadQuee', {});
			}
			this.getWorking('uploadQuee')[name] = list;
		}
	}, {
		key: 'execUploads',
		value: function execUploads(item) {
			var _this4 = this;

			var list = this.getWorking('uploadQuee');
			return new Promise(function (resolve, reject) {
				if ((typeof list === 'undefined' ? 'undefined' : _typeof(list)) !== 'object') {
					resolve(item);
				} else {
					_this4.setWorking('uploading', {});

					var _loop2 = function _loop2(t) {
						var fieldFiles = list[t];
						if (fieldFiles.length > 1) {
							item[t] = [];
						} else {
							item[t] = '';
						}

						var _loop3 = function _loop3(f) {
							if (!_this4.getWorking('uploading').hasOwnProperty(t)) {
								_this4.getWorking('uploading')[t] = 0;
							}
							_this4.getWorking('uploading')[t]++;
							_this4.app.getWorking('uploader').upload(fieldFiles[f]).then(function (savedFile) {
								notCommon.log('file uploaded', t, f, savedFile);
								_this4.getWorking('uploading')[t]--;
								if (_this4.getWorking('uploading')[t] === 0) {
									delete _this4.getWorking('uploading')[t];
								}
								if (Array.isArray(item[f])) {
									item[t].push(savedFile.hash);
								} else {
									item[t] = savedFile.hash;
								}
								if (Object.keys(_this4.getWorking('uploading')).length === 0) {
									resolve(item);
								}
							}).catch(function (err) {
								notCommon.report(err);
								reject(err);
							});
						};

						for (var f = 0; f < fieldFiles.length; f++) {
							_loop3(f);
						}
					};

					for (var t in list) {
						_loop2(t);
					}
					if (Object.keys(_this4.getWorking('uploading')).length === 0) {
						resolve(item);
					}
				}
			});
		}
	}, {
		key: 'onAfterRender',
		value: function onAfterRender() {
			this.trigger('afterRender');
		}
	}]);
	return notController;
}(notBase);

var OPT_DEFAULT_FORM_PREFIX = 'form_';
var OPT_DEFAULT_ROLE_NAME = 'default';
var OPT_DEFAULT_FORM_TITLE = 'Form default title';
var OPT_DEFAULT_FIELD_DEFINITION = {};
var OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST = ['options', 'manifest', 'app'];

var notForm = function (_notBase) {
	inherits(notForm, _notBase);

	function notForm(input) {
		var _ret;

		classCallCheck(this, notForm);

		var _this = possibleConstructorReturn(this, (notForm.__proto__ || Object.getPrototypeOf(notForm)).call(this, input));

		if (!_this.getOptions('prefix')) {
			_this.setOptions('prefix', OPT_DEFAULT_FORM_PREFIX);
		}
		_this.setWorking('components', []);
		if (!_this.getData().isRecord) {
			_this.setData(new notRecord({}, _this.getData()));
		}
		_this.on('submit', _this.onSubmit.bind(_this));
		_this.on('reset', _this.onReset.bind(_this));
		_this.on('cancel', _this.onCancel.bind(_this));
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notForm, [{
		key: 'getManifest',
		value: function getManifest() {
			return this.getData().getManifest();
		}
	}, {
		key: 'getActionData',
		value: function getActionData() {
			var manifest = this.getManifest();
			if (manifest && manifest.actions) {
				return manifest.actions.hasOwnProperty(this.getOptions('action')) ? manifest.actions[this.getOptions('action')] : null;
			} else {
				return null;
			}
		}
	}, {
		key: 'getFormFieldsList',
		value: function getFormFieldsList() {
			var actionData = this.getActionData(),
			    list = [],
			    role = this.getOptions('role', OPT_DEFAULT_ROLE_NAME);
			if (actionData) {

				if (actionData.fields) {
					if (actionData.fields.hasOwnProperty(role)) {
						list = actionData.fields[role];
					}
				}
			}
			return list;
		}

		/*
  	Rendering
  */

	}, {
		key: 'render',
		value: function render() {
			this.renderWrapper();
		}
	}, {
		key: 'getPartTemplateName',
		value: function getPartTemplateName(formPart) {
			return this.getOptions('prefix') + formPart;
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			if (this.getWorking('wrapper')) {
				this.getWorking('wrapper').update();
			} else {
				var input = {
					data: this.getWrapperData(),
					template: {
						name: this.getPartTemplateName('wrapper')
					},
					options: {
						helpers: this.getOptions('helpers'),
						targetEl: this.getOptions('targetEl'),
						targetQuery: this.getOptions('targetQuery'),
						id: this.getOptions('id')
					},
					events: [['afterRender', this.bindFormEvents.bind(this)], [['afterRender', 'afterUpdate'], this.renderComponents.bind(this)]]
				};
				var wrapper = new notComponent(input);
				this.setWorking('wrapper', wrapper);
			}
		}
	}, {
		key: 'getWrapperData',
		value: function getWrapperData() {
			var actionData = this.getActionData();
			return {
				title: actionData.title ? actionData.title : OPT_DEFAULT_FORM_TITLE
			};
		}
	}, {
		key: 'renderComponents',
		value: function renderComponents() {
			if (this.getWorking('components') && this.getWorking('components').length) {
				for (var t = 0; t < this.getWorking('components').length; t++) {
					this.getWorking('components')[t].component.update();
				}
			} else {
				for (var _t = 0; _t < this.getFormFieldsList().length; _t++) {
					var fieldName = this.getFormFieldsList()[_t];
					this.addFieldComponent(fieldName);
				}
			}
		}
	}, {
		key: 'clearFieldsComponents',
		value: function clearFieldsComponents() {
			var comps = this.getWorking('components');
			while (comps.length > 0) {
				comps[0].component.destroy();
				comps.splice(0, 1);
			}
		}
	}, {
		key: 'getFieldsLibs',
		value: function getFieldsLibs() {
			var result = {
				options: {},
				manifest: {},
				app: {}
			};
			if (this.getOptions('fields')) {
				result.options = this.getOptions('fields');
			}
			if (notCommon.getApp() && notCommon.getApp().getOptions('fields')) {
				result.app = notCommon.getApp().getOptions('fields');
			}
			if (this.getData().isRecord && this.getData().getManifest()) {
				result.manifest = this.getData().getManifest().fields;
			}
			return result;
		}
	}, {
		key: 'getFieldsDefinition',
		value: function getFieldsDefinition(fieldName) {
			var def = OPT_DEFAULT_FIELD_DEFINITION,
			    fieldsLibs = this.getFieldsLibs();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					if (fieldsLibs.hasOwnProperty(t) && fieldsLibs[t].hasOwnProperty(fieldName)) {
						return fieldsLibs[t][fieldName];
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return def;
		}
	}, {
		key: 'addFieldComponent',
		value: function addFieldComponent(fieldName) {
			var _this2 = this;

			var fieldType = this.getFieldsDefinition(fieldName);
			var rec = {
				field: {
					name: fieldName,
					title: fieldType.label || fieldType.placeholder,
					type: fieldType.type,
					label: fieldType.label,
					array: fieldType.array,
					default: fieldType.default,
					placeholder: fieldType.placeholder,
					options: this.getOptions(notPath$1.join('helpers', 'libs', fieldName))
				}
			};
			var helpers = notCommon.extend({
				isChecked: function isChecked(params) {
					return params.item.value === _this2.getData(fieldName);
				},
				field: rec.field,
				data: this.getData()

			}, this.getOptions('helpers'));
			rec.component = new notComponent({
				data: this.getData(),
				template: {
					name: this.getPartTemplateName(fieldType.type)
				},
				options: {
					helpers: helpers,
					targetEl: this.getFormTargetElement(fieldType.target),
					renderAnd: 'placeLast',
					events: [['afterDataChange', this.collectDataFromComponents.bind(this)]]
				}
			});
			this.getWorking('components').push(rec);
		}
	}, {
		key: 'collectDataFromComponents',
		value: function collectDataFromComponents(params) {
			notCommon.log('collect data from components', params);
		}
	}, {
		key: 'getFormTargetElement',
		value: function getFormTargetElement() {
			var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

			if (!target) {
				target = 'body';
			}
			var res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
			if (!res && target !== 'body') {
				target = 'body';
				res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
			}
			if (!res && target == 'body') {
				return this.getOptions('targetEl');
			} else {
				return res;
			}
		}

		/*
  	Data management
  */

	}, {
		key: 'collectData',
		value: function collectData() {
			//let data = this.collectDataFromComponents.bind(this);
		}
	}, {
		key: 'bindFormEvents',
		value: function bindFormEvents() {
			var targetQuery = this.getOptions('targetQuery');
			if (targetQuery) {
				var target = document.querySelector(targetQuery);
				if (target) {
					this.setOptions('targetEl', target);
				}
			}
			if (this.getOptions('targetEl')) {
				var form = this.getOptions('targetEl').querySelector('form');
				if (form) {
					form.addEventListener('submit', this.onSubmit.bind(this));
					form.addEventListener('reset', this.onReset.bind(this));
				}
			}
		}
	}, {
		key: 'updateField',
		value: function updateField(fieldName) {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				if (this.getWorking('components')[t].field.name === fieldName) {
					this.getWorking('components')[t].component.update();
				}
			}
		}
	}, {
		key: 'update',
		value: function update() {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				this.getWorking('components')[t].component.update();
			}
		}

		/*
  	Event handlers
  */

	}, {
		key: 'onSubmit',
		value: function onSubmit() {}
	}, {
		key: 'onCancel',
		value: function onCancel() {}
	}, {
		key: 'onReset',
		value: function onReset() {}
	}, {
		key: 'getFields',
		value: function getFields() {}
	}, {
		key: 'addField',
		value: function addField() {}
	}, {
		key: 'removeField',
		value: function removeField() {}
	}]);
	return notForm;
}(notBase);

var OPT_DEFAULT_VIEW = 'edit';
var OPT_DEFAULT_ACTION = 'create';
var OPT_DEFAULT_ITEM = {
	_id: null,
	title: 'Title',
	value: 'Value'
};

var CRUDCreate = function (_notController) {
	inherits(CRUDCreate, _notController);

	function CRUDCreate(parent, params) {
		var _ret;

		classCallCheck(this, CRUDCreate);

		var _this = possibleConstructorReturn(this, (CRUDCreate.__proto__ || Object.getPrototypeOf(CRUDCreate)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Create');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.create.name') || OPT_DEFAULT_VIEW,
				common: _this.parent.getOptions('views.create.common') || true,
				targetQuery: _this.parent.getOptions('views.create.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});
		_this.preloadLib(_this.parent.getOptions('views.create.preload')).then(_this.initData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(function () {
			_this.trigger('afterRender');
		}).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDCreate, [{
		key: 'createDefault',
		value: function createDefault() {
			if (this.parent.getOptions('views.create.defaultItem') && this.parent.getModuleName() && this.parent.make[this.parent.getModuleName()]) {
				return this.parent.make[this.parent.getModuleName()](notCommon.extend({}, this.parent.getOptions('views.create.defaultItem')));
			} else if (this.parent.initItem) {
				return this.parent.initItem();
			} else if (this.parent.getModuleName() && this.parent.make[this.parent.getModuleName()]) {
				return this.parent.make[this.parent.getModuleName()](notCommon.extend({}, OPT_DEFAULT_ITEM));
			} else {
				return new notRecord({}, notCommon.extend({}, OPT_DEFAULT_ITEM));
			}
		}
	}, {
		key: 'initData',
		value: function initData() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				try {
					_this2.setData(_this2.createDefault());
					resolve(_this2.getData());
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			return this.render('default', {}, {});
		}
	}, {
		key: 'renderForm',
		value: function renderForm() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				_this3.form = new notForm({
					data: _this3.getData(),
					options: {
						action: _this3.parent.getOptions('views.create.action') || OPT_DEFAULT_ACTION,
						targetQuery: _this3.parent.getOptions('views.create.targetQuery') || _this3.parent.getOptions('targetQuery'),
						targetEl: document.querySelector(_this3.parent.getOptions('views.create.targetQuery') || _this3.parent.getOptions('targetQuery')),
						prefix: _this3.parent.getOptions('views.create.prefix') || _this3.parent.getOptions('prefix'),
						role: _this3.parent.getOptions('views.create.role') || _this3.parent.getOptions('role'),
						helpers: notCommon.extend({
							linkBackToList: _this3.parent.linkBackToList(),
							file: function file(params) {
								var files = params.e.target.files || params.e.dataTransfer.files;
								notCommon.log('file changed', files);
								if (params.helpers.field.name && files) {
									_this3.queeUpload(params.helpers.field.name, files);
								}
							},
							submit: function submit() {
								notCommon.log('submit form ', _this3.newItem);
								_this3.execUploads(_this3.getData()).then(_this3.create.bind(_this3));
							},
							afterSubmit: function afterSubmit() {
								_this3.goToTable();
							},
							libs: _this3.getOptions('libs')
						}, _this3.parent.getOptions('views.create.helpers') || {})
					},
					events: [['afterRender', resolve], [['afterSubmit', 'afterRestore'], _this3.parent.backToList.bind(_this3.parent)]]
				});
			});
		}
	}, {
		key: 'create',
		value: function create(item) {
			var _this4 = this;

			item['$' + this.parent.getOptions('views.create.action')]().then(function (result) {
				notCommon.log('form saved', result);
				_this4.parent.app.getWorking('router').navigate(_this4.parent.getModuleName());
			}).catch(function (result) {
				notCommon.error('form not saved', result);
			});
		}
	}]);
	return CRUDCreate;
}(notController);

var OPT_DEFAULT_PAGE_SIZE = 20;
var OPT_DEFAULT_PAGE_NUMBER = 0;
var OPT_DEFAULT_SORT_DIRECTION = 1;
var OPT_DEFAULT_SORT_FIELD = '_id';
var OPT_FIELD_NAME_PRE_PROC = 'preprocessor';

var notTable = function (_notBase) {
	inherits(notTable, _notBase);

	function notTable(input) {
		var _ret;

		classCallCheck(this, notTable);

		var _this = possibleConstructorReturn(this, (notTable.__proto__ || Object.getPrototypeOf(notTable)).call(this, input));

		_this.setWorking('filteredData', []);
		if (!_this.getData() || !Array.isArray(_this.getData('rows'))) {
			_this.setData({ rows: [] });
		}
		_this.resetPager();
		_this.resetFilter();
		_this.resetSorter();
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notTable, [{
		key: 'render',
		value: function render() {
			if (this.getWorking('component')) {
				this.getWorking('component').update();
			} else {
				var component = new notComponent({
					data: {},
					template: {
						name: 'table_wrapper'
					},
					options: {
						renderAnd: this.getOptions('renderAnd'),
						targetEl: this.getOptions('targetEl'),
						helpers: this.getOptions('helpers')
					},
					events: [[['afterRender', 'afterUpdate'], this.renderInside.bind(this)]]
				});
				this.setWorking('component', component);
			}
		}
	}, {
		key: 'renderInside',
		value: function renderInside() {
			this.renderHeader();
			this.updateData();
			this.renderBody();
			this.bindSearch();
			this.bindCustomBindings();
		}
	}, {
		key: 'renderHeader',
		value: function renderHeader() {
			var tableHeader = this.getOptions('targetEl').querySelector('thead tr');
			if (!tableHeader) return;
			var fields = this.getOptions('fields');
			for (var i = 0; i < fields.length; i++) {
				var newTh = document.createElement('TH');
				newTh.innerHTML = fields[i].title;
				if (fields[i].hasOwnProperty('sortable') && fields[i].sortable) {
					this.attachSortingHandlers(newTh, fields[i].path);
				}
				tableHeader.appendChild(newTh);
			}
		}
	}, {
		key: 'attachSortingHandlers',
		value: function attachSortingHandlers(headCell, fieldName) {
			var _this2 = this;

			headCell.addEventListener('click', function (e) {
				e.preventDefault();
				_this2.changeSortingOptions(headCell, fieldName);
				return false;
			});
			headCell.style.cursor = 'pointer';
		}
	}, {
		key: 'changeSortingOptions',
		value: function changeSortingOptions(el, fieldName) {
			if (fieldName === this.getSorter().sortByField) {
				this.setSorter({
					sortByField: fieldName,
					sortDirection: -1 * this.getSorter().sortDirection
				});
			} else {
				this.setSorter({
					sortByField: fieldName,
					sortDirection: OPT_DEFAULT_SORT_DIRECTION
				});
			}
			if (el.parentNode) {
				for (var i = 0; i < el.parentNode.children.length; i++) {
					if (el.parentNode.children[i] === el) {
						continue;
					}
					el.parentNode.children[i].classList.remove('sorting_asc');
					el.parentNode.children[i].classList.remove('sorting_desc');
					el.parentNode.children[i].setAttribute('aria-sort', 'none');
				}
			}
			if (this.getSorter().sortDirection > 0) {
				el.classList.remove('sorting_desc');
				el.classList.add('sorting_asc');
				el.setAttribute('aria-sort', 'ascending');
			} else {
				el.classList.remove('sorting_asc');
				el.classList.add('sorting_desc');
				el.setAttribute('aria-sort', 'descending');
			}
		}
	}, {
		key: 'setSorter',
		value: function setSorter(hash) {
			//console.log('setSorter', hash);
			this.setWorking('sorter', hash);
			this.invalidateData();
			this.updateData();
		}
	}, {
		key: 'resetSorter',
		value: function resetSorter() {
			this.setSorter({
				sortByField: OPT_DEFAULT_SORT_FIELD,
				sortDirection: OPT_DEFAULT_SORT_DIRECTION
			});
		}
	}, {
		key: 'getSorter',
		value: function getSorter() {
			return this.getWorking('sorter');
		}
	}, {
		key: 'getFilterSearch',
		value: function getFilterSearch() {
			return typeof this.getFilter() !== 'undefined' && this.getFilter() !== null && typeof this.getFilter().filterSearch !== 'undefined' && this.getFilter().filterSearch !== null ? this.getFilter().filterSearch.toString() : '';
		}
	}, {
		key: 'invalidateData',
		value: function invalidateData() {
			if (this.getOptions('liveLoad') && this.getOptions('onePager')) {
				while (this.getData('rows').length > 0) {
					this.getData('rows').pop();
				}
				this.resetPager();
			}
		}
	}, {
		key: 'setFilter',
		value: function setFilter(hash) {
			this.setWorking('filter', hash);
			this.invalidateData();
			this.updateData();
		}
	}, {
		key: 'resetFilter',
		value: function resetFilter() {
			this.setFilter({});
			this.updateData();
		}
	}, {
		key: 'getFilter',
		value: function getFilter() {
			return this.getWorking('filter');
		}
	}, {
		key: 'setPager',
		value: function setPager(hash) {
			this.setWorking('pager', hash);
			this.updateData();
		}
	}, {
		key: 'resetPager',
		value: function resetPager() {
			this.setWorking('pager', {
				pageSize: isNaN(this.getOptions('pageSize')) ? OPT_DEFAULT_PAGE_SIZE : this.getOptions('pageSize'),
				pageNumber: isNaN(this.getOptions('pageNumber')) ? OPT_DEFAULT_PAGE_NUMBER : this.getOptions('pageNumber')
			});
		}
	}, {
		key: 'getPager',
		value: function getPager() {
			return this.getWorking('pager');
		}
	}, {
		key: 'setUpdating',
		value: function setUpdating() {
			this.setWorking('updating', true);
		}
	}, {
		key: 'setUpdated',
		value: function setUpdated() {
			this.setWorking('updating', false);
		}
	}, {
		key: 'ifUpdating',
		value: function ifUpdating() {
			return this.getWorking('updating');
		}
	}, {
		key: 'updateData',
		value: function updateData() {
			var _this3 = this;

			if (this.getOptions('liveLoad') && this.getOptions('interface')) {
				if (this.ifUpdating()) {
					return;
				}
				//load from server
				var query = this.getOptions('interface')({}).setFilter(this.getFilter()).setSorter(this.getSorter()).setPager(this.getPager().pageSize, this.getPager().pageNumber);
				this.setUpdating();
				query.$list().then(function (data) {
					//console.log('$list for table', data);
					_this3.setData({
						rows: _this3.getData('rows').concat(data)
					});
					_this3.proccessData();
					_this3.refreshBody();
					_this3.setUpdated();
				}).catch(function (e) {
					notCommon.error(e);
					_this3.setUpdated();
				});
			} else {
				//local magic
				this.setUpdating();
				this.proccessData();
				this.refreshBody();
				this.setUpdated();
			}
		}
	}, {
		key: 'proccessData',
		value: function proccessData() {
			var thatFilter = this.getFilter();
			if (typeof thatFilter !== 'undefined' && thatFilter !== null && typeof thatFilter.filterSearch !== 'undefined' && thatFilter.filterSearch !== null && thatFilter.filterSearch.length > 0) {
				//
				this.setWorking('filteredData', this.getData('rows').filter(this.testDataItem.bind(this)));
			} else {
				this.setWorking('filteredData', this.getData('rows'));
			}
			////sorter
			var thatSorter = this.getSorter();
			if (typeof thatSorter !== 'undefined' && thatSorter !== null) {
				this.getWorking('filteredData').sort(function (item1, item2) {
					var t1 = notPath$1.get(thatSorter.sortByField, item1, {}),
					    t2 = notPath$1.get(thatSorter.sortByField, item2, {});
					if (isNaN(t1)) {
						if (typeof t1 !== 'undefined' && typeof t2 !== 'undefined' && t1.localeCompare) {
							return t1.localeCompare() * -thatSorter.sortDirection;
						} else {
							return 0;
						}
					} else {
						return (t1 < t2 ? 1 : -1) * thatSorter.sortDirection;
					}
				});
			}
		}
	}, {
		key: 'bindSearch',
		value: function bindSearch() {
			var _this4 = this;

			var searchEl = this.getOptions('targetEl').querySelectorAll('input[name="search"]')[0];
			if (!searchEl) return;
			var onEvent = function onEvent(e) {
				_this4.setFilter({
					filterSearch: e.currentTarget.value
				});
				return true;
			};
			searchEl.addEventListener('keyup', onEvent);
			searchEl.addEventListener('enter', onEvent);
		}
	}, {
		key: 'bindCustomBindings',
		value: function bindCustomBindings() {
			if (!this.getOptions('bindings') || !this.getOptions('bindings')) {
				return;
			}
			for (var selector in this.getOptions('bindings')) {
				var els = this.getOption('targetEl').querySelectorAll(selector);
				for (var elId = 0; elId < els.length; elId++) {
					var el = els[elId];
					for (var event in this.getOptions('bindings')[selector]) {
						el.addEventListener(event, this.getOptions('bindings')[selector][event]);
					}
				}
			}
		}
	}, {
		key: 'loadNext',
		value: function loadNext() {
			this.getWorking('pager').pageNumber++;
			this.updateData();
		}
	}, {
		key: 'renderRow',
		value: function renderRow(item, index) {
			var _this5 = this;

			var newRow = document.createElement('TR'),
			    fields = this.getOptions('fields');

			var _loop = function _loop() {
				var newTd = document.createElement('TD'),
				    field = fields[i],
				    preprocessed = null,
				    val = notPath$1.get(field.path, item, _this5.getOptions('helpers'));
				if (field.hasOwnProperty('editable') && !field.hasOwnProperty('component')) {
					newTd.setAttribute('contentEditable', true);
					newTd.dataset.path = field.path;
					newTd.dataset.itemId = item[_this5.getOptions('itemIdField')];
					newTd.dataset.value = val;
					newTd.addEventListener('blur', function () {
						notPath$1.set(field.path, item, _this5.getOptions('helpers'), newTd.textContent);
						_this5.updateData();
					});
				}

				if (field.hasOwnProperty(OPT_FIELD_NAME_PRE_PROC)) {
					preprocessed = field[OPT_FIELD_NAME_PRE_PROC](val, item, index);
				}

				if (field.hasOwnProperty('component')) {
					new notComponent({
						data: field.component.data || preprocessed || { val: val, item: item, index: index },
						template: field.component.template,
						options: {
							targetEl: newTd,
							helpers: _this5.getOptions('helpers')
						},
						events: field.component.events || []
					});
				} else {
					newTd.innerHTML = preprocessed || val;
				}

				if (field.hasOwnProperty('style')) {
					for (var style in field.style) {
						if (field.style.hasOwnProperty(style)) {
							newTd.style[style] = field.style[style];
						}
					}
				}

				if (field.hasOwnProperty('events') && field.events) {
					for (j in field.events) {
						newTd.addEventListener(j, function (e) {
							e.preventDefault();
							return field.events[j]({
								event: e,
								element: newTd,
								item: item,
								value: val,
								field: field
							});
						}, false);
					}
				}
				newRow.appendChild(newTd);
			};

			for (var i = 0; i < fields.length; i++) {
				var j;

				_loop();
			}
			if (this.getOptions('procRow')) {
				return this.getOptions('procRow')(newRow, item);
			}
			return newRow;
		}
	}, {
		key: 'refreshBody',
		value: function refreshBody() {
			var tbody = this.findBody();
			if (!tbody) {
				return;
			}
			this.clearBody();
			this.checkFiltered();
			var thisPageStarts = 0,
			    nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1);
			for (var i = thisPageStarts; i < Math.min(nextPageEnds, this.getWorking('filteredData').length); i++) {
				tbody.appendChild(this.renderRow(this.getWorking('filteredData')[i]));
			}
		}
	}, {
		key: 'findBody',
		value: function findBody() {
			return this.getOptions('targetEl').querySelector('tbody');
		}
	}, {
		key: 'clearBody',
		value: function clearBody() {
			var tableBody = this.findBody();
			if (!tableBody) return;
			tableBody.innerHTML = '';
		}
	}, {
		key: 'checkFiltered',
		value: function checkFiltered() {
			if (!Array.isArray(this.getWorking('filteredData'))) {
				this.setWorking('filteredData', []);
			}
		}
	}, {
		key: 'renderBody',
		value: function renderBody() {
			if (!this.getOptions('onePager')) {
				this.clearBody();
			}
			this.checkFiltered();
			var thisPageStarts = this.getPager().pageSize * this.getPager().pageNumber,
			    nextPageEnds = this.getPager().pageSize * (this.getPager().pageNumber + 1),
			    tbody = this.findBody();

			for (var i = thisPageStarts; i < Math.min(nextPageEnds, this.getWorking('filteredData').length); i++) {
				tbody.appendChild(this.renderRow(this.getWorking('filteredData')[i]));
			}
		}
	}, {
		key: 'testDataItem',
		value: function testDataItem(item) {
			var strValue = this.getFilterSearch().toLowerCase();
			for (var k in item) {
				var toComp = item[k].toString().toLowerCase();
				if (toComp.indexOf(strValue) > -1) {
					return true;
				}
			}
			return false;
		}
	}]);
	return notTable;
}(notBase);

var OP_DEFAULT_PAGE_SIZE = 50;
var OPT_DEFAULT_VIEW$1 = 'list';

var CRUDList = function (_notController) {
	inherits(CRUDList, _notController);

	function CRUDList(parent, params) {
		var _ret;

		classCallCheck(this, CRUDList);

		var _this = possibleConstructorReturn(this, (CRUDList.__proto__ || Object.getPrototypeOf(CRUDList)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD List');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.list.name') || OPT_DEFAULT_VIEW$1,
				common: _this.parent.getOptions('views.list.common') || true,
				targetQuery: parent.getOptions('views.list.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});
		_this.preloadLib(_this.parent.getOptions('views.list.preload')).then(_this.renderWrapper.bind(_this)).then(_this.updateDatatable.bind(_this)).then(function () {
			_this.trigger('afterRender');
		}).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDList, [{
		key: 'renderWrapper',
		value: function renderWrapper() {
			var _this2 = this;

			return this.render('default', {}, {
				title: this.parent.getOptions('names.plural'),
				showAddForm: function showAddForm() {
					_this2.parent.app.getWorking('router').navigate([_this2.parent.getModuleName(), 'create'].join('/'));
				},
				linkBackToList: this.parent.linkBackToList.bind(this.parent)
			});
		}
	}, {
		key: 'updateDatatable',
		value: function updateDatatable() {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				try {
					_this3.tableView = new notTable({
						options: {
							fields: _this3.parent.getOptions('views.list.fields'),
							targetEl: document.querySelector(_this3.parent.getOptions('views.list.targetQuery') || _this3.parent.getOptions('targetQuery')),
							helpers: notCommon.extend({
								title: _this3.parent.getOptions('names.plural')
							}, _this3.parent.getOptions('views.list.helpers') || {}),
							pageSize: _this3.app.getOptions('pager.size') || OP_DEFAULT_PAGE_SIZE,
							pageNumber: 0,
							onePager: true,
							liveLoad: true,
							interface: _this3.make[_this3.parent.getModuleName()]
						},
						events: [['afterRender', resolve]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'showNextPage',
		value: function showNextPage() {
			if (this.tableView) {
				this.tableView.loadNext();
			}
		}
	}]);
	return CRUDList;
}(notController);

var OPT_DEFAULT_LOAD_ACTION = 'getRaw';
var OPT_DEFAULT_ACTION$1 = 'update';
var OPT_DEFAULT_VIEW$2 = 'edit';

var CRUDUpdate = function (_notController) {
	inherits(CRUDUpdate, _notController);

	function CRUDUpdate(parent, params) {
		var _ret;

		classCallCheck(this, CRUDUpdate);

		var _this = possibleConstructorReturn(this, (CRUDUpdate.__proto__ || Object.getPrototypeOf(CRUDUpdate)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Update');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.update.name') || OPT_DEFAULT_VIEW$2,
				common: _this.parent.getOptions('views.update.common') || true,
				targetQuery: _this.parent.getOptions('views.update.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});

		_this.preloadLib(_this.parent.getOptions('views.update.preload')).then(_this.loadItem.bind(_this)).then(_this.setData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderForm.bind(_this)).then(function () {
			_this.trigger('afterRender');
		}).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDUpdate, [{
		key: 'loadItem',
		value: function loadItem() {
			return this.make[this.parent.getModuleName()]({
				'_id': this.getOptions('params.0')
			})['$' + (this.parent.getOptions('views.update.loadAction') || OPT_DEFAULT_LOAD_ACTION)]();
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			return this.render('default', this.getData(), {});
		}
	}, {
		key: 'renderForm',
		value: function renderForm() {
			var _this2 = this;

			return new Promise(function (resolve, reject) {
				try {
					_this2.form = new notForm({
						data: _this2.getData(),
						options: {
							action: _this2.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION$1,
							targetQuery: _this2.parent.getOptions('views.update.targetQuery') || _this2.parent.getOptions('targetQuery'),
							prefix: _this2.parent.getOptions('views.update.prefix') || _this2.parent.getOptions('prefix'),
							role: _this2.parent.getOptions('views.update.role') || _this2.parent.getOptions('role'),
							data: _this2.getData(),
							helpers: notCommon.extend({
								file: function file(params) {
									var files = params.e.target.files || params.e.dataTransfer.files;
									notCommon.log('file changed', files);
									if (params.helpers.field.name && files) {
										_this2.queeUpload(params.helpers.field.name, files);
									}
								},
								submit: function submit(params) {
									notCommon.log('submit form ', params.item);
									_this2.execUploads(params.item).then(_this2.update.bind(_this2));
								},
								libs: _this2.getOptions('libs'),
								afterSubmit: _this2.parent.backToList.bind(_this2.parent)
							}, _this2.parent.getOptions('views.update.helpers') || {})
						},
						events: [[['afterRestore', 'afterSubmit'], _this2.parent.backToList.bind(_this2.parent)], ['afterRender', resolve]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}, {
		key: 'update',
		value: function update(item) {
			var _this3 = this;

			item['$' + (this.parent.getOptions('views.update.action') || OPT_DEFAULT_ACTION$1)]().then(function (result) {
				notCommon.log('form saved', result);
				_this3.parent.app.getWorking('router').navigate(_this3.getModuleName());
				_this3.parent.runList();
			}).catch(function (result) {
				notCommon.error('form not saved', result);
			});
		}
	}]);
	return CRUDUpdate;
}(notController);

var OPT_DEFAULT_ACTION$2 = 'delete';

var CRUDDelete = function (_notController) {
	inherits(CRUDDelete, _notController);

	function CRUDDelete(parent, params) {
		var _ret;

		classCallCheck(this, CRUDDelete);

		var _this = possibleConstructorReturn(this, (CRUDDelete.__proto__ || Object.getPrototypeOf(CRUDDelete)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Delete');
		_this.preloadLib(_this.parent.getOptions('views.delete.preload')).then(function () {
			if (confirm('Удалить запись?')) {
				_this.delete();
			} else {
				_this.parent.backToList();
			}
		});

		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDDelete, [{
		key: 'delete',
		value: function _delete() {
			var action = '$' + (this.parent.getOptions('views.delete.action') || OPT_DEFAULT_ACTION$2);
			this.make[this.parent.getModuleName()]({ '_id': this.getOptions('params.0') })[action]().then(this.parent.backToList.bind(this.parent)).catch(notCommon.report);
		}
	}]);
	return CRUDDelete;
}(notController);

var OPT_DEFAULT_DETAILS_PREFIX = 'details_';
var OPT_DEFAULT_ROLE_NAME$1 = 'default';
var OPT_DEFAULT_DETAILS_TITLE = 'Details default title';
var OPT_DEFAULT_FIELD_DEFINITION$1 = {};
var OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST$1 = ['options', 'manifest', 'app'];

var notDetails = function (_notBase) {
	inherits(notDetails, _notBase);

	function notDetails(input) {
		var _ret;

		classCallCheck(this, notDetails);

		var _this = possibleConstructorReturn(this, (notDetails.__proto__ || Object.getPrototypeOf(notDetails)).call(this, input));

		if (!_this.getOptions('prefix')) {
			_this.setOptions('prefix', OPT_DEFAULT_DETAILS_PREFIX);
		}
		_this.setWorking('components', []);
		if (!_this.getData().isRecord) {
			_this.setData(new notRecord({}, _this.getData()));
		}
		_this.render();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(notDetails, [{
		key: 'getManifest',
		value: function getManifest() {
			return this.getData().getManifest();
		}
	}, {
		key: 'getActionData',
		value: function getActionData() {
			var manifest = this.getManifest();
			if (manifest && manifest.actions) {
				return manifest.actions.hasOwnProperty(this.getOptions('action')) ? manifest.actions[this.getOptions('action')] : null;
			} else {
				return null;
			}
		}
	}, {
		key: 'getFieldsList',
		value: function getFieldsList() {
			var actionData = this.getActionData(),
			    list = [],
			    role = this.getOptions('role', OPT_DEFAULT_ROLE_NAME$1);
			if (actionData) {
				if (actionData.fields) {
					if (actionData.fields.hasOwnProperty(role)) {
						list = actionData.fields[role];
					}
				}
			}
			return list;
		}
	}, {
		key: 'render',
		value: function render() {
			this.renderWrapper();
		}
	}, {
		key: 'getPartTemplateName',
		value: function getPartTemplateName(formPart) {
			return this.getOptions('prefix') + formPart;
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			if (this.getWorking('wrapper')) {
				this.getWorking('wrapper').update();
			} else {
				var input = {
					data: this.getWrapperData(),
					template: {
						name: this.getPartTemplateName('wrapper')
					},
					options: {
						helpers: this.getOptions('helpers'),
						targetEl: this.getOptions('targetEl'),
						targetQuery: this.getOptions('targetQuery'),
						id: this.getOptions('id')
					},
					events: [[['afterRender', 'afterUpdate'], this.renderComponents.bind(this)]]
				};
				var wrapper = new notComponent(input);
				this.setWorking('wrapper', wrapper);
			}
		}
	}, {
		key: 'getWrapperData',
		value: function getWrapperData() {
			var actionData = this.getActionData();
			return {
				title: actionData.title ? actionData.title : OPT_DEFAULT_DETAILS_TITLE
			};
		}
	}, {
		key: 'renderComponents',
		value: function renderComponents() {
			if (this.getWorking('components') && this.getWorking('components').length) {
				for (var t = 0; t < this.getWorking('components').length; t++) {
					this.getWorking('components')[t].component.update();
				}
			} else {
				for (var _t = 0; _t < this.getFieldsList().length; _t++) {
					var fieldName = this.getFieldsList()[_t];
					this.addFieldComponent(fieldName);
				}
			}
		}
	}, {
		key: 'clearFieldsComponents',
		value: function clearFieldsComponents() {
			var comps = this.getWorking('components');
			while (comps.length > 0) {
				comps[0].component.destroy();
				comps.splice(0, 1);
			}
		}
	}, {
		key: 'getFieldsLibs',
		value: function getFieldsLibs() {
			var result = {
				options: {},
				manifest: {},
				app: {}
			};
			if (this.getOptions('fields')) {
				result.options = this.getOptions('fields');
			}
			if (notCommon.getApp() && notCommon.getApp().getOptions('fields')) {
				result.app = notCommon.getApp().getOptions('fields');
			}
			if (this.getData().isRecord && this.getData().getManifest()) {
				result.manifest = this.getData().getManifest().fields;
			}
			return result;
		}
	}, {
		key: 'getFieldsDefinition',
		value: function getFieldsDefinition(fieldName) {
			var def = OPT_DEFAULT_FIELD_DEFINITION$1,
			    fieldsLibs = this.getFieldsLibs();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = OPT_DEFAULT_FIELD_DEFINITION_SOURCES_PRIORITY_LIST$1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					if (fieldsLibs.hasOwnProperty(t) && fieldsLibs[t].hasOwnProperty(fieldName)) {
						return fieldsLibs[t][fieldName];
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return def;
		}
	}, {
		key: 'addFieldComponent',
		value: function addFieldComponent(fieldName) {
			var fieldType = this.getFieldsDefinition(fieldName),
			    rec = null;
			if (fieldType.component) {
				rec = this.castCustom(fieldName, fieldType);
			} else {
				rec = this.castCommon(fieldName, fieldType);
			}
			this.getWorking('components').push(rec);
		}
	}, {
		key: 'castCustom',
		value: function castCustom(fieldName, fieldType) {
			var _this2 = this;

			var CustomComponent = notFramework.notCommon.get('components')[fieldType.component];
			var rec = {
				field: {
					name: fieldName,
					title: fieldType.label || fieldType.placeholder,
					type: fieldType.type,
					label: fieldType.label,
					array: fieldType.array,
					default: fieldType.default,
					placeholder: fieldType.placeholder,
					options: this.getOptions(notPath$1.join('helpers', 'libs', fieldName))
				}
			};
			var helpers = notCommon.extend({
				isChecked: function isChecked(params) {
					return params.item.value === _this2.getData(fieldName);
				},
				field: rec.field,
				data: this.getData()
			}, this.getOptions('helpers'));

			rec.component = new CustomComponent({
				data: this.getData(),
				options: {
					helpers: helpers,
					targetEl: this.getTargetElement(fieldType.target),
					renderAnd: 'placeLast'
				}
			});
			return rec;
		}
	}, {
		key: 'castCommon',
		value: function castCommon(fieldName, fieldType) {
			var _this3 = this;

			var rec = {
				field: {
					name: fieldName,
					title: fieldType.label || fieldType.placeholder,
					type: fieldType.type,
					label: fieldType.label,
					array: fieldType.array,
					default: fieldType.default,
					placeholder: fieldType.placeholder,
					options: this.getOptions(notPath$1.join('helpers', 'libs', fieldName))
				}
			};
			var helpers = notCommon.extend({
				isChecked: function isChecked(params) {
					return params.item.value === _this3.getData(fieldName);
				},
				field: rec.field,
				data: this.getData()
			}, this.getOptions('helpers'));
			rec.component = new notComponent({
				data: this.getData(),
				template: {
					name: this.getPartTemplateName(fieldType.type)
				},
				options: {
					helpers: helpers,
					targetEl: this.getTargetElement(fieldType.target),
					renderAnd: 'placeLast'
				}
			});
			return rec;
		}
	}, {
		key: 'getTargetElement',
		value: function getTargetElement() {
			var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

			if (!target) {
				target = 'body';
			}
			var res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
			if (!res && target !== 'body') {
				target = 'body';
				res = this.getOptions('targetEl').querySelector('[role="' + target + '"]');
			}
			if (!res && target == 'body') {
				return this.getOptions('targetEl');
			} else {
				return res;
			}
		}

		/*
  	Data management
  */

	}, {
		key: 'updateField',
		value: function updateField(fieldName) {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				if (this.getWorking('components')[t].field.name === fieldName) {
					this.getWorking('components')[t].component.update();
				}
			}
		}
	}, {
		key: 'update',
		value: function update() {
			for (var t = 0; t < this.getWorking('components').length; t++) {
				this.getWorking('components')[t].component.update();
			}
		}
	}]);
	return notDetails;
}(notBase);

var OPT_DEFAULT_LOAD_ACTION$1 = 'get';
var OPT_DEFAULT_VIEW$3 = 'details';

var CRUDDetails = function (_notController) {
	inherits(CRUDDetails, _notController);

	function CRUDDetails(parent, params) {
		var _ret;

		classCallCheck(this, CRUDDetails);

		var _this = possibleConstructorReturn(this, (CRUDDetails.__proto__ || Object.getPrototypeOf(CRUDDetails)).call(this, parent.app));

		_this.parent = parent;
		_this.setOptions('params', params);
		notCommon.log('CRUD Details');
		_this.setViews({
			default: {
				name: _this.parent.getOptions('views.details.name') || OPT_DEFAULT_VIEW$3,
				common: _this.parent.getOptions('views.details.common') || true,
				targetQuery: _this.parent.getOptions('views.details.containerSelector') || _this.parent.getOptions('containerSelector'),
				helpers: {}
			}
		});

		_this.preloadLib(_this.parent.getOptions('views.details.preload')).then(_this.loadItem.bind(_this)).then(_this.setData.bind(_this)).then(_this.renderWrapper.bind(_this)).then(_this.renderDetails.bind(_this)).then(function () {
			_this.trigger('afterRender');
		}).catch(notCommon.report);
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDDetails, [{
		key: 'loadItem',
		value: function loadItem() {
			return this.make[this.parent.getModuleName()]({
				'_id': this.getOptions('params.0')
			})['$' + (this.parent.getOptions('views.details.action') || OPT_DEFAULT_LOAD_ACTION$1)]();
		}
	}, {
		key: 'renderWrapper',
		value: function renderWrapper() {
			var _this2 = this;

			var item = this.getData();
			var helpers = {
				ID: item ? item[this.parent.getModuleName() + 'ID'] : '',
				field: {
					array: false
				},
				update: function update(params) {
					_this2.app.getWorking('router').navigate([_this2.parent.getModuleName(), params.item._id, 'update'].join('/'));
				},
				delete: function _delete(params) {
					_this2.app.getWorking('router').navigate([_this2.parent.getModuleName(), params.item._id, 'delete'].join('/'));
				},
				linkBackToList: this.parent.linkBackToList.bind(this.parent),
				title: this.parent.getOptions('names.single')
			};
			return this.render('default', item, helpers);
		}
	}, {
		key: 'renderDetails',
		value: function renderDetails() {
			var _this3 = this;

			var item = this.getData();
			return new Promise(function (resolve, reject) {
				try {
					new notDetails({
						data: item,
						options: {
							targetQuery: _this3.parent.getOptions('views.details.targetQuery'),
							targetEl: document.querySelector(_this3.parent.getOptions('views.details.targetQuery') || _this3.parent.getOptions('targetQuery')),
							action: _this3.parent.getOptions('views.details.action') || OPT_DEFAULT_LOAD_ACTION$1,
							prefix: _this3.parent.getOptions('views.details.prefix') || _this3.parent.getOptions('prefix'),
							role: _this3.parent.getOptions('views.details.role') || _this3.parent.getOptions('role'),
							helpers: notCommon.extend({
								linkBackToList: _this3.parent.linkBackToList(),
								libs: _this3.getOptions('lib'),
								ID: item[_this3.parent.getModuleName() + 'ID'],
								__version: item.__version
							}, _this3.parent.getOptions('views.details.helpers') || {})
						},
						events: [['afterRender', resolve]]
					});
				} catch (e) {
					reject(e);
				}
			});
		}
	}]);
	return CRUDDetails;
}(notController);

var CRUDController = function (_notController) {
	inherits(CRUDController, _notController);

	function CRUDController(app, params) {
		var _ret;

		classCallCheck(this, CRUDController);

		notCommon.log('running CRUDController');

		var _this = possibleConstructorReturn(this, (CRUDController.__proto__ || Object.getPrototypeOf(CRUDController)).call(this, app));

		_this.setOptions('names', {
			plural: 'plural',
			single: 'single'
		});
		_this.setOptions('params', params);
		_this.setOptions('containerSelector', _this.app.getOptions('crud.containerSelector'));
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	createClass(CRUDController, [{
		key: 'route',
		value: function route() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			if (params.length == 1) {
				if (params[0] === 'create') {
					return this.runCreate(params);
				} else {
					return this.runDetails(params);
				}
			} else if (params.length == 2) {
				if (params[1] === 'delete') {
					return this.runDelete(params);
				} else if (params[1] === 'update') {
					return this.runUpdate(params);
				} else {
					var routeRunnerName = 'run' + notCommon.capitalizeFirstLetter(params[0]);
					if (this[routeRunnerName] && typeof this[routeRunnerName] === 'function') {
						return this[routeRunnerName](params);
					}
				}
			}
			return this.runList(params);
		}
	}, {
		key: 'runCreate',
		value: function runCreate() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDCreate(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runList',
		value: function runList() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDList(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runDetails',
		value: function runDetails() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDDetails(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runDelete',
		value: function runDelete() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDDelete(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'runUpdate',
		value: function runUpdate() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			this.view = new CRUDUpdate(this, params).on('afterRender', this.onAfterRender.bind(this));
			return this;
		}
	}, {
		key: 'onAfterRender',
		value: function onAfterRender() {
			this.trigger('afterRender');
		}
	}, {
		key: 'backToList',
		value: function backToList() {
			this.app.getWorking('router').navigate(this.getModuleName());
		}
	}, {
		key: 'linkBackToList',
		value: function linkBackToList() {
			return this.getModuleName();
		}
	}]);
	return CRUDController;
}(notController);

var notTemplateProcessorsLib = {
	content: function content(scope, item, helpers) {
		scope.attributeResult = notPath$1.parseSubs(scope.attributeExpression, item, helpers);
		if (scope.params.indexOf('capitalize') > -1) {
			scope.attributeResult = scope.attributeResult.toUpperCase();
		}
		scope.element.textContent = scope.attributeResult;
	},
	bind: function bind(scope, item, helpers) {
		if (scope.element.binds) {
			if (scope.element.binds.hasOwnProperty(scope.params[0])) {
				if (scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) > -1) {
					return;
				}
			}
		}
		scope.element.addEventListener(scope.params[0], function (e) {
			if (scope.params.length === 1 || scope.params[1] !== 'default') {
				e.preventDefault();
			}
			if (scope.attributeResult) {
				return scope.attributeResult({
					scope: scope,
					item: item,
					helpers: helpers,
					e: e
				});
			} else {
				return true;
			}
		}, false);
		if (!scope.element.hasOwnProperty('binds')) {
			scope.element.binds = {};
		}
		if (!scope.element.binds.hasOwnProperty(scope.params[0])) {
			scope.element.binds[scope.params[0]] = [];
		}
		if (scope.element.binds[scope.params[0]].indexOf(scope.attributeExpression) === -1) {
			scope.element.binds[scope.params[0]].push(scope.attributeExpression);
		}
	},
	value: function value(scope, item, helpers) {
		var liveEvents = ['change', 'keyup'],
		    onEvent = function onEvent() {
			if (['checkbox', 'radio', 'select-multiple'].indexOf(scope.element.type) > -1) {
				switch (scope.element.type) {
					case 'checkbox':
						{
							notPath$1.set(scope.attributeExpression, item, helpers, scope.element.checked);
						}
						break;
					case 'radio':
						{
							//console.log(helpers.field.name, helpers.data, helpers, scope.element.checked?scope.element.value:null);
							notPath$1.set(helpers.field.name, helpers.data, helpers, scope.element.checked ? scope.element.value : null);
						}
						break;
					case 'select-multiple':
						{
							var selected = [].slice.call(scope.element.selectedOptions).map(function (a) {
								return a.value;
							});
							//console.log('select-multiple', selected);
							notPath$1.set(scope.attributeExpression, item, helpers, selected);
						}
						break;
				}
			} else {
				//console.log(notPath.get(scope.attributeExpression, item, helpers), ' -> ',scope.element.value);
				notPath$1.set(scope.attributeExpression, item, helpers, scope.element.value);
			}
		};
		scope.element.setAttribute('value', notPath$1.get(scope.attributeExpression, item, helpers));
		if (scope.element.processedValue !== true) {
			if (scope.element.type === 'textarea') {
				scope.element.innerHTML = notPath$1.get(scope.attributeExpression, item, helpers);
			}
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = liveEvents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					scope.element.addEventListener(t, onEvent);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			scope.element.processedValue = true;
		}
	},
	attr: function attr(scope, item, helpers) {
		var res = notPath$1.get(scope.attributeExpression, item, helpers) || notPath$1.parseSubs(scope.attributeExpression, item, helpers);
		scope.attributeResult = typeof res === 'function' ? res({
			scope: scope,
			item: item,
			helpers: helpers
		}) : res;
		scope.element.setAttribute(scope.params[0], scope.attributeResult);
	},
	name: function name(scope, item, helpers) {
		scope.element.setAttribute('name', notPath$1.get(scope.attributeExpression, item, helpers));
	},
	change: function change() /*scope, item, helpers*/{},
	checked: function checked(scope, item, helpers) {
		var result = notPath$1.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = typeof result === 'function' ? result({
			scope: scope,
			item: item,
			helpers: helpers
		}) : result;
		scope.attributeResult ? scope.element.setAttribute('checked', true) : scope.element.removeAttribute('checked');
	},
	class: function _class(scope, item, helpers) {
		var res = notPath$1.get(scope.attributeExpression, item, helpers);
		scope.attributeResult = typeof res === 'function' ? res({
			scope: scope,
			item: item,
			helpers: helpers
		}) : res;
		if (scope.params.length < 3 || isNaN(scope.attributeResult)) {
			if (scope.attributeResult) {
				scope.element.classList.add(scope.params[0]);
				if (scope.params.length > 1) {
					scope.element.classList.remove(scope.params[1]);
				}
			} else {
				scope.element.classList.remove(scope.params[0]);
				if (scope.params.length > 1) {
					scope.element.classList.add(scope.params[1]);
				}
			}
		} else {
			var used = false;
			for (var i = 0; i < scope.params.length; i++) {
				if (i === scope.attributeResult) {
					scope.element.classList.add(scope.params[i]);
					used = true;
				} else {
					scope.element.classList.remove(scope.params[i]);
				}
			}
			if (!used) {
				scope.element.classList.add(scope.params[0]);
			}
		}
	},
	options: function options(scope, item, helpers) {
		var i = 0,
		    option = null,
		    valueFieldName = 'value',
		    labelFieldName = 'name',
		    itemValueFieldName = helpers.hasOwnProperty('field') && helpers.field.hasOwnProperty('name') ? helpers.field.name : 'value';
		scope.element.innerHTML = '';
		if (scope.params.length === 2) {
			labelFieldName = scope.params[0];
			valueFieldName = scope.params[1];
		}
		if (scope.params.length === 3) {
			labelFieldName = scope.params[0];
			valueFieldName = scope.params[1];
			itemValueFieldName = scope.params[2];
		}
		if (typeof helpers !== 'undefined' && helpers !== null && helpers.hasOwnProperty('default') && helpers.default) {
			option = document.createElement('option');
			option.setAttribute('value', '');
			option.textContent = helpers.placeholder;
			scope.element.appendChild(option);
		}
		if (typeof item !== 'undefined' && item !== null) {
			var lib = notPath$1.get(scope.attributeExpression, item, helpers);
			for (i = 0; i < lib.length; i++) {
				option = document.createElement('option');
				option.setAttribute('value', lib[i][valueFieldName]);
				option.textContent = lib[i][labelFieldName];
				if (helpers.field.array) {
					if (item[itemValueFieldName] && Array.isArray(item[itemValueFieldName])) {
						if (item[itemValueFieldName].indexOf(lib[i][valueFieldName]) > -1) {
							option.setAttribute('selected', true);
						}
					}
				} else {
					if (item[itemValueFieldName] === lib[i][valueFieldName]) {
						option.setAttribute('selected', true);
					}
				}
				scope.element.appendChild(option);
			}
		}
	},
	href: function href(scope, item, helpers) {
		if (!scope.element.notRouterInitialized) {
			scope.attributeResult = notPath$1.parseSubs(scope.attributeExpression, item, helpers);
			scope.element.setAttribute('href', notRouter$1.getFullRoute(scope.attributeResult));
			scope.element.addEventListener('click', function (e) {
				e.preventDefault();
				notRouter$1.navigate(notPath$1.parseSubs(scope.attributeExpression, item, helpers));
				return false;
			});
			scope.element.notRouterInitialized = true;
		}
	}

};

/*
	Common functions
*/
/*
	framework wide parser for data access
*/
/*
	basic event handlers and core data modifiers
*/
/*
	smarter image control
*/
/*
	application main infrastructure setter
*/
/*
	user controllers
*/
/*
	templating and common structures
*/

notTemplateProcessors$1.add(notTemplateProcessorsLib);

exports.notCommon = notCommon;
exports.notPath = notPath$1;
exports.notBase = notBase;
exports.notImage = notImage;
exports.notApp = notApp;
exports.notAPI = notAPI$1;
exports.notController = notController;
exports.CRUDController = CRUDController;
exports.CRUDCreate = CRUDCreate;
exports.CRUDDelete = CRUDDelete;
exports.CRUDDetails = CRUDDetails;
exports.CRUDList = CRUDList;
exports.CRUDUpdate = CRUDUpdate;
exports.notTemplateProcessors = notTemplateProcessors$1;
exports.notTemplateProcessorsLib = notTemplateProcessorsLib;
exports.notTemplateCache = notTemplateCache$1;
exports.notRenderer = notRenderer;
exports.notComponent = notComponent;
exports.notForm = notForm;
exports.notRouter = notRouter$1;
exports.notTable = notTable;
exports.notDetails = notDetails;
exports.notRecord = notRecord;
exports.notRecordInterface = notInterface;

}((this.notFramework = this.notFramework || {})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90LWZyYW1ld29yay5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi9uZXQuanMiLCIuLi9zcmMvY29tbW9uL2xvZ3MuanMiLCIuLi9zcmMvY29tbW9uL3Nob3J0cy5qcyIsIi4uL3NyYy9jb21tb24vb2JqZWN0cy5qcyIsIi4uL3NyYy9jb21tb24vc3RyaW5ncy5qcyIsIi4uL3NyYy9jb21tb24vZnVuY3Rpb25zLmpzIiwiLi4vc3JjL2NvbW1vbi9kb20uanMiLCIuLi9zcmMvY29tbW9uL2FwcC5qcyIsIi4uL3NyYy9jb21tb24vaW5kZXguanMiLCIuLi9zcmMvbm90UGF0aC5qcyIsIi4uL3NyYy9ub3RCYXNlLmpzIiwiLi4vc3JjL25vdFJvdXRlci5qcyIsIi4uL3NyYy9hcGkvb3B0aW9ucy5qcyIsIi4uL3NyYy9hcGkvcXVlZS5qcyIsIi4uL3NyYy9hcGkvYXBpLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdEltYWdlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL29wdGlvbnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZS5qcyIsIi4uL3NyYy9ub3RSZWNvcmRJbnRlcmZhY2UuanMiLCIuLi9zcmMvbm90UmVjb3JkLmpzIiwiLi4vc3JjL25vdEFwcC5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMuanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90UmVuZGVyZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlQWZ0ZXIuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUJlZm9yZS5qcyIsIi4uL3NyYy90ZW1wbGF0ZS9wbGFjZXJzL3BsYWNlRmlyc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9wbGFjZUxhc3QuanMiLCIuLi9zcmMvdGVtcGxhdGUvcGxhY2Vycy9yZXBsYWNlLmpzIiwiLi4vc3JjL3RlbXBsYXRlL3BsYWNlcnMvaW5kZXguanMiLCIuLi9zcmMvdGVtcGxhdGUvbm90Q29tcG9uZW50LmpzIiwiLi4vc3JjL25vdENvbnRyb2xsZXIuanMiLCIuLi9zcmMvY29tcG9uZW50cy9ub3RGb3JtLmpzIiwiLi4vc3JjL0NSVUQvQ3JlYXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90VGFibGUuanMiLCIuLi9zcmMvQ1JVRC9MaXN0LmpzIiwiLi4vc3JjL0NSVUQvVXBkYXRlLmpzIiwiLi4vc3JjL0NSVUQvRGVsZXRlLmpzIiwiLi4vc3JjL2NvbXBvbmVudHMvbm90RGV0YWlscy5qcyIsIi4uL3NyYy9DUlVEL0RldGFpbHMuanMiLCIuLi9zcmMvQ1JVRC9Db250cm9sbGVyLmpzIiwiLi4vc3JjL3RlbXBsYXRlL25vdFRlbXBsYXRlUHJvY2Vzc29yc0xpYi5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ29tbW9uTmV0d29yayA9IHtcblx0YWRkSG9zdDogZnVuY3Rpb24odXJpKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0KCdob3N0JykgKyB1cmk7XG5cdH0sXG5cdGFkZFByb3RvY29sOiBmdW5jdGlvbih1cmkpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXQoJ3Byb3RvY29sJykgKyB1cmk7XG5cdH0sXG5cdHByZWxvYWRJbWFnZXM6IGZ1bmN0aW9uKGRhdGFBcnJheSwgZmllbGRzKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiBkYXRhQXJyYXkpIHtcblx0XHRcdGZvciAodmFyIGYgaW4gZmllbGRzKSB7XG5cdFx0XHRcdGlmIChkYXRhQXJyYXlbaV0uaGFzT3duUHJvcGVydHkoZmllbGRzW2ZdKSkge1xuXHRcdFx0XHRcdHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0XHRcdGltYWdlLnNldEF0dHJpYnV0ZSgnY3Jvc3NPcmlnaW4nLCAnYW5vbnltb3VzJyk7XG5cdFx0XHRcdFx0aW1hZ2Uuc3JjID0gZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0uaW5kZXhPZignLy8nKSA9PT0gMCA/IHRoaXMuYWRkUHJvdG9jb2woZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV0pIDogZGF0YUFycmF5W2ldW2ZpZWxkc1tmXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdHB1dEZpbGUodXBsb2FkIC8qIG9iamVjdChmaWxlLCBvblByb2dyZXNzLCB1cmwpKi8gKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0XHRcdGlmICh4aHIudXBsb2FkKSB7XG5cdFx0XHRcdC8vIHByb2dyZXNzIGJhclxuXHRcdFx0XHRpZiAodXBsb2FkLm9uUHJvZ3Jlc3MpIHtcblx0XHRcdFx0XHR4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgdXBsb2FkLm9uUHJvZ3Jlc3MsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBmaWxlIHJlY2VpdmVkL2ZhaWxlZFxuXHRcdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0XHR4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oIC8qZSovICkge1xuXHRcdFx0XHRcdGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG5cdFx0XHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0XHQvLyBzdGFydCB1cGxvYWRcblx0XHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHRcdHhoci5vcGVuKCdQVVQnLCB1cGxvYWQudXJsLCB0cnVlKTtcblx0XHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgdXBsb2FkLmZpbGUudHlwZSk7XG5cdFx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdYX0ZJTEVOQU1FJywgZW5jb2RlVVJJQ29tcG9uZW50KHVwbG9hZC5maWxlLm5hbWUpKTtcblx0XHRcdFx0eGhyLnNlbmQodXBsb2FkLmZpbGUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVqZWN0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdHJlcXVlc3RKU09OOiBmdW5jdGlvbihtZXRob2QsIHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRKU09OOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0cG9zdEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ1BPU1QnLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ1Nlc3Npb25JRCcsIHRoaXMuZ2V0U2Vzc2lvbklEKCkpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04Jyk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBzdGF0dXMgPSB4aHIuc3RhdHVzO1xuXHRcdFx0XHRpZiAoc3RhdHVzID09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3QoIHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRsZXQgdCA9ICgpID0+IHJlamVjdCh4aHIuc3RhdHVzKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdHB1dEpTT046IGZ1bmN0aW9uKHVybCwgZGF0YSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG5ldyBIdHRwUmVxdWVzdCBpbnN0YW5jZVxuXHRcdFx0eGhyLm9wZW4oJ1BVVCcsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcblx0XHRcdHhoci5yZXNwb25zZVR5cGUgPSAnanNvbic7XG5cdFx0XHR4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblx0XHRcdHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIHN0YXR1cyA9IHhoci5zdGF0dXM7XG5cdFx0XHRcdGlmIChzdGF0dXMgPT0gMjAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCggeGhyLnJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKCkgPT4gcmVqZWN0KHhoci5zdGF0dXMpO1xuXHRcdFx0eGhyLm9uZXJyb3IgPSB0O1xuXHRcdFx0eGhyLm9udGltZW91dCA9IHQ7XG5cdFx0XHR4aHIuc2VuZChkYXRhKTtcblx0XHR9KTtcblx0fSxcblx0ZGVsZXRlSlNPTjogZnVuY3Rpb24odXJsLCBkYXRhKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gbmV3IEh0dHBSZXF1ZXN0IGluc3RhbmNlXG5cdFx0XHR4aHIub3BlbignREVMRVRFJywgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdTZXNzaW9uSUQnLCB0aGlzLmdldFNlc3Npb25JRCgpKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xuXHRcdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcblx0XHRcdHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXHRcdFx0eGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHN0YXR1cyA9PSAyMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0bGV0IHQgPSAoKSA9PiByZWplY3QoeGhyLnN0YXR1cyk7XG5cdFx0XHR4aHIub25lcnJvciA9IHQ7XG5cdFx0XHR4aHIub250aW1lb3V0ID0gdDtcblx0XHRcdHhoci5zZW5kKGRhdGEpO1xuXHRcdH0pO1xuXHR9LFxuXHRnZXRIVE1MOiBmdW5jdGlvbih1cmwsIGRhdGEpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyLm9wZW4oJ2dldCcsIHVybCwgdHJ1ZSk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcignU2Vzc2lvbklEJywgdGhpcy5nZXRTZXNzaW9uSUQoKSk7XG5cdFx0XHR4aHIucmVzcG9uc2VUeXBlID0gJ3RleHQnO1xuXHRcdFx0eGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cdFx0XHR4aHIub25sb2FkID0gKCkgPT4ge1xuXHRcdFx0XHR2YXIgc3RhdHVzID0geGhyLnN0YXR1cztcblx0XHRcdFx0aWYgKHBhcnNlSW50KHN0YXR1cykgPT09IDIwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KCB4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdGxldCB0ID0gKGUpID0+IHJlamVjdChlKTtcblx0XHRcdHhoci5vbmVycm9yID0gdDtcblx0XHRcdHhoci5vbnRpbWVvdXQgPSB0O1xuXHRcdFx0eGhyLnNlbmQoZGF0YSk7XG5cdFx0fSk7XG5cdH0sXG5cdGdldFNlc3Npb25JRDogZnVuY3Rpb24obmFtZSA9ICdTZXNzaW9uSUQnKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Q29va2llKG5hbWUpO1xuXHR9LFxuXHRnZXRDb29raWU6IChuYW1lKSA9PiB7XG5cdFx0bGV0IHZhbHVlID0gJzsgJyArIGRvY3VtZW50LmNvb2tpZSxcblx0XHRcdHBhcnRzID0gdmFsdWUuc3BsaXQoJzsgJyArIG5hbWUgKyAnPScpO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPT0gMikge1xuXHRcdFx0cmV0dXJuIHBhcnRzLnBvcCgpLnNwbGl0KCc7Jykuc2hpZnQoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25OZXR3b3JrO1xuIiwiLy9kaXJ0eSBoYWNrIHRvIHJlbW92ZSBuby1jb25zb2xlIHdhcm5pbmcgb2YgZXNsaW50XG4vKiBnbG9iYWwgbm90RnJhbWV3b3JrKi9cbmNvbnN0IExPRyA9ICdjb25zb2xlJztcbnZhciBDb21tb25Mb2dzID0ge1xuXHRlcnJvcjogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykpe1xuXHRcdFx0d2luZG93W0xPR10uZXJyb3IoLi4uYXJndW1lbnRzKTtcblx0XHR9XG5cdH0sXG5cdGxvZzogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykpe1xuXHRcdFx0d2luZG93W0xPR10ubG9nKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHRyZXBvcnQ6IGZ1bmN0aW9uKCkge1xuXHRcdGlmKCFub3RGcmFtZXdvcmsubm90Q29tbW9uLmdldCgncHJvZHVjdGlvbicpKXtcblx0XHRcdHdpbmRvd1tMT0ddLmVycm9yKC4uLmFyZ3VtZW50cyk7XG5cdFx0fVxuXHR9LFxuXHR0cmFjZTogZnVuY3Rpb24oKSB7XG5cdFx0aWYoIW5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdwcm9kdWN0aW9uJykpe1xuXHRcdFx0d2luZG93W0xPR10udHJhY2UoLi4uYXJndW1lbnRzKTtcblx0XHR9XG5cdH0sXG5cdG11dGU6ZnVuY3Rpb24oKXtcblx0XHR0aGlzLnJlZ2lzdGVyKCdwcm9kdWN0aW9uJywgdHJ1ZSk7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25Mb2dzO1xuIiwiY29uc3QgTUFOQUdFUiA9IFN5bWJvbCgnTUFOQUdFUicpO1xuXG52YXIgQ29tbW9uU2hvcnRzID0ge1xuXHRnZXRBUEk6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1hbmFnZXIoKS5nZXRBUEkoKTtcblx0fSxcblx0c2V0TWFuYWdlcjogZnVuY3Rpb24odikge1xuXHRcdHRoaXNbTUFOQUdFUl0gPSB2O1xuXHR9LFxuXHRnZXRNYW5hZ2VyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpc1tNQU5BR0VSXTtcblx0fSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vblNob3J0cztcbiIsIi8qIGdsb2JhbCBqUXVlcnkgKi9cbnZhciBDb21tb25PYmplY3RzID0ge1xuXHRleHRlbmQ6IGZ1bmN0aW9uKGRlZmF1bHRzLCBvcHRpb25zKSB7XG5cdFx0dmFyIGV4dGVuZGVkID0ge307XG5cdFx0dmFyIHByb3A7XG5cdFx0Zm9yIChwcm9wIGluIGRlZmF1bHRzKSB7XG5cdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRzLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IGRlZmF1bHRzW3Byb3BdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRmb3IgKHByb3AgaW4gb3B0aW9ucykge1xuXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLCBwcm9wKSkge1xuXHRcdFx0XHRleHRlbmRlZFtwcm9wXSA9IG9wdGlvbnNbcHJvcF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBleHRlbmRlZDtcblx0fSxcblx0Y29tcGxldGVBc3NpZ246IGZ1bmN0aW9uKHRhcmdldCwgLi4uc291cmNlcykge1xuXHRcdHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuXHRcdFx0bGV0IGRlc2NyaXB0b3JzID0gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoKGRlc2NyaXB0b3JzLCBrZXkpID0+IHtcblx0XHRcdFx0ZGVzY3JpcHRvcnNba2V5XSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpO1xuXHRcdFx0XHRyZXR1cm4gZGVzY3JpcHRvcnM7XG5cdFx0XHR9LCB7fSk7XG5cdFx0XHQvLyBieSBkZWZhdWx0LCBPYmplY3QuYXNzaWduIGNvcGllcyBlbnVtZXJhYmxlIFN5bWJvbHMgdG9vXG5cdFx0XHRPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHNvdXJjZSkuZm9yRWFjaChzeW0gPT4ge1xuXHRcdFx0XHRsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pO1xuXHRcdFx0XHRpZiAoZGVzY3JpcHRvci5lbnVtZXJhYmxlKSB7XG5cdFx0XHRcdFx0ZGVzY3JpcHRvcnNbc3ltXSA9IGRlc2NyaXB0b3I7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBkZXNjcmlwdG9ycyk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fSxcblx0ZXh0ZW5kV2l0aDogZnVuY3Rpb24ob3B0aW9ucyl7XG5cdFx0Zm9yIChsZXQgcHJvcCBpbiBvcHRpb25zKSB7XG5cdFx0XHRpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuXHRcdFx0XHR0aGlzW3Byb3BdID0gb3B0aW9uc1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29udGFpbnNPYmo6IGZ1bmN0aW9uKGJpZywgc21hbGwpIHtcblx0XHRmb3IgKHZhciB0IGluIHNtYWxsKSB7XG5cdFx0XHRpZiAoc21hbGwuaGFzT3duUHJvcGVydHkodCkpIHtcblx0XHRcdFx0aWYgKCghYmlnLmhhc093blByb3BlcnR5KHQpKSB8fCAoYmlnW3RdICE9PSBzbWFsbFt0XSkpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0sXG5cdGZpbHRlcjogZnVuY3Rpb24ob2JqLCBmaWx0ZXIpIHtcblx0XHRpZiAoZmlsdGVyICYmIG9iaikge1xuXHRcdFx0cmV0dXJuIHRoaXMuY29udGFpbnNPYmoob2JqLCBmaWx0ZXIpO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZmluZEljb25CeUZpbHRlcjogZnVuY3Rpb24oaWNvbnMsIGZpbHRlcikge1xuXHRcdHZhciBiYXRjaCA9IFtdO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaWNvbnMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICh0aGlzLmZpbHRlcihpY29uc1tpXS5nZXREYXRhKCksIGZpbHRlcikpIHtcblx0XHRcdFx0YmF0Y2gucHVzaChpY29uc1tpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiYXRjaDtcblx0fSxcblx0ZXF1YWxPYmo6IGZ1bmN0aW9uKGEsIGIpIHtcblx0XHR2YXIgcDtcblx0XHRmb3IgKHAgaW4gYSkge1xuXHRcdFx0aWYgKHR5cGVvZihiW3BdKSA9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAocCBpbiBhKSB7XG5cdFx0XHRpZiAoYVtwXSkge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZihhW3BdKSkge1xuXHRcdFx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmICghdGhpcy5lcXVhbChhW3BdLCBiW3BdKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mKGJbcF0pID09ICd1bmRlZmluZWQnIHx8XG5cdFx0XHRcdFx0XHRcdChwICE9ICdlcXVhbHMnICYmIGFbcF0udG9TdHJpbmcoKSAhPSBiW3BdLnRvU3RyaW5nKCkpKVxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGFbcF0gIT0gYltwXSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAoYltwXSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Zm9yIChwIGluIGIpIHtcblx0XHRcdGlmICh0eXBlb2YoYVtwXSkgPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSxcblx0ZGVmaW5lSWZOb3RFeGlzdHM6IGZ1bmN0aW9uKG9iaiwga2V5LCBkZWZhdWx0VmFsdWUpIHtcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRvYmpba2V5XSA9IGRlZmF1bHRWYWx1ZTtcblx0XHR9XG5cdH0sXG5cdGRlZXBNZXJnZTogZnVuY3Rpb24ob2JqMSwgb2JqMikge1xuXHRcdHJldHVybiBqUXVlcnkuZXh0ZW5kKHRydWUsIHt9LCBvYmoxLCBvYmoyKTtcblx0fSxcblxuXHRyZWdpc3RyeToge30sXG5cblx0cmVnaXN0ZXI6IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0dGhpcy5yZWdpc3RyeVtrZXldID0gdmFsO1xuXHR9LFxuXG5cdGdldDogZnVuY3Rpb24oa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXMucmVnaXN0cnkuaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXMucmVnaXN0cnlba2V5XSA6IG51bGw7XG5cdH0sXG5cblx0bW92ZUl0ZW0oYXJyYXksIG9sZF9pbmRleCwgbmV3X2luZGV4KSB7XG5cdFx0aWYgKG5ld19pbmRleCA+PSBhcnJheS5sZW5ndGgpIHtcblx0XHRcdHZhciBrID0gbmV3X2luZGV4IC0gYXJyYXkubGVuZ3RoO1xuXHRcdFx0d2hpbGUgKChrLS0pICsgMSkge1xuXHRcdFx0XHRhcnJheS5wdXNoKHVuZGVmaW5lZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGFycmF5LnNwbGljZShuZXdfaW5kZXgsIDAsIGFycmF5LnNwbGljZShvbGRfaW5kZXgsIDEpWzBdKTtcblx0fSxcblxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uT2JqZWN0cztcbiIsInZhciBDb21tb25TdHJpbmdzID0ge1xuXHRjYXBpdGFsaXplRmlyc3RMZXR0ZXIoc3RyaW5nKSB7XG5cdFx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcblx0fSxcblx0bG93ZXJGaXJzdExldHRlcihzdHJpbmcpIHtcblx0XHRyZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b0xvd2VyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xuXHR9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uU3RyaW5ncztcbiIsInZhciBDb21tb25GdW5jdGlvbnMgPSB7XG5cdHBpcGU6IGZ1bmN0aW9uKGRhdGEvKiBmZWVkIGRhdGEgKi8sIGZ1bmNzLyogZnVuY3Rpb25zIGFycmF5ICovKSB7XG5cdFx0bGV0IHJlc3VsdDtcblx0XHRmb3IobGV0IGZ1bmMgb2YgZnVuY3Mpe1xuXHRcdFx0cmVzdWx0ID0gZnVuYyhyZXN1bHQgfHwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21tb25GdW5jdGlvbnM7XG4iLCJ2YXIgQ29tbW9uRE9NID0ge1xuXHRnZXRBdHRyaWJ1dGVzU3RhcnRzV2l0aDogZnVuY3Rpb24oZWwsIHN0YXJ0c1dpdGgpIHtcblx0XHR2YXIgYWxsRWxlbWVudHMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKCcqJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKHN0YXJ0c1dpdGgpID09PSAwKSB7XG5cdFx0XHRcdFx0bGlzdC5wdXNoKGFsbEVsZW1lbnRzW2pdKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ29tbW9uRE9NO1xuIiwidmFyIENvbW1vbkFwcCA9IHtcblx0c3RhcnRBcHA6IChzdGFydGVyKT0+e1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzdGFydGVyKTtcblx0fSxcblx0Z2V0QXBwOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldCgnYXBwJyk7XG5cdH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1vbkFwcDtcbiIsImltcG9ydCBDb21tb25OZXR3b3JrIGZyb20gJy4vbmV0LmpzJztcbmltcG9ydCBDb21tb25Mb2dzIGZyb20gJy4vbG9ncy5qcyc7XG5pbXBvcnQgQ29tbW9uU2hvcnRzIGZyb20gJy4vc2hvcnRzLmpzJztcbmltcG9ydCBDb21tb25PYmplY3RzIGZyb20gJy4vb2JqZWN0cy5qcyc7XG5pbXBvcnQgQ29tbW9uU3RyaW5ncyBmcm9tICcuL3N0cmluZ3MuanMnO1xuaW1wb3J0IENvbW1vbkZ1bmN0aW9ucyBmcm9tICcuL2Z1bmN0aW9ucy5qcyc7XG5pbXBvcnQgQ29tbW9uRE9NIGZyb20gJy4vZG9tLmpzJztcbmltcG9ydCBDb21tb25BcHAgZnJvbSAnLi9hcHAuanMnO1xuXG4vKlxuXHTRgdC/0LjRgdC+0Log0YLQvtCz0L4g0YfRgtC+INC90YPQttC90L4g0L/QvtC00LrQu9GO0YfQuNGC0Ywg0LrQsNC6INC+0LHRidC40LVcbiovXG52YXIgbm90Q29tbW9uID0gT2JqZWN0LmFzc2lnbih7fSwgQ29tbW9uT2JqZWN0cyk7XG5cbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbk5ldHdvcmspO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uU3RyaW5ncyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25Mb2dzKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vblNob3J0cyk7XG5ub3RDb21tb24uZXh0ZW5kV2l0aChDb21tb25GdW5jdGlvbnMpO1xubm90Q29tbW9uLmV4dGVuZFdpdGgoQ29tbW9uRE9NKTtcbm5vdENvbW1vbi5leHRlbmRXaXRoKENvbW1vbkFwcCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbW1vbjtcbiIsIi8qXG5cdDpwcm9wZXJ0eS5zdWIxLmZ1bmMoKS5mdW5jUHJvcFxuXHQgPSByZXR1cm4gZnVuY1Byb3Agb2YgZnVuY3Rpb24gcmVzdWx0IG9mIHN1YjEgcHJvcGVydHkgb2YgcHJvcGVydHkgb2Ygb2JqZWN0XG5cdDp7OjpoZWxwZXJWYWx9LnN1YlxuXHQgPSByZXR1cm4gc3ViIHByb3BlcnR5IG9mIG9iamVjdCBwcm9wZXJ0eSB3aXRoIG5hbWUgcmV0cmlldmVkIGZyb20gaGVscGVyVmFsIHByb3BlcnR5IG9mIGhlbHBlcnMgb2JqZWN0XG5cdDp7OjpoZWxwZXJGdW5jKCl9LnN1YlxuXHQ9IHJldHVybiBzdWIgcHJvcGVydHkgb2Ygb2JqZWN0IHByb3BlcnR5IHdpdGggbmFtZSByZXRyaWV2ZWQgZnJvbSBoZWxwZXJWYWwgZnVuY3Rpb24gcmVzdWx0IG9mIGhlbHBlcnMgb2JqZWN0LlxuXHRpZiBoZWxwZXJzRnVueCByZXR1cm4gJ2NhcicgdGhlbiBzb3VyY2UgcGF0aCBiZWNvbWVzIDpjYXIuc3ViXG5cbiovXG5cbmNvbnN0IFNVQl9QQVRIX1NUQVJUID0gJ3snLFxuXHRTVUJfUEFUSF9FTkQgPSAnfScsXG5cdFBBVEhfU1BMSVQgPSAnLicsXG5cdFBBVEhfU1RBUlRfT0JKRUNUID0gJzonLFxuXHRQQVRIX1NUQVJUX0hFTFBFUlMgPSAnOjonLFxuXHRGVU5DVElPTl9NQVJLRVIgPSAnKCknLFxuXHRNQVhfREVFUCA9IDEwO1xuXG5jbGFzcyBub3RQYXRoe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdC8qXG5cdFx0aW5wdXQgJzp7OjpoZWxwZXJWYWx9LnN1Yidcblx0XHRyZXR1cm4gOjpoZWxwZXJWYWxcblx0Ki9cblx0ZmluZE5leHRTdWJQYXRoKHBhdGgvKiBzdHJpbmcgKi8pe1xuXHRcdGxldCBzdWJQYXRoID0gJycsXG5cdFx0XHRmaW5kID0gZmFsc2U7XG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspe1xuXHRcdFx0aWYgKHBhdGhbaV0gPT09IFNVQl9QQVRIX1NUQVJUKXtcblx0XHRcdFx0ZmluZCA9IHRydWU7XG5cdFx0XHRcdHN1YlBhdGggPSAnJztcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZihwYXRoW2ldID09PSBTVUJfUEFUSF9FTkQgJiYgZmluZCl7XG5cdFx0XHRcdFx0aWYgKGZpbmQpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzdWJQYXRoO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0c3ViUGF0aCs9cGF0aFtpXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmluZD9zdWJQYXRoOm51bGw7XG5cdH1cblxuXHRyZXBsYWNlU3ViUGF0aChwYXRoLCBzdWIsIHBhcnNlZCl7XG5cdFx0bGV0IHN1YmYgPSBTVUJfUEFUSF9TVEFSVCtzdWIrU1VCX1BBVEhfRU5EO1xuXHRcdHdoaWxlKHBhdGguaW5kZXhPZihzdWJmKSA+IC0xKXtcblx0XHRcdHBhdGggPSBwYXRoLnJlcGxhY2Uoc3ViZiwgcGFyc2VkKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRwYXJzZVN1YnMocGF0aCwgaXRlbSwgaGVscGVycyl7XG5cdFx0bGV0IHN1YlBhdGgsIHN1YlBhdGhQYXJzZWQsIGkgPSAwO1xuXHRcdHdoaWxlKHN1YlBhdGggPSB0aGlzLmZpbmROZXh0U3ViUGF0aChwYXRoKSl7XG5cdFx0XHRzdWJQYXRoUGFyc2VkID0gdGhpcy5nZXRWYWx1ZUJ5UGF0aChzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpKys7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cblx0Z2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHN3aXRjaCAocGF0aCl7XG5cdFx0XHRjYXNlIFBBVEhfU1RBUlRfT0JKRUNUOiByZXR1cm4gaXRlbTtcblx0XHRcdGNhc2UgUEFUSF9TVEFSVF9IRUxQRVJTOiByZXR1cm4gaGVscGVycztcblx0XHR9XG5cdFx0cGF0aCA9IHRoaXMucGFyc2VTdWJzKHBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHJldHVybiB0aGlzLmdldFZhbHVlQnlQYXRoKHBhdGguaW5kZXhPZihQQVRIX1NUQVJUX0hFTFBFUlMpPi0xP2hlbHBlcnM6aXRlbSwgcGF0aCwgaXRlbSwgaGVscGVycyk7XG5cdH1cblxuXHRzZXQocGF0aCwgaXRlbSwgaGVscGVycywgYXR0clZhbHVlKXtcblx0XHRsZXQgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCwgaSA9IDA7XG5cdFx0d2hpbGUoc3ViUGF0aCA9IHRoaXMuZmluZE5leHRTdWJQYXRoKHBhdGgpKXtcblx0XHRcdHN1YlBhdGhQYXJzZWQgPSB0aGlzLmdldFZhbHVlQnlQYXRoKCBzdWJQYXRoLmluZGV4T2YoUEFUSF9TVEFSVF9IRUxQRVJTKT4tMT9oZWxwZXJzOml0ZW0sIHN1YlBhdGgsIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0cGF0aCA9IHRoaXMucmVwbGFjZVN1YlBhdGgocGF0aCwgc3ViUGF0aCwgc3ViUGF0aFBhcnNlZCk7XG5cdFx0XHRpZiAoaSA+IE1BWF9ERUVQKXtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgoaXRlbSwgcGF0aCwgYXR0clZhbHVlKTtcblx0XHRpZiAoaXRlbS5pc1JlY29yZCAmJiB0aGlzLm5vcm1pbGl6ZVBhdGgocGF0aCkubGVuZ3RoID4gMSkge1xuXHRcdFx0aXRlbS50cmlnZ2VyKCdjaGFuZ2UnLCBpdGVtLCBwYXRoLCBhdHRyVmFsdWUpO1xuXHRcdH1cblx0fVxuXG5cdHVuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdHRoaXMuc2V0KHBhdGgsIGl0ZW0sIGhlbHBlcnMsIG51bGwpO1xuXHR9XG5cblx0cGFyc2VQYXRoU3RlcChzdGVwLCBpdGVtLCBoZWxwZXIpe1xuXHRcdGxldCByU3RlcCA9IG51bGw7XG5cdFx0aWYoc3RlcC5pbmRleE9mKFBBVEhfU1RBUlRfSEVMUEVSUykgPT09IDAgJiYgaGVscGVyKXtcblx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKFBBVEhfU1RBUlRfSEVMUEVSUywgJycpO1xuXHRcdFx0aWYoclN0ZXAuaW5kZXhPZihGVU5DVElPTl9NQVJLRVIpID09PSByU3RlcC5sZW5ndGgtMil7XG5cdFx0XHRcdHJTdGVwID0gc3RlcC5yZXBsYWNlKEZVTkNUSU9OX01BUktFUiwgJycpO1xuXHRcdFx0XHRpZihoZWxwZXIuaGFzT3duUHJvcGVydHkoclN0ZXApKXtcblx0XHRcdFx0XHRyZXR1cm4gaGVscGVyW3JTdGVwXShpdGVtLCB1bmRlZmluZWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIGhlbHBlcltyU3RlcF07XG5cdFx0XHR9XG5cdFx0fWVsc2V7XG5cdFx0XHRpZihzdGVwLmluZGV4T2YoUEFUSF9TVEFSVF9PQkpFQ1QpID09PSAwICYmIGl0ZW0pe1xuXHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwgJycpO1xuXHRcdFx0XHRpZihyU3RlcC5pbmRleE9mKEZVTkNUSU9OX01BUktFUikgPT09IHJTdGVwLmxlbmd0aC0yKXtcblx0XHRcdFx0XHRyU3RlcCA9IHN0ZXAucmVwbGFjZShGVU5DVElPTl9NQVJLRVIsICcnKTtcblx0XHRcdFx0XHRpZihpdGVtLmhhc093blByb3BlcnR5KHJTdGVwKSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaXRlbVtyU3RlcF0oaXRlbSwgdW5kZWZpbmVkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBpdGVtW3JTdGVwXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gc3RlcDtcblx0fVxuXG5cdC8vOjpmaWVsZE5hbWUucmVzdWx0XG5cdC8ve31cblx0Ly97ZmllbGROYW1lOiAndGFyZ2V0UmVjb3JkRmllbGQnfVxuXHQvLy8vWyd0YXJnZXRSZWNvcmRGaWVsZCcsICdyZXN1bHQnXVxuXHRwYXJzZVBhdGgocGF0aCwgaXRlbSwgaGVscGVyKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkocGF0aCkpe1xuXHRcdFx0cGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TUExJVCk7XG5cdFx0fVxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKXtcblx0XHRcdHBhdGhbaV0gPSB0aGlzLnBhcnNlUGF0aFN0ZXAocGF0aFtpXSwgaXRlbSwgaGVscGVyKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBhdGg7XG5cdH1cblxuXHRub3JtaWxpemVQYXRoKHBhdGgpe1xuXHRcdGlmIChBcnJheS5pc0FycmF5KHBhdGgpKXtcblx0XHRcdHJldHVybiBwYXRoO1xuXHRcdH1lbHNle1xuXHRcdFx0d2hpbGUocGF0aC5pbmRleE9mKFBBVEhfU1RBUlRfT0JKRUNUKSA+IC0xKXtcblx0XHRcdFx0cGF0aCA9IHBhdGgucmVwbGFjZShQQVRIX1NUQVJUX09CSkVDVCwnJyk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gcGF0aC5zcGxpdChQQVRIX1NQTElUKTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdHNtYWxsID0gW1widG9kb1wiXSxcblx0XHRiaWcgPSBbXCJ0b2RvXCIsIFwibGVuZ3RoXCJdXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0Ki9cblxuXHRpZkZ1bGxTdWJQYXRoKGJpZywgc21hbGwpe1xuXHRcdGlmIChiaWcubGVuZ3RoPHNtYWxsLmxlbmd0aCl7cmV0dXJuIGZhbHNlO31cblx0XHRmb3IobGV0IHQgPTA7IHQgPCBzbWFsbC5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZihzbWFsbFt0XSAhPT0gYmlnW3RdKXtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGdldFZhbHVlQnlQYXRoKG9iamVjdCwgYXR0clBhdGgsIGl0ZW0sIGhlbHBlcnMpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpLFxuXHRcdFx0aXNGdW5jdGlvbiA9IGF0dHJOYW1lLmluZGV4T2YoRlVOQ1RJT05fTUFSS0VSKT4tMTtcblx0XHRpZiAoaXNGdW5jdGlvbil7XG5cdFx0XHRhdHRyTmFtZSA9IGF0dHJOYW1lLnJlcGxhY2UoRlVOQ1RJT05fTUFSS0VSLCAnJyk7XG5cdFx0fVxuXHRcdGlmICgodHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcpICYmIHR5cGVvZiBvYmplY3RbYXR0ck5hbWVdICE9PSAndW5kZWZpbmVkJyAmJiBvYmplY3RbYXR0ck5hbWVdICE9PSBudWxsKXtcblx0XHRcdGxldCBuZXdPYmogPSBpc0Z1bmN0aW9uP29iamVjdFthdHRyTmFtZV0oe2l0ZW0sIGhlbHBlcnN9KTpvYmplY3RbYXR0ck5hbWVdO1xuXHRcdFx0aWYgKGF0dHJQYXRoLmxlbmd0aCA+IDApe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5UGF0aChuZXdPYmosIGF0dHJQYXRoLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gbmV3T2JqO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRzZXRWYWx1ZUJ5UGF0aChvYmplY3QsIGF0dHJQYXRoLCBhdHRyVmFsdWUpe1xuXHRcdGF0dHJQYXRoID0gdGhpcy5ub3JtaWxpemVQYXRoKGF0dHJQYXRoKTtcblx0XHRsZXQgYXR0ck5hbWUgPSBhdHRyUGF0aC5zaGlmdCgpO1xuXHRcdGlmIChhdHRyUGF0aC5sZW5ndGggPiAwKXtcblx0XHRcdGlmICghb2JqZWN0Lmhhc093blByb3BlcnR5KGF0dHJOYW1lKSl7b2JqZWN0W2F0dHJOYW1lXSA9IHt9O31cblx0XHRcdHRoaXMuc2V0VmFsdWVCeVBhdGgob2JqZWN0W2F0dHJOYW1lXSwgYXR0clBhdGgsIGF0dHJWYWx1ZSk7XG5cdFx0fWVsc2V7XG5cdFx0XHRvYmplY3RbYXR0ck5hbWVdID0gYXR0clZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdGpvaW4oKXtcblx0XHRsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIGFyZ3Muam9pbihQQVRIX1NQTElUKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgbm90UGF0aCgpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuXG5jb25zdCBNRVRBX01FVEhPRF9JTklUID0gU3ltYm9sKCdpbml0JyksXG4gICAgTUVUQV9FVkVOVFMgPSBTeW1ib2woJ2V2ZW50cycpLFxuICAgIE1FVEFfREFUQSA9IFN5bWJvbCgnZGF0YScpLFxuICAgIE1FVEFfV09SS0lORyA9IFN5bWJvbCgnd29ya2luZycpLFxuICAgIE1FVEFfT1BUSU9OUyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBub3RCYXNlIHtcbiAgICBjb25zdHJ1Y3RvcihpbnB1dCkge1xuICAgICAgICB0aGlzW01FVEFfRVZFTlRTXSA9IHt9O1xuICAgICAgICB0aGlzW01FVEFfREFUQV0gPSB7fTtcbiAgICAgICAgdGhpc1tNRVRBX1dPUktJTkddID0ge307XG4gICAgICAgIHRoaXNbTUVUQV9PUFRJT05TXSA9IHt9O1xuICAgICAgICB0aGlzW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgW01FVEFfTUVUSE9EX0lOSVRdKGlucHV0KSB7XG4gICAgICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgICAgIGlucHV0ID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0Lmhhc093blByb3BlcnR5KCdldmVudHMnKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgdCBvZiBpbnB1dC5ldmVudHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKC4uLnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlucHV0Lmhhc093blByb3BlcnR5KCdkYXRhJykpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YShpbnB1dC5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnB1dC5oYXNPd25Qcm9wZXJ0eSgnd29ya2luZycpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFdvcmtpbmcoaW5wdXQud29ya2luZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5wdXQuaGFzT3duUHJvcGVydHkoJ29wdGlvbnMnKSkge1xuICAgICAgICAgICAgdGhpcy5zZXRPcHRpb25zKGlucHV0Lm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLyogc2V0IGNvbGxlY3Rpb24gKi9cbiAgICAgICAgICAgICAgICAgICAgd2hhdCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8qIHNldCBjb2xsZWN0aW9uIGVsZW1lbnQgKi9cbiAgICAgICAgICAgICAgICAgICAgbm90UGF0aC5zZXQoYXJnc1swXSAvKiBwYXRoICovICwgd2hhdCAvKiBjb2xsZWN0aW9uICovICwgdW5kZWZpbmVkIC8qIGhlbHBlcnMgKi8gLCBhcmdzWzFdIC8qIHZhbHVlICovICk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZ2V0Q29tbW9uKHdoYXQsIGFyZ3MpIHtcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgLyogaWYgd2Ugd2FudCBnZXQgZGF0YSBieSBwYXRoICovXG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm90UGF0aC5nZXQoYXJnc1swXSwgd2hhdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIGlmIHdlIHdhbnQgZ2V0IGRhdGEgYnkgcGF0aCB3aXRoIGRlZmF1bHQgdmFsdWUgKi9cbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXMgPSBub3RQYXRoLmdldChhcmdzWzBdLCB3aGF0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBubyBkYXRhLCByZXR1cm4gZGVmYXVsdCB2YWx1ZSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKiBkYXRhLCByZXR1cm4gaXQgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLyogcmV0dXJuIGZ1bGwgY29sbGVjdGlvbiAqL1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aGF0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgXHRDT1JFIE9CSkVDVFxuICAgIFx0XHREQVRBIC0gaW5mb3JtYXRpb25cbiAgICBcdFx0T1BUSU9OUyAtIGhvdyB0byB3b3JrXG4gICAgXHRcdFdPUktJTkcgLSB0ZW1wb3JhcmlseSBnZW5lcmF0ZWQgaW4gcHJvY2Nlc3NcbiAgICAqL1xuXG4gICAgc2V0RGF0YSgpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXNbTUVUQV9EQVRBXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0RGF0YSgpLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfREFUQV0sIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgc2V0T3B0aW9ucygpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXNbTUVUQV9PUFRJT05TXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0T3B0aW9ucygpLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfT1BUSU9OU10sIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgc2V0V29ya2luZygpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXNbTUVUQV9XT1JLSU5HXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q29tbW9uKHRoaXMuZ2V0V29ya2luZygpLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFdvcmtpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfV09SS0lOR10sIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgLypcbiAgICBcdEVWRU5UUyBoYW5kbGluZ1xuICAgICovXG5cbiAgICBvbihldmVudE5hbWVzLCBldmVudENhbGxiYWNrcywgb25jZSkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuICAgICAgICAgICAgZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuICAgICAgICB9XG4gICAgICAgIGV2ZW50TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIG5vdENvbW1vbi5kZWZpbmVJZk5vdEV4aXN0cyh0aGlzW01FVEFfRVZFTlRTXSwgbmFtZSwgW10pO1xuICAgICAgICAgICAgdGhpc1tNRVRBX0VWRU5UU11bbmFtZV0ucHVzaCh7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tzOiBldmVudENhbGxiYWNrcyxcbiAgICAgICAgICAgICAgICBvbmNlOiBvbmNlLFxuICAgICAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHRyaWdnZXIoKSB7XG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkuZnJvbShhcmd1bWVudHMpLFxuICAgICAgICAgICAgZXZlbnROYW1lID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgZXZlbnROYW1lID0gW2V2ZW50TmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgZyA9IDA7IGcgPCBldmVudE5hbWUubGVuZ3RoOyBnKyspe1xuXHRcdFx0XHRcdGxldCBuYW1lID0gZXZlbnROYW1lW2ddO1xuXHRcdFx0XHRcdGlmICh0aGlzW01FVEFfRVZFTlRTXS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgZXZlbnQgPSB0aGlzW01FVEFfRVZFTlRTXVtuYW1lXVt0XTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChldmVudC5vbmNlKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5vZmYobmFtZSwgZXZlbnQuY2FsbGJhY2tzKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGZvciAodmFyIGggPSAwOyBoIDwgZXZlbnQuY2FsbGJhY2tzLmxlbmd0aDsgaCsrKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnQuY2FsbGJhY2tzW2hdKC4uLmFyZ3MpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG9mZihldmVudE5hbWVzIC8qIGFycmF5IG9mIGV2ZW50IG5hbWVzICovICwgZXZlbnRDYWxsYmFja3MgLyogYXJyYXkgb2YgY2FsbGJhY2tzICovICkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZXZlbnROYW1lcykpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZXMgPSBbZXZlbnROYW1lc107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGV2ZW50Q2FsbGJhY2tzKSkge1xuICAgICAgICAgICAgZXZlbnRDYWxsYmFja3MgPSBbZXZlbnRDYWxsYmFja3NdO1xuICAgICAgICB9XG5cdFx0XHRcdGZvcihsZXQgZyA9IDA7IGcgPCBldmVudE5hbWVzLmxlbmd0aDsgZysrKXtcblx0XHRcdFx0XHRsZXQgbmFtZSA9IGV2ZW50TmFtZXNbZ107XG5cdFx0XHRcdFx0bGV0IHRhcmdldElkID0gLTE7XG5cdFx0XHRcdFx0Zm9yKGxldCBoID0gMDsgaCA8IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdLmxlbmd0aDsgaCsrKXtcblx0XHRcdFx0XHRcdGxldCBldmVudCA9IHRoaXNbTUVUQV9FVkVOVFNdW25hbWVdW2hdO1xuXHRcdFx0XHRcdFx0aWYgKHRhcmdldElkID09PSAtMSAmJiBldmVudENhbGxiYWNrcyA9PT0gZXZlbnQuY2FsbGJhY2tzKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGFyZ2V0SWQgPSBoO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodGFyZ2V0SWQgPiAtMSkge1xuXHRcdFx0XHRcdFx0XHR0aGlzW01FVEFfRVZFTlRTXVtuYW1lXS5zcGxpY2UodGFyZ2V0SWQsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBvZmZBbGwoKSB7XG4gICAgICAgIGxldCBldmVudHMgPSBPYmplY3Qua2V5cyh0aGlzW01FVEFfRVZFTlRTXSk7XG4gICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgZXZlbnRzLmxlbmd0aDsgdCsrKSB7XG4gICAgICAgICAgICBpZiAodGhpc1tNRVRBX0VWRU5UU10uaGFzT3duUHJvcGVydHkoZXZlbnRzW3RdKSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzW01FVEFfRVZFTlRTXVtldmVudHNbdF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmNvbnN0IE9QVF9NT0RFX0hJU1RPUlkgPSBTeW1ib2woJ2hpc3RvcnknKSxcblx0T1BUX01PREVfSEFTSCA9IFN5bWJvbCgnaGFzaCcpLFxuXHRPUFRfREVGQVVMVF9DSEVDS19JTlRFUlZBTCA9IDUwO1xuXG5jbGFzcyBub3RSb3V0ZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0cm91dGVzOiBbXSxcblx0XHRcdG1vZGU6IE9QVF9NT0RFX0hJU1RPUlksXG5cdFx0XHRyb290OiAnLycsIC8vYWx3YXlzIGluIHNsYXNoZXMgL3VzZXIvLCAvLCAvaW5wdXQvLiBhbmQgbm8gL3VzZXIgb3IgaW5wdXQvbGV2ZWxcblx0XHRcdGluaXRpYWxpemVkOiBmYWxzZVxuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aGlzdG9yeSgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hJU1RPUlkpO1xuXHR9XG5cblx0aGFzaCgpe1xuXHRcdHRoaXMuc2V0V29ya2luZygnbW9kZScsIE9QVF9NT0RFX0hBU0gpO1xuXHR9XG5cblx0c2V0Um9vdChyb290KXtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3Jvb3QnLCByb290ID8gJy8nICsgdGhpcy5jbGVhclNsYXNoZXMocm9vdCkgKyAnLycgOiAnLycpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Y2xlYXJTbGFzaGVzKHBhdGgpIHtcblx0XHQvL2ZpcnN0IGFuZCBsYXN0IHNsYXNoZXMgcmVtb3ZhbFxuXHRcdHJldHVybiBwYXRoLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwvJC8sICcnKS5yZXBsYWNlKC9eXFwvLywgJycpO1xuXHR9XG5cblx0YWRkKHJlLCBoYW5kbGVyKSB7XG5cdFx0aWYgKHR5cGVvZiByZSA9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRoYW5kbGVyID0gcmU7XG5cdFx0XHRyZSA9ICcnO1xuXHRcdH1cblx0XHRsZXQgcnVsZSA9IHtcblx0XHRcdHJlOiByZSxcblx0XHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0XHR9O1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVzJykucHVzaChydWxlKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZExpc3QobGlzdCkge1xuXHRcdGZvciAobGV0IHQgaW4gbGlzdCkge1xuXHRcdFx0dGhpcy5hZGQodCwgbGlzdFt0XSk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cmVtb3ZlKHBhcmFtKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIHI7IGkgPCB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpLmxlbmd0aCwgciA9IHRoaXMuZ2V0V29ya2luZygncm91dGVzJylbaV07IGkrKykge1xuXHRcdFx0aWYgKHIuaGFuZGxlciA9PT0gcGFyYW0gfHwgci5yZSA9PT0gcGFyYW0pIHtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXMnKS5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGZsdXNoKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZyh7XG5cdFx0XHRyb3V0ZXM6IFtdLFxuXHRcdFx0bW9kZTogT1BUX01PREVfSElTVE9SWSxcblx0XHRcdHJvb3Q6ICcvJ1xuXHRcdH0pO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aXNJbml0aWFsaXplZCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2luaXRpYWxpemVkJyk7XG5cdH1cblxuXHRzZXRJbml0aWFsaXplZCh2YWwgPSB0cnVlKXtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdpbml0aWFsaXplZCcsIHZhbCk7XG5cdH1cblxuXHRnZXRGcmFnbWVudCgpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSAnJztcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdtb2RlJykgPT09IE9QVF9NT0RFX0hJU1RPUlkpIHtcblx0XHRcdGlmICghbG9jYXRpb24pIHJldHVybiAnJztcblx0XHRcdGZyYWdtZW50ID0gdGhpcy5jbGVhclNsYXNoZXMoZGVjb2RlVVJJKGxvY2F0aW9uLnBhdGhuYW1lICsgbG9jYXRpb24uc2VhcmNoKSk7XG5cdFx0XHRmcmFnbWVudCA9IGZyYWdtZW50LnJlcGxhY2UoL1xcPyguKikkLywgJycpO1xuXHRcdFx0ZnJhZ21lbnQgPSB0aGlzLmdldFdvcmtpbmcoJ3Jvb3QnKSAhPSAnLycgPyBmcmFnbWVudC5yZXBsYWNlKHRoaXMuZ2V0V29ya2luZygncm9vdCcpLCAnJykgOiBmcmFnbWVudDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKCF3aW5kb3cpIHJldHVybiAnJztcblx0XHRcdHZhciBtYXRjaCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdGZyYWdtZW50ID0gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5jbGVhclNsYXNoZXMoZnJhZ21lbnQpO1xuXHR9XG5cblx0Y2hlY2tMb2NhdGlvbigpe1xuXHRcdGxldCBjdXJyZW50ID10aGlzLmdldFdvcmtpbmcoJ2N1cnJlbnQnKSxcblx0XHRcdGZyYWdtZW50ID10aGlzLmdldEZyYWdtZW50KCksXG5cdFx0XHRpbml0ID0gdGhpcy5pc0luaXRpYWxpemVkKCk7XG5cdFx0aWYgKGN1cnJlbnQgIT09ZnJhZ21lbnQgIHx8ICFpbml0KSB7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLGZyYWdtZW50KTtcblx0XHRcdHRoaXMuY2hlY2soZnJhZ21lbnQpO1xuXHRcdFx0dGhpcy5zZXRJbml0aWFsaXplZCgpO1xuXHRcdH1cblx0fVxuXG5cdGhyZWZDbGljaygpe1xuXHRcdC8vY29uc29sZS5sb2coLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdGdldFJvb3QoKXtcblx0XHRyZXR1cm4gJyc7XG5cdH1cblxuXHRsaXN0ZW4obG9vcEludGVydmFsID0gT1BUX0RFRkFVTFRfQ0hFQ0tfSU5URVJWQUwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2N1cnJlbnQnLCAnbm90SW5pdGlhbGl6ZWQnKTtcblx0XHRjbGVhckludGVydmFsKHRoaXMuZ2V0V29ya2luZygnaW50ZXJ2YWwnKSk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdpbnRlcnZhbCcsIHNldEludGVydmFsKHRoaXMuY2hlY2tMb2NhdGlvbi5iaW5kKHRoaXMpLCBsb29wSW50ZXJ2YWwpKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB0aGlzLmhyZWZDbGljay5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGNoZWNrKGYpIHtcblx0XHR2YXIgZnJhZ21lbnQgPSBmIHx8IHRoaXMuZ2V0RnJhZ21lbnQoKTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2V0V29ya2luZygncm91dGVzJykubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBwYXRoID0gdGhpcy5nZXRXb3JraW5nKCdyb290JykgKyB0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldLnJlO1xuXHRcdFx0bGV0IGZ1bGxSRSA9ICB0aGlzLmNsZWFyU2xhc2hlcyhkZWNvZGVVUkkocGF0aCkpO1xuXHRcdFx0dmFyIG1hdGNoID0gZnJhZ21lbnQubWF0Y2goZnVsbFJFKTtcblx0XHRcdGlmIChtYXRjaCkge1xuXHRcdFx0XHRtYXRjaC5zaGlmdCgpO1xuXHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3JvdXRlcycpW2ldLmhhbmRsZXIuYXBwbHkodGhpcy5ob3N0IHx8IHt9LCBtYXRjaCk7XG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG5hdmlnYXRlKHBhdGgpIHtcblx0XHRwYXRoID0gcGF0aCA/IHBhdGggOiAnJztcblx0XHRzd2l0Y2ggKHRoaXMuZ2V0V29ya2luZygnbW9kZScpKXtcblx0XHRcdGNhc2UgT1BUX01PREVfSElTVE9SWToge1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdwdXNoIHN0YXRlJywgdGhpcy5nZXRGdWxsUm91dGUocGF0aCkpO1xuXHRcdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB0aGlzLmdldEZ1bGxSb3V0ZShwYXRoKSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBPUFRfTU9ERV9IQVNIOiB7XG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmLm1hdGNoKC8jKC4qKSQvKTtcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5yZXBsYWNlKC8jKC4qKSQvLCAnJykgKyAnIycgKyBwYXRoO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGdWxsUm91dGUocGF0aCA9ICcnKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdyb290JykgKyB0aGlzLmNsZWFyU2xhc2hlcyhwYXRoKTtcblx0fVxuXG5cdGdldEFsbExpbmtzKCl7XG5cdFx0dmFyIGFsbEVsZW1lbnRzID0gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG5cdFx0dmFyIGxpc3QgPSBbXTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFsbEVsZW1lbnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMCwgYXR0cyA9IGFsbEVsZW1lbnRzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKCduLWhyZWYnKSA9PT0gMCkge1xuXHRcdFx0XHRcdGxpc3QucHVzaChhbGxFbGVtZW50c1tqXSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGxpc3Q7XG5cdH1cblxuXHRyZVJvdXRlRXhpc3RlZCgpe1xuXHRcdGxldCBsaXN0ID0gdGhpcy5nZXRBbGxMaW5rcygpO1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCBsaXN0Lmxlbmd0aDsgdCsrKXtcblx0XHRcdHRoaXMuaW5pdFJlcm91dGluZyhsaXN0W3RdLCBsaXN0W3RdLmdldEF0dHJpYnV0ZSgnbi1ocmVmJykpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGluaXRSZXJvdXRpbmcoZWwsIGxpbmspe1xuXHRcdGlmICghZWwubm90Um91dGVySW5pdGlhbGl6ZWQpe1xuXHRcdFx0bGV0IGZ1bGxMaW5rID0gdGhpcy5nZXRGdWxsUm91dGUobGluayk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBmdWxsTGluayk7XG5cdFx0XHRlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdHRoaXMubmF2aWdhdGUobGluayk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0ZWwubm90Um91dGVySW5pdGlhbGl6ZWQgPSB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBub3RSb3V0ZXIoKTtcbiIsImxldCBub3RBUElPcHRpb25zID0ge1xuXHRycHM6IDUwLFxuXHRwcm90b2NvbDogJ2h0dHAnLFxuXHRob3N0OiAnbG9jYWxob3N0Jyxcblx0cG9ydDogOTAwMFxufTtcblxuZXhwb3J0IGRlZmF1bHQgbm90QVBJT3B0aW9ucztcbiIsImNsYXNzIG5vdEFQSVF1ZWV7XG5cdGNvbnN0cnVjdG9yIChyZXF1ZXN0c1BlclNlY29uZCkge1xuXHRcdHRoaXMucXVlZSA9IFtdO1xuXHRcdHRoaXMuaW50ID0gbnVsbDtcblx0XHR0aGlzLnJlcXVlc3RzUGVyU2Vjb25kID0gcmVxdWVzdHNQZXJTZWNvbmQgfHwgNTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bigpe1xuXHRcdHRoaXMuaW50ID0gd2luZG93LnNldEludGVydmFsKHRoaXMuY2hlY2suYmluZCh0aGlzKSwgMTAwMCAvIHRoaXMucmVxdWVzdHNQZXJTZWNvbmQpO1xuXHR9XG5cblx0Y2hlY2soKXtcblx0XHRpZiAodGhpcy5pblByb2dyZXNzKXtyZXR1cm47fVxuXHRcdGVsc2V7XG5cdFx0XHRpZiAodGhpcy5xdWVlLmxlbmd0aCA+IDApe1xuXHRcdFx0XHR0aGlzLmluUHJvZ3Jlc3MgPSB0cnVlO1xuXHRcdFx0XHRsZXQgdG9DYWxsID0gdGhpcy5xdWVlLnNoaWZ0KCk7XG5cdFx0XHRcdHRvQ2FsbCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdG5leHQoKXtcblx0XHR0aGlzLmluUHJvZ3Jlc3MgPSBmYWxzZTtcblx0fVxuXG5cdGFkZChjYWxsKXtcblx0XHR0aGlzLnF1ZWUucHVzaChjYWxsKTtcblx0fVxuXG5cdHBhdXNlKCl7XG5cdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnQpO1xuXHR9XG5cblx0cmVzdW1lKCl7XG5cdFx0dGhpcy5ydW4oKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RBUElRdWVlO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZS5qcyc7XG5cbmltcG9ydCBub3RBUElPcHRpb25zIGZyb20gJy4vb3B0aW9ucy5qcyc7XG5pbXBvcnQgbm90QVBJUXVlZSBmcm9tICcuL3F1ZWUuanMnO1xuXG5cbmNsYXNzIG5vdEFQSSBleHRlbmRzICBub3RCYXNle1xuXHRjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG5cdFx0c3VwZXIoKTtcblx0XHR0aGlzLnNldE9wdGlvbnMobm90Q29tbW9uLmV4dGVuZChub3RBUElPcHRpb25zLCBvcHRpb25zKSk7XG5cdFx0dGhpcy5xdWVlID0gbmV3IG5vdEFQSVF1ZWUodGhpcy5nZXRPcHRpb25zKCdycHMnKSk7XG5cdFx0dGhpcy5xdWVlLnJ1bigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0bWFrZVVybChwYXJ0cykge1xuXHRcdHJldHVybiBwYXJ0cy5qb2luKCcvJyk7XG5cdH1cblxuXHRxdWVlUmVxdWVzdChtZXRob2QsIHVybCwgaWQsIGRhdGEsIGdvb2QsIGJhZCl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCBtZXRob2QsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bWFrZVJlcXVlc3QobWV0aG9kLCB1cmwsIGlkLCBkYXRhLCBnb29kLCBiYWQpIHtcblx0XHRub3RDb21tb24ucmVxdWVzdEpTT04obWV0aG9kLCB1cmwsIGRhdGEpXG5cdFx0XHQudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRcdFx0dGhpcy5xdWVlLm5leHQoKTtcblx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRcdHRoaXMucXVlZS5uZXh0KCk7XG5cdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2UpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUob2JqLCBnb29kLCBiYWQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGlkID0gb2JqLmdldElkKCksXG5cdFx0XHRcdG1vZGVsTmFtZSA9IG9iai5nZXRNb2RlbE5hbWUoKSxcblx0XHRcdFx0dXJsID0gdGhpcy5tYWtlVXJsKFt0aGlzLmdldE9wdGlvbnMoJ2Jhc2UnKSwgbW9kZWxOYW1lLCBpZF0pLFxuXHRcdFx0XHRkYXRhID0gb2JqLmdldEpTT04oKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncG9zdCcsIHVybCwgaWQsIGRhdGEsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHV0KG9iaiwgZ29vZCwgYmFkKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBtb2RlbE5hbWUgPSBvYmouZ2V0TW9kZWxOYW1lKCksXG5cdFx0XHRcdGRhdGEgPSBvYmouZ2V0SlNPTigpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAncHV0JywgdXJsLCBudWxsLCBkYXRhLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGdldChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2dldCcsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cblx0bGlzdChvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgbW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWVdKTtcblx0XHRcdHRoaXMucXVlZS5hZGQoXG5cdFx0XHRcdHRoaXMubWFrZVJlcXVlc3QuYmluZCh0aGlzLCAnZ2V0JywgdXJsLCBudWxsLCBudWxsLCAocmVzcG9uc2VPSykgPT4ge1xuXHRcdFx0XHRcdGdvb2QgJiYgZ29vZChyZXNwb25zZU9LKTtcblx0XHRcdFx0XHRyZXNvbHZlKHJlc3BvbnNlT0spO1xuXHRcdFx0XHR9LCAocmVzcG9uc2VGYWlsZWQpID0+IHtcblx0XHRcdFx0XHRiYWQgJiYgYmFkKHJlc3BvbnNlRmFpbGVkKTtcblx0XHRcdFx0XHRyZWplY3QocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZShvYmosIGdvb2QsIGJhZCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgaWQgPSBvYmouZ2V0SWQoKSxcblx0XHRcdFx0bW9kZWxOYW1lID0gb2JqLmdldE1vZGVsTmFtZSgpLFxuXHRcdFx0XHR1cmwgPSB0aGlzLm1ha2VVcmwoW3RoaXMuZ2V0T3B0aW9ucygnYmFzZScpLCBtb2RlbE5hbWUsIGlkXSk7XG5cdFx0XHR0aGlzLnF1ZWUuYWRkKFxuXHRcdFx0XHR0aGlzLm1ha2VSZXF1ZXN0LmJpbmQodGhpcywgJ2RlbGV0ZScsIHVybCwgaWQsIG51bGwsIChyZXNwb25zZU9LKSA9PiB7XG5cdFx0XHRcdFx0Z29vZCAmJiBnb29kKHJlc3BvbnNlT0spO1xuXHRcdFx0XHRcdHJlc29sdmUocmVzcG9uc2VPSyk7XG5cdFx0XHRcdH0sIChyZXNwb25zZUZhaWxlZCkgPT4ge1xuXHRcdFx0XHRcdGJhZCAmJiBiYWQocmVzcG9uc2VGYWlsZWQpO1xuXHRcdFx0XHRcdHJlamVjdChyZXNwb25zZUZhaWxlZCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdEFQSTtcbiIsImltcG9ydCBub3RCYXNlICBmcm9tICcuLi9ub3RCYXNlJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEltYWdlIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHR9XG59XG4iLCJjb25zdCBQUk9DRVNTT1JfRVhQUkVTU0lPTl9QUkVGSVggPSAnbi0nLFxuXHRURU1QTEFURV9UQUcgPSAnbnQnLFxuXHRQUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgPSAnLScsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYID0gJ2lmJyxcblx0Q09NUE9ORU5UX0lEX1BSRUZJWCA9ICdub3RfY29tcG9uZW50XycsXG5cdFBBUlRfSURfUFJFRklYID0gJ25vdF9wYXJ0XycsXG5cdERFRkFVTFRfUExBQ0VSID0gJ3BsYWNlJyxcblx0REVGQVVMVF9QTEFDRVJfTE9PUCA9ICdwbGFjZUFmdGVyJztcblxuY29uc3QgT1BUUyA9IHtcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYLFxuXHRURU1QTEFURV9UQUcsXG5cdFBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUixcblx0UFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgsXG5cdERFRkFVTFRfUExBQ0VSLFxuXHRDT01QT05FTlRfSURfUFJFRklYLFxuXHRQQVJUX0lEX1BSRUZJWCxcblx0REVGQVVMVF9QTEFDRVJfTE9PUFxufTtcblxuZXhwb3J0IGRlZmF1bHQgT1BUUztcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuaW1wb3J0IE9QVFMgZnJvbSAnLi9vcHRpb25zJztcbmNvbnN0IE1FVEFfQ0FDSEUgPSBTeW1ib2woJ2NhY2hlJyk7XG5cbmNsYXNzIG5vdFRlbXBsYXRlQ2FjaGUgZXh0ZW5kcyBub3RCYXNle1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NBQ0hFXSA9IHt9O1xuXHRcdHRoaXMuc2V0V29ya2luZygnbG9hZGluZycsIFtdKTtcblx0XHR0aGlzLmhpZGVUZW1wbGF0ZXMoKTtcblx0XHR0aGlzLnJlZ2lzdGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRoaWRlVGVtcGxhdGVzKCl7XG5cdFx0bGV0IHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXHRcdHQuaW5uZXJIVE1MID0gT1BUUy5URU1QTEFURV9UQUcgKyAne2Rpc3BsYXk6IG5vbmU7fSc7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KTtcblx0fVxuXG5cdHJlZ2lzdGVyKCkge1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcigndGVtcGxhdGVDYWNoZScsIHRoaXMpO1xuXHR9XG5cblx0bG9hZChtYXApIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xvYWRpbmcnLCBbXSk7XG5cdFx0Zm9yICh2YXIgaSBpbiBtYXApIHtcblx0XHRcdHRoaXMubG9hZE9uZShpLCBtYXBbaV0pO1xuXHRcdH1cblx0fVxuXG5cdGxvYWRPbmUoa2V5LCB1cmwsIGNhbGxiYWNrKSB7XG5cdFx0dmFyIG9SZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0b1JlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcblx0XHRvUmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcblx0XHRcdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcblx0XHRcdGRpdi5kYXRhc2V0Lm5vdFRlbXBsYXRlTmFtZSA9IGtleTtcblx0XHRcdGRpdi5kYXRhc2V0Lm5vdFRlbXBsYXRlVVJMID0gdXJsO1xuXHRcdFx0ZGl2LmlubmVySFRNTCA9IHJlc3BvbnNlLnNyY0VsZW1lbnQucmVzcG9uc2VUZXh0O1xuXHRcdFx0dGhpcy5zZXRPbmUoa2V5LCBkaXYpO1xuXHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soa2V5LCB1cmwsIGRpdik7XG5cblx0XHR9LmJpbmQodGhpcykpO1xuXHRcdG9SZXF1ZXN0LnNlbmQoKTtcblx0fVxuXG5cdGlmQWxsTG9hZGVkKCl7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdsb2FkZWQnKTtcblx0XHR9XG5cdH1cblxuXHRzZXRPbmUoa2V5LCBlbGVtZW50KSB7XG5cdFx0aWYoZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KXtcblx0XHRcdHRoaXNbTUVUQV9DQUNIRV1ba2V5XSA9IGVsZW1lbnQ7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmFkZEZyb21UZXh0KGtleSwgZWxlbWVudCk7XHRcblx0XHR9XG5cdH1cblxuXHRnZXQoa2V5KSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9DQUNIRV0uaGFzT3duUHJvcGVydHkoa2V5KSA/IHRoaXNbTUVUQV9DQUNIRV1ba2V5XS5jbG9uZU5vZGUodHJ1ZSkgOiBudWxsO1xuXHR9XG5cblx0Z2V0TmFtZXMoKXtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpc1tNRVRBX0NBQ0hFXSk7XG5cdH1cblxuXHRnZXRCeVVSTCh1cmwpIHtcblx0XHRmb3IgKHZhciBpIGluIHRoaXNbTUVUQV9DQUNIRV0pIHtcblx0XHRcdGlmICh0aGlzW01FVEFfQ0FDSEVdW2ldLnNyYyA9PSB1cmwpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0KGkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHQvL1x0TmV3IEFQSVxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHNldExvYWRlZChrZXkpe1xuXHRcdGxldCB0ID0gdGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykuaW5kZXhPZihrZXkpO1xuXHRcdGlmICh0ID4gLTEpIHtcblx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0LCAxKTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkZWQnKS5wdXNoKCdrZXknKTtcblx0fVxuXG5cdHdyYXAoa2V5LCB1cmwsIGlubmVySFRNTCl7XG5cdFx0dmFyIGNvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRjb250Lm5hbWUgPSBrZXk7XG5cdFx0Y29udC5zcmMgPSB1cmw7XG5cdFx0Y29udC5pbm5lckhUTUwgPSBpbm5lckhUTUw7XG5cdFx0cmV0dXJuIGNvbnQ7XG5cdH1cblxuXHRwYXJzZUxpYih0ZXh0KXtcblx0XHRsZXQgY29udCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdGxldCByZXN1bHQgPSB7fTtcblx0XHRjb250LmlubmVySFRNTCA9IHRleHQ7XG5cdFx0bGV0IG5vdFRlbXBsYXRlc0VsZW1lbnRzID0gY29udC5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHRmb3IobGV0IGVsSWQgPTA7IGVsSWQ8IG5vdFRlbXBsYXRlc0VsZW1lbnRzLmxlbmd0aDsgZWxJZCsrKXtcblx0XHRcdGxldCBlbCA9IG5vdFRlbXBsYXRlc0VsZW1lbnRzW2VsSWRdO1xuXHRcdFx0aWYgKGVsLnBhcmVudE5vZGUgPT09IGNvbnQpe1xuXHRcdFx0XHRpZiAoZWwuYXR0cmlidXRlcy5uYW1lICYmIGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSl7XG5cdFx0XHRcdFx0cmVzdWx0W2VsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZV0gPSBlbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0YWRkTGliKGxpYil7XG5cdFx0Zm9yKGxldCB0IGluIGxpYil7XG5cdFx0XHR0aGlzLnNldE9uZSh0LCBsaWJbdF0pO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21VUkwoa2V5LCB1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PiB7XG5cdFx0XHRpZiAodGhpcy5nZXQoa2V5KSl7XG5cdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly90aGF0LnNldExvYWRpbmcoa2V5LCB1cmwpO1xuXHRcdFx0XHRub3RDb21tb24uZ2V0SFRNTCh1cmwpXG5cdFx0XHRcdFx0LnRoZW4oKHRlbXBsYXRlSW5uZXJIVE1MKT0+e1xuXHRcdFx0XHRcdFx0bGV0IHRlbXBsYXRlQ29udEVsID0gdGhpcy53cmFwKGtleSwgdXJsLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0XHRcdFx0XHR0aGlzLnNldE9uZShrZXksIHRlbXBsYXRlQ29udEVsKTtcblx0XHRcdFx0XHRcdHJlc29sdmUodGhpcy5nZXQoa2V5KSk7XG5cdFx0XHRcdFx0fSkuY2F0Y2goKCk9Pntcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZXJyb3IgbG9hZGluZyB0ZW1wbGF0ZScsIGtleSwgdXJsKTtcblx0XHRcdFx0XHRcdHJlamVjdCguLi5hcmd1bWVudHMpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0YWRkTGliRnJvbVVSTCh1cmwpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bm90Q29tbW9uLmdldEhUTUwodXJsKVxuXHRcdFx0XHQudGhlbigodGVtcGxhdGVzSFRNTCk9Pntcblx0XHRcdFx0XHRsZXQgdGVtcGxhdGVzID0gdGhpcy5wYXJzZUxpYih0ZW1wbGF0ZXNIVE1MKTtcblx0XHRcdFx0XHR0aGlzLmFkZExpYih0ZW1wbGF0ZXMpO1xuXHRcdFx0XHRcdHJlc29sdmUodGVtcGxhdGVzKTtcblx0XHRcdFx0fSkuY2F0Y2goKGUpPT57XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdlcnJvciBsb2FkaW5nIHRlbXBsYXRlcyBsaWInLCB1cmwsZSk7XG5cdFx0XHRcdFx0cmVqZWN0KC4uLmFyZ3VtZW50cyk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0YWRkRnJvbURvY3VtZW50KHNlbGVjdG9yT3JFbGVtZW50KXtcblx0XHRsZXQgZWwgPSAodHlwZW9mIHNlbGVjdG9yT3JFbGVtZW50ID09PSAnc3RyaW5nJyk/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk6c2VsZWN0b3JPckVsZW1lbnQ7XG5cdFx0aWYgKGVsLmF0dHJpYnV0ZXMubmFtZSAmJiBlbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUpe1xuXHRcdFx0aWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gT1BUUy5URU1QTEFURV9UQUcudG9Mb3dlckNhc2UoKSl7XG5cdFx0XHRcdHRoaXMuc2V0T25lKGVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSwgZWwpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZEZyb21UZXh0KGtleSwgdGVtcGxhdGVJbm5lckhUTUwpe1xuXHRcdGxldCB0ZW1wbGF0ZUNvbnRFbCA9IHRoaXMud3JhcChrZXksICcnLCB0ZW1wbGF0ZUlubmVySFRNTCk7XG5cdFx0dGhpcy5zZXRPbmUoa2V5LCB0ZW1wbGF0ZUNvbnRFbCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlQ2FjaGUoKTtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQuanMnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZID0gWydfaWQnLCAnaWQnLCAnSUQnXSxcblx0REVGQVVMVF9GSUxURVIgPSB7fSxcblx0REVGQVVMVF9QQUdFX05VTUJFUiA9IDEsXG5cdERFRkFVTFRfUEFHRV9TSVpFID0gMTA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG5vdEludGVyZmFjZSBleHRlbmRzIG5vdEJhc2Uge1xuXG5cdGNvbnN0cnVjdG9yKG1hbmlmZXN0KSB7XG5cdFx0c3VwZXIoe30pO1xuXHRcdHRoaXMubWFuaWZlc3QgPSBtYW5pZmVzdDtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHBhcnNlTGluZShsaW5lLCByZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgcmVjb3JkUkUgPSAnOnJlY29yZFsnLFxuXHRcdFx0ZmllbGROYW1lID0gJyc7XG5cdFx0d2hpbGUgKGxpbmUuaW5kZXhPZihyZWNvcmRSRSkgPiAtMSkge1xuXHRcdFx0dmFyIGluZCA9IGxpbmUuaW5kZXhPZihyZWNvcmRSRSk7XG5cdFx0XHR2YXIgbGVuID0gcmVjb3JkUkUubGVuZ3RoO1xuXHRcdFx0dmFyIGluZDIgPSBsaW5lLmluZGV4T2YoJ10nKTtcblx0XHRcdHZhciBzdGFydFNsaWNlID0gaW5kICsgbGVuO1xuXHRcdFx0dmFyIGVuZFNsaWNlID0gaW5kMjtcblx0XHRcdGZpZWxkTmFtZSA9IGxpbmUuc2xpY2Uoc3RhcnRTbGljZSwgZW5kU2xpY2UpO1xuXHRcdFx0aWYgKGZpZWxkTmFtZSA9PSAnJykgYnJlYWs7XG5cdFx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6cmVjb3JkWycgKyBmaWVsZE5hbWUgKyAnXScsIHJlY29yZC5nZXRBdHRyKGZpZWxkTmFtZSkpO1xuXHRcdH1cblx0XHRsaW5lID0gbGluZS5yZXBsYWNlKCc6bW9kZWxOYW1lJywgdGhpcy5tYW5pZmVzdC5tb2RlbCk7XG5cdFx0bGluZSA9IGxpbmUucmVwbGFjZSgnOmFjdGlvbk5hbWUnLCBhY3Rpb25OYW1lKTtcblx0XHRyZXR1cm4gbGluZTtcblx0fVxuXG5cdGdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpIHtcblx0XHR2YXIgbGluZSA9IHRoaXMucGFyc2VMaW5lKHRoaXMubWFuaWZlc3QudXJsLCByZWNvcmQsIGFjdGlvbk5hbWUpICsgKChhY3Rpb25EYXRhLmhhc093blByb3BlcnR5KCdwb3N0Rml4JykpID8gdGhpcy5wYXJzZUxpbmUoYWN0aW9uRGF0YS5wb3N0Rml4LCByZWNvcmQsIGFjdGlvbk5hbWUpIDogJycpO1xuXHRcdHJldHVybiBsaW5lO1xuXHR9XG5cblx0Z2V0SUQocmVjb3JkLCBhY3Rpb25EYXRhKSB7XG5cdFx0bGV0IHJlc3VsdElkLFxuXHRcdFx0bGlzdCA9IE9QVF9ERUZBVUxUX0lOREVYX0ZJRUxEX05BTUVfUFJJT1JJVFksXG5cdFx0XHRwcmVmaXhlcyA9IFsnJywgdGhpcy5tYW5pZmVzdC5tb2RlbF07XG5cdFx0aWYgKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2luZGV4JykgJiYgYWN0aW9uRGF0YS5pbmRleCkge1xuXHRcdFx0bGlzdCA9IFthY3Rpb25EYXRhLmluZGV4XS5jb25jYXQoT1BUX0RFRkFVTFRfSU5ERVhfRklFTERfTkFNRV9QUklPUklUWSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IHByZSBvZiBwcmVmaXhlcykge1xuXHRcdFx0Zm9yIChsZXQgdCBvZiBsaXN0KSB7XG5cdFx0XHRcdGlmIChyZWNvcmQuaGFzT3duUHJvcGVydHkocHJlICsgdCkpIHtcblx0XHRcdFx0XHRyZXN1bHRJZCA9IHJlY29yZFtwcmUgKyB0XTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0SWQ7XG5cdH1cblxuXHRnZXRBY3Rpb25zQ291bnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpID8gT2JqZWN0LmtleXModGhpcy5nZXRBY3Rpb25zKCkpLmxlbmd0aCA6IDA7XG5cdH1cblxuXHRnZXRBY3Rpb25zKCkge1xuXHRcdHJldHVybiB0aGlzLm1hbmlmZXN0ICYmIHRoaXMubWFuaWZlc3QuYWN0aW9ucyA/IHRoaXMubWFuaWZlc3QuYWN0aW9ucyA6IHt9O1xuXHR9XG5cblx0c2V0RmluZEJ5KGtleSwgdmFsdWUpIHtcblx0XHR2YXIgb2JqID0ge307XG5cdFx0b2JqW2tleV0gPSB2YWx1ZTtcblx0XHRyZXR1cm4gdGhpcy5zZXRGaWx0ZXIob2JqKTtcblx0fVxuXG5cdHNldEZpbHRlcihmaWx0ZXJEYXRhID0gREVGQVVMVF9GSUxURVIpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdmaWx0ZXInLCBmaWx0ZXJEYXRhKTtcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnNldEZpbHRlcih7fSk7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnZmlsdGVyJyk7XG5cdH1cblxuXHRzZXRTb3J0ZXIoc29ydGVyRGF0YSkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIHNvcnRlckRhdGEpO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3NvcnRlcicpO1xuXHR9XG5cblx0c2V0UGFnZU51bWJlcihwYWdlTnVtYmVyKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHR9XG5cblx0c2V0UGFnZVNpemUocGFnZVNpemUpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdwYWdlU2l6ZScsIHBhZ2VTaXplKTtcblx0fVxuXG5cdHNldFBhZ2VyKHBhZ2VTaXplID0gREVGQVVMVF9QQUdFX1NJWkUsIHBhZ2VOdW1iZXIgPSBERUZBVUxUX1BBR0VfTlVNQkVSKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygncGFnZVNpemUnLCBwYWdlU2l6ZSkuc2V0V29ya2luZygncGFnZU51bWJlcicsIHBhZ2VOdW1iZXIpO1xuXHR9XG5cblx0cmVzZXRQYWdlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRQYWdlcigpO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhZ2VTaXplOiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VTaXplJyksXG5cdFx0XHRwYWdlTnVtYmVyOiB0aGlzLmdldFdvcmtpbmcoJ3BhZ2VOdW1iZXInKVxuXHRcdH07XG5cdH1cblxuXHRnZXRNb2RlbE5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMgJiYgdGhpcy5tYW5pZmVzdCA/IHRoaXMubWFuaWZlc3QubW9kZWwgOiBudWxsO1xuXHR9XG5cblx0Z2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0QWN0aW9ucygpICYmIHRoaXMuZ2V0QWN0aW9ucygpW2FjdGlvbk5hbWVdID8gdGhpcy5nZXRBY3Rpb25zKClbYWN0aW9uTmFtZV0gOiBudWxsO1xuXHR9XG5cblx0Y29sbGVjdFJlcXVlc3REYXRhKGFjdGlvbkRhdGEpIHtcblx0XHRsZXQgcmVxdWVzdERhdGEgPSB7fTtcblx0XHRpZiAoKGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2RhdGEnKSkgJiYgQXJyYXkuaXNBcnJheShhY3Rpb25EYXRhLmRhdGEpKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFjdGlvbkRhdGEuZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgZGF0YVByb3ZpZGVyTmFtZSA9ICdnZXQnICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihhY3Rpb25EYXRhLmRhdGFbaV0pO1xuXHRcdFx0XHRpZiAodGhpc1tkYXRhUHJvdmlkZXJOYW1lXSAmJiB0eXBlb2YgdGhpc1tkYXRhUHJvdmlkZXJOYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRcdHJlcXVlc3REYXRhID0gbm90Q29tbW9uLmV4dGVuZChyZXF1ZXN0RGF0YSwgdGhpc1tkYXRhUHJvdmlkZXJOYW1lXSgpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVxdWVzdERhdGE7XG5cdH1cblxuXHRlbmNvZGVSZXF1ZXN0KGRhdGEpe1xuXHRcdGxldCBwID0gJz8nO1xuXHRcdGZvcihsZXQgdCBpbiBkYXRhKXtcblx0XHRcdHAgKz0gZW5jb2RlVVJJQ29tcG9uZW50KHQpKyc9JytlbmNvZGVVUklDb21wb25lbnQoZGF0YVt0XSkrJyYnO1xuXHRcdH1cblx0XHRyZXR1cm4gcDtcblx0fVxuXG5cdC8vcmV0dXJuIFByb21pc2Vcblx0cmVxdWVzdChyZWNvcmQsIGFjdGlvbk5hbWUpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YShhY3Rpb25OYW1lKSxcblx0XHRcdHJlcXVlc3RQYXJhbXMgPSB0aGlzLmNvbGxlY3RSZXF1ZXN0RGF0YShhY3Rpb25EYXRhKSxcblx0XHRcdHJlcXVlc3RQYXJhbXNFbmNvZGVkID0gdGhpcy5lbmNvZGVSZXF1ZXN0KHJlcXVlc3RQYXJhbXMpLFxuXHRcdFx0aWQgPSB0aGlzLmdldElEKHJlY29yZCwgYWN0aW9uRGF0YSwgYWN0aW9uTmFtZSksXG5cdFx0XHR1cmwgPSB0aGlzLmdldFVSTChyZWNvcmQsIGFjdGlvbkRhdGEsIGFjdGlvbk5hbWUpO1xuXHRcdHJldHVybiBub3RDb21tb24uZ2V0QVBJKCkucXVlZVJlcXVlc3QoYWN0aW9uRGF0YS5tZXRob2QsIHVybCArIHJlcXVlc3RQYXJhbXNFbmNvZGVkLCBpZCwgSlNPTi5zdHJpbmdpZnkocmVjb3JkLmdldERhdGEoKSkpXG5cdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5hZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRhZnRlclN1Y2Nlc3NSZXF1ZXN0KGRhdGEsIGFjdGlvbkRhdGEpIHtcblx0XHRpZiAodGhpcyAmJiBhY3Rpb25EYXRhICYmIGFjdGlvbkRhdGEuaGFzT3duUHJvcGVydHkoJ2lzQXJyYXknKSAmJiBhY3Rpb25EYXRhLmlzQXJyYXkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgZGF0YS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRkYXRhW3RdID0gbmV3IG5vdFJlY29yZCh0aGlzLm1hbmlmZXN0LCBkYXRhW3RdKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGF0YSA9IG5ldyBub3RSZWNvcmQodGhpcy5tYW5pZmVzdCwgZGF0YSk7XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG59XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuL25vdEJhc2UnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuL25vdFBhdGgnO1xuaW1wb3J0IG5vdFJlY29yZEludGVyZmFjZSBmcm9tICcuL25vdFJlY29yZEludGVyZmFjZSc7XG5cbmNvbnN0IE1FVEFfSU5URVJGQUNFID0gU3ltYm9sKCdpbnRlcmZhY2UnKSxcblx0TUVUQV9QUk9YWSA9IFN5bWJvbCgncHJveHknKSxcblx0TUVUQV9DSEFOR0UgPSBTeW1ib2woJ2NoYW5nZScpLFxuXHRNRVRBX0NIQU5HRV9ORVNURUQgPSBTeW1ib2woJ2NoYW5nZS5uZXN0ZWQnKSxcblx0TUVUQV9TQUwgPSBbXG5cdFx0J2dldEF0dHInLFxuXHRcdCdnZXRBdHRycycsXG5cdFx0J2lzUHJvcGVydHknLFxuXHRcdCdpc1JlY29yZCcsXG5cdFx0J2dldE1hbmlmZXN0Jyxcblx0XHQnc2V0QXR0cicsXG5cdFx0J3NldEF0dHJzJyxcblx0XHQnZ2V0RGF0YScsXG5cdFx0J3NldERhdGEnLFxuXHRcdCdnZXRKU09OJyxcblx0XHQnb24nLFxuXHRcdCdvZmYnLFxuXHRcdCd0cmlnZ2VyJ1xuXHRdLFxuXHRNRVRBX01BUF9UT19JTlRFUkZBQ0UgPSBbXG5cdFx0J2dldEFjdGlvbnNDb3VudCcsXG5cdFx0J2dldEFjdGlvbnMnLFxuXHRcdCdzZXRGaW5kQnknLFxuXHRcdCdyZXNldEZpbHRlcicsXG5cdFx0J3NldEZpbHRlcicsXG5cdFx0J2dldEZpbHRlcicsXG5cdFx0J3NldFNvcnRlcicsXG5cdFx0J2dldFNvcnRlcicsXG5cdFx0J3Jlc2V0U29ydGVyJyxcblx0XHQnc2V0UGFnZU51bWJlcicsXG5cdFx0J3NldFBhZ2VTaXplJyxcblx0XHQnc2V0UGFnZXInLFxuXHRcdCdyZXNldFBhZ2VyJyxcblx0XHQnZ2V0UGFnZXInXG5cdF0sXG5cdERFRkFVTFRfQUNUSU9OX1BSRUZJWCA9ICckJyxcblx0TUVUQV9SRVRVUk5fVE9fUk9PVCA9IFN5bWJvbCgncmV0dXJuVG9Sb290Jyk7XG5cbnZhciBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzID0gZnVuY3Rpb24ob3duZXIpIHtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCBjb250ZXh0KSB7XG5cdFx0XHQvL25vdENvbW1vbi5sb2coYHByb3h5IGdldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0LCBjb250ZXh0KTtcblx0XHRcdGlmIChrZXkgPT09ICdpc1Byb3h5Jykge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGxldCByZXNUYXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRpZiAodHlwZW9mIGtleSA9PT0gJ3N5bWJvbCcpIHtcblx0XHRcdFx0aWYgKHRoaXNba2V5XSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmIChPYmplY3Qua2V5cyh0aGlzKS5pbmRleE9mKGtleSkgPiAtMSB8fCBNRVRBX1NBTC5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcHJveHkgc2V0IFwiJHtrZXl9XCJgLCB0eXBlb2YgdGFyZ2V0W2tleV0pO1xuXG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RQcm9wZXJ0eSBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihnZXRSb290LCBwYXRoVG8sIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUHJveHkgfHwgaXRlbS5pc1Byb3BlcnR5KSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRnZXRSb290OiBnZXRSb290LFxuXHRcdFx0cGF0aDogcGF0aFRvXG5cdFx0fSk7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVQcm9wZXJ0eUhhbmRsZXJzKHRoaXMpKTtcblx0XHR0aGlzLnNldERhdGEoaXRlbSk7XG5cdFx0dGhpcy5pc1Byb3BlcnR5ID0gdHJ1ZTtcblx0XHR0aGlzLm9uKCdjaGFuZ2UnLCB0aGlzW01FVEFfUkVUVVJOX1RPX1JPT1RdLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzW01FVEFfUFJPWFldO1xuXHR9XG5cblx0W01FVEFfUkVUVVJOX1RPX1JPT1RdKHByb3h5LCBrZXksIHZhbHVlKSB7XG5cdFx0bGV0IHJvb3QgPSB0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSgpO1xuXHRcdHJvb3QudHJpZ2dlcignY2hhbmdlLm5lc3RlZCcsIHRoaXNbTUVUQV9QUk9YWV0sIHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXksIHZhbHVlKTtcblx0fVxufVxuXG5cbnZhciBjcmVhdGVSZWNvcmRIYW5kbGVycyA9IGZ1bmN0aW9uKG93bmVyKSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0OiBmdW5jdGlvbih0YXJnZXQsIGtleSwgY29udGV4dCkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKGBwcm94eSBnZXQgXCIke2tleX1cImAsIHRoaXMsIHRhcmdldCwgY29udGV4dCk7XG5cdFx0XHRpZiAoa2V5ID09PSAnaXNQcm94eScgfHwga2V5ID09PSAnaXNSZWNvcmQnKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0bGV0IHJlc1RhcmdldCA9IHRhcmdldDtcblx0XHRcdGlmICh0eXBlb2Yga2V5ID09PSAnc3ltYm9sJykge1xuXHRcdFx0XHRpZiAodGhpc1trZXldKSB7XG5cdFx0XHRcdFx0cmVzVGFyZ2V0ID0gdGhpcztcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKE9iamVjdC5rZXlzKHRoaXMpLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfU0FMLmluZGV4T2Yoa2V5KSA+IC0xIHx8IE1FVEFfTUFQX1RPX0lOVEVSRkFDRS5pbmRleE9mKGtleSkgPiAtMSkge1xuXHRcdFx0XHRcdHJlc1RhcmdldCA9IHRoaXM7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBSZWZsZWN0LmdldChyZXNUYXJnZXQsIGtleSwgY29udGV4dCk7XG5cdFx0fS5iaW5kKG93bmVyKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHRhcmdldCwga2V5LCB2YWx1ZSAvKiwgcHJveHkqLyApIHtcblx0XHRcdC8vbm90Q29tbW9uLmxvZyhgcmVjb3JkIHByb3h5IHNldCBcIiR7a2V5fVwiYCwgdGhpcywgdGFyZ2V0KTtcblx0XHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0XHRpZiAoT2JqZWN0LmtleXModGhpcykuaW5kZXhPZihrZXkpID4gLTEpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGF0dGVtcHQgdG8gcHJpdmF0ZSBcIiR7a2V5fVwiIHByb3BlcnR5YCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRsZXQgdmFsdWVUb1JlZmxlY3QgPSB2YWx1ZTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHR2YWx1ZVRvUmVmbGVjdCA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2dldFJvb3QnKSwgbm90UGF0aC5qb2luKHRoaXMuZ2V0T3B0aW9ucygncGF0aCcpLCBrZXkpLCB2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGV0IHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWVUb1JlZmxlY3QpO1xuXHRcdFx0XHR0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRhcmdldCwga2V5LCB2YWx1ZVRvUmVmbGVjdCk7XG5cdFx0XHRcdHJldHVybiB0O1xuXHRcdFx0fVxuXHRcdH0uYmluZChvd25lciksXG5cdH07XG59O1xuXG5jbGFzcyBub3RSZWNvcmQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IobWFuaWZlc3QsIGl0ZW0pIHtcblx0XHRzdXBlcigpO1xuXHRcdGlmICh0eXBlb2YgaXRlbSA9PT0gJ3VuZGVmaW5lZCcgfHwgaXRlbSA9PT0gbnVsbCkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHRcdGlmIChpdGVtICYmIGl0ZW0uaXNQcm94eSkge1xuXHRcdFx0bm90Q29tbW9uLmVycm9yKCd0aGlzIGlzIFByb3h5IGl0ZW0nKTtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblxuXHRcdGlmIChpdGVtICYmIChpdGVtLmlzUmVjb3JkIHx8IGl0ZW0uaXNQcm9wZXJ0eSkpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5jcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5zZXRPcHRpb25zKHt9KTtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXSA9IG5ldyBub3RSZWNvcmRJbnRlcmZhY2UobWFuaWZlc3QpO1xuXHRcdHRoaXMuc2V0RGF0YSh0aGlzLmluaXRQcm9wZXJ0aWVzKGl0ZW0pKTtcblx0XHR0aGlzLmludGVyZmFjZVVwKCk7XG5cdFx0dGhpcy5pc1JlY29yZCA9IHRydWU7XG5cdFx0dGhpc1tNRVRBX1BST1hZXSA9IG5ldyBQcm94eShpdGVtLCBjcmVhdGVSZWNvcmRIYW5kbGVycyh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCdwcm94eSByZWNvcmQgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QUk9YWV07XG5cdH1cblxuXHRpbml0UHJvcGVydGllcyhpdGVtLCBwYXRoID0gJycpIHtcblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoaXRlbSk7XG5cdFx0XHRmb3IgKGxldCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRsZXQgY3VyUGF0aCA9IHBhdGggKyAocGF0aC5sZW5ndGggPiAwID8gJy4nIDogJycpICsga2V5O1xuXHRcdFx0XHQvL25vdENvbW1vbi5sb2coJ2N1clBhdGgnLCBjdXJQYXRoKTtcblx0XHRcdFx0aWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbVtrZXldID09PSAnb2JqZWN0JyAmJiBpdGVtW2tleV0gIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbVtrZXldLCBjdXJQYXRoKTtcblx0XHRcdFx0XHRcdGl0ZW1ba2V5XSA9IG5ldyBub3RQcm9wZXJ0eSh0aGlzLmdldFJvb3QuYmluZCh0aGlzKSwgY3VyUGF0aCwgaXRlbVtrZXldKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGtleSwgJ2lzIG93biBwcm9wZXJ0eSwgYnV0IG5vdCBvYmplY3QnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly9ub3RDb21tb24ubG9nKGtleSwgJ2lzIG5vdCBvd24gcHJvcGVydHknKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaXRlbTtcblx0fVxuXG5cdGdldFJvb3QoKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjcmVhdGVDb2xsZWN0aW9uKG1hbmlmZXN0LCBpdGVtcykge1xuXHRcdHZhciBjb2xsZWN0aW9uID0gW107XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29sbGVjdGlvbi5wdXNoKG5ldyBub3RSZWNvcmQobWFuaWZlc3QsIGl0ZW1zW2ldKSk7XG5cdFx0fVxuXHRcdHJldHVybiBjb2xsZWN0aW9uO1xuXHR9XG5cblx0aW50ZXJmYWNlVXAoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEFjdGlvbnNDb3VudCgpID4gMCkge1xuXHRcdFx0bGV0IGFjdGlvbnMgPSB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRBY3Rpb25zKCk7XG5cdFx0XHRmb3IgKGxldCBpIGluIGFjdGlvbnMpIHtcblx0XHRcdFx0dGhpcy5hY3Rpb25VcChpLCBhY3Rpb25zW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXG5cblx0YWN0aW9uVXAoaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoW0RFRkFVTFRfQUNUSU9OX1BSRUZJWCArIGluZGV4XSkpIHtcblx0XHRcdHRoaXNbREVGQVVMVF9BQ1RJT05fUFJFRklYICsgaW5kZXhdID0gKCkgPT4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ucmVxdWVzdCh0aGlzLCBpbmRleCk7XHRcdFx0XG5cdFx0fVxuXHR9XG5cdC8qXG5cdC0+ICdwYXRoLnRvLmtleScsIHZhbHVlT2ZLZXlcblx0PC0gb2ssIHdpdGggb25lIG9uQ2hhbmdlIGV2ZW50IHRyaWdnZXJlZFxuXHQqL1xuXG5cdHNldEF0dHIoa2V5LCB2YWx1ZSkge1xuXHRcdHJldHVybiBub3RQYXRoLnNldChrZXksIHRoaXNbTUVUQV9QUk9YWV0sIHt9LCB2YWx1ZSk7XG5cdH1cblxuXHQvKlxuXHQtPlxuXHR7XG5cdFx0J2tleVBhdGgnOiB2YWx1ZSxcblx0XHQna2V5LnN1YlBhdGgnOiB2YWx1ZTIsXG5cdFx0J2tleVBhdGguMC50aXRsZSc6IHZhbHVlM1xuXHR9XG5cdDwtIG9rLCB3aXRoIGJ1bmNoIG9mIG9uQ2hhbmdlIGV2ZW50cyB0cmlnZ2VyZWRcblx0Ki9cblx0c2V0QXR0cnMob2JqZWN0UGFydCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMnLCBvYmplY3RQYXJ0LCBPYmplY3Qua2V5cyhvYmplY3RQYXJ0KSk7XG5cdFx0aWYgKG9iamVjdFBhcnQgJiYgKHR5cGVvZiBvYmplY3RQYXJ0ID09PSAnb2JqZWN0JykgJiYgT2JqZWN0LmtleXMob2JqZWN0UGFydCkubGVuZ3RoID4gMCkge1xuXHRcdFx0Zm9yIChsZXQgcGF0aCBpbiBvYmplY3RQYXJ0KSB7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnc2V0QXR0cnMgb25lIHRvIGdvJywgcGF0aCk7XG5cdFx0XHRcdHRoaXMuc2V0QXR0cihwYXRoLCBvYmplY3RQYXJ0W3BhdGhdKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKlxuXHQtPiAncGF0aFRvS2V5J1xuXHQ8LSB2YWx1ZTFcblxuXHQqL1xuXHRnZXRBdHRyKHdoYXQpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ2dldEF0dHInLCB3aGF0KTtcblx0XHRyZXR1cm4gbm90UGF0aC5nZXQod2hhdCwgdGhpc1tNRVRBX1BST1hZXSwge30pO1xuXHR9XG5cblx0Lypcblx0LT4gWydwYXRoVG9LZXknLCAncGF0aC50by5rZXknLCAnc2ltcGxlS2V5JywuLi5dXG5cdDwtIFt2YWx1ZTEsIHZhbHVlMiwgdmFsdWUzLC4uLl1cblx0Ki9cblx0Z2V0QXR0cnMod2hhdCkge1xuXHRcdGxldCByZXN1bHQgPSBbXTtcblx0XHRpZiAod2hhdCAmJiB3aGF0Lmxlbmd0aCA+IDApIHtcblx0XHRcdGZvciAobGV0IHBhdGggb2Ygd2hhdCkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLmdldEF0dHIocGF0aCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0TWFuaWZlc3QoKSB7XG5cdFx0aWYgKHRoaXNbTUVUQV9JTlRFUkZBQ0VdKSB7XG5cdFx0XHRyZXR1cm4gdGhpc1tNRVRBX0lOVEVSRkFDRV0ubWFuaWZlc3Q7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB7fTtcblx0XHR9XG5cdH1cblxuXHQvKlxuXHRcdGhhbmRsZXIgZm9yIFByb3h5IGNhbGxiYWNrc1xuXHQqL1xuXG5cdFtNRVRBX0NIQU5HRV0oKSB7XG5cdFx0Ly9ub3RDb21tb24ubG9nKCd0cnkgdG8gY2hhbmdlJywgLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdFtNRVRBX0NIQU5HRV9ORVNURURdKCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygndHJ5IHRvIGNoYW5nZSBuZXN0ZWQnLCAuLi5hcmd1bWVudHMpO1xuXHRcdC8vbm90Q29tbW9uLnRyYWNlKCk7XG5cdFx0dGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0aGlzW01FVEFfUFJPWFldLCBub3RQYXRoLmpvaW4oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pLCBhcmd1bWVudHNbM10pO1xuXHR9XG5cblx0c2V0SXRlbShpdGVtKSB7XG5cdFx0dGhpcy5zZXREYXRhKHRoaXMuaW5pdFByb3BlcnRpZXMoaXRlbSkpO1xuXHRcdHRoaXNbTUVUQV9QUk9YWV0gPSBuZXcgUHJveHkoaXRlbSwgY3JlYXRlUmVjb3JkSGFuZGxlcnModGhpcykpO1xuXHRcdC8vbm90Q29tbW9uLmxvZygncHJveHkgY3JlYXRlZCBmcm9tICcsIGl0ZW0pO1xuXHRcdHRoaXMub2ZmKCdjaGFuZ2UnKTtcblx0XHR0aGlzLm9mZignY2hhbmdlLm5lc3RlZCcpO1xuXHRcdHRoaXMub24oJ2NoYW5nZScsIHRoaXNbTUVUQV9DSEFOR0VdLmJpbmQodGhpcykpO1xuXHRcdHRoaXMub24oJ2NoYW5nZS5uZXN0ZWQnLCB0aGlzW01FVEFfQ0hBTkdFX05FU1RFRF0uYmluZCh0aGlzKSk7XG5cdFx0Ly9ub3RDb21tb24udHJhY2UoKTtcblx0XHRyZXR1cm4gdGhpc1tNRVRBX1BST1hZXTtcblx0fVxuXG5cdHNldEZpbmRCeSgpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaW5kQnkoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldEZpbHRlcigpIHtcblx0XHR0aGlzW01FVEFfSU5URVJGQUNFXS5zZXRGaWx0ZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlc2V0RmlsdGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0RmlsdGVyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRGaWx0ZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9JTlRFUkZBQ0VdLmdldEZpbHRlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0c2V0U29ydGVyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFNvcnRlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0U29ydGVyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRTb3J0ZXIoLi4uYXJndW1lbnRzKTtcblx0fVxuXG5cdHNldFBhZ2VOdW1iZXIoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZU51bWJlciguLi5hcmd1bWVudHMpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UGFnZVNpemUoKSB7XG5cdFx0dGhpc1tNRVRBX0lOVEVSRkFDRV0uc2V0UGFnZVNpemUoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnNldFBhZ2VyKC4uLmFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZXNldFBhZ2VyKCkge1xuXHRcdHRoaXNbTUVUQV9JTlRFUkZBQ0VdLnJlc2V0UGFnZXIoLi4uYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFBhZ2VyKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRQYWdlciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Z2V0TW9kZWxOYW1lKCkge1xuXHRcdHJldHVybiB0aGlzW01FVEFfSU5URVJGQUNFXS5nZXRNb2RlbE5hbWUoLi4uYXJndW1lbnRzKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlY29yZDtcbiIsImltcG9ydCBub3RDb21tb24gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IG5vdFRlbXBsYXRlQ2FjaGUgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZUNhY2hlJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuaW1wb3J0IG5vdEFQSSBmcm9tICcuL2FwaSc7XG5cbmNvbnN0IE9QVF9DT05UUk9MTEVSX1BSRUZJWCA9ICduYycsXG5cdE9QVF9SRUNPUkRfUFJFRklYID0gJ25yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgbm90QXBwIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcih7b3B0aW9uc30pO1xuXHRcdG5vdENvbW1vbi5sb2coJ3N0YXJ0IGFwcCcpO1xuXHRcdG5vdENvbW1vbi5yZWdpc3RlcignYXBwJywgdGhpcyk7XG5cdFx0dGhpcy5yZXNvdXJjZXMgPSB7fTtcblx0XHR0aGlzLnNldFdvcmtpbmcoe1xuXHRcdFx0aW50ZXJmYWNlczoge30sXG5cdFx0XHRjb250cm9sbGVyczoge30sXG5cdFx0XHRpbml0Q29udHJvbGxlcjogbnVsbCxcblx0XHRcdGN1cnJlbnRDb250cm9sbGVyOiBudWxsXG5cdFx0fSk7XG5cdFx0dGhpcy5wcmVJbml0Um91dGVyKCk7XG5cdFx0dGhpcy5pbml0TWFuYWdlcigpO1xuXHRcdHRoaXMuaW5pdEFQSSgpO1xuXHRcdHRoaXMuaW5pdFRlbXBsYXRlcygpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdE1hbmFnZXIoKXtcblx0XHRub3RDb21tb24uc2V0TWFuYWdlcihcblx0XHRcdHtcblx0XHRcdFx0c2V0QVBJKHYpeyB0aGlzLmFwaSA9IHY7fSxcblx0XHRcdFx0Z2V0QVBJKCl7cmV0dXJuIHRoaXMuYXBpO30sXG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdGluaXRBUEkoKXtcblx0XHRub3RDb21tb24uZ2V0TWFuYWdlcigpLnNldEFQSShuZXcgbm90QVBJKHRoaXMuZ2V0T3B0aW9ucygnYXBpJykgfHwge30pKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZXMoKXtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRsZXQgcHJvbSA9IG51bGw7XG5cdFx0XHRmb3IobGV0IHQgaW4gdGhpcy5nZXRPcHRpb25zKCd0ZW1wbGF0ZXMnKSl7XG5cdFx0XHRcdGlmICh0ICYmIHRoaXMuZ2V0T3B0aW9ucygndGVtcGxhdGVzJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdGxldCB1cmwgPSB0aGlzLmdldE9wdGlvbnMoJ3RlbXBsYXRlcycpW3RdO1xuXHRcdFx0XHRcdGlmKHByb20pe1xuXHRcdFx0XHRcdFx0cHJvbS50aGVuKG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTC5iaW5kKG5vdFRlbXBsYXRlQ2FjaGUsIHVybCkpO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cHJvbSA9IG5vdFRlbXBsYXRlQ2FjaGUuYWRkTGliRnJvbVVSTCh1cmwpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKHByb20pe1xuXHRcdFx0XHRwcm9tLnRoZW4odGhpcy5pbml0TWFuaWZlc3QuYmluZCh0aGlzKSlcblx0XHRcdFx0XHQuY2F0Y2goKGUpID0+IHtcblx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoJ25vIHRlbXBsYXRlcyBsaWInLCBlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLmluaXRNYW5pZmVzdCgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0dGhpcy5pbml0TWFuaWZlc3QoKTtcblx0XHR9XG5cdH1cblxuXHRpbml0TWFuaWZlc3QoKSB7XG5cdFx0dmFyIHVybCA9IHRoaXMuZ2V0T3B0aW9ucygnbWFuaWZlc3RVUkwnKTtcblx0XHRub3RDb21tb24uZ2V0SlNPTih1cmwsIHt9KVxuXHRcdFx0LnRoZW4odGhpcy5zZXRJbnRlcmZhY2VNYW5pZmVzdC5iaW5kKHRoaXMpKVxuXHRcdFx0LmNhdGNoKG5vdENvbW1vbi5yZXBvcnQuYmluZCh0aGlzKSk7XG5cdH1cblxuXHRwcmVJbml0Um91dGVyKCl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyb3V0ZXInLCBub3RSb3V0ZXIpO1xuXHRcdHRoaXMuZ2V0V29ya2luZygncm91dGVyJykuc2V0Um9vdCh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5yb290JykpO1xuXHRcdG5vdFJvdXRlci5yZVJvdXRlRXhpc3RlZCgpO1xuXHR9XG5cblx0aW5pdFJvdXRlcigpe1xuXHRcdHZhciByb3V0aWVJbnB1dCA9IHt9O1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5tYW5pZmVzdCcpLmxlbmd0aDsgdCsrKXtcblx0XHRcdGxldCByb3V0ZUJsb2NrID0gdGhpcy5nZXRPcHRpb25zKCdyb3V0ZXIubWFuaWZlc3QnKVt0XSxcblx0XHRcdFx0cGF0aHMgPSByb3V0ZUJsb2NrLnBhdGhzLFxuXHRcdFx0XHRjb250cm9sbGVyID0gcm91dGVCbG9jay5jb250cm9sbGVyO1xuXHRcdFx0Zm9yKGxldCBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0cm91dGllSW5wdXRbcGF0aHNbaV1dID0gdGhpcy5iaW5kQ29udHJvbGxlcihjb250cm9sbGVyKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdyb3V0ZXInKS5hZGRMaXN0KHJvdXRpZUlucHV0KS5saXN0ZW4oKTsvLy5uYXZpZ2F0ZSh0aGlzLmdldE9wdGlvbnMoJ3JvdXRlci5pbmRleCcpKTtcblx0fVxuXG5cdHNldEludGVyZmFjZU1hbmlmZXN0KG1hbmlmZXN0KSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcsIG1hbmlmZXN0KTtcblx0XHR0aGlzLnVwZGF0ZSgpO1xuXHR9XG5cblx0Z2V0SW50ZXJmYWNlTWFuaWZlc3QoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnaW50ZXJmYWNlTWFuaWZlc3QnKTtcblx0fVxuXG5cdHVwZGF0ZSgpIHtcblx0XHQvL9C90YPQttC90L4g0LjQvdC40YbQuNCw0LvQuNC30LjRgNC+0LLQsNGC0Yxcblx0XHQvL9C80L7QtNC10LvQuCDQv9C+0LvRg9GH0LXQvdC90YvQvNC4INC40L3RgtC10YDRhNC10LnRgdCw0LzQuFxuXHRcdHRoaXMudXBkYXRlSW50ZXJmYWNlcygpO1xuXHRcdC8v0LjQvdC40YbQuNC70LjRhtC40YDQvtCy0LDRgtGMINC4INC30LDQv9GD0YHRgtC40YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuFxuXHRcdHRoaXMuaW5pdENvbnRyb2xsZXIoKTtcblx0XHRpZiAodGhpcy5hbGxSZXNvdXJjZXNSZWFkeSgpKSB7XG5cdFx0XHR0aGlzLnN0YXJ0QXBwKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhcnRBcHAoKSB7XG5cdFx0Ly/RgdC+0LfQtNCw0YLRjCDQutC+0L3RgtGA0L7Qu9C70LXRgNGLXG5cdFx0Ly/RgNC+0YPRgtC10YAg0Lgg0L/RgNC40LLRj9C30LDRgtGMINC6INC90LXQvNGDINC60L7QvdGC0YDQvtC70LvQtdGA0Ytcblx0XHR0aGlzLmluaXRSb3V0ZXIoKTtcblx0fVxuXG5cdGJpbmRDb250cm9sbGVyKGNvbnRyb2xsZXJOYW1lKSB7XG5cdFx0bGV0IGFwcCA9IHRoaXM7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCl7XG5cdFx0XHRuZXcgY29udHJvbGxlck5hbWUoYXBwLCBhcmd1bWVudHMpO1xuXHRcdH07XG5cdH1cblxuXHRpbml0Q29udHJvbGxlcigpIHtcblx0XHRpZiAodHlwZW9mKHRoaXMuZ2V0T3B0aW9ucygnaW5pdENvbnRyb2xsZXInKSkgIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRsZXQgaW5pdENvbnRyb2xsZXIgPSB0aGlzLmdldE9wdGlvbnMoJ2luaXRDb250cm9sbGVyJyk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2luaXRDb250cm9sbGVyJywgbmV3IGluaXRDb250cm9sbGVyKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRnZXRDdXJyZW50Q29udHJvbGxlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdjdXJyZW50Q29udHJvbGxlcicpO1xuXHR9XG5cblx0c2V0Q3VycmVudENvbnRyb2xsZXIoY3RybCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnY3VycmVudENvbnRyb2xsZXInLCBjdHJsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHVwZGF0ZUludGVyZmFjZXMoKSB7XG5cdFx0dGhpcy5jbGVhckludGVyZmFjZXMoKTtcblx0XHRsZXQgbWFuaWZlc3RzID0gdGhpcy5nZXRPcHRpb25zKCdpbnRlcmZhY2VNYW5pZmVzdCcpO1xuXHRcdGlmIChtYW5pZmVzdHMpIHtcblx0XHRcdGZvcihsZXQgbmFtZSBpbiBtYW5pZmVzdHMpe1xuXHRcdFx0XHRsZXQgcmVjb3JkTWFuaWZlc3QgPSBtYW5pZmVzdHNbbmFtZV07XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpW25hbWVdID0gKHJlY29yZERhdGEpID0+IG5ldyBub3RSZWNvcmQocmVjb3JkTWFuaWZlc3QsIHJlY29yZERhdGEpO1xuXHRcdFx0XHR3aW5kb3dbJ25yJyArIG5vdENvbW1vbi5jYXBpdGFsaXplRmlyc3RMZXR0ZXIobmFtZSldID0gdGhpcy5nZXRXb3JraW5nKCdpbnRlcmZhY2VzJylbbmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Z2V0UmVjb3JkTmFtZShuYW1lKSB7XG5cdFx0cmV0dXJuIE9QVF9SRUNPUkRfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldENvbnRyb2xsZXJOYW1lKG5hbWUpIHtcblx0XHRyZXR1cm4gT1BUX0NPTlRST0xMRVJfUFJFRklYICsgbm90Q29tbW9uLmNhcGl0YWxpemVGaXJzdExldHRlcihuYW1lKTtcblx0fVxuXG5cdGdldEludGVyZmFjZXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygnaW50ZXJmYWNlcycpO1xuXHR9XG5cblx0Y2xlYXJJbnRlcmZhY2VzKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnaW50ZXJmYWNlcycsIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHdhaXRUaGlzUmVzb3VyY2UodHlwZSwgaW5kZXgpIHtcblx0XHRpZiAoIXRoaXMucmVzb3VyY2VzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG5cdFx0XHR0aGlzLnJlc291cmNlc1t0eXBlXSA9IHt9O1xuXHRcdH1cblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSBmYWxzZTtcblx0XHRyZXR1cm4gdGhpcy5vblJlc291cmNlUmVhZHkuYmluZCh0aGlzLCB0eXBlLCBpbmRleCk7XG5cdH1cblxuXHRvblJlc291cmNlUmVhZHkodHlwZSwgaW5kZXgpIHtcblx0XHR0aGlzLnJlc291cmNlc1t0eXBlXVtpbmRleF0gPSB0cnVlO1xuXHRcdGlmICh0aGlzLmFsbFJlc291cmNlc1JlYWR5KCkpIHtcblx0XHRcdHRoaXMuc3RhcnRBcHAoKTtcblx0XHR9XG5cdH1cblxuXHRhbGxSZXNvdXJjZXNSZWFkeSgpIHtcblx0XHR2YXIgaSwgajtcblx0XHRmb3IgKGkgaW4gdGhpcy5yZXNvdXJjZXMpIHtcblx0XHRcdGZvciAoaiBpbiB0aGlzLnJlc291cmNlc1tpXSkge1xuXHRcdFx0XHRpZiAoIXRoaXMucmVzb3VyY2VzW2ldW2pdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cbn1cbiIsImltcG9ydCBub3RCYXNlIGZyb20gJy4uL25vdEJhc2UnO1xuXG5jb25zdCBNRVRBX1BST0NFU1NPUlMgPSBTeW1ib2woJ3Byb2Nlc3NvcnMnKTtcblxuY2xhc3Mgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGV4dGVuZHMgbm90QmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlcigpO1xuXHRcdHRoaXNbTUVUQV9QUk9DRVNTT1JTXSA9IHt9O1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0c2V0UHJvY2Vzc29yKC8qIGtleSwgdmFsdWUgKi8pe1xuXHRcdHRoaXMuc2V0Q29tbW9uKHRoaXNbTUVUQV9QUk9DRVNTT1JTXSwgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldFByb2Nlc3NvcigvKiBrZXksICBkZWZhdWx0VmFsdWUgKi8pe1xuXHRcdHJldHVybiB0aGlzLmdldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIGFyZ3VtZW50cyk7XG5cdH1cblxuXHRjbGVhclByb2Nlc3NvcnMoKXtcblx0XHR0aGlzLnNldENvbW1vbih0aGlzW01FVEFfUFJPQ0VTU09SU10sIHt9KTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGFkZCgpe1xuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcblx0XHRcdHRoaXMuc2V0UHJvY2Vzc29yKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKTtcblx0XHR9ZWxzZXtcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKXtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGFyZ3VtZW50c1swXSl7XG5cdFx0XHRcdFx0dGhpcy5zZXRQcm9jZXNzb3IodCwgYXJndW1lbnRzWzBdW3RdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGdldCgpe1xuXHRcdHJldHVybiB0aGlzLmdldFByb2Nlc3NvciguLi5hcmd1bWVudHMpO1xuXHR9XG5cblx0Y2xlYXIoKXtcblx0XHR0aGlzW01FVEFfUFJPQ0VTU09SU10gPSB7fTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxufVxuZXhwb3J0IGRlZmF1bHQgbmV3IG5vdFRlbXBsYXRlUHJvY2Vzc29ycygpO1xuIiwiaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi4vbm90UGF0aCc7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnMgZnJvbSAnLi9ub3RUZW1wbGF0ZVByb2Nlc3NvcnMnO1xuXG4vKlxuICog0JjRgdC/0L7Qu9GM0LfRg9C10YIgRE9NINC/0L7QtNC00LXRgNC10LLQviDQsiDQutCw0YfQtdGB0YLQstC1INGI0LDQsdC70L7QvdCwLlxuICog0JfQsNC/0L7Qu9C90Y/QtdGCINC10LPQviDQtNCw0L3QvdGL0LzQuC5cbiAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdGCINGB0LPQtdC90LXRgNC40YDQvtCy0LDQvdC90YvQtSDRjdC70LXQvNC10L3RgtGLXG4gKlxuICogKi9cblxuLypcblxuXHQ8ZGl2IG4tdGVtcGxhdGUtbmFtZT1cInZhc3lhXCI+XG5cdFx0PHA+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbi12YWx1ZT1cIjpjb29sTmFtZVwiLz48L3A+XG5cdFx0PHA+0JHQvtGA0LjRgSDRhdGA0LXQvSDQv9C+0L/QsNC00LXRiNGMINC4IHt7OmNvb2xOYW1lfX0uPC9wPlxuXHQ8L2Rpdj5cblxuICovXG5cbmNvbnN0IE1FVEFfQ09NUE9ORU5UUyA9IFN5bWJvbCgnY29tcG9uZW50cycpO1xuXG5jbGFzcyBub3RSZW5kZXJlciBleHRlbmRzIG5vdEJhc2Uge1xuXHQvKlxuXHRcdGlucHV0ID0ge1xuXHRcdFx0ZGF0YTogbm90UmVjb3JkLFxuXHRcdFx0dGVtcGxhdGU6IGVsZW1lbnRcblx0XHRcdG9wdGlvbnM6e1xuXHRcdFx0XHRoZWxwZXJzOiBvYmplY3Rcblx0XHRcdFx0Ly8g0LXRgdC70Lgg0LfQsNC00LDRgtGMLCDRgtC+INGB0YDQsNC30YMg0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCx0YPQtNC10YIg0L7RgtGA0LXQvdC00LXRgNC10L3QviDRgdGO0LTQsFxuXHRcdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0fVxuXHRcdH1cblx0Ki9cblxuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdID0ge307XG5cdFx0dGhpcy5pbml0KGlucHV0KTtcblx0XHR0aGlzLnJlbmRlcigpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdChpbnB1dCkge1xuXHRcdHRoaXMuaW5wdXQgPSBpbnB1dDtcblx0XHR0aGlzLmNvbXBvbmVudCA9IGlucHV0LmNvbXBvbmVudDtcblx0XHR0aGlzLmluaXREYXRhKGlucHV0LmRhdGEgPyBpbnB1dC5kYXRhIDoge30pO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dC50ZW1wbGF0ZSk7XG5cdFx0dGhpcy5pbml0VGVtcGxhdGUoKTtcblx0fVxuXG5cdGluaXRUZW1wbGF0ZSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlJywgdGhpcy5nZXRXb3JraW5nKCdnZXRUZW1wbGF0ZScpKCkpO1xuXHR9XG5cblx0aW5pdERhdGEodmFsKSB7XG5cdFx0dGhpcy5zZXREYXRhKHZhbCk7XG5cdFx0aWYgKHRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLmdldERhdGEoKS5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpKTtcblx0XHR9XG5cdH1cblxuXHRpbml0T3B0aW9ucyh2YWwpIHtcblx0XHR0aGlzLnNldE9wdGlvbnModmFsKTtcblx0fVxuXG5cdGluaXRXb3JraW5nKHRlbXBsYXRlKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdGdldFRlbXBsYXRlOiB0ZW1wbGF0ZSxcblx0XHRcdHBhcnRJZDogdGhpcy5nZXRPcHRpb25zKCdwYXJ0SWQnKSA/IHRoaXMuZ2V0T3B0aW9ucygncGFydElkJykgOiBPUFRTLlBBUlRfSURfUFJFRklYICsgTWF0aC5yYW5kb20oKSxcblx0XHR9KTtcblx0fVxuXG5cdGdldEJyZWFkQ3J1bXBzKCkge1xuXHRcdGlmICh0aGlzLmNvbXBvbmVudCkge1xuXHRcdFx0cmV0dXJuIFsuLi50aGlzLmNvbXBvbmVudC5nZXRCcmVhZENydW1wcygpLCB0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFt0aGlzLmdldFdvcmtpbmcoJ3BhcnRJZCcpXTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXIoKSB7XG5cdFx0dGhpcy5jbGVhclN0YXNoKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nTWFwcGluZygpO1xuXHRcdHRoaXMuZXhlY1Byb2Nlc3NvcnModGhpcy5nZXREYXRhKCkpO1xuXHRcdHRoaXMuc2VhcmNoRm9yU3ViVGVtcGxhdGVzKCk7XG5cdFx0dGhpcy5zdGFzaFJlbmRlcmVkKCk7XG5cdH1cblxuXHRvbkNoYW5nZShwcm94eSwga2V5LCB2YWx1ZSkge1xuXHRcdHRoaXMudXBkYXRlKGtleSk7XG5cdFx0dGhpcy50cmlnZ2VyKCdvYnNvbGV0ZScsIHByb3h5LCBrZXksIHZhbHVlKTtcblx0fVxuXG5cdHVwZGF0ZShrZXkpIHtcblx0XHR0aGlzLmV4ZWNQcm9jZXNzb3JzKHRoaXMuZ2V0RGF0YSgpKTtcblx0XHRmb3IgKGxldCB0IGluIHRoaXNbTUVUQV9DT01QT05FTlRTXSkge1xuXHRcdFx0bGV0IGl0ZW0gPSB0aGlzW01FVEFfQ09NUE9ORU5UU11bdF0sXG5cdFx0XHRcdGlmUGFydCA9IHRydWU7XG5cdFx0XHRpZiAoa2V5KSB7XG5cdFx0XHRcdGlmIChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJykgPT09IG51bGwpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsZXQgY29tcG9uZW50UGF0aCA9IG5vdFBhdGgubm9ybWlsaXplUGF0aChpdGVtLmdldE9wdGlvbnMoJ2RhdGFQYXRoJykpLFxuXHRcdFx0XHRcdGNoYW5nZWRQYXRoID0gbm90UGF0aC5ub3JtaWxpemVQYXRoKGtleSk7XG5cdFx0XHRcdGlmUGFydCA9IG5vdFBhdGguaWZGdWxsU3ViUGF0aChjaGFuZ2VkUGF0aCwgY29tcG9uZW50UGF0aCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpZlBhcnQpIHtcblx0XHRcdFx0aXRlbS51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzZXRXb3JraW5nTWFwcGluZygpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21hcHBpbmcnLCB0aGlzLmNyZWF0ZU1hcHBpbmcoKSk7XG5cdH1cblxuXHQvKlxuXG5cdNCh0L7Qt9C00LDQtdC8INC60LDRgNGC0Ysg0YHQvtC+0YLQstC10YHRgtCy0LjRjyDQv9GA0L7RhtC10YHRgdC+0YDQvtCyLCDQv9GD0YLQtdC5INC00LDQvdC90YvRhSDQsiDQvtCx0YrQtdC60YLQtSDQuCDRjdC70LXQvNC10L3RgtC+0LIg0YjQsNCx0LvQvtC90LAuXG5cdFt7XG5cdFx0ZWwsXG5cdFx0cHJvY2Vzc29yLFxuXHRcdHdvcmtpbmcsXG5cdFx0aXRlbS5wcm9wZXJ0eS5wYXRoXG5cdH1dXG5cblx0Ki9cblxuXHRjcmVhdGVNYXBwaW5nKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmZpbmRBbGxQcm9jZXNzb3JzKCk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGZpbmRBbGxQcm9jZXNzb3JzKCkge1xuXHRcdGxldCBwcm9jcyA9IFtdLFxuXHRcdFx0ZWxzID0gbm90Q29tbW9uLmdldEF0dHJpYnV0ZXNTdGFydHNXaXRoKHRoaXMuZ2V0V29ya2luZ1RlbXBsYXRlRWxlbWVudCgpLCBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCk7XG5cdFx0Zm9yIChsZXQgaiA9IDA7IGogPCBlbHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGZvciAobGV0IGkgPSAwLCBhdHRzID0gZWxzW2pdLmF0dHJpYnV0ZXMsIG4gPSBhdHRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuXHRcdFx0XHRpZiAoYXR0c1tpXS5ub2RlTmFtZS5pbmRleE9mKE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fUFJFRklYKSA9PT0gMCkge1xuXHRcdFx0XHRcdC8vbm90Q29tbW9uLmxvZyhhdHRzW2ldKTtcblx0XHRcdFx0XHRsZXQgcHJvY0RhdGEgPSB0aGlzLnBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihhdHRzW2ldLm5vZGVOYW1lKTtcblx0XHRcdFx0XHRwcm9jRGF0YS5lbGVtZW50ID0gZWxzW2pdO1xuXHRcdFx0XHRcdHByb2NEYXRhLnByb2Nlc3NvckV4cHJlc3Npb24gPSBhdHRzW2ldLm5vZGVOYW1lO1xuXHRcdFx0XHRcdHByb2NEYXRhLmF0dHJpYnV0ZUV4cHJlc3Npb24gPSBhdHRzW2ldLnZhbHVlO1xuXHRcdFx0XHRcdHByb2NzLnB1c2gocHJvY0RhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBwcm9jcztcblx0fVxuXG5cdHBhcnNlUHJvY2Vzc29yRXhwcmVzc2lvbihwcm9jZXNzb3JFeHByZXNzaW9uKSB7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdHBhcmFtczogW10sXG5cdFx0XHRwcm9jZXNzb3JOYW1lOiAnJyxcblx0XHRcdGlmQ29uZGl0aW9uOiBmYWxzZVxuXHRcdH07XG5cdFx0cHJvY2Vzc29yRXhwcmVzc2lvbiA9IHByb2Nlc3NvckV4cHJlc3Npb24ucmVwbGFjZShPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCwgJycpO1xuXHRcdGlmIChwcm9jZXNzb3JFeHByZXNzaW9uLmluZGV4T2YoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9DT05ESVRJT05fUE9TVEZJWCkgPT09IChwcm9jZXNzb3JFeHByZXNzaW9uLmxlbmd0aCAtIE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fQ09ORElUSU9OX1BPU1RGSVgubGVuZ3RoKSkge1xuXHRcdFx0cmVzdWx0LmlmQ29uZGl0aW9uID0gdHJ1ZTtcblx0XHRcdHByb2Nlc3NvckV4cHJlc3Npb24gPSBwcm9jZXNzb3JFeHByZXNzaW9uLnJlcGxhY2UoT1BUUy5QUk9DRVNTT1JfRVhQUkVTU0lPTl9TRVBBUkFUT1IgKyBPUFRTLlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYLCAnJyk7XG5cdFx0fVxuXHRcdHJlc3VsdC5wYXJhbXMgPSBwcm9jZXNzb3JFeHByZXNzaW9uLnNwbGl0KE9QVFMuUFJPQ0VTU09SX0VYUFJFU1NJT05fU0VQQVJBVE9SKTtcblx0XHRyZXN1bHQucHJvY2Vzc29yTmFtZSA9IHJlc3VsdC5wYXJhbXNbMF07XG5cdFx0cmVzdWx0LnBhcmFtcyA9IHJlc3VsdC5wYXJhbXMuc2xpY2UoMSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGV4ZWNQcm9jZXNzb3JzKGl0ZW0sIGluZGV4KSB7XG5cdFx0bGV0IG1hcHBpbmcgPSB0aGlzLmdldFdvcmtpbmcoJ21hcHBpbmcnKTtcblx0XHRpZiAobWFwcGluZykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtYXBwaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGxldCBwcm9jU2NvcGUgPSBtYXBwaW5nW2ldO1xuXHRcdFx0XHRwcm9jU2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gdGhpcy5nZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0KHByb2NTY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBpbmRleCk7XG5cdFx0XHRcdC8vbm90Q29tbW9uLmxvZygnYXR0cmlidXRlUmVzdWx0JywgcHJvY1Njb3BlLmF0dHJpYnV0ZVJlc3VsdCk7XG5cdFx0XHRcdGxldCBwcm9jTmFtZSA9IHByb2NTY29wZS5wcm9jZXNzb3JOYW1lLFxuXHRcdFx0XHRcdHByb2MgPSBub3RUZW1wbGF0ZVByb2Nlc3NvcnMuZ2V0KHByb2NOYW1lKTtcblx0XHRcdFx0aWYgKHByb2MpIHtcblx0XHRcdFx0XHRwcm9jKHByb2NTY29wZSwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJywge30pKTtcblx0XHRcdFx0XHRwcm9jU2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvY1Njb3BlLnByb2Nlc3NvckV4cHJlc3Npb24pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG5vdENvbW1vbi5lcnJvcignbm8gcHJvY2Vzc29yIGxpa2UnLCBwcm9jTmFtZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy50cmlnZ2VyKCdyZW5kZXJlZCcpO1xuXHR9XG5cblx0Z2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChwYXRoLCBpdGVtKSB7XG5cdFx0cmV0dXJuIG5vdFBhdGguZ2V0KHBhdGgsIGl0ZW0sIHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycsIHt9KSk7XG5cdH1cblxuXHRjbGVhclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmRlc3Ryb3lTdWJzKCk7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdWJzJywgW10pO1xuXHR9XG5cblx0ZGVzdHJveVN1YnMoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXMuZ2V0V29ya2luZygnc3VicycpKSB7XG5cdFx0XHRcdHQuZGVzdHJveSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3koKSB7XG5cdFx0dGhpcy5jbGVhclN1YlRlbXBsYXRlcygpO1xuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXRTdGFzaCgpLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRsZXQgZWwgPSB0aGlzLmdldFN0YXNoKClbdF07XG5cdFx0XHRpZiAoZWwucGFyZW50Tm9kZSkge1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpZlN1YkVsZW1lbnRSZW5kZXJlZChudEVsKSB7XG5cdFx0cmV0dXJuIG50RWwuYXR0cmlidXRlcy5udFJlbmRlcmVkICYmIChudEVsLmF0dHJpYnV0ZXMubnRSZW5kZXJlZC52YWx1ZSA9PT0gJ3RydWUnKTtcblx0fVxuXG5cdHNlYXJjaEZvclN1YlRlbXBsYXRlcygpIHtcblx0XHR0aGlzLmNsZWFyU3ViVGVtcGxhdGVzKCk7XG5cdFx0bGV0IHN1YnMgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKS5xdWVyeVNlbGVjdG9yQWxsKE9QVFMuVEVNUExBVEVfVEFHKTtcblx0XHQvL25vdENvbW1vbi5sb2coJ3N1YiB0ZW1wbGF0ZXMnLCBzdWJzKTtcblx0XHRmb3IgKGxldCBudCA9IDA7IG50IDwgc3Vicy5sZW5ndGg7IG50KyspIHtcblx0XHRcdGlmICghdGhpcy5pZlN1YkVsZW1lbnRSZW5kZXJlZChzdWJzW250XSkpIHtcblx0XHRcdFx0dGhpcy5yZW5kZXJTdWIoc3Vic1tudF0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGFkZFN1YihudEVsKSB7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdzdWJzJykucHVzaCh7XG5cdFx0XHR0YXJnZXRFbDogbnRFbCxcblx0XHRcdHBhdGg6IG50RWwuYXR0cmlidXRlcy5kYXRhID8gbnRFbC5hdHRyaWJ1dGVzLmRhdGEudmFsdWUgOiAnJyxcblx0XHRcdG5hbWU6IG50RWwuYXR0cmlidXRlcy5uYW1lID8gbnRFbC5hdHRyaWJ1dGVzLm5hbWUudmFsdWUgOiAnJyxcblx0XHRcdHNyYzogbnRFbC5hdHRyaWJ1dGVzLnNyYyA/IG50RWwuYXR0cmlidXRlcy5uYW1lLnNyYyA6ICcnLFxuXHRcdFx0aWQ6IG50RWwuYXR0cmlidXRlcy5pZCA/IG50RWwuYXR0cmlidXRlcy5pZC52YWx1ZSA6IE9QVFMuQ09NUE9ORU5UX0lEX1BSRUZJWCArIE1hdGgucmFuZG9tKCksXG5cdFx0XHRyZW5kZXJlZExpc3Q6IFtdLFxuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyU3ViKG50RWwpIHtcblx0XHRpZiAoIW50RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IGRldGFpbHMgPSB7XG5cdFx0XHRcdGRhdGFQYXRoOiBudEVsLmF0dHJpYnV0ZXMuZGF0YSA/IG50RWwuYXR0cmlidXRlcy5kYXRhLnZhbHVlIDogbnVsbCxcblx0XHRcdFx0bmFtZTogbnRFbC5hdHRyaWJ1dGVzLm5hbWUgPyBudEVsLmF0dHJpYnV0ZXMubmFtZS52YWx1ZSA6ICcnLFxuXHRcdFx0XHRzcmM6IG50RWwuYXR0cmlidXRlcy5zcmMgPyBudEVsLmF0dHJpYnV0ZXMuc3JjLnZhbHVlIDogJycsXG5cdFx0XHRcdGlkOiBudEVsLmF0dHJpYnV0ZXMuaWQgPyBudEVsLmF0dHJpYnV0ZXMuaWQudmFsdWUgOiBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpXG5cdFx0XHR9LFxuXHRcdFx0b3B0aW9ucyA9IHtcblx0XHRcdFx0ZGF0YTogZGV0YWlscy5kYXRhUGF0aCAhPT0gbnVsbCA/IHRoaXMuZ2V0QXR0cmlidXRlRXhwcmVzc2lvblJlc3VsdChkZXRhaWxzLmRhdGFQYXRoLCB0aGlzLmdldERhdGEoKSkgOiBudWxsLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IGRldGFpbHMubmFtZSxcblx0XHRcdFx0XHRzcmM6IGRldGFpbHMuc3JjXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnLCB7fSksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IG50RWwsXG5cdFx0XHRcdFx0bmFtZTogZGV0YWlscy5uYW1lLFxuXHRcdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlQWZ0ZXInLFxuXHRcdFx0XHRcdGlkOiBkZXRhaWxzLmlkLFxuXHRcdFx0XHRcdG50RWw6IG50RWwsXG5cdFx0XHRcdFx0ZGF0YVBhdGg6IGRldGFpbHMuZGF0YVBhdGhcblx0XHRcdFx0fSxcblx0XHRcdFx0b3duZXI6IHRoaXNcblx0XHRcdH07XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgZGV0YWlscy5pZCk7XG5cdFx0bnRFbC5zZXRBdHRyaWJ1dGUoJ250LXJlbmRlcmVkJywgdHJ1ZSk7XG5cdFx0dGhpc1tNRVRBX0NPTVBPTkVOVFNdW2RldGFpbHMuaWRdID0gbmV3IG5vdENvbXBvbmVudChvcHRpb25zKTtcblx0fVxuXG5cdGNsZWFyU3Rhc2goKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdzdGFzaCcsIFtdKTtcblx0fVxuXG5cdGdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndGVtcGxhdGUnKTtcblx0fVxuXG5cdGdldFN0YXNoKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3N0YXNoJyk7XG5cdH1cblxuXHRzdGFzaFJlbmRlcmVkKCkge1xuXHRcdGxldCByZXN1bHQgPSB0aGlzLmdldFdvcmtpbmdUZW1wbGF0ZUVsZW1lbnQoKTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHR0aGlzLmFkZFRvU3Rhc2gocmVzdWx0LmNoaWxkTm9kZXNbdF0pO1xuXHRcdH1cblx0fVxuXG5cdHJlcGxhY2VSZW5kZXJlZCgpIHtcblx0XHQvL25vdENvbW1vbi5sb2coJ3JlcGxhY2Ugc3Rhc2gnKTtcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5nZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCksXG5cdFx0XHRzdGFzaCA9IHRoaXMuZ2V0U3Rhc2goKSxcblx0XHRcdG5ld1N0YXNoID0gW10sXG5cdFx0XHRhbmNob3IgPSBzdGFzaC5sZW5ndGggPiAwID8gc3Rhc2hbMF0gOiB0aGlzLmdldE9wdGlvbnMoJ250RWwnKSxcblx0XHRcdHBhcmVudE5vZGUgPSBhbmNob3IucGFyZW50Tm9kZTtcblx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHJlc3VsdC5jaGlsZE5vZGVzLmxlbmd0aDsgdCsrKSB7XG5cdFx0XHRuZXdTdGFzaC5wdXNoKHJlc3VsdC5jaGlsZE5vZGVzW3RdKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgdCA9IDA7IHQgPCBuZXdTdGFzaC5sZW5ndGg7IHQrKykge1xuXHRcdFx0aWYgKGFuY2hvci5uZXh0U2libGluZykge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3U3Rhc2hbdF0sIGFuY2hvci5uZXh0U2libGluZyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbmNob3IucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChuZXdTdGFzaFt0XSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGZvciAobGV0IHQgPSAwOyB0IDwgc3Rhc2gubGVuZ3RoOyB0KyspIHtcblx0XHRcdHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3Rhc2hbdF0pO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ3N0YXNoJywgbmV3U3Rhc2gpO1xuXHR9XG5cblx0YWRkVG9TdGFzaChub2RlKSB7XG5cdFx0dGhpcy5nZXRTdGFzaCgpLnB1c2gobm9kZSk7XG5cdH1cblxuXHRpc0RhdGEoZGF0YSA9IHt9KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpID09PSBkYXRhO1xuXHR9XG5cblx0aGlkZSgpIHtcblxuXHR9XG5cblx0c2hvdygpIHtcblxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFJlbmRlcmVyO1xuIiwiY29uc3QgcGxhY2UgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24odGFyZ2V0RWwvKiwgcmVuZGVyZWQqLykge1xuXHRcdGxldCBsID0gMDtcblx0XHR3aGlsZSAodGFyZ2V0RWwuY2hpbGRyZW4ubGVuZ3RoIC0gbCkge1xuXHRcdFx0aWYgKHRhcmdldEVsLmNoaWxkcmVuWzBdLm5vZGVOYW1lID09PSAnTlQnKXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnbnQgZm91bmRlZCcpO1xuXHRcdFx0XHRsKys7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygncmVtb3ZlIGNoaWxkICcsdGFyZ2V0RWwuY2hpbGRyZW5bbF0pO1xuXHRcdFx0XHR0YXJnZXRFbC5yZW1vdmVDaGlsZCh0YXJnZXRFbC5jaGlsZHJlbltsXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRhcmdldEVsLnRleHRDb250ZW50ID0gJyc7XG5cdH0sXG5cdGJlZm9yZUVhY2g6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHQvL2NvbnNvbGUubG9nKCdhcHBlbmQgY2hpbGQgJywgcmVuZGVyZWRbaV0pO1xuXHRcdFx0dGFyZ2V0RWwuYXBwZW5kQ2hpbGQocmVuZGVyZWRbaV0pO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXJFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9XG59O1xuZXhwb3J0IGRlZmF1bHQgcGxhY2U7XG4iLCJjb25zdCBwbGFjZUFmdGVyID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwubmV4dFNpYmxpbmcpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VBZnRlcjtcbiIsImNvbnN0IHBsYWNlQmVmb3JlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShyZW5kZXJlZFtpXSwgdGFyZ2V0RWwpO1xuXHRcdH1cblx0fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgcGxhY2VCZWZvcmU7XG4iLCJjb25zdCBwbGFjZUZpcnN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gcmVuZGVyZWQubGVuZ3RoIC0gMTsgaSA+IC0xOyBpLS0pIHtcblx0XHRcdC8vY29uc29sZS5sb2coJ3BsYWNlIGZpcnN0JywgaSwgcmVuZGVyZWRbaV0pO1xuXHRcdFx0aWYgKHRhcmdldEVsLmNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coJ2FwcGVuZCBiZWZvcmUgZmlyc3QnKTtcblx0XHRcdFx0dGFyZ2V0RWwuaW5zZXJ0QmVmb3JlKHJlbmRlcmVkW2ldLCB0YXJnZXRFbC5jaGlsZHJlblswXSk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0Ly9jb25zb2xlLmxvZygnYXBwZW5kIGFzIGZpcnN0Jyk7XG5cdFx0XHRcdHRhcmdldEVsLmFwcGVuZENoaWxkKHJlbmRlcmVkW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGFmdGVyOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcbn07XG5leHBvcnQgZGVmYXVsdCBwbGFjZUZpcnN0O1xuIiwiY29uc3QgcGxhY2VMYXN0ID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRtYWluOiBmdW5jdGlvbih0YXJnZXRFbCwgcmVuZGVyZWQpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJlbmRlcmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR0YXJnZXRFbC5hcHBlbmRDaGlsZChyZW5kZXJlZFtpXSk7XG5cdFx0fVxuXHR9LFxuXHRhZnRlcjogZnVuY3Rpb24oLyp0YXJnZXRFbCwgcmVuZGVyZWQqLykge30sXG59O1xuXG5leHBvcnQgZGVmYXVsdCBwbGFjZUxhc3Q7XG4iLCJjb25zdCByZXBsYWNlID0ge1xuXHRiZWZvcmU6IGZ1bmN0aW9uKC8qdGFyZ2V0RWwsIHJlbmRlcmVkKi8pIHt9LFxuXHRiZWZvcmVFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0bWFpbjogZnVuY3Rpb24odGFyZ2V0RWwsIHJlbmRlcmVkKSB7XG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJlZC5sZW5ndGg7IGkrKykge1xuXHRcdFx0dGFyZ2V0RWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVuZGVyZWRbaV0sIHRhcmdldEVsLm5leHRTaWJsaW5nKTtcblx0XHR9XG5cblx0fSxcblx0YWZ0ZXJFYWNoOiBmdW5jdGlvbigvKnRhcmdldEVsLCByZW5kZXJlZCovKSB7fSxcblx0YWZ0ZXI6IGZ1bmN0aW9uKHRhcmdldEVsLyosIHJlbmRlcmVkKi8pIHtcdFx0XG5cdFx0aWYgKHRhcmdldEVsLm5vZGVOYW1lICE9PSAnTlQnKXtcblx0XHRcdHRhcmdldEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGFyZ2V0RWwpO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVwbGFjZTtcbiIsImltcG9ydCBwbGFjZSBmcm9tICcuL3BsYWNlJztcbmltcG9ydCBwbGFjZUFmdGVyIGZyb20gJy4vcGxhY2VBZnRlcic7XG5pbXBvcnQgcGxhY2VCZWZvcmUgZnJvbSAnLi9wbGFjZUJlZm9yZSc7XG5pbXBvcnQgcGxhY2VGaXJzdCBmcm9tICcuL3BsYWNlRmlyc3QnO1xuaW1wb3J0IHBsYWNlTGFzdCBmcm9tICcuL3BsYWNlTGFzdCc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICcuL3JlcGxhY2UnO1xuXG5jb25zdCBub3RQbGFjZXJzID0ge1xuXHRwbGFjZTogcGxhY2UsXG5cdHBsYWNlQWZ0ZXI6IHBsYWNlQWZ0ZXIsXG5cdHBsYWNlQmVmb3JlOiBwbGFjZUJlZm9yZSxcblx0cGxhY2VGaXJzdDogcGxhY2VGaXJzdCxcblx0cGxhY2VMYXN0OiBwbGFjZUxhc3QsXG5cdHJlcGxhY2U6IHJlcGxhY2Vcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFBsYWNlcnM7XG4iLCJpbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBPUFRTIGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgbm90VGVtcGxhdGVDYWNoZSBmcm9tICcuL25vdFRlbXBsYXRlQ2FjaGUnO1xuaW1wb3J0IG5vdFJlbmRlcmVyIGZyb20gJy4vbm90UmVuZGVyZXInO1xuaW1wb3J0IG5vdFBsYWNlcnMgZnJvbSAnLi9wbGFjZXJzJztcblxuY29uc3QgTUVUQV9QQVJUUyA9IFN5bWJvbCgncGFydHMnKTtcbi8qXG5cdGlucHV0ID0ge1xuXHRcdGRhdGE6IG5vdFJlY29yZCBvciBbbm90UmVjb3JkXSxcblx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0aHRtbDogaHRtbChzdHJpbmcpLCBcdFx0Ly/RgtC10LrRgdGCINGBIGh0bWwg0LrQvtC00L7QvCDRiNCw0LHQu9C+0L3QsFxuXHRcdFx0ZWw6IEhUTUxFbGVtZW50KG9iamVjdCksIFx0Ly9ET00g0Y3Qu9C10LzQtdC90YJcblx0XHRcdHNyYzogc3JjKHN0cmluZyksXHRcdFx0Ly/RgdGB0YvQu9C60LAg0L3QsCDRhNCw0LnQuyDRgSDRiNCw0LHQu9C+0L3QvtC8XG5cdFx0XHRuYW1lOiBuYW1lKHN0cmluZylcdFx0XHQvL9C90LDQt9Cy0LDQvdC40LUg0YjQsNCx0LvQvtC90LAg0LTQu9GPINC/0L7QuNGB0LrQsCDQsiDQutGN0YjQtSBub3RUZW1wbGF0ZUNhY2hlXG5cdFx0fVxuXHRcdG9wdGlvbnM6e1xuXHRcdFx0aGVscGVyczogb2JqZWN0XG5cdFx0XHQvLyDQtdGB0LvQuCDQt9Cw0LTQsNGC0YwsINGC0L4g0YHRgNCw0LfRgyDQv9C+0YHQu9C1INC30LDQs9GA0YPQt9C60Lgg0LHRg9C00LXRgiDQvtGC0YDQtdC90LTQtdGA0LXQvdC+INGB0Y7QtNCwXG5cdFx0XHR0YXJnZXRFbDogSFRNTEVsZW1lbnQob2JqZWN0KSDQuNC70LggaHRtbCBzZWxlY3RvciAoc3RyaW5nKVxuXHRcdFx0Ly/QsCDRjdGC0L4g0LrQsNC6INCx0YPQtNC10Lwg0L/QvtC80LXRidCw0YLRjCDRgNC10LfRg9C70YzRgtCw0YIg0YDQtdC90LTQtdGA0LjQvdCz0LBcblx0XHRcdHJlbmRlckFuZDogcGxhY2VTdHlsZShzdHJpbmcpINC+0LTQuNC9INC40Lcg0LLQsNGA0LjQsNC90YLQvtCyXG5cdFx0XHRcdFx0cGxhY2VcdFx0LVx00L/QvtC80LXRidCw0LXQvCDQstC90YPRgtGA0Lgg0YbQtdC70LXQstC+0LPQviDRjdC70LXQvNC10L3RgtCwXG5cdFx0XHRcdFx0cmVwbGFjZVx0XHQtXHTQt9Cw0LzQtdC90Y/QtdC8XG5cdFx0XHRcdFx0cGxhY2VBZnRlclx0LVx00L/QvtGB0LvQtVxuXHRcdFx0XHRcdHBsYWNlQmVmb3JlXHQtXHTQtNC+XG5cdFx0XHRcdFx0cGxhY2VGaXJzdFx0LVx00LLQvdGD0YLRgNC4INC/0LXRgNCy0YvQvCDQtNC+0YfQtdGA0L3QuNC8XG5cdFx0XHRcdFx0cGxhY2VMYXN0XHQtXHTQstC90YPRgtGA0Lgg0L/QvtGB0LvQtdC00L3QuNC8INC00L7Rh9C10YDQvdC40Lxcblx0XHR9XG5cdH1cbiovXG5jbGFzcyBub3RDb21wb25lbnQgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoaW5wdXQpIHtcblx0XHRzdXBlcihpbnB1dCk7XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLnJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmluaXQoaW5wdXQpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0QnJlYWRDcnVtcHMoKXtcblx0XHRpZiAodGhpcy5vd25lcil7XG5cdFx0XHRyZXR1cm4gWy4uLnRoaXMub3duZXIuZ2V0QnJlYWRDcnVtcHMoKSwgdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBbdGhpcy5nZXRPcHRpb25zKCdpZCcpXTtcblx0XHR9XG5cdH1cblxuXHRpbml0KGlucHV0KSB7XG5cdFx0dGhpcy5pbnB1dCA9IGlucHV0O1xuXHRcdHRoaXMub3duZXIgPSBpbnB1dC5vd25lcj9pbnB1dC5vd25lcjpudWxsO1xuXHRcdHRoaXMuaW5pdE9wdGlvbnMoaW5wdXQub3B0aW9ucyA/IGlucHV0Lm9wdGlvbnMgOiB7fSk7XG5cdFx0dGhpcy5pbml0V29ya2luZyhpbnB1dCk7XG5cdFx0dGhpcy5wcmVwYXJlVGVtcGxhdGVFbGVtZW50KGlucHV0LnRlbXBsYXRlID8gaW5wdXQudGVtcGxhdGUgOiBudWxsKTtcblx0fVxuXG5cdGluaXREYXRhKHZhbCkge1xuXHRcdHRoaXMuc2V0RGF0YSh2YWwpO1xuXHR9XG5cblx0aW5pdEV2ZW50cyhsaXN0KXtcblx0XHRmb3IobGV0IHQgb2YgbGlzdCl7XG5cdFx0XHR0aGlzLm9uKC4uLnQpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRPcHRpb25zKHZhbCkge1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh2YWwpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdpZCcpKXtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygnaWQnLCBPUFRTLkNPTVBPTkVOVF9JRF9QUkVGSVggKyBNYXRoLnJhbmRvbSgpKTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ250RWwnKSl7XG5cdFx0XHR0aGlzLmluaXRNYXJrRWxlbWVudCgpO1xuXHRcdH1cblx0fVxuXG5cdGluaXRNYXJrRWxlbWVudCgpe1xuXHRcdGxldCBtYXJrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdudCcpO1xuXHRcdG1hcmtFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5nZXRPcHRpb25zKCdpZCcpKTtcblx0XHRtYXJrRWwuc2V0QXR0cmlidXRlKCdudC1yZW5kZXJlZCcsIHRydWUpO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbnRFbCcsIG1hcmtFbCk7XG5cdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpLFxuXHRcdFx0dGFyZ2V0UXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5Jyk7XG5cdFx0aWYgKHRhcmdldFF1ZXJ5KXtcblx0XHRcdGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFF1ZXJ5KTtcblx0XHRcdGlmICh0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHR0aHJvdyAnTm8gdGFyZ2V0IHRvIHBsYWNlIHJlbmRlcmVkJztcblx0XHR9ZWxzZXtcblx0XHRcdHBsYWNlci5tYWluKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSwgW21hcmtFbF0pO1xuXHRcdH1cblxuXHR9XG5cblx0aW5pdFdvcmtpbmcodmFsKSB7XG5cdFx0dGhpcy51bnNldFJlYWR5KHZhbCk7XG5cdH1cblxuXHRwcmVwYXJlVGVtcGxhdGVFbGVtZW50KHZhbCkge1xuXHRcdGlmICghdmFsKSB7XG5cdFx0XHR0aGlzLnVuc2V0UmVhZHkoKTtcblx0XHR9IGVsc2UgaWYgKHZhbC5oYXNPd25Qcm9wZXJ0eSgnaHRtbCcpICYmIHZhbC5odG1sKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KG5vdFRlbXBsYXRlQ2FjaGUud3JhcCgnJywgJycsIHZhbC5odG1sKSk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ2VsJykgJiYgdmFsLmVsKSB7XG5cdFx0XHR0aGlzLnNldFByb3RvVGVtcGxhdGVFbGVtZW50KHZhbC5lbC5jbG9uZU5vZGUodHJ1ZSkpO1xuXHRcdH0gZWxzZSBpZiAodmFsLmhhc093blByb3BlcnR5KCdzcmMnKSAmJiB2YWwuc3JjKSB7XG5cdFx0XHRub3RUZW1wbGF0ZUNhY2hlLmFkZEZyb21VUkwodmFsLnNyYywgdmFsLnNyYylcblx0XHRcdFx0LnRoZW4odGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudC5iaW5kKHRoaXMpKVxuXHRcdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0fSBlbHNlIGlmICh2YWwuaGFzT3duUHJvcGVydHkoJ25hbWUnKSAmJiB2YWwubmFtZSkge1xuXHRcdFx0dGhpcy5zZXRQcm90b1RlbXBsYXRlRWxlbWVudChub3RUZW1wbGF0ZUNhY2hlLmdldCh2YWwubmFtZSkpO1xuXHRcdH1cblx0fVxuXG5cdHNldFByb3RvVGVtcGxhdGVFbGVtZW50KGNvbnQpIHtcblx0XHRpZiAoY29udCkge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdwcm90b1RlbXBsYXRlRWxlbWVudCcsIGNvbnQpO1xuXHRcdFx0dGhpcy50cmlnZ2VyKCdyZWFkeScpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ1dyb25nIHRlbXBsYXRlIGNvbnRhaW5lciBlbGVtZW50Jyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnKTtcblx0fVxuXG5cdGdldFByb3RvVGVtcGxhdGVFbGVtZW50Q2xvbmUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncHJvdG9UZW1wbGF0ZUVsZW1lbnQnKS5jbG9uZU5vZGUodHJ1ZSk7XG5cdH1cblxuXHRnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcpO1xuXHR9XG5cblx0cmVzZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50KCkge1xuXHRcdHJldHVybiB0aGlzLnNldFdvcmtpbmcoJ3RlbXBsYXRlRWxlbWVudCcsIHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnQoKS5jbG9uZU5vZGUodHJ1ZSkpO1xuXHR9XG5cblx0c2V0UmVhZHkoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdyZWFkeScsIHRydWUpO1xuXHR9XG5cblx0dW5zZXRSZWFkeSgpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgZmFsc2UpO1xuXHR9XG5cblx0aXNSZWFkeSgpIHtcblx0XHRyZXR1cm4gdGhpcy5zZXRXb3JraW5nKCdyZWFkeScpO1xuXHR9XG5cblx0Y2xlYXJQYXJ0cygpIHtcblx0XHQvKiDQuNC30LLQtdGJ0LDQtdC8INC+0LEg0YPQtNCw0LvQtdC90LjQuCDRjdC70LXQvNC10L3RgtC+0LIgKi9cblx0XHRpZiAodGhpc1tNRVRBX1BBUlRTXSAmJiBBcnJheS5pc0FycmF5KHRoaXNbTUVUQV9QQVJUU10pICYmIHRoaXNbTUVUQV9QQVJUU10ubGVuZ3RoKSB7XG5cdFx0XHRmb3IgKGxldCB0IG9mIHRoaXNbTUVUQV9QQVJUU10pIHtcblx0XHRcdFx0aWYgKHQuZGVzdHJveSl7XG5cdFx0XHRcdFx0dC5kZXN0cm95KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5yZXNldFBhcnRzKCk7XG5cdH1cblxuXHRkZXN0cm95KCl7XG5cdFx0dGhpcy5jbGVhclBhcnRzKCk7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpICYmIHRoaXMuZ2V0T3B0aW9ucygnbnRFbCcpLnBhcmVudE5vZGUpe1xuXHRcdFx0dGhpcy5nZXRPcHRpb25zKCdudEVsJykucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmdldE9wdGlvbnMoJ250RWwnKSk7XG5cdFx0fVxuXHRcdHRoaXMuZGVhZCA9IHRydWU7XG5cdFx0dGhpcy5vZmZBbGwoKTtcblx0fVxuXG5cdHJlc2V0UGFydHMoKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXSA9IFtdO1xuXHR9XG5cblx0Z2V0UGFydHMoKSB7XG5cdFx0cmV0dXJuIHRoaXNbTUVUQV9QQVJUU107XG5cdH1cblxuXHRhZGRQYXJ0KHRlbXBsYXRlKSB7XG5cdFx0dGhpc1tNRVRBX1BBUlRTXS5wdXNoKHRlbXBsYXRlKTtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLmNsZWFyUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cblxuXHR1cGRhdGUoKXtcblx0XHR0aGlzLnJlbW92ZU9ic29sZXRlUGFydHMoKTtcblx0XHRpZiAodGhpcy5nZXRQcm90b1RlbXBsYXRlRWxlbWVudCgpKSB7XG5cdFx0XHR0aGlzLmZvckVhY2hEYXRhKHRoaXMucmVuZGVyUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHRoaXMucGxhY2VSZW5kZXJlZCgpO1xuXHRcdH1cblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyVXBkYXRlJyk7XG5cdH1cblxuXHRwbGFjZVJlbmRlcmVkKCl7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSkge1xuXHRcdFx0bGV0IHBsYWNlciA9IHRoaXMuZ2V0UGxhY2VyKHRoaXMuZ2V0T3B0aW9ucygncmVuZGVyQW5kJykpO1xuXHRcdFx0cGxhY2VyLmJlZm9yZSh0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpO1xuXHRcdFx0dGhpcy5mb3JFYWNoRGF0YSh0aGlzLnBsYWNlUGFydC5iaW5kKHRoaXMpKTtcblx0XHRcdHBsYWNlci5hZnRlcih0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRub3RDb21tb24uZXJyb3IoJ25vIHRhcmdldCBlbGVtZW50Jyk7XG5cdFx0fVxuXHR9XG5cblx0cGxhY2VQYXJ0KGRhdGEsIGluZGV4KXtcblx0XHRsZXQgcGFydCA9IHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSxcblx0XHRcdG5vZGVzID0gcGFydCYmcGFydC5nZXRTdGFzaD9wYXJ0LmdldFN0YXNoKCk6W10sXG5cdFx0XHR0YXJnZXRFbCxcblx0XHRcdGxhc3ROb2RlLFxuXHRcdFx0cGxhY2VyO1xuXHRcdGlmIChpbmRleCA9PT0gMCl7XG5cdFx0XHRwbGFjZXIgPSB0aGlzLmdldFBsYWNlcih0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckFuZCcpKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0cGxhY2VyID0gdGhpcy5nZXRQbGFjZXIoT1BUUy5ERUZBVUxUX1BMQUNFUl9MT09QKTtcblx0XHRcdHRhcmdldEVsID0gdGhpcy5nZXRXb3JraW5nKCdsYXN0UGxhY2VkTm9kZScpO1xuXHRcdH1cblx0XHRwbGFjZXIubWFpbih0YXJnZXRFbCwgbm9kZXMpO1xuXHRcdGxhc3ROb2RlID0gdGFyZ2V0RWw7XG5cdFx0Zm9yKGxldCB0IG9mIG5vZGVzKXtcblx0XHRcdGlmICh0Lm5vZGVUeXBlID09PSAxKXtcblx0XHRcdFx0bGFzdE5vZGUgPSB0O1xuXHRcdFx0XHRsYXN0Tm9kZS5zZXRBdHRyaWJ1dGUoJ250LWNvbXBvbmVudCcsIHRoaXMuZ2V0T3B0aW9ucygnaWQnKSk7XG5cdFx0XHRcdGxhc3ROb2RlLnNldEF0dHJpYnV0ZSgnbnQtcGFydCcsIHBhcnQuZ2V0V29ya2luZygncGFydElkJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2xhc3RQbGFjZWROb2RlJywgbGFzdE5vZGUpO1xuXHR9XG5cblx0Z2V0UGxhY2VyKG1ldGhvZCkge1xuXHRcdC8vbm90Q29tbW9uLmxvZygnc2VhcmNoaW5nIGZvciBwbGFjZXInLCBtZXRob2QpO1xuXHRcdGlmIChub3RQbGFjZXJzLmhhc093blByb3BlcnR5KG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW21ldGhvZF07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBub3RQbGFjZXJzW09QVFMuREVGQVVMVF9QTEFDRVJdO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hEYXRhKGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoKSkpIHtcblx0XHRcdGZvciAobGV0IHQgPSAwOyB0IDwgdGhpcy5nZXREYXRhKCkubGVuZ3RoOyB0KyspIHtcblx0XHRcdFx0ZnVuYyh0aGlzLmdldERhdGEoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZ1bmModGhpcy5nZXREYXRhKCksIDApO1xuXHRcdH1cblx0fVxuXG5cdGZvckVhY2hQYXJ0KGZ1bmMpIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdldFBhcnRzKCkpKSB7XG5cdFx0XHRmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKykge1xuXHRcdFx0XHRmdW5jKHRoaXMuZ2V0UGFydHMoKVt0XSwgdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHTQtdGB0LvQuCDRgSDQtNCw0L3QvdGL0LzQuCDQvdC1INGB0LLRj9C30LDQvSDRgNC10L3QtNC10YDQtdGAIC0g0YHQvtC30LTQsNC10Lxcblx0Ki9cblxuXHRyZW5kZXJQYXJ0KGRhdGEpIHtcblx0XHRpZiAoIXRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSkge1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCdjcmVhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0bGV0IHJlbmRlcmVyID0gbmV3IG5vdFJlbmRlcmVyKHtcblx0XHRcdFx0ZGF0YTogZGF0YSxcblx0XHRcdFx0dGVtcGxhdGU6IHRoaXMuZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZS5iaW5kKHRoaXMpLFxuXHRcdFx0XHRvcHRpb25zOiB0aGlzLmdldE9wdGlvbnMoKSxcblx0XHRcdFx0Y29tcG9uZW50OiB0aGlzXG5cdFx0XHR9KTtcblx0XHRcdC8vcmVuZGVyZXIub24oJ29ic29sZXRlJywgdGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cdFx0XHR0aGlzLmFkZFBhcnQocmVuZGVyZXIpO1xuXHRcdH1lbHNle1xuXHRcdFx0Ly9ub3RDb21tb24ubG9nKCd1cGRhdGluZyBwYXJ0IHJlbmRlcicpO1xuXHRcdFx0dGhpcy51cGRhdGVQYXJ0KHRoaXMuZ2V0UGFydEJ5RGF0YShkYXRhKSk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGFydChwYXJ0KXtcblx0XHRwYXJ0LnVwZGF0ZSgpO1xuXHR9XG5cblx0cmVtb3ZlT2Jzb2xldGVQYXJ0cygpIHtcblx0XHQvL9C60L7QvdCy0LXQtdGAINC/0L7QuNGB0Log0LDQutGC0YPQsNC70YzQvdGL0YUgLSDRg9C00LDQu9C10L3QuNC1INC+0YHRgtCw0LvRjNC90YvRhVxuXHRcdG5vdENvbW1vbi5waXBlKFxuXHRcdFx0dW5kZWZpbmVkLCAvLyBwYXJ0cyB0byBzZWFyY2ggaW4sIGNhbiBiZSAndW5kZWZpbmVkJ1xuXHRcdFx0W1xuXHRcdFx0XHR0aGlzLmZpbmRBY3R1YWxQYXJ0cy5iaW5kKHRoaXMpLCAvL2ZpcnN0IHJvdW5kLCBzZWFyY2ggZm9yIG9ic29sZXRlXG5cdFx0XHRcdHRoaXMucmVtb3ZlTm90QWN0dWFsUGFydHMuYmluZCh0aGlzKSwgLy9yZW1vdmUgJ2VtXG5cdFx0XHRdXG5cdFx0KTtcblx0fVxuXG5cdC8qXG5cdFx00LXRgdGC0Ywg0LTQsNC90L3Ri9C1INC4INC10YHRgtGMINGA0LXQvdC00LXRgNC10YAgLSDQt9C90LDRh9C40YIg0LDQutGC0YPQsNC70YzQvdC+LFxuXHRcdNC90LXRgiDQtNCw0L3QvdGL0YUg0Lgg0LXRgdGC0Ywg0YDQtdC90LTQtdGA0LXRgCAtINC30L3QsNGH0LjRgiDRgdGC0LDRgNGM0ZFcblx0Ki9cblxuXHRmaW5kQWN0dWFsUGFydHMoKSB7XG5cdFx0bGV0IGFjdHVhbFBhcnRzID0gW107XG5cdFx0dGhpcy5mb3JFYWNoRGF0YSgoZGF0YS8qLCBpbmRleCovKT0+e1xuXHRcdFx0bGV0IHBhcnQgPSB0aGlzLmdldFBhcnRCeURhdGEoZGF0YSk7XG5cdFx0XHRpZiAocGFydCl7XG5cdFx0XHRcdGFjdHVhbFBhcnRzLnB1c2gocGFydCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGFjdHVhbFBhcnRzO1xuXHR9XG5cblx0Lypcblx0XHTRg9C00LDQu9GP0LXQvCDQstGB0LUg0LrRgNC+0LzQtSDQsNC60YLRg9Cw0LvRjNC90YvRhVxuXHQqL1xuXHRyZW1vdmVOb3RBY3R1YWxQYXJ0cyhhY3R1YWxQYXJ0cyl7XG5cdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0UGFydHMoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAoYWN0dWFsUGFydHMuaW5kZXhPZih0aGlzLmdldFBhcnRzKClbdF0pID09PSAtMSl7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKVt0XS5kZXN0cm95KCk7XG5cdFx0XHRcdHRoaXMuZ2V0UGFydHMoKS5zcGxpY2UodCwgMSk7XG5cdFx0XHRcdHQtLTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRnZXRQYXJ0QnlEYXRhKGRhdGEpIHtcblx0XHRmb3IgKGxldCB0IGluIHRoaXMuZ2V0UGFydHMoKSkge1xuXHRcdFx0aWYgKHRoaXMuZ2V0UGFydHMoKVt0XS5pc0RhdGEoZGF0YSkpIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UGFydHMoKVt0XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0c2hvdygpe1xuXG5cdH1cblxuXHRoaWRlKCl7XG5cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBub3RDb21wb25lbnQ7XG4iLCJpbXBvcnQgbm90Q29tbW9uIGZyb20gJy4vY29tbW9uJztcbmltcG9ydCBub3RCYXNlIGZyb20gJy4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4vbm90UGF0aCc7XG5cbmNvbnN0IE9QVF9ERUZBVUxUX0NPTlRBSU5FUl9TRUxFQ1RPUiA9ICcucGFnZS1jb250ZW50Jyxcblx0T1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCA9ICcuaHRtbCcsXG5cdE9QVF9ERUZBVUxUX1ZJRVdfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMID0gdHJ1ZSxcblx0T1BUX0RFRkFVTFRfUExVUkFMX05BTUUgPSAnTW9kZWxzJyxcblx0T1BUX0RFRkFVTFRfU0lOR0xFX05BTUUgPSAnTW9kZWwnLFxuXHRPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSA9ICdtYWluJyxcblx0T1BUX0RFRkFVTFRfUkVOREVSX0FORCA9ICdwbGFjZSc7XG5cbmNsYXNzIG5vdENvbnRyb2xsZXIgZXh0ZW5kcyBub3RCYXNlIHtcblx0Y29uc3RydWN0b3IoYXBwKSB7XG5cdFx0c3VwZXIoKTtcblx0XHRub3RDb21tb24ubG9nKCdzdGFydCBjb250cm9sbGVyJyk7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5zZXRXb3JraW5nKHtcblx0XHRcdHJlYWR5OiBmYWxzZSxcblx0XHRcdHZpZXdzOiB7fSxcblx0XHRcdGxpYnM6e30sXG5cdFx0XHR2aWV3TmFtZTogT1BUX0RFRkFVTFRfVklFV19OQU1FLFxuXHRcdFx0aGVscGVyczoge31cblx0XHR9KTtcblx0XHR0aGlzLnNldERhdGEoe30pO1xuXHRcdHRoaXMuc2V0T3B0aW9ucyh7XG5cdFx0XHRtb2R1bGVOYW1lOiBPUFRfREVGQVVMVF9NT0RVTEVfTkFNRSxcblx0XHRcdGNvbnRhaW5lclNlbGVjdG9yOiBPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IsXG5cdFx0XHRwcmVmaXg6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhdGhzLm1vZHVsZScpLFxuXHRcdFx0cG9zdGZpeDogT1BUX0RFRkFVTFRfVklFV1NfUE9TVEZJWCxcblx0XHRcdHJlbmRlckZyb21VUkw6IE9QVF9ERUZBVUxUX1JFTkRFUl9GUk9NX1VSTCxcblx0XHRcdG5hbWVzOntcblx0XHRcdFx0cGx1cmFsOk9QVF9ERUZBVUxUX1BMVVJBTF9OQU1FLFxuXHRcdFx0XHRzaW5nbGU6IE9QVF9ERUZBVUxUX1NJTkdMRV9OQU1FXG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5vbigncmVhZHknLCB0aGlzLmluaXRSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0Lypcblx0XHQgICAg0YHRgNCw0LfRgyDQtNC10LvQsNC10Lwg0LTQvtGB0YLRg9C/0L3Ri9C80Lgg0LzQvtC00LXQu9C4IG5vdFJlY29yZCDQuNC3IG5jYENvbnRyb2xsZXJOYW1lYCDQsdGD0LTRg9GCINC00L7RgdGC0YPQv9C90Ysg0LrQsNC6IHRoaXMubnJgTW9kZWxOYW1lYFxuXHRcdCovXG5cdFx0bGV0IGludGVyZmFjZXMgPSB0aGlzLmFwcC5nZXRJbnRlcmZhY2VzKCk7XG5cdFx0dGhpcy5tYWtlID0ge307XG5cdFx0Zm9yIChsZXQgdCBpbiBpbnRlcmZhY2VzKSB7XG5cdFx0XHRpZiAoaW50ZXJmYWNlcy5oYXNPd25Qcm9wZXJ0eSh0KSl7XG5cdFx0XHRcdHRoaXMubWFrZVt0XSA9IGludGVyZmFjZXNbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0aW5pdFJlbmRlcigpe1xuXHRcdHRoaXMucmVuZGVyKHRoaXMuZ2V0V29ya2luZygndmlld05hbWUnKSwgdGhpcy5nZXREYXRhKCksIHRoaXMuZ2V0V29ya2luZygnaGVscGVycycpKTtcblx0fVxuXG5cdHJlbmRlcih2aWV3TmFtZSA9J2RlZmF1bHQnIC8qIHZpZXcgbmFtZSAqLywgZGF0YSA9IHt9IC8qIGRhdGEgZm9yIG5vdFRlbXBsYXRlKi8gLCBoZWxwZXJzID0ge30vKiBjb3VsZCBiZSBub3QgcmVwcmVzZW50ZWQgKi8pIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdHZhciB2aWV3ID0gdGhpcy5nZXRWaWV3KHZpZXdOYW1lKTtcblxuXHRcdFx0aWYgKHR5cGVvZiB2aWV3ID09PSAndW5kZWZpbmVkJyB8fCB2aWV3ID09PSBudWxsKSB7XG5cdFx0XHRcdHJlamVjdCgnTm8gdmlldyBmb3VuZCcsIHZpZXdOYW1lKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR2aWV3ID0gbm90Q29tbW9uLmV4dGVuZCh7fSwgdmlldyk7XG5cdFx0XHRcdC8vINC10YHQu9C4IHBsYWNlINC90LUg0YPQutCw0LfQsNC90L4sINGH0YLQviDQstC+0LfQvNC+0LbQvdC+INC4INGA0LDQt9GD0LzQvdC+INC/0YDQuCDQvdC1INGB0YPRidC10YHRgtCy0L7QstCw0L3QuNC4XG5cdFx0XHRcdC8vINGN0LvQtdC80LXQvdGC0LAsINC90L4g0LjQt9Cy0LXRgdGC0L3QvtC8INC40LTQtdC90YLQuNGE0LjQutCw0YLQvtGA0LVcblx0XHRcdFx0aWYgKCgodHlwZW9mIHZpZXcudGFyZ2V0RWwgPT09ICd1bmRlZmluZWQnKSB8fCAodmlldy50YXJnZXRFbCA9PT0gbnVsbCkpICYmICh0eXBlb2Ygdmlldy50YXJnZXRRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmlldy50YXJnZXRRdWVyeSAhPT0gbnVsbCAmJiB2aWV3LnRhcmdldFF1ZXJ5Lmxlbmd0aCA+IDApKSB7XG5cdFx0XHRcdFx0dmlldy50YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iodmlldy50YXJnZXRRdWVyeSk7XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHZpZXcudGFyZ2V0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmlldy5kYXRhID0gZGF0YTtcblx0XHRcdFx0aWYgKHR5cGVvZiB2aWV3LmhlbHBlcnMgIT09ICd1bmRlZmluZWQnICYmIHZpZXcuaGVscGVycyAhPT0gbnVsbCAmJiBPYmplY3Qua2V5cyh2aWV3LmhlbHBlcnMpLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHR2aWV3LmhlbHBlcnMgPSBub3RDb21tb24uZXh0ZW5kKHZpZXcuaGVscGVycywgaGVscGVycyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmlldy5oZWxwZXJzID0gaGVscGVycztcblx0XHRcdFx0fVxuXHRcdFx0XHQvL9C10YHQu9C4INC90YPQttC90L4g0LfQsNCz0YDRg9C20LDRgtGMINGI0LDQsdC70L7QvdGLXG5cdFx0XHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ3JlbmRlckZyb21VUkwnKSkge1xuXHRcdFx0XHRcdC8v0Lgg0LDQtNGA0LXRgSDQvdC1INGD0LrQsNC30LDQvVxuXHRcdFx0XHRcdGlmICh0eXBlb2Ygdmlldy50ZW1wbGF0ZVVSTCA9PT0gJ3VuZGVmaW5lZCcgfHwgdmlldy50ZW1wbGF0ZVVSTCA9PSBudWxsIHx8IHZpZXcudGVtcGxhdGVVUkwubGVuZ3RoID09IDApIHtcblx0XHRcdFx0XHRcdGxldCBwcmVmaXggPSAodmlldy5jb21tb24gPyB0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5jb21tb24nKTogdGhpcy5nZXRNb2R1bGVQcmVmaXgoKSksXG5cdFx0XHRcdFx0XHRcdG5hbWUgPSAoKHR5cGVvZiB2aWV3Lm5hbWUgIT09ICd1bmRlZmluZWQnICYmIHZpZXcubmFtZSAhPT0gbnVsbCAmJiB2aWV3Lm5hbWUubGVuZ3RoID4gMCkgPyB2aWV3Lm5hbWUgOiB2aWV3TmFtZSksXG5cdFx0XHRcdFx0XHRcdHBvc3RmaXggPSB0aGlzLmdldE9wdGlvbnMoJ3Bvc3RmaXgnKTtcblx0XHRcdFx0XHRcdC8v0LPQtdC90LXRgNC40YDRg9C10Lwg0LDQtNGA0LXRgSDQv9C+INGI0LDQsdC70L7QvdGDXG5cdFx0XHRcdFx0XHR2aWV3LnRlbXBsYXRlVVJMID0gIFtwcmVmaXgsIG5hbWVdLmpvaW4oJy8nKSArIHBvc3RmaXg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8v0LAg0LXRgdC70Lgg0LXRgdGC0Ywg0L3QsNC30LLQsNC90LjQtSDRiNCw0LHQu9C+0L3QsCwg0YLQvlxuXHRcdFx0XHRcdGlmICh2aWV3Lmhhc093blByb3BlcnR5KCd0ZW1wbGF0ZU5hbWUnKSkge1xuXHRcdFx0XHRcdFx0Ly8uLi5cblx0XHRcdFx0XHRcdHZpZXcudGVtcGxhdGVOYW1lID0gdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSArIHZpZXcudGVtcGxhdGVOYW1lICsgdGhpcy5nZXRPcHRpb25zKCdwb3N0Zml4Jyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50JywgbmV3IG5vdENvbXBvbmVudCh7XG5cdFx0XHRcdFx0ZGF0YSxcblx0XHRcdFx0XHR0ZW1wbGF0ZTp7XG5cdFx0XHRcdFx0XHRuYW1lOiB2aWV3LnRlbXBsYXRlTmFtZSxcblx0XHRcdFx0XHRcdHNyYzogdmlldy50ZW1wbGF0ZVVSTCxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGV2ZW50czpbWydhZnRlclJlbmRlcicsIHJlc29sdmVdXSxcblx0XHRcdFx0XHRvcHRpb25zOntcblx0XHRcdFx0XHRcdHRhcmdldEVsOiB2aWV3LnRhcmdldEVsLFxuXHRcdFx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0XHRcdHJlbmRlckFuZDogdmlldy5yZW5kZXJBbmQgfHwgT1BUX0RFRkFVTFRfUkVOREVSX0FORFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSkpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBcHAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwO1xuXHR9XG5cblx0c2V0TW9kZWwobW9kZWwpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ21vZGVsJywgbW9kZWwpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Z2V0TW9kZWwoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc2V0V29ya2luZygnbW9kZWwnKTtcblx0fVxuXG5cdHNldFJlYWR5KHZhbCA9IHRydWUpIHtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3JlYWR5JywgdmFsKTtcblx0XHR2YWwgPyB0aGlzLnRyaWdnZXIoJ3JlYWR5JykgOiB0aGlzLnRyaWdnZXIoJ2J1c3knKTtcblx0fVxuXG5cdHNldFZpZXcobmFtZSwgdmlldyl7XG5cdFx0dGhpcy5zZXRXb3JraW5nKG5vdFBhdGguam9pbigndmlld3MnLCBuYW1lKSwgdmlldyk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRzZXRWaWV3cyh2aWV3cyl7XG5cdFx0Zm9yKGxldCB0IGluIHZpZXdzKXtcblx0XHRcdHRoaXMuc2V0V29ya2luZyhub3RQYXRoLmpvaW4oJ3ZpZXdzJywgdCksIHZpZXdzW3RdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRWaWV3KG5hbWUgPSAnZGVmYXVsdCcpe1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcobm90UGF0aC5qb2luKCd2aWV3cycsIG5hbWUpKTtcblx0fVxuXG5cdHNldE1vZHVsZU5hbWUodmFsKSB7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdtb2R1bGVOYW1lJywgdmFsKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdGdldE1vZHVsZU5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygnbW9kdWxlTmFtZScpO1xuXHR9XG5cblx0Z2V0TW9kdWxlUHJlZml4KCl7XG5cdFx0cmV0dXJuIFt0aGlzLmFwcC5nZXRPcHRpb25zKCdwYXRocy5tb2R1bGVzJyksIHRoaXMuZ2V0TW9kdWxlTmFtZSgpXS5qb2luKCcvJyk7XG5cdH1cblxuXHRwcmVsb2FkTGliKGxpc3QgPSB7fSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRpZih0eXBlb2YgbGlzdCAhPT0gJ29iamVjdCcpe1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0dGhpcy5zZXRXb3JraW5nKCdsb2FkaW5nJywgW10pO1xuXHRcdFx0XHRmb3IobGV0IHQgaW4gbGlzdCl7XG5cdFx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykucHVzaChsaXN0W3RdKTtcblx0XHRcdFx0XHR0aGlzLm1ha2VbbGlzdFt0XV0oe30pLiRsaXN0QWxsKClcblx0XHRcdFx0XHRcdC50aGVuKChkYXRhKT0+e1xuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygnbGlicycpKXtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ2xpYnMnLCB7fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRPcHRpb25zKCdsaWJzJylbdF0gPSBkYXRhO1xuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pID4gLTEpe1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnbG9hZGluZycpLnNwbGljZSh0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5pbmRleE9mKGxpc3RbdF0pLCAxKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZih0aGlzLmdldFdvcmtpbmcoJ2xvYWRpbmcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRub3RDb21tb24ucmVwb3J0KGVycik7XG5cdFx0XHRcdFx0XHRcdHJlamVjdCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCdsb2FkaW5nJykubGVuZ3RoID09PSAwKXtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHF1ZWVVcGxvYWQobmFtZSwgbGlzdCl7XG5cdFx0Ly9oYXNoIChmaWVsZE5hbWU9PmZpbGVzTGlzdClcblx0XHRpZighdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRRdWVlJykpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd1cGxvYWRRdWVlJywge30pO1xuXHRcdH1cblx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZFF1ZWUnKVtuYW1lXSA9IGxpc3Q7XG5cdH1cblxuXHRleGVjVXBsb2FkcyhpdGVtKXtcblx0XHRsZXQgbGlzdCA9IHRoaXMuZ2V0V29ya2luZygndXBsb2FkUXVlZScpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0aWYodHlwZW9mIGxpc3QgIT09ICdvYmplY3QnKXtcblx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLnNldFdvcmtpbmcoJ3VwbG9hZGluZycsIHt9KTtcblx0XHRcdFx0Zm9yKGxldCB0IGluIGxpc3Qpe1xuXHRcdFx0XHRcdGxldCBmaWVsZEZpbGVzID0gbGlzdFt0XTtcblx0XHRcdFx0XHRpZiAoZmllbGRGaWxlcy5sZW5ndGggPiAxKXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSBbXTtcblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdGl0ZW1bdF0gPSAnJztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yKGxldCBmID0gMDsgZiA8IGZpZWxkRmlsZXMubGVuZ3RoOyBmKyspe1xuXHRcdFx0XHRcdFx0aWYoIXRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdID0gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJylbdF0rKztcblx0XHRcdFx0XHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3VwbG9hZGVyJylcblx0XHRcdFx0XHRcdFx0LnVwbG9hZChmaWVsZEZpbGVzW2ZdKVxuXHRcdFx0XHRcdFx0XHQudGhlbigoc2F2ZWRGaWxlKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZmlsZSB1cGxvYWRlZCcsIHQsZiwgc2F2ZWRGaWxlKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpW3RdLS07XG5cdFx0XHRcdFx0XHRcdFx0aWYodGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XSA9PT0gMCl7XG5cdFx0XHRcdFx0XHRcdFx0XHRkZWxldGUgdGhpcy5nZXRXb3JraW5nKCd1cGxvYWRpbmcnKVt0XTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheShpdGVtW2ZdKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRpdGVtW3RdLnB1c2goc2F2ZWRGaWxlLmhhc2gpO1xuXHRcdFx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRcdFx0aXRlbVt0XSA9IHNhdmVkRmlsZS5oYXNoO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRpZihPYmplY3Qua2V5cyh0aGlzLmdldFdvcmtpbmcoJ3VwbG9hZGluZycpKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5jYXRjaCgoZXJyKT0+e1xuXHRcdFx0XHRcdFx0XHRcdG5vdENvbW1vbi5yZXBvcnQoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKE9iamVjdC5rZXlzKHRoaXMuZ2V0V29ya2luZygndXBsb2FkaW5nJykpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHRcdFx0cmVzb2x2ZShpdGVtKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0b25BZnRlclJlbmRlcigpe1xuXHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdENvbnRyb2xsZXI7XG4iLCJpbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4uL25vdFJlY29yZCc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90QmFzZSBmcm9tICcuLi9ub3RCYXNlJztcbmltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGgnO1xuXG5jb25zdCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCA9ICdmb3JtXycsXG5cdE9QVF9ERUZBVUxUX1JPTEVfTkFNRSA9ICdkZWZhdWx0Jyxcblx0T1BUX0RFRkFVTFRfRk9STV9USVRMRSA9ICdGb3JtIGRlZmF1bHQgdGl0bGUnLFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OID0ge30sXG5cdE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUID0gWydvcHRpb25zJywgJ21hbmlmZXN0JywgJ2FwcCddO1xuXG5jbGFzcyBub3RGb3JtIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdwcmVmaXgnKSkge1xuXHRcdFx0dGhpcy5zZXRPcHRpb25zKCdwcmVmaXgnLCBPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCk7XG5cdFx0fVxuXHRcdHRoaXMuc2V0V29ya2luZygnY29tcG9uZW50cycsIFtdKTtcblx0XHRpZiAoIXRoaXMuZ2V0RGF0YSgpLmlzUmVjb3JkKSB7XG5cdFx0XHR0aGlzLnNldERhdGEobmV3IG5vdFJlY29yZCh7fSwgdGhpcy5nZXREYXRhKCkpKTtcblx0XHR9XG5cdFx0dGhpcy5vbignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLm9uKCdjYW5jZWwnLCB0aGlzLm9uQ2FuY2VsLmJpbmQodGhpcykpO1xuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGb3JtRmllbGRzTGlzdCgpIHtcblx0XHRsZXQgYWN0aW9uRGF0YSA9IHRoaXMuZ2V0QWN0aW9uRGF0YSgpLFxuXHRcdFx0bGlzdCA9IFtdLFxuXHRcdFx0cm9sZSA9IHRoaXMuZ2V0T3B0aW9ucygncm9sZScsIE9QVF9ERUZBVUxUX1JPTEVfTkFNRSk7XG5cdFx0aWYgKGFjdGlvbkRhdGEpIHtcblxuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdC8qXG5cdFx0UmVuZGVyaW5nXG5cdCovXG5cblx0cmVuZGVyKCkge1xuXHRcdHRoaXMucmVuZGVyV3JhcHBlcigpO1xuXHR9XG5cblx0Z2V0UGFydFRlbXBsYXRlTmFtZShmb3JtUGFydCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykgKyBmb3JtUGFydDtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0V29ya2luZygnd3JhcHBlcicpKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGlucHV0ID0ge1xuXHRcdFx0XHRkYXRhOiB0aGlzLmdldFdyYXBwZXJEYXRhKCksXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKCd3cmFwcGVyJylcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpLFxuXHRcdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJyksXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRpZDogdGhpcy5nZXRPcHRpb25zKCdpZCcpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlclJlbmRlcicsIHRoaXMuYmluZEZvcm1FdmVudHMuYmluZCh0aGlzKV0sXG5cdFx0XHRcdFx0W1snYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJDb21wb25lbnRzLmJpbmQodGhpcyldXG5cdFx0XHRcdF1cblx0XHRcdH07XG5cdFx0XHRsZXQgd3JhcHBlciA9IG5ldyBub3RDb21wb25lbnQoaW5wdXQpO1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCd3cmFwcGVyJywgd3JhcHBlcik7XG5cdFx0fVxuXHR9XG5cblx0Z2V0V3JhcHBlckRhdGEoKSB7XG5cdFx0bGV0IGFjdGlvbkRhdGEgPSB0aGlzLmdldEFjdGlvbkRhdGEoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGU6IGFjdGlvbkRhdGEudGl0bGUgPyBhY3Rpb25EYXRhLnRpdGxlIDogT1BUX0RFRkFVTFRfRk9STV9USVRMRVxuXHRcdH07XG5cdH1cblxuXHRyZW5kZXJDb21wb25lbnRzKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKSAmJiB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGgpe1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLmxlbmd0aDsgdCsrKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0Zm9yKGxldCB0ID0gMDsgdCA8IHRoaXMuZ2V0Rm9ybUZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZvcm1GaWVsZHNMaXN0KClbdF07XG5cdFx0XHRcdHRoaXMuYWRkRmllbGRDb21wb25lbnQoZmllbGROYW1lKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjbGVhckZpZWxkc0NvbXBvbmVudHMoKSB7XG5cdFx0bGV0IGNvbXBzID0gdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJyk7XG5cdFx0d2hpbGUgKGNvbXBzLmxlbmd0aCA+IDApIHtcblx0XHRcdGNvbXBzWzBdLmNvbXBvbmVudC5kZXN0cm95KCk7XG5cdFx0XHRjb21wcy5zcGxpY2UoMCwgMSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzTGlicygpe1xuXHRcdGxldCByZXN1bHQgPSB7XG5cdFx0XHRvcHRpb25zOiB7fSxcblx0XHRcdG1hbmlmZXN0OiB7fSxcblx0XHRcdGFwcDoge30sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5nZXRPcHRpb25zKCdmaWVsZHMnKSkge1xuXHRcdFx0cmVzdWx0Lm9wdGlvbnMgPSB0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAobm90Q29tbW9uLmdldEFwcCgpICYmIG5vdENvbW1vbi5nZXRBcHAoKS5nZXRPcHRpb25zKCdmaWVsZHMnKSl7XG5cdFx0XHRyZXN1bHQuYXBwID0gbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXREYXRhKCkuaXNSZWNvcmQgJiYgdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKSl7XG5cdFx0XHRyZXN1bHQubWFuaWZlc3QgPSB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpLmZpZWxkcztcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdGdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSB7XG5cdFx0bGV0IGRlZiA9IE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT04sXG5cdFx0XHRmaWVsZHNMaWJzID0gdGhpcy5nZXRGaWVsZHNMaWJzKCk7XG5cdFx0Zm9yKGxldCB0IG9mIE9QVF9ERUZBVUxUX0ZJRUxEX0RFRklOSVRJT05fU09VUkNFU19QUklPUklUWV9MSVNUKXtcblx0XHRcdGlmIChmaWVsZHNMaWJzLmhhc093blByb3BlcnR5KHQpICYmIGZpZWxkc0xpYnNbdF0uaGFzT3duUHJvcGVydHkoZmllbGROYW1lKSl7XG5cdFx0XHRcdHJldHVybiBmaWVsZHNMaWJzW3RdW2ZpZWxkTmFtZV07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkZWY7XG5cdH1cblxuXHRhZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpIHtcblx0XHRsZXQgZmllbGRUeXBlID0gdGhpcy5nZXRGaWVsZHNEZWZpbml0aW9uKGZpZWxkTmFtZSk7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKT0+e1xuXHRcdFx0XHRyZXR1cm4gcGFyYW1zLml0ZW0udmFsdWUgPT09IHRoaXMuZ2V0RGF0YShmaWVsZE5hbWUpO1xuXHRcdFx0fSxcblx0XHRcdGZpZWxkOiByZWMuZmllbGQsXG5cdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKVxuXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0Rm9ybVRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCcsXG5cdFx0XHRcdGV2ZW50czpbXG5cdFx0XHRcdFx0WydhZnRlckRhdGFDaGFuZ2UnLCB0aGlzLmNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMuYmluZCh0aGlzKV1cblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpLnB1c2gocmVjKTtcblx0fVxuXG5cdGNvbGxlY3REYXRhRnJvbUNvbXBvbmVudHMocGFyYW1zKXtcblx0XHRub3RDb21tb24ubG9nKCdjb2xsZWN0IGRhdGEgZnJvbSBjb21wb25lbnRzJywgcGFyYW1zKTtcblx0fVxuXG5cdGdldEZvcm1UYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHRjb2xsZWN0RGF0YSgpIHtcblx0XHQvL2xldCBkYXRhID0gdGhpcy5jb2xsZWN0RGF0YUZyb21Db21wb25lbnRzLmJpbmQodGhpcyk7XG5cdH1cblxuXHRiaW5kRm9ybUV2ZW50cygpe1xuXHRcdGxldCB0YXJnZXRRdWVyeSA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKTtcblx0XHRpZih0YXJnZXRRdWVyeSl7XG5cdFx0XHRsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRRdWVyeSk7XG5cdFx0XHRpZih0YXJnZXQpe1xuXHRcdFx0XHR0aGlzLnNldE9wdGlvbnMoJ3RhcmdldEVsJywgdGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKSl7XG5cdFx0XHRsZXRcdGZvcm0gPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcignZm9ybScpO1xuXHRcdFx0aWYoZm9ybSl7XG5cdFx0XHRcdGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgdGhpcy5vblN1Ym1pdC5iaW5kKHRoaXMpKTtcblx0XHRcdFx0Zm9ybS5hZGRFdmVudExpc3RlbmVyKCdyZXNldCcsIHRoaXMub25SZXNldC5iaW5kKHRoaXMpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHRFdmVudCBoYW5kbGVyc1xuXHQqL1xuXG5cdG9uU3VibWl0KCkge1xuXG5cdH1cblxuXHRvbkNhbmNlbCgpIHtcblxuXHR9XG5cblx0b25SZXNldCgpIHtcblxuXHR9XG5cblx0Z2V0RmllbGRzKCkge1xuXG5cdH1cblxuXHRhZGRGaWVsZCgpIHtcblxuXHR9XG5cblx0cmVtb3ZlRmllbGQoKSB7XG5cblx0fVxuXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90Rm9ybTtcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IG5vdFJlY29yZCBmcm9tICcuLi9ub3RSZWNvcmQnO1xuaW1wb3J0IG5vdEZvcm0gZnJvbSAnLi4vY29tcG9uZW50cy9ub3RGb3JtLmpzJztcblxuY29uc3QgT1BUX0RFRkFVTFRfVklFVyA9ICdlZGl0Jyxcblx0T1BUX0RFRkFVTFRfQUNUSU9OID0gJ2NyZWF0ZScsXG5cdE9QVF9ERUZBVUxUX0lURU0gPSB7XG5cdFx0X2lkOiBudWxsLFxuXHRcdHRpdGxlOiAnVGl0bGUnLFxuXHRcdHZhbHVlOiAnVmFsdWUnXG5cdH07XG5cbmNsYXNzIENSVURDcmVhdGUgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBDcmVhdGUnKTtcblx0XHR0aGlzLnNldFZpZXdzKHtcblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuXHRcdFx0XHRjb21tb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5jb21tb24nKSB8fCB0cnVlLFxuXHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnByZWxvYWQnKSlcblx0XHRcdC50aGVuKHRoaXMuaW5pdERhdGEuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJGb3JtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRjcmVhdGVEZWZhdWx0KCkge1xuXHRcdGlmICh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuZGVmYXVsdEl0ZW0nKSAmJiB0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkgJiYgdGhpcy5wYXJlbnQubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnQubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKG5vdENvbW1vbi5leHRlbmQoe30sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5kZWZhdWx0SXRlbScpKSk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnBhcmVudC5pbml0SXRlbSkge1xuXHRcdFx0cmV0dXJuIHRoaXMucGFyZW50LmluaXRJdGVtKCk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkgJiYgdGhpcy5wYXJlbnQubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJlbnQubWFrZVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCldKG5vdENvbW1vbi5leHRlbmQoe30sIE9QVF9ERUZBVUxUX0lURU0pKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG5ldyBub3RSZWNvcmQoe30sIG5vdENvbW1vbi5leHRlbmQoe30sIE9QVF9ERUZBVUxUX0lURU0pKTtcblx0XHR9XG5cdH1cblxuXHRpbml0RGF0YSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0dGhpcy5zZXREYXRhKHRoaXMuY3JlYXRlRGVmYXVsdCgpKTtcblx0XHRcdFx0cmVzb2x2ZSh0aGlzLmdldERhdGEoKSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0Jywge30sIHt9KTtcblx0fVxuXG5cdHJlbmRlckZvcm0oKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMuZm9ybSA9IG5ldyBub3RGb3JtKHtcblx0XHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9BQ1RJT04sXG5cdFx0XHRcdFx0dGFyZ2V0UXVlcnk6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0dGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSksXG5cdFx0XHRcdFx0cHJlZml4OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUucHJlZml4JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygncHJlZml4JyksXG5cdFx0XHRcdFx0cm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuY3JlYXRlLnJvbGUnKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRsaW5rQmFja1RvTGlzdDogdGhpcy5wYXJlbnQubGlua0JhY2tUb0xpc3QoKSxcblx0XHRcdFx0XHRcdGZpbGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0bGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcblx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnZmlsZSBjaGFuZ2VkJywgZmlsZXMpO1xuXHRcdFx0XHRcdFx0XHRpZiAocGFyYW1zLmhlbHBlcnMuZmllbGQubmFtZSAmJiBmaWxlcykge1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMucXVlZVVwbG9hZChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRzdWJtaXQ6ICgpID0+IHtcblx0XHRcdFx0XHRcdFx0bm90Q29tbW9uLmxvZygnc3VibWl0IGZvcm0gJywgdGhpcy5uZXdJdGVtKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5leGVjVXBsb2Fkcyh0aGlzLmdldERhdGEoKSlcblx0XHRcdFx0XHRcdFx0XHQudGhlbih0aGlzLmNyZWF0ZS5iaW5kKHRoaXMpKTtcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRhZnRlclN1Ym1pdDogKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLmdvVG9UYWJsZSgpO1xuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdGxpYnM6IHRoaXMuZ2V0T3B0aW9ucygnbGlicycpLFxuXHRcdFx0XHRcdH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmNyZWF0ZS5oZWxwZXJzJykgfHwge30pXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCByZXNvbHZlXSxcblx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyU3VibWl0JywgJ2FmdGVyUmVzdG9yZSddLCB0aGlzLnBhcmVudC5iYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpXG5cdFx0XHRcdFx0XVxuXHRcdFx0XHRdXG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGNyZWF0ZShpdGVtKSB7XG5cdFx0aXRlbVsnJCcgKyB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5jcmVhdGUuYWN0aW9uJyldKClcblx0XHRcdC50aGVuKChyZXN1bHQpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmxvZygnZm9ybSBzYXZlZCcsIHJlc3VsdCk7XG5cdFx0XHRcdHRoaXMucGFyZW50LmFwcC5nZXRXb3JraW5nKCdyb3V0ZXInKS5uYXZpZ2F0ZSh0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkpO1xuXHRcdFx0fSlcblx0XHRcdC5jYXRjaCgocmVzdWx0KSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5lcnJvcignZm9ybSBub3Qgc2F2ZWQnLCByZXN1bHQpO1xuXHRcdFx0fSk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVEQ3JlYXRlO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQgbm90Q29tcG9uZW50IGZyb20gJy4uL3RlbXBsYXRlL25vdENvbXBvbmVudCc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcblxuY29uc3QgT1BUX0RFRkFVTFRfUEFHRV9TSVpFID0gMjAsXG5cdE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSID0gMCxcblx0T1BUX0RFRkFVTFRfU09SVF9ESVJFQ1RJT04gPSAxLFxuXHRPUFRfREVGQVVMVF9TT1JUX0ZJRUxEID0gJ19pZCcsXG5cdE9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DID0gJ3ByZXByb2Nlc3Nvcic7XG5cbmNsYXNzIG5vdFRhYmxlIGV4dGVuZHMgbm90QmFzZSB7XG5cdGNvbnN0cnVjdG9yKGlucHV0KSB7XG5cdFx0c3VwZXIoaW5wdXQpO1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgW10pO1xuXHRcdGlmKCF0aGlzLmdldERhdGEoKSB8fCAhQXJyYXkuaXNBcnJheSh0aGlzLmdldERhdGEoJ3Jvd3MnKSkpe1xuXHRcdFx0dGhpcy5zZXREYXRhKHtyb3dzOltdfSk7XG5cdFx0fVxuXHRcdHRoaXMucmVzZXRQYWdlcigpO1xuXHRcdHRoaXMucmVzZXRGaWx0ZXIoKTtcblx0XHR0aGlzLnJlc2V0U29ydGVyKCk7XG5cdFx0dGhpcy5yZW5kZXIoKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnQnKS51cGRhdGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGNvbXBvbmVudCA9IG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRkYXRhOiB7fSxcblx0XHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0XHRuYW1lOiAndGFibGVfd3JhcHBlcidcblx0XHRcdFx0fSxcblx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdHJlbmRlckFuZDogdGhpcy5nZXRPcHRpb25zKCdyZW5kZXJBbmQnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdGhlbHBlcnM6IHRoaXMuZ2V0T3B0aW9ucygnaGVscGVycycpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGV2ZW50czogW1xuXHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFsnYWZ0ZXJSZW5kZXInLCAnYWZ0ZXJVcGRhdGUnXSwgdGhpcy5yZW5kZXJJbnNpZGUuYmluZCh0aGlzKVxuXHRcdFx0XHRcdF1cblx0XHRcdFx0XVxuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudCcsIGNvbXBvbmVudCk7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVySW5zaWRlKCkge1xuXHRcdHRoaXMucmVuZGVySGVhZGVyKCk7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdFx0dGhpcy5yZW5kZXJCb2R5KCk7XG5cdFx0dGhpcy5iaW5kU2VhcmNoKCk7XG5cdFx0dGhpcy5iaW5kQ3VzdG9tQmluZGluZ3MoKTtcblx0fVxuXG5cdHJlbmRlckhlYWRlcigpIHtcblx0XHR2YXIgdGFibGVIZWFkZXIgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvcigndGhlYWQgdHInKTtcblx0XHRpZiAoIXRhYmxlSGVhZGVyKSByZXR1cm47XG5cdFx0bGV0IGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuZXdUaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1RIJyk7XG5cdFx0XHRuZXdUaC5pbm5lckhUTUwgPSBmaWVsZHNbaV0udGl0bGU7XG5cdFx0XHRpZiAoZmllbGRzW2ldLmhhc093blByb3BlcnR5KCdzb3J0YWJsZScpICYmIGZpZWxkc1tpXS5zb3J0YWJsZSkge1xuXHRcdFx0XHR0aGlzLmF0dGFjaFNvcnRpbmdIYW5kbGVycyhuZXdUaCwgZmllbGRzW2ldLnBhdGgpO1xuXHRcdFx0fVxuXHRcdFx0dGFibGVIZWFkZXIuYXBwZW5kQ2hpbGQobmV3VGgpO1xuXHRcdH1cblx0fVxuXG5cdGF0dGFjaFNvcnRpbmdIYW5kbGVycyhoZWFkQ2VsbCwgZmllbGROYW1lKSB7XG5cdFx0aGVhZENlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5jaGFuZ2VTb3J0aW5nT3B0aW9ucyhoZWFkQ2VsbCwgZmllbGROYW1lKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9KTtcblx0XHRoZWFkQ2VsbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG5cdH1cblxuXHRjaGFuZ2VTb3J0aW5nT3B0aW9ucyhlbCwgZmllbGROYW1lKSB7XG5cdFx0aWYgKGZpZWxkTmFtZSA9PT0gdGhpcy5nZXRTb3J0ZXIoKS5zb3J0QnlGaWVsZCl7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IC0xICogdGhpcy5nZXRTb3J0ZXIoKS5zb3J0RGlyZWN0aW9uLFxuXHRcdFx0fSk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnNldFNvcnRlcih7XG5cdFx0XHRcdHNvcnRCeUZpZWxkOiBmaWVsZE5hbWUsXG5cdFx0XHRcdHNvcnREaXJlY3Rpb246IE9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OLFxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmIChlbC5wYXJlbnROb2RlKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsLnBhcmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGVsLnBhcmVudE5vZGUuY2hpbGRyZW5baV0gPT09IGVsKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWwucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0XHRlbC5wYXJlbnROb2RlLmNoaWxkcmVuW2ldLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ25vbmUnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0U29ydGVyKCkuc29ydERpcmVjdGlvbiA+IDApIHtcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRpbmdfZGVzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19hc2MnKTtcblx0XHRcdGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1zb3J0JywgJ2FzY2VuZGluZycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0aW5nX2FzYycpO1xuXHRcdFx0ZWwuY2xhc3NMaXN0LmFkZCgnc29ydGluZ19kZXNjJyk7XG5cdFx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc29ydCcsICdkZXNjZW5kaW5nJyk7XG5cdFx0fVxuXHR9XG5cblx0c2V0U29ydGVyKGhhc2gpIHtcblx0XHQvL2NvbnNvbGUubG9nKCdzZXRTb3J0ZXInLCBoYXNoKTtcblx0XHR0aGlzLnNldFdvcmtpbmcoJ3NvcnRlcicsIGhhc2gpO1xuXHRcdHRoaXMuaW52YWxpZGF0ZURhdGEoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0U29ydGVyKCl7XG5cdFx0dGhpcy5zZXRTb3J0ZXIoe1xuXHRcdFx0c29ydEJ5RmllbGQ6IE9QVF9ERUZBVUxUX1NPUlRfRklFTEQsXG5cdFx0XHRzb3J0RGlyZWN0aW9uOiBPUFRfREVGQVVMVF9TT1JUX0RJUkVDVElPTixcblx0XHR9KTtcblx0fVxuXG5cdGdldFNvcnRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRXb3JraW5nKCdzb3J0ZXInKTtcblx0fVxuXG5cdGdldEZpbHRlclNlYXJjaCgpIHtcblx0XHRyZXR1cm4gKHR5cGVvZiB0aGlzLmdldEZpbHRlcigpICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmdldEZpbHRlcigpICE9PSBudWxsICYmIHR5cGVvZiB0aGlzLmdldEZpbHRlcigpLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2ggIT09IG51bGwpID8gdGhpcy5nZXRGaWx0ZXIoKS5maWx0ZXJTZWFyY2gudG9TdHJpbmcoKSA6ICcnO1xuXHR9XG5cblx0aW52YWxpZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ29uZVBhZ2VyJykpIHtcblx0XHRcdHdoaWxlKHRoaXMuZ2V0RGF0YSgncm93cycpLmxlbmd0aD4wKXtcblx0XHRcdFx0dGhpcy5nZXREYXRhKCdyb3dzJykucG9wKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnJlc2V0UGFnZXIoKTtcblx0XHR9XG5cdH1cblxuXHRzZXRGaWx0ZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyJywgaGFzaCk7XG5cdFx0dGhpcy5pbnZhbGlkYXRlRGF0YSgpO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0cmVzZXRGaWx0ZXIoKSB7XG5cdFx0dGhpcy5zZXRGaWx0ZXIoe30pO1xuXHRcdHRoaXMudXBkYXRlRGF0YSgpO1xuXHR9XG5cblx0Z2V0RmlsdGVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcicpO1xuXHR9XG5cblx0c2V0UGFnZXIoaGFzaCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygncGFnZXInLCBoYXNoKTtcblx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0fVxuXG5cdHJlc2V0UGFnZXIoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCdwYWdlcicsIHtcblx0XHRcdHBhZ2VTaXplOiBpc05hTih0aGlzLmdldE9wdGlvbnMoJ3BhZ2VTaXplJykpID8gT1BUX0RFRkFVTFRfUEFHRV9TSVpFOnRoaXMuZ2V0T3B0aW9ucygncGFnZVNpemUnKSxcblx0XHRcdHBhZ2VOdW1iZXI6IGlzTmFOKHRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpKSA/IE9QVF9ERUZBVUxUX1BBR0VfTlVNQkVSOnRoaXMuZ2V0T3B0aW9ucygncGFnZU51bWJlcicpLFxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0UGFnZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygncGFnZXInKTtcblx0fVxuXG5cdHNldFVwZGF0aW5nKCkge1xuXHRcdHRoaXMuc2V0V29ya2luZygndXBkYXRpbmcnLCB0cnVlKTtcblx0fVxuXG5cdHNldFVwZGF0ZWQoKSB7XG5cdFx0dGhpcy5zZXRXb3JraW5nKCd1cGRhdGluZycsIGZhbHNlKTtcblx0fVxuXG5cdGlmVXBkYXRpbmcoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0V29ya2luZygndXBkYXRpbmcnKTtcblx0fVxuXG5cdHVwZGF0ZURhdGEoKSB7XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygnbGl2ZUxvYWQnKSAmJiB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKSB7XG5cdFx0XHRpZiAodGhpcy5pZlVwZGF0aW5nKCkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Ly9sb2FkIGZyb20gc2VydmVyXG5cdFx0XHRsZXQgcXVlcnkgPSB0aGlzLmdldE9wdGlvbnMoJ2ludGVyZmFjZScpKHt9KVxuXHRcdFx0XHQuc2V0RmlsdGVyKHRoaXMuZ2V0RmlsdGVyKCkpXG5cdFx0XHRcdC5zZXRTb3J0ZXIodGhpcy5nZXRTb3J0ZXIoKSlcblx0XHRcdFx0LnNldFBhZ2VyKHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSwgdGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpO1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0cXVlcnkuJGxpc3QoKVxuXHRcdFx0XHQudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0XHRcdC8vY29uc29sZS5sb2coJyRsaXN0IGZvciB0YWJsZScsIGRhdGEpO1xuXHRcdFx0XHRcdHRoaXMuc2V0RGF0YSh7XG5cdFx0XHRcdFx0XHRyb3dzOiB0aGlzLmdldERhdGEoJ3Jvd3MnKS5jb25jYXQoZGF0YSlcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLnByb2NjZXNzRGF0YSgpO1xuXHRcdFx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdFx0XHR0aGlzLnNldFVwZGF0ZWQoKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0LmNhdGNoKChlKSA9PiB7XG5cdFx0XHRcdFx0bm90Q29tbW9uLmVycm9yKGUpO1xuXHRcdFx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly9sb2NhbCBtYWdpY1xuXHRcdFx0dGhpcy5zZXRVcGRhdGluZygpO1xuXHRcdFx0dGhpcy5wcm9jY2Vzc0RhdGEoKTtcblx0XHRcdHRoaXMucmVmcmVzaEJvZHkoKTtcblx0XHRcdHRoaXMuc2V0VXBkYXRlZCgpO1xuXHRcdH1cblx0fVxuXG5cdHByb2NjZXNzRGF0YSgpIHtcblx0XHR2YXIgdGhhdEZpbHRlciA9IHRoaXMuZ2V0RmlsdGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0RmlsdGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0RmlsdGVyICE9PSBudWxsICYmIHR5cGVvZiB0aGF0RmlsdGVyLmZpbHRlclNlYXJjaCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2ggIT09IG51bGwgJiYgdGhhdEZpbHRlci5maWx0ZXJTZWFyY2gubGVuZ3RoID4gMCkge1xuXHRcdFx0Ly9cblx0XHRcdHRoaXMuc2V0V29ya2luZygnZmlsdGVyZWREYXRhJywgdGhpcy5nZXREYXRhKCdyb3dzJykuZmlsdGVyKHRoaXMudGVzdERhdGFJdGVtLmJpbmQodGhpcykpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLCB0aGlzLmdldERhdGEoJ3Jvd3MnKSk7XG5cdFx0fVxuXHRcdC8vLy9zb3J0ZXJcblx0XHR2YXIgdGhhdFNvcnRlciA9IHRoaXMuZ2V0U29ydGVyKCk7XG5cdFx0aWYgKHR5cGVvZiB0aGF0U29ydGVyICE9PSAndW5kZWZpbmVkJyAmJiB0aGF0U29ydGVyICE9PSBudWxsKSB7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2ZpbHRlcmVkRGF0YScpLnNvcnQoKGl0ZW0xLCBpdGVtMikgPT4ge1xuXHRcdFx0XHRsZXQgdDEgPSBub3RQYXRoLmdldCh0aGF0U29ydGVyLnNvcnRCeUZpZWxkLCBpdGVtMSwge30pLFxuXHRcdFx0XHRcdHQyID0gbm90UGF0aC5nZXQodGhhdFNvcnRlci5zb3J0QnlGaWVsZCxpdGVtMix7fSk7XG5cdFx0XHRcdGlmIChpc05hTih0MSkpIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIHQxICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdDIgIT09ICd1bmRlZmluZWQnICYmIHQxLmxvY2FsZUNvbXBhcmUpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIHQxLmxvY2FsZUNvbXBhcmUoKSAqIC0gdGhhdFNvcnRlci5zb3J0RGlyZWN0aW9uO1xuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiAoKHQxIDwgdDIpID8gMSA6IC0xKSAqIHRoYXRTb3J0ZXIuc29ydERpcmVjdGlvbjtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0YmluZFNlYXJjaCgpIHtcblx0XHR2YXIgc2VhcmNoRWwgPSB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldEVsJykucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInNlYXJjaFwiXScpWzBdO1xuXHRcdGlmICghc2VhcmNoRWwpIHJldHVybjtcblx0XHR2YXIgb25FdmVudCA9IChlKSA9PiB7XG5cdFx0XHR0aGlzLnNldEZpbHRlcih7XG5cdFx0XHRcdGZpbHRlclNlYXJjaDogZS5jdXJyZW50VGFyZ2V0LnZhbHVlXG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH07XG5cdFx0c2VhcmNoRWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbkV2ZW50KTtcblx0XHRzZWFyY2hFbC5hZGRFdmVudExpc3RlbmVyKCdlbnRlcicsIG9uRXZlbnQpO1xuXHR9XG5cblxuXHRiaW5kQ3VzdG9tQmluZGluZ3MoKSB7XG5cdFx0aWYgKCF0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykgfHwgIXRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKHZhciBzZWxlY3RvciBpbiB0aGlzLmdldE9wdGlvbnMoJ2JpbmRpbmdzJykpIHtcblx0XHRcdHZhciBlbHMgPSB0aGlzLmdldE9wdGlvbigndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcblx0XHRcdGZvciAodmFyIGVsSWQgPSAwOyBlbElkIDwgZWxzLmxlbmd0aDsgZWxJZCsrKSB7XG5cdFx0XHRcdHZhciBlbCA9IGVsc1tlbElkXTtcblx0XHRcdFx0Zm9yICh2YXIgZXZlbnQgaW4gdGhpcy5nZXRPcHRpb25zKCdiaW5kaW5ncycpW3NlbGVjdG9yXSkge1xuXHRcdFx0XHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuZ2V0T3B0aW9ucygnYmluZGluZ3MnKVtzZWxlY3Rvcl1bZXZlbnRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGxvYWROZXh0KCkge1xuXHRcdHRoaXMuZ2V0V29ya2luZygncGFnZXInKS5wYWdlTnVtYmVyKys7XG5cdFx0dGhpcy51cGRhdGVEYXRhKCk7XG5cdH1cblxuXHRyZW5kZXJSb3coaXRlbSwgaW5kZXgpIHtcblx0XHRsZXQgbmV3Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnVFInKSxcblx0XHRcdGZpZWxkcyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGxldCBuZXdUZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ1REJyksXG5cdFx0XHRcdGZpZWxkID0gZmllbGRzW2ldLFxuXHRcdFx0XHRwcmVwcm9jZXNzZWQgPSBudWxsLFxuXHRcdFx0XHR2YWwgPSBub3RQYXRoLmdldChmaWVsZC5wYXRoLCBpdGVtLCB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSk7XG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2VkaXRhYmxlJykgJiYgIWZpZWxkLmhhc093blByb3BlcnR5KCdjb21wb25lbnQnKSkge1xuXHRcdFx0XHRuZXdUZC5zZXRBdHRyaWJ1dGUoJ2NvbnRlbnRFZGl0YWJsZScsIHRydWUpO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0LnBhdGggPSBmaWVsZC5wYXRoO1xuXHRcdFx0XHRuZXdUZC5kYXRhc2V0Lml0ZW1JZCA9IGl0ZW1bdGhpcy5nZXRPcHRpb25zKCdpdGVtSWRGaWVsZCcpXTtcblx0XHRcdFx0bmV3VGQuZGF0YXNldC52YWx1ZSA9IHZhbDtcblx0XHRcdFx0bmV3VGQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsICgpPT57XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoZmllbGQucGF0aCwgaXRlbSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJyksIG5ld1RkLnRleHRDb250ZW50KTtcblx0XHRcdFx0XHR0aGlzLnVwZGF0ZURhdGEoKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChmaWVsZC5oYXNPd25Qcm9wZXJ0eShPUFRfRklFTERfTkFNRV9QUkVfUFJPQykpIHtcblx0XHRcdFx0cHJlcHJvY2Vzc2VkID0gZmllbGRbT1BUX0ZJRUxEX05BTUVfUFJFX1BST0NdKHZhbCwgaXRlbSwgaW5kZXgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2NvbXBvbmVudCcpKSB7XG5cdFx0XHRcdG5ldyBub3RDb21wb25lbnQoe1xuXHRcdFx0XHRcdGRhdGE6IGZpZWxkLmNvbXBvbmVudC5kYXRhIHx8IHByZXByb2Nlc3NlZCB8fCB7dmFsLCBpdGVtLCBpbmRleH0sXG5cdFx0XHRcdFx0dGVtcGxhdGU6IGZpZWxkLmNvbXBvbmVudC50ZW1wbGF0ZSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR0YXJnZXRFbDogbmV3VGQsXG5cdFx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBmaWVsZC5jb21wb25lbnQuZXZlbnRzIHx8IFtdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bmV3VGQuaW5uZXJIVE1MID0gcHJlcHJvY2Vzc2VkIHx8IHZhbDtcblx0XHRcdH1cblxuXHRcdFx0aWYoZmllbGQuaGFzT3duUHJvcGVydHkoJ3N0eWxlJykpe1xuXHRcdFx0XHRmb3IobGV0IHN0eWxlIGluIGZpZWxkLnN0eWxlKXtcblx0XHRcdFx0XHRpZihmaWVsZC5zdHlsZS5oYXNPd25Qcm9wZXJ0eShzdHlsZSkpe1xuXHRcdFx0XHRcdFx0bmV3VGQuc3R5bGVbc3R5bGVdID0gZmllbGQuc3R5bGVbc3R5bGVdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZmllbGQuaGFzT3duUHJvcGVydHkoJ2V2ZW50cycpICYmIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRmb3IgKHZhciBqIGluIGZpZWxkLmV2ZW50cykge1xuXHRcdFx0XHRcdG5ld1RkLmFkZEV2ZW50TGlzdGVuZXIoaiwgKGUpPT57XG5cdFx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmllbGQuZXZlbnRzW2pdKHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQ6IGUsXG5cdFx0XHRcdFx0XHRcdGVsZW1lbnQ6IG5ld1RkLFxuXHRcdFx0XHRcdFx0XHRpdGVtOiBpdGVtLFxuXHRcdFx0XHRcdFx0XHR2YWx1ZTogdmFsLFxuXHRcdFx0XHRcdFx0XHRmaWVsZDogZmllbGRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bmV3Um93LmFwcGVuZENoaWxkKG5ld1RkKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0T3B0aW9ucygncHJvY1JvdycpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCdwcm9jUm93JykobmV3Um93LCBpdGVtKTtcblx0XHR9XG5cdFx0cmV0dXJuIG5ld1Jvdztcblx0fVxuXG5cdHJlZnJlc2hCb2R5KCkge1xuXHRcdHZhciB0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRib2R5KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuY2xlYXJCb2R5KCk7XG5cdFx0dGhpcy5jaGVja0ZpbHRlcmVkKCk7XG5cdFx0dmFyIHRoaXNQYWdlU3RhcnRzID0gMCxcblx0XHRcdG5leHRQYWdlRW5kcyA9IHRoaXMuZ2V0UGFnZXIoKS5wYWdlU2l6ZSAqICh0aGlzLmdldFBhZ2VyKCkucGFnZU51bWJlciArIDEpO1xuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHRmaW5kQm9keSgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cdH1cblxuXHRjbGVhckJvZHkoKSB7XG5cdFx0dmFyIHRhYmxlQm9keSA9IHRoaXMuZmluZEJvZHkoKTtcblx0XHRpZiAoIXRhYmxlQm9keSkgcmV0dXJuO1xuXHRcdHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJztcblx0fVxuXG5cdGNoZWNrRmlsdGVyZWQoKXtcblx0XHRpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKSkpe1xuXHRcdFx0dGhpcy5zZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnLFtdKTtcblx0XHR9XG5cdH1cblxuXHRyZW5kZXJCb2R5KCkge1xuXHRcdGlmICghdGhpcy5nZXRPcHRpb25zKCdvbmVQYWdlcicpKSB7XG5cdFx0XHR0aGlzLmNsZWFyQm9keSgpO1xuXHRcdH1cblx0XHR0aGlzLmNoZWNrRmlsdGVyZWQoKTtcblx0XHR2YXIgdGhpc1BhZ2VTdGFydHMgPSB0aGlzLmdldFBhZ2VyKCkucGFnZVNpemUgKiAodGhpcy5nZXRQYWdlcigpLnBhZ2VOdW1iZXIpLFxuXHRcdFx0bmV4dFBhZ2VFbmRzID0gdGhpcy5nZXRQYWdlcigpLnBhZ2VTaXplICogKHRoaXMuZ2V0UGFnZXIoKS5wYWdlTnVtYmVyICsgMSksXG5cdFx0XHR0Ym9keSA9IHRoaXMuZmluZEJvZHkoKTtcblxuXHRcdGZvciAodmFyIGkgPSB0aGlzUGFnZVN0YXJ0czsgaSA8IE1hdGgubWluKG5leHRQYWdlRW5kcywgdGhpcy5nZXRXb3JraW5nKCdmaWx0ZXJlZERhdGEnKS5sZW5ndGgpOyBpKyspIHtcblx0XHRcdHRib2R5LmFwcGVuZENoaWxkKHRoaXMucmVuZGVyUm93KHRoaXMuZ2V0V29ya2luZygnZmlsdGVyZWREYXRhJylbaV0pKTtcblx0XHR9XG5cdH1cblxuXHR0ZXN0RGF0YUl0ZW0oaXRlbSl7XG5cdFx0dmFyIHN0clZhbHVlID0gdGhpcy5nZXRGaWx0ZXJTZWFyY2goKS50b0xvd2VyQ2FzZSgpO1xuXHRcdGZvcih2YXIgayBpbiBpdGVtKXtcblx0XHRcdHZhciB0b0NvbXAgPSBpdGVtW2tdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcblx0XHRcdGlmICh0b0NvbXAuaW5kZXhPZihzdHJWYWx1ZSk+LTEpe1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5vdFRhYmxlO1xuIiwiaW1wb3J0IG5vdFRhYmxlIGZyb20gJy4uL2NvbXBvbmVudHMvbm90VGFibGUuanMnO1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Q29tbW9uIGZyb20gJy4uL2NvbW1vbic7XG5cbmNvbnN0IE9QX0RFRkFVTFRfUEFHRV9TSVpFID0gNTAsXG5cdE9QVF9ERUZBVUxUX1ZJRVcgPSAnbGlzdCc7XG5cbmNsYXNzIENSVURMaXN0IGV4dGVuZHMgbm90Q29udHJvbGxlciB7XG5cdGNvbnN0cnVjdG9yKHBhcmVudCwgcGFyYW1zKSB7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgTGlzdCcpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0Lm5hbWUnKSB8fCBPUFRfREVGQVVMVF9WSUVXLFxuXHRcdFx0XHRjb21tb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmxpc3QuY29tbW9uJykgfHwgdHJ1ZSxcblx0XHRcdFx0dGFyZ2V0UXVlcnk6IHBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmNvbnRhaW5lclNlbGVjdG9yJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnY29udGFpbmVyU2VsZWN0b3InKSxcblx0XHRcdFx0aGVscGVyczoge31cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLnJlbmRlcldyYXBwZXIuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMudXBkYXRlRGF0YXRhYmxlLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIHt9LCB7XG5cdFx0XHR0aXRsZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnbmFtZXMucGx1cmFsJyksXG5cdFx0XHRzaG93QWRkRm9ybTogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUoW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSwgJ2NyZWF0ZSddLmpvaW4oJy8nKSk7XG5cdFx0XHR9LFxuXHRcdFx0bGlua0JhY2tUb0xpc3Q6IHRoaXMucGFyZW50LmxpbmtCYWNrVG9MaXN0LmJpbmQodGhpcy5wYXJlbnQpLFxuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlRGF0YXRhYmxlKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHR0aGlzLnRhYmxlVmlldyA9IG5ldyBub3RUYWJsZSh7XG5cdFx0XHRcdFx0b3B0aW9uczoge1xuXHRcdFx0XHRcdFx0ZmllbGRzOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5saXN0LmZpZWxkcycpLFxuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuXHRcdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRcdHRpdGxlOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCduYW1lcy5wbHVyYWwnKVxuXHRcdFx0XHRcdFx0fSwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MubGlzdC5oZWxwZXJzJykgfHwge30pLFxuXHRcdFx0XHRcdFx0cGFnZVNpemU6IHRoaXMuYXBwLmdldE9wdGlvbnMoJ3BhZ2VyLnNpemUnKSB8fCBPUF9ERUZBVUxUX1BBR0VfU0laRSxcblx0XHRcdFx0XHRcdHBhZ2VOdW1iZXI6IDAsXG5cdFx0XHRcdFx0XHRvbmVQYWdlcjogdHJ1ZSxcblx0XHRcdFx0XHRcdGxpdmVMb2FkOiB0cnVlLFxuXHRcdFx0XHRcdFx0aW50ZXJmYWNlOiB0aGlzLm1ha2VbdGhpcy5wYXJlbnQuZ2V0TW9kdWxlTmFtZSgpXVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRzaG93TmV4dFBhZ2UoKSB7XG5cdFx0aWYgKHRoaXMudGFibGVWaWV3KSB7XG5cdFx0XHR0aGlzLnRhYmxlVmlldy5sb2FkTmV4dCgpO1xuXHRcdH1cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURMaXN0O1xuIiwiaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi4vbm90Q29udHJvbGxlci5qcyc7XG5pbXBvcnQgbm90Rm9ybSBmcm9tICcuLi9jb21wb25lbnRzL25vdEZvcm0uanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuXG5jb25zdCBPUFRfREVGQVVMVF9MT0FEX0FDVElPTiA9ICdnZXRSYXcnLFxuXHRPUFRfREVGQVVMVF9BQ1RJT04gPSAndXBkYXRlJyxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdlZGl0JztcblxuY2xhc3MgQ1JVRFVwZGF0ZSBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcykge1xuXHRcdHN1cGVyKHBhcmVudC5hcHApO1xuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuc2V0T3B0aW9ucygncGFyYW1zJywgcGFyYW1zKTtcblx0XHRub3RDb21tb24ubG9nKCdDUlVEIFVwZGF0ZScpO1xuXHRcdHRoaXMuc2V0Vmlld3Moe1xuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHRuYW1lOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLmNvbW1vbicpIHx8IHRydWUsXG5cdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuY29udGFpbmVyU2VsZWN0b3InKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicpLFxuXHRcdFx0XHRoZWxwZXJzOiB7fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLmxvYWRJdGVtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnNldERhdGEuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJGb3JtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRsb2FkSXRlbSgpIHtcblx0XHRyZXR1cm4gdGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oe1xuXHRcdFx0J19pZCc6IHRoaXMuZ2V0T3B0aW9ucygncGFyYW1zLjAnKVxuXHRcdH0pWyckJyArICh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUubG9hZEFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OKV0oKTtcblx0fVxuXG5cdHJlbmRlcldyYXBwZXIoKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyKCdkZWZhdWx0JywgdGhpcy5nZXREYXRhKCksIHt9KTtcblx0fVxuXG5cdHJlbmRlckZvcm0oKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHRoaXMuZm9ybSA9IG5ldyBub3RGb3JtKHtcblx0XHRcdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRhY3Rpb246IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9BQ1RJT04sXG5cdFx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnRhcmdldFF1ZXJ5JykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndGFyZ2V0UXVlcnknKSxcblx0XHRcdFx0XHRcdHByZWZpeDogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnByZWZpeCcpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuXHRcdFx0XHRcdFx0cm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MudXBkYXRlLnJvbGUnKSB8fCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCdyb2xlJyksXG5cdFx0XHRcdFx0XHRkYXRhOiB0aGlzLmdldERhdGEoKSxcblx0XHRcdFx0XHRcdGhlbHBlcnM6IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0XHRcdFx0XHRmaWxlOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0bGV0IGZpbGVzID0gcGFyYW1zLmUudGFyZ2V0LmZpbGVzIHx8IHBhcmFtcy5lLmRhdGFUcmFuc2Zlci5maWxlcztcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdmaWxlIGNoYW5nZWQnLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHBhcmFtcy5oZWxwZXJzLmZpZWxkLm5hbWUgJiYgZmlsZXMpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMucXVlZVVwbG9hZChwYXJhbXMuaGVscGVycy5maWVsZC5uYW1lLCBmaWxlcyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRzdWJtaXQ6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRub3RDb21tb24ubG9nKCdzdWJtaXQgZm9ybSAnLCBwYXJhbXMuaXRlbSk7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5leGVjVXBsb2FkcyhwYXJhbXMuaXRlbSlcblx0XHRcdFx0XHRcdFx0XHRcdC50aGVuKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYnMnKSxcblx0XHRcdFx0XHRcdFx0YWZ0ZXJTdWJtaXQ6IHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0XHRcdFx0XHR9LCB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy51cGRhdGUuaGVscGVycycpIHx8IHt9KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRcdFsnYWZ0ZXJSZXN0b3JlJywgJ2FmdGVyU3VibWl0J10sIHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudClcblx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGUoaXRlbSkge1xuXHRcdGl0ZW1bJyQnICsgKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLnVwZGF0ZS5hY3Rpb24nKSB8fCBPUFRfREVGQVVMVF9BQ1RJT04pXSgpXG5cdFx0XHQudGhlbigocmVzdWx0KSA9PiB7XG5cdFx0XHRcdG5vdENvbW1vbi5sb2coJ2Zvcm0gc2F2ZWQnLCByZXN1bHQpO1xuXHRcdFx0XHR0aGlzLnBhcmVudC5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUodGhpcy5nZXRNb2R1bGVOYW1lKCkpO1xuXHRcdFx0XHR0aGlzLnBhcmVudC5ydW5MaXN0KCk7XG5cdFx0XHR9KVxuXHRcdFx0LmNhdGNoKChyZXN1bHQpID0+IHtcblx0XHRcdFx0bm90Q29tbW9uLmVycm9yKCdmb3JtIG5vdCBzYXZlZCcsIHJlc3VsdCk7XG5cdFx0XHR9KTtcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IENSVURVcGRhdGU7XG4iLCJpbXBvcnQgbm90Q29udHJvbGxlciBmcm9tICcuLi9ub3RDb250cm9sbGVyLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfQUNUSU9OID0gJ2RlbGV0ZSc7XG5cbmNsYXNzIENSVUREZWxldGUgZXh0ZW5kcyBub3RDb250cm9sbGVye1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQsIHBhcmFtcyl7XG5cdFx0c3VwZXIocGFyZW50LmFwcCk7XG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdwYXJhbXMnLCBwYXJhbXMpO1xuXHRcdG5vdENvbW1vbi5sb2coJ0NSVUQgRGVsZXRlJyk7XG5cdFx0dGhpcy5wcmVsb2FkTGliKHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRlbGV0ZS5wcmVsb2FkJykpXG5cdFx0XHQudGhlbigoKT0+e1xuXHRcdFx0XHRpZiAoY29uZmlybSgn0KPQtNCw0LvQuNGC0Ywg0LfQsNC/0LjRgdGMPycpKSB7XG5cdFx0XHRcdFx0dGhpcy5kZWxldGUoKTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0dGhpcy5wYXJlbnQuYmFja1RvTGlzdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblxuXHRkZWxldGUoKSB7XG5cdFx0bGV0IGFjdGlvbiA9JyQnKyh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZWxldGUuYWN0aW9uJyl8fE9QVF9ERUZBVUxUX0FDVElPTik7XG5cdFx0dGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oeydfaWQnOiB0aGlzLmdldE9wdGlvbnMoJ3BhcmFtcy4wJyl9KVthY3Rpb25dKClcblx0XHRcdC50aGVuKHRoaXMucGFyZW50LmJhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCkpXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVERGVsZXRlO1xuIiwiaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi4vbm90QmFzZSc7XG5pbXBvcnQgbm90UGF0aCBmcm9tICcuLi9ub3RQYXRoJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcbmltcG9ydCBub3RSZWNvcmQgZnJvbSAnLi4vbm90UmVjb3JkJztcbmltcG9ydCBub3RDb21wb25lbnQgZnJvbSAnLi4vdGVtcGxhdGUvbm90Q29tcG9uZW50JztcblxuY29uc3QgT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVggPSAnZGV0YWlsc18nLFxuXHRPUFRfREVGQVVMVF9ST0xFX05BTUUgPSAnZGVmYXVsdCcsXG5cdE9QVF9ERUZBVUxUX0RFVEFJTFNfVElUTEUgPSAnRGV0YWlscyBkZWZhdWx0IHRpdGxlJyxcblx0T1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTiA9IHt9LFxuXHRPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OX1NPVVJDRVNfUFJJT1JJVFlfTElTVCA9IFsnb3B0aW9ucycsICdtYW5pZmVzdCcsICdhcHAnXTtcblxuY2xhc3Mgbm90RGV0YWlscyBleHRlbmRzIG5vdEJhc2Uge1xuXHRjb25zdHJ1Y3RvcihpbnB1dCkge1xuXHRcdHN1cGVyKGlucHV0KTtcblx0XHRpZiAoIXRoaXMuZ2V0T3B0aW9ucygncHJlZml4JykpIHtcblx0XHRcdHRoaXMuc2V0T3B0aW9ucygncHJlZml4JywgT1BUX0RFRkFVTFRfREVUQUlMU19QUkVGSVgpO1xuXHRcdH1cblx0XHR0aGlzLnNldFdvcmtpbmcoJ2NvbXBvbmVudHMnLCBbXSk7XG5cdFx0aWYgKCF0aGlzLmdldERhdGEoKS5pc1JlY29yZCkge1xuXHRcdFx0dGhpcy5zZXREYXRhKG5ldyBub3RSZWNvcmQoe30sIHRoaXMuZ2V0RGF0YSgpKSk7XG5cdFx0fVxuXHRcdHRoaXMucmVuZGVyKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRnZXRNYW5pZmVzdCgpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkuZ2V0TWFuaWZlc3QoKTtcblx0fVxuXG5cdGdldEFjdGlvbkRhdGEoKSB7XG5cdFx0bGV0IG1hbmlmZXN0ID0gdGhpcy5nZXRNYW5pZmVzdCgpO1xuXHRcdGlmIChtYW5pZmVzdCAmJiBtYW5pZmVzdC5hY3Rpb25zKSB7XG5cdFx0XHRyZXR1cm4gbWFuaWZlc3QuYWN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0aGlzLmdldE9wdGlvbnMoJ2FjdGlvbicpKSA/IG1hbmlmZXN0LmFjdGlvbnNbdGhpcy5nZXRPcHRpb25zKCdhY3Rpb24nKV0gOiBudWxsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaXN0KCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCksXG5cdFx0XHRsaXN0ID0gW10sXG5cdFx0XHRyb2xlID0gdGhpcy5nZXRPcHRpb25zKCdyb2xlJywgT1BUX0RFRkFVTFRfUk9MRV9OQU1FKTtcblx0XHRpZiAoYWN0aW9uRGF0YSkge1xuXHRcdFx0aWYgKGFjdGlvbkRhdGEuZmllbGRzKSB7XG5cdFx0XHRcdGlmIChhY3Rpb25EYXRhLmZpZWxkcy5oYXNPd25Qcm9wZXJ0eShyb2xlKSkge1xuXHRcdFx0XHRcdGxpc3QgPSBhY3Rpb25EYXRhLmZpZWxkc1tyb2xlXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbGlzdDtcblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHR0aGlzLnJlbmRlcldyYXBwZXIoKTtcblx0fVxuXG5cdGdldFBhcnRUZW1wbGF0ZU5hbWUoZm9ybVBhcnQpe1xuXHRcdHJldHVybiB0aGlzLmdldE9wdGlvbnMoJ3ByZWZpeCcpICsgZm9ybVBhcnQ7XG5cdH1cblxuXHRyZW5kZXJXcmFwcGVyKCkge1xuXHRcdGlmICh0aGlzLmdldFdvcmtpbmcoJ3dyYXBwZXInKSkge1xuXHRcdFx0dGhpcy5nZXRXb3JraW5nKCd3cmFwcGVyJykudXBkYXRlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBpbnB1dCA9IHtcblx0XHRcdFx0ZGF0YTogdGhpcy5nZXRXcmFwcGVyRGF0YSgpLFxuXHRcdFx0XHR0ZW1wbGF0ZToge1xuXHRcdFx0XHRcdG5hbWU6IHRoaXMuZ2V0UGFydFRlbXBsYXRlTmFtZSgnd3JhcHBlcicpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0XHRoZWxwZXJzOiB0aGlzLmdldE9wdGlvbnMoJ2hlbHBlcnMnKSxcblx0XHRcdFx0XHR0YXJnZXRFbDogdGhpcy5nZXRPcHRpb25zKCd0YXJnZXRFbCcpLFxuXHRcdFx0XHRcdHRhcmdldFF1ZXJ5OiB0aGlzLmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JyksXG5cdFx0XHRcdFx0aWQ6IHRoaXMuZ2V0T3B0aW9ucygnaWQnKVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRldmVudHM6W1xuXHRcdFx0XHRcdFtbJ2FmdGVyUmVuZGVyJywgJ2FmdGVyVXBkYXRlJ10sIHRoaXMucmVuZGVyQ29tcG9uZW50cy5iaW5kKHRoaXMpXVxuXHRcdFx0XHRdXG5cdFx0XHR9O1xuXHRcdFx0bGV0IHdyYXBwZXIgPSBuZXcgbm90Q29tcG9uZW50KGlucHV0KTtcblx0XHRcdHRoaXMuc2V0V29ya2luZygnd3JhcHBlcicsIHdyYXBwZXIpO1xuXHRcdH1cblx0fVxuXG5cdGdldFdyYXBwZXJEYXRhKCkge1xuXHRcdGxldCBhY3Rpb25EYXRhID0gdGhpcy5nZXRBY3Rpb25EYXRhKCk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHRpdGxlOiBhY3Rpb25EYXRhLnRpdGxlID8gYWN0aW9uRGF0YS50aXRsZSA6IE9QVF9ERUZBVUxUX0RFVEFJTFNfVElUTEVcblx0XHR9O1xuXHR9XG5cblx0cmVuZGVyQ29tcG9uZW50cygpIHtcblx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykgJiYgdGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykubGVuZ3RoKXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdHRoaXMuZ2V0V29ya2luZygnY29tcG9uZW50cycpW3RdLmNvbXBvbmVudC51cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldEZpZWxkc0xpc3QoKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRcdGxldCBmaWVsZE5hbWUgPSB0aGlzLmdldEZpZWxkc0xpc3QoKVt0XTtcblx0XHRcdFx0dGhpcy5hZGRGaWVsZENvbXBvbmVudChmaWVsZE5hbWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNsZWFyRmllbGRzQ29tcG9uZW50cygpIHtcblx0XHRsZXQgY29tcHMgPSB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKTtcblx0XHR3aGlsZSAoY29tcHMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29tcHNbMF0uY29tcG9uZW50LmRlc3Ryb3koKTtcblx0XHRcdGNvbXBzLnNwbGljZSgwLCAxKTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHNMaWJzKCl7XG5cdFx0bGV0IHJlc3VsdCA9IHtcblx0XHRcdG9wdGlvbnM6IHt9LFxuXHRcdFx0bWFuaWZlc3Q6IHt9LFxuXHRcdFx0YXBwOiB7fSxcblx0XHR9O1xuXHRcdGlmICh0aGlzLmdldE9wdGlvbnMoJ2ZpZWxkcycpKSB7XG5cdFx0XHRyZXN1bHQub3B0aW9ucyA9IHRoaXMuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmIChub3RDb21tb24uZ2V0QXBwKCkgJiYgbm90Q29tbW9uLmdldEFwcCgpLmdldE9wdGlvbnMoJ2ZpZWxkcycpKXtcblx0XHRcdHJlc3VsdC5hcHAgPSBub3RDb21tb24uZ2V0QXBwKCkuZ2V0T3B0aW9ucygnZmllbGRzJyk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldERhdGEoKS5pc1JlY29yZCAmJiB0aGlzLmdldERhdGEoKS5nZXRNYW5pZmVzdCgpKXtcblx0XHRcdHJlc3VsdC5tYW5pZmVzdCA9IHRoaXMuZ2V0RGF0YSgpLmdldE1hbmlmZXN0KCkuZmllbGRzO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cblx0Z2V0RmllbGRzRGVmaW5pdGlvbihmaWVsZE5hbWUpIHtcblx0XHRsZXQgZGVmID0gT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTixcblx0XHRcdGZpZWxkc0xpYnMgPSB0aGlzLmdldEZpZWxkc0xpYnMoKTtcblx0XHRmb3IobGV0IHQgb2YgT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1Qpe1xuXHRcdFx0aWYgKGZpZWxkc0xpYnMuaGFzT3duUHJvcGVydHkodCkgJiYgZmllbGRzTGlic1t0XS5oYXNPd25Qcm9wZXJ0eShmaWVsZE5hbWUpKXtcblx0XHRcdFx0cmV0dXJuIGZpZWxkc0xpYnNbdF1bZmllbGROYW1lXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGRlZjtcblx0fVxuXG5cdGFkZEZpZWxkQ29tcG9uZW50KGZpZWxkTmFtZSkge1xuXHRcdGxldCBmaWVsZFR5cGUgPSB0aGlzLmdldEZpZWxkc0RlZmluaXRpb24oZmllbGROYW1lKSxcblx0XHRcdHJlYyA9IG51bGw7XG5cdFx0aWYoZmllbGRUeXBlLmNvbXBvbmVudCl7XG5cdFx0XHRyZWMgPSB0aGlzLmNhc3RDdXN0b20oZmllbGROYW1lLCBmaWVsZFR5cGUpO1xuXHRcdH1lbHNle1xuXHRcdFx0cmVjID0gdGhpcy5jYXN0Q29tbW9uKGZpZWxkTmFtZSwgZmllbGRUeXBlKTtcblx0XHR9XG5cdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJykucHVzaChyZWMpO1xuXHR9XG5cblx0Y2FzdEN1c3RvbShmaWVsZE5hbWUsIGZpZWxkVHlwZSl7XG5cdFx0bGV0IEN1c3RvbUNvbXBvbmVudCA9IG5vdEZyYW1ld29yay5ub3RDb21tb24uZ2V0KCdjb21wb25lbnRzJylbZmllbGRUeXBlLmNvbXBvbmVudF07XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXG5cdFx0cmVjLmNvbXBvbmVudCA9IG5ldyBDdXN0b21Db21wb25lbnQoe1xuXHRcdFx0ZGF0YTogdGhpcy5nZXREYXRhKCksXG5cdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdGhlbHBlcnMsXG5cdFx0XHRcdHRhcmdldEVsOiB0aGlzLmdldFRhcmdldEVsZW1lbnQoZmllbGRUeXBlLnRhcmdldCksXG5cdFx0XHRcdHJlbmRlckFuZDogJ3BsYWNlTGFzdCdcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gcmVjO1xuXHR9XG5cblx0Y2FzdENvbW1vbihmaWVsZE5hbWUsIGZpZWxkVHlwZSl7XG5cdFx0bGV0IHJlYyA9IHtcblx0XHRcdGZpZWxkOiB7XG5cdFx0XHRcdG5hbWU6IGZpZWxkTmFtZSxcblx0XHRcdFx0dGl0bGU6IGZpZWxkVHlwZS5sYWJlbCB8fCBmaWVsZFR5cGUucGxhY2Vob2xkZXIsXG5cdFx0XHRcdHR5cGU6IGZpZWxkVHlwZS50eXBlLFxuXHRcdFx0XHRsYWJlbDogZmllbGRUeXBlLmxhYmVsLFxuXHRcdFx0XHRhcnJheTogZmllbGRUeXBlLmFycmF5LFxuXHRcdFx0XHRkZWZhdWx0OiBmaWVsZFR5cGUuZGVmYXVsdCxcblx0XHRcdFx0cGxhY2Vob2xkZXI6IGZpZWxkVHlwZS5wbGFjZWhvbGRlcixcblx0XHRcdFx0b3B0aW9uczogdGhpcy5nZXRPcHRpb25zKG5vdFBhdGguam9pbignaGVscGVycycsJ2xpYnMnLGZpZWxkTmFtZSkpXG5cdFx0XHR9XG5cdFx0fTtcblx0XHRsZXQgaGVscGVycyA9IG5vdENvbW1vbi5leHRlbmQoe1xuXHRcdFx0aXNDaGVja2VkOiAocGFyYW1zKSA9PiB7XG5cdFx0XHRcdHJldHVybiBwYXJhbXMuaXRlbS52YWx1ZSA9PT0gdGhpcy5nZXREYXRhKGZpZWxkTmFtZSk7XG5cdFx0XHR9LFxuXHRcdFx0ZmllbGQ6IHJlYy5maWVsZCxcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpXG5cdFx0fSwgdGhpcy5nZXRPcHRpb25zKCdoZWxwZXJzJykpO1xuXHRcdHJlYy5jb21wb25lbnQgPSBuZXcgbm90Q29tcG9uZW50KHtcblx0XHRcdGRhdGE6IHRoaXMuZ2V0RGF0YSgpLFxuXHRcdFx0dGVtcGxhdGU6IHtcblx0XHRcdFx0bmFtZTogdGhpcy5nZXRQYXJ0VGVtcGxhdGVOYW1lKGZpZWxkVHlwZS50eXBlKVxuXHRcdFx0fSxcblx0XHRcdG9wdGlvbnM6IHtcblx0XHRcdFx0aGVscGVycyxcblx0XHRcdFx0dGFyZ2V0RWw6IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudChmaWVsZFR5cGUudGFyZ2V0KSxcblx0XHRcdFx0cmVuZGVyQW5kOiAncGxhY2VMYXN0J1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiByZWM7XG5cdH1cblxuXHRnZXRUYXJnZXRFbGVtZW50KHRhcmdldCA9ICdib2R5Jyl7XG5cdFx0aWYgKCF0YXJnZXQpe3RhcmdldCA9ICdib2R5Jzt9XG5cdFx0bGV0IHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0aWYgKCFyZXMgJiYgdGFyZ2V0IT09J2JvZHknKXtcblx0XHRcdHRhcmdldCA9ICdib2R5Jztcblx0XHRcdHJlcyA9IHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKS5xdWVyeVNlbGVjdG9yKCdbcm9sZT1cIicgKyB0YXJnZXQgKyAnXCJdJyk7XG5cdFx0fVxuXHRcdGlmKCFyZXMgJiYgdGFyZ2V0PT0nYm9keScpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0T3B0aW9ucygndGFyZ2V0RWwnKTtcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHR9XG5cblx0Lypcblx0XHREYXRhIG1hbmFnZW1lbnRcblx0Ki9cblxuXHR1cGRhdGVGaWVsZChmaWVsZE5hbWUpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHRpZiAodGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uZmllbGQubmFtZSA9PT0gZmllbGROYW1lKXtcblx0XHRcdFx0dGhpcy5nZXRXb3JraW5nKCdjb21wb25lbnRzJylbdF0uY29tcG9uZW50LnVwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZSgpe1xuXHRcdGZvcihsZXQgdCA9IDA7IHQgPCB0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKS5sZW5ndGg7IHQrKyl7XG5cdFx0XHR0aGlzLmdldFdvcmtpbmcoJ2NvbXBvbmVudHMnKVt0XS5jb21wb25lbnQudXBkYXRlKCk7XG5cdFx0fVxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgbm90RGV0YWlscztcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdERldGFpbHMgZnJvbSAnLi4vY29tcG9uZW50cy9ub3REZXRhaWxzLmpzJztcbmltcG9ydCBub3RDb21tb24gZnJvbSAnLi4vY29tbW9uJztcblxuY29uc3QgT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04gPSAnZ2V0Jyxcblx0T1BUX0RFRkFVTFRfVklFVyA9ICdkZXRhaWxzJztcblxuY2xhc3MgQ1JVRERldGFpbHMgZXh0ZW5kcyBub3RDb250cm9sbGVyIHtcblx0Y29uc3RydWN0b3IocGFyZW50LCBwYXJhbXMpIHtcblx0XHRzdXBlcihwYXJlbnQuYXBwKTtcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0bm90Q29tbW9uLmxvZygnQ1JVRCBEZXRhaWxzJyk7XG5cdFx0dGhpcy5zZXRWaWV3cyh7XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdG5hbWU6IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMubmFtZScpIHx8IE9QVF9ERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGNvbW1vbjogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5jb21tb24nKSB8fCB0cnVlLFxuXHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5jb250YWluZXJTZWxlY3RvcicpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ2NvbnRhaW5lclNlbGVjdG9yJyksXG5cdFx0XHRcdGhlbHBlcnM6IHt9XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHR0aGlzLnByZWxvYWRMaWIodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5wcmVsb2FkJykpXG5cdFx0XHQudGhlbih0aGlzLmxvYWRJdGVtLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbih0aGlzLnNldERhdGEuYmluZCh0aGlzKSlcblx0XHRcdC50aGVuKHRoaXMucmVuZGVyV3JhcHBlci5iaW5kKHRoaXMpKVxuXHRcdFx0LnRoZW4odGhpcy5yZW5kZXJEZXRhaWxzLmJpbmQodGhpcykpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlcignYWZ0ZXJSZW5kZXInKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2gobm90Q29tbW9uLnJlcG9ydCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRsb2FkSXRlbSgpIHtcblx0XHRyZXR1cm4gdGhpcy5tYWtlW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKV0oe1xuXHRcdFx0J19pZCc6IHRoaXMuZ2V0T3B0aW9ucygncGFyYW1zLjAnKVxuXHRcdH0pWyckJyArICh0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OKV0oKTtcblx0fVxuXG5cblx0cmVuZGVyV3JhcHBlcigpIHtcblx0XHRsZXQgaXRlbSA9IHRoaXMuZ2V0RGF0YSgpO1xuXHRcdHZhciBoZWxwZXJzID0ge1xuXHRcdFx0SUQ6IGl0ZW0gPyBpdGVtW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSArICdJRCddIDogJycsXG5cdFx0XHRmaWVsZDoge1xuXHRcdFx0XHRhcnJheTogZmFsc2Vcblx0XHRcdH0sXG5cdFx0XHR1cGRhdGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0dGhpcy5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUoW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSwgcGFyYW1zLml0ZW0uX2lkLCAndXBkYXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRkZWxldGU6IChwYXJhbXMpID0+IHtcblx0XHRcdFx0dGhpcy5hcHAuZ2V0V29ya2luZygncm91dGVyJykubmF2aWdhdGUoW3RoaXMucGFyZW50LmdldE1vZHVsZU5hbWUoKSwgcGFyYW1zLml0ZW0uX2lkLCAnZGVsZXRlJ10uam9pbignLycpKTtcblx0XHRcdH0sXG5cdFx0XHRsaW5rQmFja1RvTGlzdDogdGhpcy5wYXJlbnQubGlua0JhY2tUb0xpc3QuYmluZCh0aGlzLnBhcmVudCksXG5cdFx0XHR0aXRsZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygnbmFtZXMuc2luZ2xlJylcblx0XHR9O1xuXHRcdHJldHVybiB0aGlzLnJlbmRlcignZGVmYXVsdCcsIGl0ZW0sIGhlbHBlcnMpO1xuXHR9XG5cblx0cmVuZGVyRGV0YWlscygpIHtcblx0XHRsZXQgaXRlbSA9IHRoaXMuZ2V0RGF0YSgpO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRuZXcgbm90RGV0YWlscyh7XG5cdFx0XHRcdFx0ZGF0YTogaXRlbSxcblx0XHRcdFx0XHRvcHRpb25zOiB7XG5cdFx0XHRcdFx0XHR0YXJnZXRRdWVyeTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy50YXJnZXRRdWVyeScpLFxuXHRcdFx0XHRcdFx0dGFyZ2V0RWw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy50YXJnZXRRdWVyeScpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3RhcmdldFF1ZXJ5JykpLFxuXHRcdFx0XHRcdFx0YWN0aW9uOiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLmFjdGlvbicpIHx8IE9QVF9ERUZBVUxUX0xPQURfQUNUSU9OLFxuXHRcdFx0XHRcdFx0cHJlZml4OiB0aGlzLnBhcmVudC5nZXRPcHRpb25zKCd2aWV3cy5kZXRhaWxzLnByZWZpeCcpIHx8IHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ByZWZpeCcpLFxuXHRcdFx0XHRcdFx0cm9sZTogdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygndmlld3MuZGV0YWlscy5yb2xlJykgfHwgdGhpcy5wYXJlbnQuZ2V0T3B0aW9ucygncm9sZScpLFxuXHRcdFx0XHRcdFx0aGVscGVyczogbm90Q29tbW9uLmV4dGVuZCh7XG5cdFx0XHRcdFx0XHRcdGxpbmtCYWNrVG9MaXN0OiB0aGlzLnBhcmVudC5saW5rQmFja1RvTGlzdCgpLFxuXHRcdFx0XHRcdFx0XHRsaWJzOiB0aGlzLmdldE9wdGlvbnMoJ2xpYicpLFxuXHRcdFx0XHRcdFx0XHRJRDogaXRlbVt0aGlzLnBhcmVudC5nZXRNb2R1bGVOYW1lKCkgKyAnSUQnXSxcblx0XHRcdFx0XHRcdFx0X192ZXJzaW9uOiBpdGVtLl9fdmVyc2lvbixcblx0XHRcdFx0XHRcdH0sIHRoaXMucGFyZW50LmdldE9wdGlvbnMoJ3ZpZXdzLmRldGFpbHMuaGVscGVycycpIHx8IHt9KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0ZXZlbnRzOiBbXG5cdFx0XHRcdFx0XHRbJ2FmdGVyUmVuZGVyJywgcmVzb2x2ZV1cblx0XHRcdFx0XHRdXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVERGV0YWlscztcbiIsImltcG9ydCBub3RDb250cm9sbGVyIGZyb20gJy4uL25vdENvbnRyb2xsZXIuanMnO1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IENSVURDcmVhdGUgZnJvbSAnLi9DcmVhdGUnO1xuaW1wb3J0IENSVURMaXN0IGZyb20gJy4vTGlzdCc7XG5pbXBvcnQgQ1JVRFVwZGF0ZSBmcm9tICcuL1VwZGF0ZSc7XG5pbXBvcnQgQ1JVRERlbGV0ZSBmcm9tICcuL0RlbGV0ZSc7XG5pbXBvcnQgQ1JVRERldGFpbHMgZnJvbSAnLi9EZXRhaWxzJztcblxuXG5jbGFzcyBDUlVEQ29udHJvbGxlciBleHRlbmRzIG5vdENvbnRyb2xsZXIge1xuXHRjb25zdHJ1Y3RvcihhcHAsIHBhcmFtcykge1xuXHRcdG5vdENvbW1vbi5sb2coJ3J1bm5pbmcgQ1JVRENvbnRyb2xsZXInKTtcblx0XHRzdXBlcihhcHApO1xuXHRcdHRoaXMuc2V0T3B0aW9ucygnbmFtZXMnLCB7XG5cdFx0XHRwbHVyYWw6ICdwbHVyYWwnLFxuXHRcdFx0c2luZ2xlOiAnc2luZ2xlJyxcblx0XHR9KTtcblx0XHR0aGlzLnNldE9wdGlvbnMoJ3BhcmFtcycsIHBhcmFtcyk7XG5cdFx0dGhpcy5zZXRPcHRpb25zKCdjb250YWluZXJTZWxlY3RvcicsIHRoaXMuYXBwLmdldE9wdGlvbnMoJ2NydWQuY29udGFpbmVyU2VsZWN0b3InKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRyb3V0ZShwYXJhbXMgPSBbXSl7XG5cdFx0aWYocGFyYW1zLmxlbmd0aD09MSl7XG5cdFx0XHRpZihwYXJhbXNbMF0gPT09ICdjcmVhdGUnKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuQ3JlYXRlKHBhcmFtcyk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHRoaXMucnVuRGV0YWlscyhwYXJhbXMpO1xuXHRcdFx0fVxuXHRcdH1lbHNlIGlmKHBhcmFtcy5sZW5ndGggPT0gMil7XG5cdFx0XHRpZiAocGFyYW1zWzFdID09PSAnZGVsZXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1bkRlbGV0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2UgaWYocGFyYW1zWzFdID09PSAndXBkYXRlJyl7XG5cdFx0XHRcdHJldHVybiB0aGlzLnJ1blVwZGF0ZShwYXJhbXMpO1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRsZXQgcm91dGVSdW5uZXJOYW1lID0gJ3J1bicgKyBub3RDb21tb24uY2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHBhcmFtc1swXSk7XG5cdFx0XHRcdGlmKHRoaXNbcm91dGVSdW5uZXJOYW1lXSAmJiB0eXBlb2YgdGhpc1tyb3V0ZVJ1bm5lck5hbWVdID09PSAnZnVuY3Rpb24nKXtcblx0XHRcdFx0XHRyZXR1cm4gdGhpc1tyb3V0ZVJ1bm5lck5hbWVdKHBhcmFtcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMucnVuTGlzdChwYXJhbXMpO1xuXHR9XG5cblx0cnVuQ3JlYXRlKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRENyZWF0ZSh0aGlzLCBwYXJhbXMpXG5cdFx0XHQub24oJ2FmdGVyUmVuZGVyJywgdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcykpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0cnVuTGlzdChwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURMaXN0KHRoaXMsIHBhcmFtcylcblx0XHRcdC5vbignYWZ0ZXJSZW5kZXInLCB0aGlzLm9uQWZ0ZXJSZW5kZXIuYmluZCh0aGlzKSk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHRydW5EZXRhaWxzKHBhcmFtcyA9IFtdKXtcblx0XHR0aGlzLnZpZXcgPSBuZXcgQ1JVRERldGFpbHModGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1bkRlbGV0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVUREZWxldGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdHJ1blVwZGF0ZShwYXJhbXMgPSBbXSl7XG5cdFx0dGhpcy52aWV3ID0gbmV3IENSVURVcGRhdGUodGhpcywgcGFyYW1zKVxuXHRcdFx0Lm9uKCdhZnRlclJlbmRlcicsIHRoaXMub25BZnRlclJlbmRlci5iaW5kKHRoaXMpKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdG9uQWZ0ZXJSZW5kZXIoKXtcblx0XHR0aGlzLnRyaWdnZXIoJ2FmdGVyUmVuZGVyJyk7XG5cdH1cblxuXHRiYWNrVG9MaXN0KCkge1xuXHRcdHRoaXMuYXBwLmdldFdvcmtpbmcoJ3JvdXRlcicpLm5hdmlnYXRlKHRoaXMuZ2V0TW9kdWxlTmFtZSgpKTtcblx0fVxuXG5cdGxpbmtCYWNrVG9MaXN0KCkge1xuXHRcdHJldHVybiB0aGlzLmdldE1vZHVsZU5hbWUoKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBDUlVEQ29udHJvbGxlcjtcbiIsImltcG9ydCBub3RQYXRoIGZyb20gJy4uL25vdFBhdGguanMnO1xuaW1wb3J0IG5vdFJvdXRlciBmcm9tICcuLi9ub3RSb3V0ZXInO1xuXG52YXIgbm90VGVtcGxhdGVQcm9jZXNzb3JzTGliID0ge1xuXHRjb250ZW50OiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdGlmIChzY29wZS5wYXJhbXMuaW5kZXhPZignY2FwaXRhbGl6ZScpID4gLTEpIHtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdC50b1VwcGVyQ2FzZSgpO1xuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LnRleHRDb250ZW50ID0gc2NvcGUuYXR0cmlidXRlUmVzdWx0O1xuXHR9LFxuXHRiaW5kOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGlmIChzY29wZS5lbGVtZW50LmJpbmRzKXtcblx0XHRcdGlmKHNjb3BlLmVsZW1lbnQuYmluZHMuaGFzT3duUHJvcGVydHkoc2NvcGUucGFyYW1zWzBdKSl7XG5cdFx0XHRcdGlmKHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXS5pbmRleE9mKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24pID4gLTEpe1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRzY29wZS5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoc2NvcGUucGFyYW1zWzBdLCAoZSkgPT4ge1xuXHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGg9PT0xIHx8IHNjb3BlLnBhcmFtc1sxXSAhPT0gJ2RlZmF1bHQnKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblx0XHRcdGlmIChzY29wZS5hdHRyaWJ1dGVSZXN1bHQpIHtcblx0XHRcdFx0cmV0dXJuIHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCh7XG5cdFx0XHRcdFx0c2NvcGUsXG5cdFx0XHRcdFx0aXRlbSxcblx0XHRcdFx0XHRoZWxwZXJzLFxuXHRcdFx0XHRcdGVcblx0XHRcdFx0fSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSk7XG5cdFx0aWYoIXNjb3BlLmVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ2JpbmRzJykpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kcyA9IHt9O1xuXHRcdH1cblx0XHRpZighc2NvcGUuZWxlbWVudC5iaW5kcy5oYXNPd25Qcm9wZXJ0eShzY29wZS5wYXJhbXNbMF0pKXtcblx0XHRcdHNjb3BlLmVsZW1lbnQuYmluZHNbc2NvcGUucGFyYW1zWzBdXSA9IFtdO1xuXHRcdH1cblx0XHRpZihzY29wZS5lbGVtZW50LmJpbmRzW3Njb3BlLnBhcmFtc1swXV0uaW5kZXhPZihzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uKSA9PT0gLTEpe1xuXHRcdFx0c2NvcGUuZWxlbWVudC5iaW5kc1tzY29wZS5wYXJhbXNbMF1dLnB1c2goc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbik7XG5cdFx0fVxuXHR9LFxuXHR2YWx1ZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgbGl2ZUV2ZW50cyA9IFsnY2hhbmdlJywgJ2tleXVwJ10sXG5cdFx0XHRvbkV2ZW50ID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoWydjaGVja2JveCcsICdyYWRpbycsICdzZWxlY3QtbXVsdGlwbGUnXS5pbmRleE9mKHNjb3BlLmVsZW1lbnQudHlwZSkgPiAtMSkge1xuXHRcdFx0XHRcdHN3aXRjaCAoc2NvcGUuZWxlbWVudC50eXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRub3RQYXRoLnNldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAncmFkaW8nOlxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKGhlbHBlcnMuZmllbGQubmFtZSwgaGVscGVycy5kYXRhLCBoZWxwZXJzLCBzY29wZS5lbGVtZW50LmNoZWNrZWQ/c2NvcGUuZWxlbWVudC52YWx1ZTpudWxsKTtcblx0XHRcdFx0XHRcdFx0bm90UGF0aC5zZXQoaGVscGVycy5maWVsZC5uYW1lLCBoZWxwZXJzLmRhdGEsIGhlbHBlcnMsIHNjb3BlLmVsZW1lbnQuY2hlY2tlZCA/IHNjb3BlLmVsZW1lbnQudmFsdWUgOiBudWxsKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3NlbGVjdC1tdWx0aXBsZSc6XG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdGxldCBzZWxlY3RlZCA9IFtdLnNsaWNlLmNhbGwoc2NvcGUuZWxlbWVudC5zZWxlY3RlZE9wdGlvbnMpLm1hcChhID0+IGEudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKCdzZWxlY3QtbXVsdGlwbGUnLCBzZWxlY3RlZCk7XG5cdFx0XHRcdFx0XHRcdG5vdFBhdGguc2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMsIHNlbGVjdGVkKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvL2NvbnNvbGUubG9nKG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpLCAnIC0+ICcsc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdFx0bm90UGF0aC5zZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycywgc2NvcGUuZWxlbWVudC52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykpO1xuXHRcdGlmIChzY29wZS5lbGVtZW50LnByb2Nlc3NlZFZhbHVlICE9PSB0cnVlKSB7XG5cdFx0XHRpZihzY29wZS5lbGVtZW50LnR5cGUgPT09ICd0ZXh0YXJlYScpe1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0fVxuXHRcdFx0Zm9yIChsZXQgdCBvZiBsaXZlRXZlbnRzKSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LCBvbkV2ZW50KTtcblx0XHRcdH1cblx0XHRcdHNjb3BlLmVsZW1lbnQucHJvY2Vzc2VkVmFsdWUgPSB0cnVlO1xuXHRcdH1cblx0fSxcblx0YXR0cjogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRsZXQgcmVzID0gbm90UGF0aC5nZXQoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycykgfHwgbm90UGF0aC5wYXJzZVN1YnMoc2NvcGUuYXR0cmlidXRlRXhwcmVzc2lvbiwgaXRlbSwgaGVscGVycyk7XG5cdFx0c2NvcGUuYXR0cmlidXRlUmVzdWx0ID0gKCh0eXBlb2YgcmVzID09PSAnZnVuY3Rpb24nKSA/IHJlcyh7XG5cdFx0XHRzY29wZSxcblx0XHRcdGl0ZW0sXG5cdFx0XHRoZWxwZXJzXG5cdFx0fSkgOiByZXMpO1xuXHRcdHNjb3BlLmVsZW1lbnQuc2V0QXR0cmlidXRlKHNjb3BlLnBhcmFtc1swXSwgc2NvcGUuYXR0cmlidXRlUmVzdWx0KTtcblx0fSxcblx0bmFtZTogZnVuY3Rpb24oc2NvcGUsIGl0ZW0sIGhlbHBlcnMpIHtcblx0XHRzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnbmFtZScsIG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpKTtcblx0fSxcblx0Y2hhbmdlOiBmdW5jdGlvbiggLypzY29wZSwgaXRlbSwgaGVscGVycyovICkge1xuXG5cdH0sXG5cdGNoZWNrZWQ6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlc3VsdCA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlc3VsdCA9PT0gJ2Z1bmN0aW9uJykgPyByZXN1bHQoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzdWx0KTtcblx0XHRzY29wZS5hdHRyaWJ1dGVSZXN1bHQgPyBzY29wZS5lbGVtZW50LnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpIDogc2NvcGUuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcblx0fSxcblx0Y2xhc3M6IGZ1bmN0aW9uKHNjb3BlLCBpdGVtLCBoZWxwZXJzKSB7XG5cdFx0bGV0IHJlcyA9IG5vdFBhdGguZ2V0KHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9ICgodHlwZW9mIHJlcyA9PT0gJ2Z1bmN0aW9uJykgPyByZXMoe1xuXHRcdFx0c2NvcGUsXG5cdFx0XHRpdGVtLFxuXHRcdFx0aGVscGVyc1xuXHRcdH0pIDogcmVzKTtcblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA8IDMgfHwgaXNOYU4oc2NvcGUuYXR0cmlidXRlUmVzdWx0KSkge1xuXHRcdFx0aWYgKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzBdKTtcblx0XHRcdFx0aWYgKHNjb3BlLnBhcmFtcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHNjb3BlLnBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbMF0pO1xuXHRcdFx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHRzY29wZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoc2NvcGUucGFyYW1zWzFdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgdXNlZCA9IGZhbHNlO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzY29wZS5wYXJhbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGkgPT09IHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHRcdHVzZWQgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNjb3BlLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShzY29wZS5wYXJhbXNbaV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXVzZWQpIHtcblx0XHRcdFx0c2NvcGUuZWxlbWVudC5jbGFzc0xpc3QuYWRkKHNjb3BlLnBhcmFtc1swXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRvcHRpb25zOiBmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycykge1xuXHRcdGxldCBpID0gMCxcblx0XHRcdG9wdGlvbiA9IG51bGwsXG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9ICd2YWx1ZScsXG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9ICduYW1lJyxcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2ZpZWxkJykgJiYgaGVscGVycy5maWVsZC5oYXNPd25Qcm9wZXJ0eSgnbmFtZScpID8gaGVscGVycy5maWVsZC5uYW1lIDogJ3ZhbHVlJztcblx0XHRzY29wZS5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXHRcdGlmIChzY29wZS5wYXJhbXMubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRsYWJlbEZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1swXTtcblx0XHRcdHZhbHVlRmllbGROYW1lID0gc2NvcGUucGFyYW1zWzFdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUucGFyYW1zLmxlbmd0aCA9PT0gMykge1xuXHRcdFx0bGFiZWxGaWVsZE5hbWUgPSBzY29wZS5wYXJhbXNbMF07XG5cdFx0XHR2YWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1sxXTtcblx0XHRcdGl0ZW1WYWx1ZUZpZWxkTmFtZSA9IHNjb3BlLnBhcmFtc1syXTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiBoZWxwZXJzICE9PSAndW5kZWZpbmVkJyAmJiBoZWxwZXJzICE9PSBudWxsICYmIGhlbHBlcnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSAmJiBoZWxwZXJzLmRlZmF1bHQpIHtcblx0XHRcdG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuXHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgndmFsdWUnLCAnJyk7XG5cdFx0XHRvcHRpb24udGV4dENvbnRlbnQgPSBoZWxwZXJzLnBsYWNlaG9sZGVyO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdH1cblx0XHRpZiAodHlwZW9mIGl0ZW0gIT09ICd1bmRlZmluZWQnICYmIGl0ZW0gIT09IG51bGwpIHtcblx0XHRcdHZhciBsaWIgPSBub3RQYXRoLmdldChzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKTtcblx0XHRcdGZvciAoaSA9IDA7IGkgPCBsaWIubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0b3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cdFx0XHRcdG9wdGlvbi5zZXRBdHRyaWJ1dGUoJ3ZhbHVlJywgbGliW2ldW3ZhbHVlRmllbGROYW1lXSk7XG5cdFx0XHRcdG9wdGlvbi50ZXh0Q29udGVudCA9IGxpYltpXVtsYWJlbEZpZWxkTmFtZV07XG5cdFx0XHRcdGlmIChoZWxwZXJzLmZpZWxkLmFycmF5KSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSAmJiBBcnJheS5pc0FycmF5KGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSkpe1xuXHRcdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXS5pbmRleE9mKGxpYltpXVt2YWx1ZUZpZWxkTmFtZV0pID4gLTEpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKGl0ZW1baXRlbVZhbHVlRmllbGROYW1lXSA9PT0gbGliW2ldW3ZhbHVlRmllbGROYW1lXSkge1xuXHRcdFx0XHRcdFx0b3B0aW9uLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCB0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0c2NvcGUuZWxlbWVudC5hcHBlbmRDaGlsZChvcHRpb24pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aHJlZjpmdW5jdGlvbihzY29wZSwgaXRlbSwgaGVscGVycyl7XG5cdFx0aWYgKCFzY29wZS5lbGVtZW50Lm5vdFJvdXRlckluaXRpYWxpemVkKXtcblx0XHRcdHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCA9IG5vdFBhdGgucGFyc2VTdWJzKHNjb3BlLmF0dHJpYnV0ZUV4cHJlc3Npb24sIGl0ZW0sIGhlbHBlcnMpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBub3RSb3V0ZXIuZ2V0RnVsbFJvdXRlKHNjb3BlLmF0dHJpYnV0ZVJlc3VsdCkpO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdG5vdFJvdXRlci5uYXZpZ2F0ZShub3RQYXRoLnBhcnNlU3VicyhzY29wZS5hdHRyaWJ1dGVFeHByZXNzaW9uLCBpdGVtLCBoZWxwZXJzKSk7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH0pO1xuXHRcdFx0c2NvcGUuZWxlbWVudC5ub3RSb3V0ZXJJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0fVxuXHR9XG5cbn07XG5leHBvcnQgZGVmYXVsdCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWI7XG4iLCIvKlxuXHRDb21tb24gZnVuY3Rpb25zXG4qL1xuaW1wb3J0IG5vdENvbW1vbiBmcm9tICcuL2NvbW1vbic7XG4vKlxuXHRmcmFtZXdvcmsgd2lkZSBwYXJzZXIgZm9yIGRhdGEgYWNjZXNzXG4qL1xuaW1wb3J0IG5vdFBhdGggZnJvbSAnLi9ub3RQYXRoJztcbmltcG9ydCBub3RSb3V0ZXIgZnJvbSAnLi9ub3RSb3V0ZXInO1xuXG5pbXBvcnQgbm90QVBJIGZyb20gJy4vYXBpJztcbi8qXG5cdGJhc2ljIGV2ZW50IGhhbmRsZXJzIGFuZCBjb3JlIGRhdGEgbW9kaWZpZXJzXG4qL1xuaW1wb3J0IG5vdEJhc2UgZnJvbSAnLi9ub3RCYXNlJztcbi8qXG5cdHNtYXJ0ZXIgaW1hZ2UgY29udHJvbFxuKi9cbmltcG9ydCBub3RJbWFnZSBmcm9tICcuL3RlbXBsYXRlL25vdEltYWdlJztcbi8qXG5cdGFwcGxpY2F0aW9uIG1haW4gaW5mcmFzdHJ1Y3R1cmUgc2V0dGVyXG4qL1xuaW1wb3J0IG5vdEFwcCBmcm9tICcuL25vdEFwcCc7XG4vKlxuXHR1c2VyIGNvbnRyb2xsZXJzXG4qL1xuaW1wb3J0IG5vdENvbnRyb2xsZXIgZnJvbSAnLi9ub3RDb250cm9sbGVyJztcblxuaW1wb3J0IHtDUlVEQ29udHJvbGxlcixDUlVEQ3JlYXRlLENSVUREZWxldGUsQ1JVRERldGFpbHMsQ1JVRExpc3QsQ1JVRFVwZGF0ZX0gZnJvbSAnLi9DUlVEJztcblxuLypcblx0dGVtcGxhdGluZyBhbmQgY29tbW9uIHN0cnVjdHVyZXNcbiovXG5cbmltcG9ydCBub3RSZW5kZXJlciBmcm9tICcuL3RlbXBsYXRlL25vdFJlbmRlcmVyJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZUNhY2hlIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVDYWNoZSc7IC8vIG9ubHkgcGFyc2luZyBhbmQgcmVwbGFjaW5nXG5pbXBvcnQgbm90VGVtcGxhdGVQcm9jZXNzb3JzIGZyb20gJy4vdGVtcGxhdGUvbm90VGVtcGxhdGVQcm9jZXNzb3JzJzsgLy8gb25seSBwYXJzaW5nIGFuZCByZXBsYWNpbmdcbmltcG9ydCBub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIgZnJvbSAnLi90ZW1wbGF0ZS9ub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWInOyAvLyBvbmx5IHBhcnNpbmcgYW5kIHJlcGxhY2luZ1xuaW1wb3J0IG5vdENvbXBvbmVudCBmcm9tICcuL3RlbXBsYXRlL25vdENvbXBvbmVudCc7IC8vIHNtYXJ0ZXIgd2l0aCBiaW5kaW5ncyBmb3IgZXZlbnRzLCBhY3R1YWx5IHByb3h5XG5cbmltcG9ydCBub3RGb3JtIGZyb20gJy4vY29tcG9uZW50cy9ub3RGb3JtJztcbmltcG9ydCBub3RUYWJsZSBmcm9tICcuL2NvbXBvbmVudHMvbm90VGFibGUnO1xuaW1wb3J0IG5vdERldGFpbHMgZnJvbSAnLi9jb21wb25lbnRzL25vdERldGFpbHMnO1xuXG5pbXBvcnQgbm90UmVjb3JkSW50ZXJmYWNlIGZyb20gJy4vbm90UmVjb3JkSW50ZXJmYWNlJzsgLy9cdGhvdyB0byBpbnRlcmFjdCB3aXRoIGRhdGEgb24gc2VydmVyXG5pbXBvcnQgbm90UmVjb3JkIGZyb20gJy4vbm90UmVjb3JkJzsgLy9cdHdyYXBwZXIgZm9yIGRhdGEgd2l0aCBzZXJ2ZXI8LT52aWV3IGxpdmUgaW50ZXJhY3Rpb25zXG5cbm5vdFRlbXBsYXRlUHJvY2Vzc29ycy5hZGQobm90VGVtcGxhdGVQcm9jZXNzb3JzTGliKTtcblxuZXhwb3J0IHtcblx0bm90Q29tbW9uLFxuXHRub3RQYXRoLFxuXHRub3RCYXNlLFxuXHRub3RJbWFnZSxcblx0bm90QXBwLFxuXHRub3RBUEksXG5cdG5vdENvbnRyb2xsZXIsXG5cdENSVURDb250cm9sbGVyLFxuXHRDUlVEQ3JlYXRlLFxuXHRDUlVERGVsZXRlLFxuXHRDUlVERGV0YWlscyxcblx0Q1JVRExpc3QsXG5cdENSVURVcGRhdGUsXG5cdG5vdFRlbXBsYXRlUHJvY2Vzc29ycyxcblx0bm90VGVtcGxhdGVQcm9jZXNzb3JzTGliLFxuXHRub3RUZW1wbGF0ZUNhY2hlLFxuXHRub3RSZW5kZXJlcixcblx0bm90Q29tcG9uZW50LFxuXHRub3RGb3JtLFxuXHRub3RSb3V0ZXIsXG5cdG5vdFRhYmxlLFxuXHRub3REZXRhaWxzLFxuXHRub3RSZWNvcmQsXG5cdG5vdFJlY29yZEludGVyZmFjZVxufTtcbiJdLCJuYW1lcyI6WyJDb21tb25OZXR3b3JrIiwidXJpIiwiZ2V0IiwiZGF0YUFycmF5IiwiZmllbGRzIiwiaSIsImYiLCJoYXNPd25Qcm9wZXJ0eSIsImltYWdlIiwiSW1hZ2UiLCJzZXRBdHRyaWJ1dGUiLCJzcmMiLCJpbmRleE9mIiwiYWRkUHJvdG9jb2wiLCJ1cGxvYWQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25Qcm9ncmVzcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNwb25zZVR5cGUiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJ3aXRoQ3JlZGVudGlhbHMiLCJvcGVuIiwidXJsIiwic2V0UmVxdWVzdEhlYWRlciIsImdldFNlc3Npb25JRCIsImZpbGUiLCJ0eXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwibmFtZSIsInNlbmQiLCJtZXRob2QiLCJkYXRhIiwib25sb2FkIiwidCIsIm9uZXJyb3IiLCJvbnRpbWVvdXQiLCJwYXJzZUludCIsInJlc3BvbnNlVGV4dCIsImUiLCJnZXRDb29raWUiLCJ2YWx1ZSIsImRvY3VtZW50IiwiY29va2llIiwicGFydHMiLCJzcGxpdCIsImxlbmd0aCIsInBvcCIsInNoaWZ0IiwiTE9HIiwiQ29tbW9uTG9ncyIsIm5vdEZyYW1ld29yayIsIm5vdENvbW1vbiIsImVycm9yIiwiYXJndW1lbnRzIiwibG9nIiwidHJhY2UiLCJyZWdpc3RlciIsIk1BTkFHRVIiLCJTeW1ib2wiLCJDb21tb25TaG9ydHMiLCJnZXRNYW5hZ2VyIiwiZ2V0QVBJIiwidiIsIkNvbW1vbk9iamVjdHMiLCJkZWZhdWx0cyIsIm9wdGlvbnMiLCJleHRlbmRlZCIsInByb3AiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJjYWxsIiwidGFyZ2V0Iiwic291cmNlcyIsImZvckVhY2giLCJkZXNjcmlwdG9ycyIsImtleXMiLCJzb3VyY2UiLCJyZWR1Y2UiLCJrZXkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJkZXNjcmlwdG9yIiwic3ltIiwiZW51bWVyYWJsZSIsImRlZmluZVByb3BlcnRpZXMiLCJiaWciLCJzbWFsbCIsIm9iaiIsImZpbHRlciIsImNvbnRhaW5zT2JqIiwiaWNvbnMiLCJiYXRjaCIsImdldERhdGEiLCJwdXNoIiwiYSIsImIiLCJwIiwiZXF1YWwiLCJ0b1N0cmluZyIsImRlZmF1bHRWYWx1ZSIsIm9iajEiLCJvYmoyIiwialF1ZXJ5IiwiZXh0ZW5kIiwidmFsIiwicmVnaXN0cnkiLCJhcnJheSIsIm9sZF9pbmRleCIsIm5ld19pbmRleCIsImsiLCJ1bmRlZmluZWQiLCJzcGxpY2UiLCJDb21tb25TdHJpbmdzIiwic3RyaW5nIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiQ29tbW9uRnVuY3Rpb25zIiwiZnVuY3MiLCJyZXN1bHQiLCJmdW5jIiwiQ29tbW9uRE9NIiwiZWwiLCJzdGFydHNXaXRoIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGlzdCIsImoiLCJhdHRzIiwiYXR0cmlidXRlcyIsIm4iLCJub2RlTmFtZSIsIkNvbW1vbkFwcCIsInN0YXJ0ZXIiLCJhc3NpZ24iLCJleHRlbmRXaXRoIiwiU1VCX1BBVEhfU1RBUlQiLCJTVUJfUEFUSF9FTkQiLCJQQVRIX1NQTElUIiwiUEFUSF9TVEFSVF9PQkpFQ1QiLCJQQVRIX1NUQVJUX0hFTFBFUlMiLCJGVU5DVElPTl9NQVJLRVIiLCJNQVhfREVFUCIsIm5vdFBhdGgiLCJwYXRoIiwic3ViUGF0aCIsImZpbmQiLCJzdWIiLCJwYXJzZWQiLCJzdWJmIiwicmVwbGFjZSIsIml0ZW0iLCJoZWxwZXJzIiwic3ViUGF0aFBhcnNlZCIsImZpbmROZXh0U3ViUGF0aCIsImdldFZhbHVlQnlQYXRoIiwicmVwbGFjZVN1YlBhdGgiLCJwYXJzZVN1YnMiLCJhdHRyVmFsdWUiLCJzZXRWYWx1ZUJ5UGF0aCIsImlzUmVjb3JkIiwibm9ybWlsaXplUGF0aCIsInRyaWdnZXIiLCJzZXQiLCJzdGVwIiwiaGVscGVyIiwiclN0ZXAiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZVBhdGhTdGVwIiwib2JqZWN0IiwiYXR0clBhdGgiLCJhdHRyTmFtZSIsImlzRnVuY3Rpb24iLCJuZXdPYmoiLCJhcmdzIiwiam9pbiIsIk1FVEFfTUVUSE9EX0lOSVQiLCJNRVRBX0VWRU5UUyIsIk1FVEFfREFUQSIsIk1FVEFfV09SS0lORyIsIk1FVEFfT1BUSU9OUyIsIm5vdEJhc2UiLCJpbnB1dCIsImV2ZW50cyIsIm9uIiwic2V0RGF0YSIsInNldFdvcmtpbmciLCJ3b3JraW5nIiwic2V0T3B0aW9ucyIsIndoYXQiLCJyZXMiLCJzZXRDb21tb24iLCJnZXRDb21tb24iLCJnZXRPcHRpb25zIiwiZ2V0V29ya2luZyIsImV2ZW50TmFtZXMiLCJldmVudENhbGxiYWNrcyIsIm9uY2UiLCJkZWZpbmVJZk5vdEV4aXN0cyIsImZyb20iLCJldmVudE5hbWUiLCJnIiwiZXZlbnQiLCJvZmYiLCJjYWxsYmFja3MiLCJoIiwidGFyZ2V0SWQiLCJPUFRfTU9ERV9ISVNUT1JZIiwiT1BUX01PREVfSEFTSCIsIk9QVF9ERUZBVUxUX0NIRUNLX0lOVEVSVkFMIiwibm90Um91dGVyIiwicm9vdCIsImNsZWFyU2xhc2hlcyIsInJlIiwiaGFuZGxlciIsInJ1bGUiLCJhZGQiLCJwYXJhbSIsInIiLCJmcmFnbWVudCIsImxvY2F0aW9uIiwiZGVjb2RlVVJJIiwicGF0aG5hbWUiLCJzZWFyY2giLCJ3aW5kb3ciLCJtYXRjaCIsImhyZWYiLCJjdXJyZW50IiwiZ2V0RnJhZ21lbnQiLCJpbml0IiwiaXNJbml0aWFsaXplZCIsImNoZWNrIiwic2V0SW5pdGlhbGl6ZWQiLCJsb29wSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNoZWNrTG9jYXRpb24iLCJiaW5kIiwiaHJlZkNsaWNrIiwiZnVsbFJFIiwiYXBwbHkiLCJob3N0IiwicHVzaFN0YXRlIiwiZ2V0RnVsbFJvdXRlIiwiYm9keSIsImdldEFsbExpbmtzIiwiaW5pdFJlcm91dGluZyIsImdldEF0dHJpYnV0ZSIsImxpbmsiLCJub3RSb3V0ZXJJbml0aWFsaXplZCIsImZ1bGxMaW5rIiwicHJldmVudERlZmF1bHQiLCJuYXZpZ2F0ZSIsIm5vdEFQSU9wdGlvbnMiLCJub3RBUElRdWVlIiwicmVxdWVzdHNQZXJTZWNvbmQiLCJxdWVlIiwiaW50IiwiaW5Qcm9ncmVzcyIsInRvQ2FsbCIsImNsZWFySW50ZXJ2YWwiLCJydW4iLCJub3RBUEkiLCJpZCIsImdvb2QiLCJiYWQiLCJtYWtlUmVxdWVzdCIsInJlc3BvbnNlT0siLCJyZXNwb25zZUZhaWxlZCIsInJlcXVlc3RKU09OIiwidGhlbiIsIm5leHQiLCJjYXRjaCIsImdldElkIiwibW9kZWxOYW1lIiwiZ2V0TW9kZWxOYW1lIiwibWFrZVVybCIsImdldEpTT04iLCJub3RJbWFnZSIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1BSRUZJWCIsIlRFTVBMQVRFX1RBRyIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX1NFUEFSQVRPUiIsIlBST0NFU1NPUl9FWFBSRVNTSU9OX0NPTkRJVElPTl9QT1NURklYIiwiQ09NUE9ORU5UX0lEX1BSRUZJWCIsIlBBUlRfSURfUFJFRklYIiwiREVGQVVMVF9QTEFDRVIiLCJERUZBVUxUX1BMQUNFUl9MT09QIiwiT1BUUyIsIk1FVEFfQ0FDSEUiLCJub3RUZW1wbGF0ZUNhY2hlIiwiaGlkZVRlbXBsYXRlcyIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJtYXAiLCJsb2FkT25lIiwiY2FsbGJhY2siLCJvUmVxdWVzdCIsImRpdiIsImRhdGFzZXQiLCJub3RUZW1wbGF0ZU5hbWUiLCJub3RUZW1wbGF0ZVVSTCIsInNyY0VsZW1lbnQiLCJzZXRPbmUiLCJlbGVtZW50IiwiSFRNTEVsZW1lbnQiLCJhZGRGcm9tVGV4dCIsImNsb25lTm9kZSIsImNvbnQiLCJ0ZXh0Iiwibm90VGVtcGxhdGVzRWxlbWVudHMiLCJlbElkIiwicGFyZW50Tm9kZSIsImxpYiIsImdldEhUTUwiLCJ0ZW1wbGF0ZUlubmVySFRNTCIsInRlbXBsYXRlQ29udEVsIiwid3JhcCIsInRlbXBsYXRlc0hUTUwiLCJ0ZW1wbGF0ZXMiLCJwYXJzZUxpYiIsImFkZExpYiIsInNlbGVjdG9yT3JFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsInRhZ05hbWUiLCJPUFRfREVGQVVMVF9JTkRFWF9GSUVMRF9OQU1FX1BSSU9SSVRZIiwiREVGQVVMVF9GSUxURVIiLCJERUZBVUxUX1BBR0VfTlVNQkVSIiwiREVGQVVMVF9QQUdFX1NJWkUiLCJub3RJbnRlcmZhY2UiLCJtYW5pZmVzdCIsImxpbmUiLCJyZWNvcmQiLCJhY3Rpb25OYW1lIiwicmVjb3JkUkUiLCJmaWVsZE5hbWUiLCJpbmQiLCJsZW4iLCJpbmQyIiwic3RhcnRTbGljZSIsImVuZFNsaWNlIiwiZ2V0QXR0ciIsIm1vZGVsIiwiYWN0aW9uRGF0YSIsInBhcnNlTGluZSIsInBvc3RGaXgiLCJyZXN1bHRJZCIsInByZWZpeGVzIiwiaW5kZXgiLCJjb25jYXQiLCJwcmUiLCJnZXRBY3Rpb25zIiwiYWN0aW9ucyIsInNldEZpbHRlciIsImZpbHRlckRhdGEiLCJzb3J0ZXJEYXRhIiwicGFnZU51bWJlciIsInBhZ2VTaXplIiwic2V0UGFnZXIiLCJyZXF1ZXN0RGF0YSIsImRhdGFQcm92aWRlck5hbWUiLCJjYXBpdGFsaXplRmlyc3RMZXR0ZXIiLCJnZXRBY3Rpb25EYXRhIiwicmVxdWVzdFBhcmFtcyIsImNvbGxlY3RSZXF1ZXN0RGF0YSIsInJlcXVlc3RQYXJhbXNFbmNvZGVkIiwiZW5jb2RlUmVxdWVzdCIsImdldElEIiwiZ2V0VVJMIiwicXVlZVJlcXVlc3QiLCJKU09OIiwic3RyaW5naWZ5IiwiYWZ0ZXJTdWNjZXNzUmVxdWVzdCIsIm5vdFJlY29yZCIsIk1FVEFfSU5URVJGQUNFIiwiTUVUQV9QUk9YWSIsIk1FVEFfQ0hBTkdFIiwiTUVUQV9DSEFOR0VfTkVTVEVEIiwiTUVUQV9TQUwiLCJNRVRBX01BUF9UT19JTlRFUkZBQ0UiLCJERUZBVUxUX0FDVElPTl9QUkVGSVgiLCJNRVRBX1JFVFVSTl9UT19ST09UIiwiY3JlYXRlUHJvcGVydHlIYW5kbGVycyIsIm93bmVyIiwiY29udGV4dCIsInJlc1RhcmdldCIsIlJlZmxlY3QiLCJFcnJvciIsInZhbHVlVG9SZWZsZWN0Iiwibm90UHJvcGVydHkiLCJnZXRSb290IiwicGF0aFRvIiwiaXNQcm94eSIsImlzUHJvcGVydHkiLCJQcm94eSIsInByb3h5IiwiY3JlYXRlUmVjb3JkSGFuZGxlcnMiLCJjcmVhdGVDb2xsZWN0aW9uIiwibm90UmVjb3JkSW50ZXJmYWNlIiwiaW5pdFByb3BlcnRpZXMiLCJpbnRlcmZhY2VVcCIsImN1clBhdGgiLCJiYWJlbEhlbHBlcnMudHlwZW9mIiwiaXRlbXMiLCJjb2xsZWN0aW9uIiwiZ2V0QWN0aW9uc0NvdW50IiwiYWN0aW9uVXAiLCJyZXF1ZXN0Iiwib2JqZWN0UGFydCIsInNldEF0dHIiLCJzZXRGaW5kQnkiLCJyZXNldEZpbHRlciIsImdldEZpbHRlciIsInNldFNvcnRlciIsImdldFNvcnRlciIsInNldFBhZ2VOdW1iZXIiLCJzZXRQYWdlU2l6ZSIsInJlc2V0UGFnZXIiLCJnZXRQYWdlciIsIk9QVF9DT05UUk9MTEVSX1BSRUZJWCIsIk9QVF9SRUNPUkRfUFJFRklYIiwibm90QXBwIiwicmVzb3VyY2VzIiwicHJlSW5pdFJvdXRlciIsImluaXRNYW5hZ2VyIiwiaW5pdEFQSSIsImluaXRUZW1wbGF0ZXMiLCJzZXRNYW5hZ2VyIiwiYXBpIiwic2V0QVBJIiwicHJvbSIsImFkZExpYkZyb21VUkwiLCJpbml0TWFuaWZlc3QiLCJyZXBvcnQiLCJzZXRJbnRlcmZhY2VNYW5pZmVzdCIsInNldFJvb3QiLCJyZVJvdXRlRXhpc3RlZCIsInJvdXRpZUlucHV0Iiwicm91dGVCbG9jayIsInBhdGhzIiwiY29udHJvbGxlciIsImJpbmRDb250cm9sbGVyIiwiYWRkTGlzdCIsImxpc3RlbiIsInVwZGF0ZSIsInVwZGF0ZUludGVyZmFjZXMiLCJpbml0Q29udHJvbGxlciIsImFsbFJlc291cmNlc1JlYWR5Iiwic3RhcnRBcHAiLCJpbml0Um91dGVyIiwiY29udHJvbGxlck5hbWUiLCJhcHAiLCJjdHJsIiwiY2xlYXJJbnRlcmZhY2VzIiwibWFuaWZlc3RzIiwicmVjb3JkTWFuaWZlc3QiLCJyZWNvcmREYXRhIiwib25SZXNvdXJjZVJlYWR5IiwiTUVUQV9QUk9DRVNTT1JTIiwibm90VGVtcGxhdGVQcm9jZXNzb3JzIiwic2V0UHJvY2Vzc29yIiwiZ2V0UHJvY2Vzc29yIiwiTUVUQV9DT01QT05FTlRTIiwibm90UmVuZGVyZXIiLCJyZW5kZXIiLCJjb21wb25lbnQiLCJpbml0RGF0YSIsImluaXRPcHRpb25zIiwiaW5pdFdvcmtpbmciLCJ0ZW1wbGF0ZSIsImluaXRUZW1wbGF0ZSIsIm9uQ2hhbmdlIiwiTWF0aCIsInJhbmRvbSIsImdldEJyZWFkQ3J1bXBzIiwiY2xlYXJTdGFzaCIsInNldFdvcmtpbmdNYXBwaW5nIiwiZXhlY1Byb2Nlc3NvcnMiLCJzZWFyY2hGb3JTdWJUZW1wbGF0ZXMiLCJzdGFzaFJlbmRlcmVkIiwiaWZQYXJ0IiwiY29tcG9uZW50UGF0aCIsImNoYW5nZWRQYXRoIiwiaWZGdWxsU3ViUGF0aCIsImNyZWF0ZU1hcHBpbmciLCJmaW5kQWxsUHJvY2Vzc29ycyIsInByb2NzIiwiZWxzIiwiZ2V0QXR0cmlidXRlc1N0YXJ0c1dpdGgiLCJnZXRXb3JraW5nVGVtcGxhdGVFbGVtZW50IiwicHJvY0RhdGEiLCJwYXJzZVByb2Nlc3NvckV4cHJlc3Npb24iLCJwcm9jZXNzb3JFeHByZXNzaW9uIiwiYXR0cmlidXRlRXhwcmVzc2lvbiIsImlmQ29uZGl0aW9uIiwicGFyYW1zIiwicHJvY2Vzc29yTmFtZSIsIm1hcHBpbmciLCJwcm9jU2NvcGUiLCJhdHRyaWJ1dGVSZXN1bHQiLCJnZXRBdHRyaWJ1dGVFeHByZXNzaW9uUmVzdWx0IiwicHJvY05hbWUiLCJwcm9jIiwicmVtb3ZlQXR0cmlidXRlIiwiZGVzdHJveVN1YnMiLCJkZXN0cm95IiwiY2xlYXJTdWJUZW1wbGF0ZXMiLCJnZXRTdGFzaCIsInJlbW92ZUNoaWxkIiwibnRFbCIsIm50UmVuZGVyZWQiLCJzdWJzIiwibnQiLCJpZlN1YkVsZW1lbnRSZW5kZXJlZCIsInJlbmRlclN1YiIsImRldGFpbHMiLCJkYXRhUGF0aCIsIm5vdENvbXBvbmVudCIsImNoaWxkTm9kZXMiLCJhZGRUb1N0YXNoIiwic3Rhc2giLCJuZXdTdGFzaCIsImFuY2hvciIsIm5leHRTaWJsaW5nIiwiaW5zZXJ0QmVmb3JlIiwibm9kZSIsInBsYWNlIiwidGFyZ2V0RWwiLCJsIiwiY2hpbGRyZW4iLCJ0ZXh0Q29udGVudCIsInJlbmRlcmVkIiwicGxhY2VBZnRlciIsInBsYWNlQmVmb3JlIiwicGxhY2VGaXJzdCIsInBsYWNlTGFzdCIsIm5vdFBsYWNlcnMiLCJNRVRBX1BBUlRTIiwicmVzZXRQYXJ0cyIsInByZXBhcmVUZW1wbGF0ZUVsZW1lbnQiLCJpbml0TWFya0VsZW1lbnQiLCJtYXJrRWwiLCJwbGFjZXIiLCJnZXRQbGFjZXIiLCJ0YXJnZXRRdWVyeSIsIm1haW4iLCJ1bnNldFJlYWR5IiwiaHRtbCIsInNldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiYWRkRnJvbVVSTCIsImdldFByb3RvVGVtcGxhdGVFbGVtZW50IiwiY2xlYXJQYXJ0cyIsImRlYWQiLCJvZmZBbGwiLCJmb3JFYWNoRGF0YSIsInJlbmRlclBhcnQiLCJwbGFjZVJlbmRlcmVkIiwicmVtb3ZlT2Jzb2xldGVQYXJ0cyIsImJlZm9yZSIsInBsYWNlUGFydCIsImFmdGVyIiwicGFydCIsImdldFBhcnRCeURhdGEiLCJub2RlcyIsImxhc3ROb2RlIiwibm9kZVR5cGUiLCJnZXRQYXJ0cyIsInJlbmRlcmVyIiwiZ2V0UHJvdG9UZW1wbGF0ZUVsZW1lbnRDbG9uZSIsImFkZFBhcnQiLCJ1cGRhdGVQYXJ0IiwicGlwZSIsImZpbmRBY3R1YWxQYXJ0cyIsInJlbW92ZU5vdEFjdHVhbFBhcnRzIiwiYWN0dWFsUGFydHMiLCJpc0RhdGEiLCJPUFRfREVGQVVMVF9DT05UQUlORVJfU0VMRUNUT1IiLCJPUFRfREVGQVVMVF9WSUVXU19QT1NURklYIiwiT1BUX0RFRkFVTFRfVklFV19OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0ZST01fVVJMIiwiT1BUX0RFRkFVTFRfUExVUkFMX05BTUUiLCJPUFRfREVGQVVMVF9TSU5HTEVfTkFNRSIsIk9QVF9ERUZBVUxUX01PRFVMRV9OQU1FIiwiT1BUX0RFRkFVTFRfUkVOREVSX0FORCIsIm5vdENvbnRyb2xsZXIiLCJpbml0UmVuZGVyIiwiaW50ZXJmYWNlcyIsImdldEludGVyZmFjZXMiLCJtYWtlIiwidmlld05hbWUiLCJ2aWV3IiwiZ2V0VmlldyIsInRlbXBsYXRlVVJMIiwicHJlZml4IiwiY29tbW9uIiwiZ2V0TW9kdWxlUHJlZml4IiwicG9zdGZpeCIsInRlbXBsYXRlTmFtZSIsInJlbmRlckFuZCIsInZpZXdzIiwiZ2V0TW9kdWxlTmFtZSIsIiRsaXN0QWxsIiwiZXJyIiwiZmllbGRGaWxlcyIsInNhdmVkRmlsZSIsImhhc2giLCJPUFRfREVGQVVMVF9GT1JNX1BSRUZJWCIsIk9QVF9ERUZBVUxUX1JPTEVfTkFNRSIsIk9QVF9ERUZBVUxUX0ZPUk1fVElUTEUiLCJPUFRfREVGQVVMVF9GSUVMRF9ERUZJTklUSU9OIiwiT1BUX0RFRkFVTFRfRklFTERfREVGSU5JVElPTl9TT1VSQ0VTX1BSSU9SSVRZX0xJU1QiLCJub3RGb3JtIiwib25TdWJtaXQiLCJvblJlc2V0Iiwib25DYW5jZWwiLCJnZXRNYW5pZmVzdCIsInJvbGUiLCJyZW5kZXJXcmFwcGVyIiwiZm9ybVBhcnQiLCJnZXRXcmFwcGVyRGF0YSIsImdldFBhcnRUZW1wbGF0ZU5hbWUiLCJiaW5kRm9ybUV2ZW50cyIsInJlbmRlckNvbXBvbmVudHMiLCJ3cmFwcGVyIiwidGl0bGUiLCJnZXRGb3JtRmllbGRzTGlzdCIsImFkZEZpZWxkQ29tcG9uZW50IiwiY29tcHMiLCJnZXRBcHAiLCJkZWYiLCJmaWVsZHNMaWJzIiwiZ2V0RmllbGRzTGlicyIsImZpZWxkVHlwZSIsImdldEZpZWxkc0RlZmluaXRpb24iLCJyZWMiLCJsYWJlbCIsInBsYWNlaG9sZGVyIiwiZGVmYXVsdCIsImZpZWxkIiwiZ2V0Rm9ybVRhcmdldEVsZW1lbnQiLCJjb2xsZWN0RGF0YUZyb21Db21wb25lbnRzIiwiZm9ybSIsIk9QVF9ERUZBVUxUX1ZJRVciLCJPUFRfREVGQVVMVF9BQ1RJT04iLCJPUFRfREVGQVVMVF9JVEVNIiwiQ1JVRENyZWF0ZSIsInBhcmVudCIsInNldFZpZXdzIiwicHJlbG9hZExpYiIsInJlbmRlckZvcm0iLCJpbml0SXRlbSIsImNyZWF0ZURlZmF1bHQiLCJsaW5rQmFja1RvTGlzdCIsImZpbGVzIiwiZGF0YVRyYW5zZmVyIiwicXVlZVVwbG9hZCIsIm5ld0l0ZW0iLCJleGVjVXBsb2FkcyIsImNyZWF0ZSIsImdvVG9UYWJsZSIsImJhY2tUb0xpc3QiLCJPUFRfREVGQVVMVF9QQUdFX1NJWkUiLCJPUFRfREVGQVVMVF9QQUdFX05VTUJFUiIsIk9QVF9ERUZBVUxUX1NPUlRfRElSRUNUSU9OIiwiT1BUX0RFRkFVTFRfU09SVF9GSUVMRCIsIk9QVF9GSUVMRF9OQU1FX1BSRV9QUk9DIiwibm90VGFibGUiLCJyb3dzIiwicmVzZXRTb3J0ZXIiLCJyZW5kZXJJbnNpZGUiLCJyZW5kZXJIZWFkZXIiLCJ1cGRhdGVEYXRhIiwicmVuZGVyQm9keSIsImJpbmRTZWFyY2giLCJiaW5kQ3VzdG9tQmluZGluZ3MiLCJ0YWJsZUhlYWRlciIsIm5ld1RoIiwic29ydGFibGUiLCJhdHRhY2hTb3J0aW5nSGFuZGxlcnMiLCJoZWFkQ2VsbCIsImNoYW5nZVNvcnRpbmdPcHRpb25zIiwic3R5bGUiLCJjdXJzb3IiLCJzb3J0QnlGaWVsZCIsInNvcnREaXJlY3Rpb24iLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJpbnZhbGlkYXRlRGF0YSIsImZpbHRlclNlYXJjaCIsImlzTmFOIiwiaWZVcGRhdGluZyIsInF1ZXJ5Iiwic2V0VXBkYXRpbmciLCIkbGlzdCIsInByb2NjZXNzRGF0YSIsInJlZnJlc2hCb2R5Iiwic2V0VXBkYXRlZCIsInRoYXRGaWx0ZXIiLCJ0ZXN0RGF0YUl0ZW0iLCJ0aGF0U29ydGVyIiwic29ydCIsIml0ZW0xIiwiaXRlbTIiLCJ0MSIsInQyIiwibG9jYWxlQ29tcGFyZSIsInNlYXJjaEVsIiwib25FdmVudCIsImN1cnJlbnRUYXJnZXQiLCJzZWxlY3RvciIsImdldE9wdGlvbiIsIm5ld1JvdyIsIm5ld1RkIiwicHJlcHJvY2Vzc2VkIiwiaXRlbUlkIiwidGJvZHkiLCJmaW5kQm9keSIsImNsZWFyQm9keSIsImNoZWNrRmlsdGVyZWQiLCJ0aGlzUGFnZVN0YXJ0cyIsIm5leHRQYWdlRW5kcyIsIm1pbiIsInJlbmRlclJvdyIsInRhYmxlQm9keSIsInN0clZhbHVlIiwiZ2V0RmlsdGVyU2VhcmNoIiwidG9Db21wIiwiT1BfREVGQVVMVF9QQUdFX1NJWkUiLCJDUlVETGlzdCIsInVwZGF0ZURhdGF0YWJsZSIsInRhYmxlVmlldyIsImxvYWROZXh0IiwiT1BUX0RFRkFVTFRfTE9BRF9BQ1RJT04iLCJDUlVEVXBkYXRlIiwibG9hZEl0ZW0iLCJydW5MaXN0IiwiQ1JVRERlbGV0ZSIsImNvbmZpcm0iLCJkZWxldGUiLCJhY3Rpb24iLCJPUFRfREVGQVVMVF9ERVRBSUxTX1BSRUZJWCIsIk9QVF9ERUZBVUxUX0RFVEFJTFNfVElUTEUiLCJub3REZXRhaWxzIiwiZ2V0RmllbGRzTGlzdCIsImNhc3RDdXN0b20iLCJjYXN0Q29tbW9uIiwiQ3VzdG9tQ29tcG9uZW50IiwiZ2V0VGFyZ2V0RWxlbWVudCIsIkNSVUREZXRhaWxzIiwicmVuZGVyRGV0YWlscyIsIl9pZCIsIl9fdmVyc2lvbiIsIkNSVURDb250cm9sbGVyIiwicnVuQ3JlYXRlIiwicnVuRGV0YWlscyIsInJ1bkRlbGV0ZSIsInJ1blVwZGF0ZSIsInJvdXRlUnVubmVyTmFtZSIsIm9uQWZ0ZXJSZW5kZXIiLCJub3RUZW1wbGF0ZVByb2Nlc3NvcnNMaWIiLCJzY29wZSIsImJpbmRzIiwibGl2ZUV2ZW50cyIsImNoZWNrZWQiLCJzZWxlY3RlZCIsInNlbGVjdGVkT3B0aW9ucyIsInByb2Nlc3NlZFZhbHVlIiwidXNlZCIsIm9wdGlvbiIsInZhbHVlRmllbGROYW1lIiwibGFiZWxGaWVsZE5hbWUiLCJpdGVtVmFsdWVGaWVsZE5hbWUiXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUlBLGdCQUFnQjtVQUNWLGlCQUFTQyxHQUFULEVBQWM7U0FDZixLQUFLQyxHQUFMLENBQVMsTUFBVCxJQUFtQkQsR0FBMUI7RUFGa0I7Y0FJTixxQkFBU0EsR0FBVCxFQUFjO1NBQ25CLEtBQUtDLEdBQUwsQ0FBUyxVQUFULElBQXVCRCxHQUE5QjtFQUxrQjtnQkFPSix1QkFBU0UsU0FBVCxFQUFvQkMsTUFBcEIsRUFBNEI7T0FDckMsSUFBSUMsQ0FBVCxJQUFjRixTQUFkLEVBQXlCO1FBQ25CLElBQUlHLENBQVQsSUFB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
