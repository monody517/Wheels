/*  节流：n秒内只运行一次，若在n秒内重复触发，只有一次触发 */
var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = throttled(getUserAction,3000);

function throttled(fn,wait){
    var context, args
    var previous = 0
    var timeout
    
    return function () {
        context = this
        args = arguments
        var now = new Date()
        // if (now - previous > wait) {
        //     fn.apply(args, context)
        //     previous = now
        // }
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null
                fn.apply(args,context)
            },wait)
        }
    }
}


