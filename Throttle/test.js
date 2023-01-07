/*  节流：n秒内只运行一次，若在n秒内重复触发，只有一次触发 */

function throttled(fn,delay){
    let timer = null

    return function (...args){
        if(!timer){
            timer = setTimeout(()=>{
                fn.apply(this,args)
                timer = null
            },delay)
        }
    }
}
