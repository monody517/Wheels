class MyPromise {
    constructor(executor) {
        executor(this._resolve.bind(this),this._reject.bind(this))
    }

    _resolve(value){}

    _reject(value){}

    then(then_cb){}
}
