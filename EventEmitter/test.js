function isValidListener(listener){
    return typeof listener === 'function' ? true : typeof listener === 'object' ? isValidListener(listener.listener) : false
}

function indexOf(array,item){
    item = typeof item === 'object' ? item.listener : item
    return array.indexOf(item)
}

function EventEmitter() {
    this.__events = {}
}

const proto = EventEmitter.prototype

/**
 * 添加事件
 * @param  {String} eventName 事件名称
 * @param  {Function} listener 监听器函数
 * @return {Object} 可链式调用
 */
proto.on = function (eventName,listener){
    if(!eventName||!listener) return null

    if (!isValidListener(listener)) {
        throw new TypeError('listener must be a function');
    }

    const events = this.__events
    let listeners = events[eventName] = events[eventName] || [];
    const listenerWrapper = typeof listener === 'object'

    if(indexOf(listeners,listener) === -1){
        listeners.push(listenerWrapper ? listener:{
            listener,
            once: false
        })
    }

    return this
}

/**
 * 删除事件
 * @param  {String} eventName 事件名称
 * @param  {Function} listener 监听器函数
 * @return {Object} 可链式调用
 */
proto.off = function(eventName,listener){
    if(!eventName||!listener) return null
    if (!isValidListener(listener)) {
        throw new TypeError('listener must be a function');
    }

    let listeners = this.__events[eventName]

    listeners.map((item,index)=>{
        if(item.listener === listener){
            listeners.splice(index,1)
        }
    })
}

/**
 * 触发事件
 * @param  {String} eventName 事件名称
 * @param  {Array} args 传入监听器函数的参数，使用数组形式传入
 * @return {Object} 可链式调用
 */
proto.emit = function(eventName,args){
    const listeners = this.__events[eventName]
    if (!listeners) return;

    listeners.map((listener)=>{
        listener.listener.apply(this, args || [])
        if(listener.once){

        }
    })

    return this
}
