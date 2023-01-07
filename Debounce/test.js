/* 防抖：n秒后执行指定事件，若在n秒内重复触发，则重新计时 */


// 简易版，缺点为不会立即执行，需要等待一个wait后才能执行
function easyDebounce(fn,wait){
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        clearTimeout(timeout)

        timeout = setTimeout(function (){
            fn.apply(context,args)
        },wait)
    }
}

// 如需要立即执行，可加入第三个参数用于判断
function debounce(func,wait,immediate){
    let timeout

    return function () {
        let context = this;
        let args = arguments;

        if(timeout) return clearTimeout(timeout)

        if(immediate){
            let callNow = !timeout

            timeout = setTimeout(function() {
                timeout = null
            },wait)
            if(callNow){
                func.apply(context,args)
            }
        }else{
            timeout = setTimeout(function (){
                func.apply(context,args)
            },wait)
        }
    }
}

function log() {
    console.log('1111')
}

