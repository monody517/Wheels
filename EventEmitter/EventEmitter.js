(function() {
    var root = (typeof self == 'object' && self.self == self && self) ||
        (typeof global == 'object' && global.global == global && global) ||
        this || {};

    function isValidListener(listener) {
        if (typeof listener === 'function') {
            return true
        } else if (listener && typeof listener === 'object') {
            return isValidListener(listener.listener)
        } else {
            return false
        }
    }

    function indexOf(array, item) {
        var result = -1
        item = typeof item === 'object'
            ? item.listener
            : item

        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i].listener === item) {
                result = i
                break
            }
        }

        return result
    }

    function EventEmitter() {
        this.__events = {}
    }

    EventEmitter.VERSION = '1.0.0';

    var proto = EventEmitter.prototype;

    /**
     * 删除某一个类型的所有事件或者所有事件
     * @param  {String[]} eventName 事件名称
     */
    proto.allOff = function(eventName) {
        if (eventName && this.__events[eventName]) {
            this.__events[eventName] = []
        } else {
            this.__events = {}
        }
    };

    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = EventEmitter;
        }
        exports.EventEmitter = EventEmitter;
    } else {
        root.EventEmitter = EventEmitter;
    }

}())
