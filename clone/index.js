// 浅拷贝，指的是创建新的数据，这个数据有原始数据值的一份精准拷贝
// 如果是基本类型，拷贝的就是基本类型的值，如果是引用类型，拷贝的是内存地址,修改新对象的引用类型值时，旧对象也会被影响
function shallowClone(obj){
    const newObj = Array.isArray(obj) ? [] : {}
    for(let prop in obj){
        if(obj.hasOwnProperty(prop)){
            newObj[prop] = obj[prop]
        }
    }
    return newObj
}

// 深拷贝，深拷贝开辟一个新的栈，两个对象的属性值完全相同，但是对应两个不同的地址，修改一个对象的属性不会改变另一个对象的属性
function deepClone(obj){
    if(obj === null) return obj
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    if(typeof obj !== 'object') return obj

    let newObj = Array.isArray(obj) ? [] : {}

    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(obj[key] && typeof obj[key] === 'object'){
                newObj[key] = deepClone(obj[key])
            }else{
                newObj[key] = obj[key]
            }
        }
    }
    return newObj
}

const obj1 = {
    name : 'init',
    arr : [1,[2,3],4],
};
const obj3=shallowClone(obj1) // 一个浅拷贝方法
const obj2=deepClone(obj1) // 一个深拷贝方法
obj3.name = "update";
obj3.arr[1] = [5,6,7] ; // 新旧对象还是共享同一块内存

console.log(obj1)
console.log(obj3)
console.log(obj2)


