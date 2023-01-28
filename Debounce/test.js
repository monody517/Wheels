var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = debounce(getUserAction,1000,true);


function debounce(fn,wait,immediate) {
    var timeout,result
    
    return function () {
        var context = this;  // 返回的匿名函数实际由container调用
        var args = arguments;  // 因此需要重新赋值this和参数，否则this指向window，参数为undefined
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            var callNow = !timeout
            timeout = setTimeout(function () {  // 到达wait时间将timeout置为null，否则timeout一直存在
                timeout = null
            }, wait)
            if(callNow) result = fn.apply(context,args)
        } else {
            timeout = setTimeout(fn.apply(context,args),wait)
        }
        return result
    }
}