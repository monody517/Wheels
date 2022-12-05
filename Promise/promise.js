const pending = 'PENDING'
const resolved = 'RESOLVED'
const rejected = 'REJECTED'

class MyPromise {
    constructor(executor) {
        this.onResolvedQueue = []
        this.onRejectedQueue = []
        this._status = pending
        executor(this._resolve.bind(this),this._reject.bind(this))
    }

    _resolve(value){
        // 执行队列中的回调，先进先出
        const run = () => {
            this._status = resolved
            let cb

            while(cb = this.onResolvedQueue.shift()){
                cb(value)
            }
        }

        setTimeout(run, 0)
    }

    _reject(value){
        const run = () => {
            this._status = rejected
            let cb

            if(this.onRejectedQueue.length === 0){
                throw new Error(value)
            }
            while(cb = this.onRejectedQueue.shift()){
                cb(value)
            }
        }

        setTimeout(run,0)
    }

    then(onResolved,onRejected){
        if(this._status === pending){
            if(isFunction(onrsolved)){
                this.onResolvedQueue.push(onResolved)
            }
            if(isFunction(onRejected)){
                this.onRejectedQueue.push(onRejected)
            }
        }
    }

    catch(onRejected){
        this.then(null,onRejected)
    }
}
