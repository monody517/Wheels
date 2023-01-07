/*  new的实现过程 */

function myNew(Func,...args){
    // 创建一个新对象
    const obj = {}
    // 新对象原型指向构造函数原型对象
    obj.__proto__ = Func.prototype
    // 将构建函数的this指向新对象
    let result = Func.apply(obj,args)
    // 根据返回值判断
    return result instanceof Object ? result : obj
}

function Person(name,age){
    this.name = name;
    this.age = age;
}

Person.prototype.say = function () {
    console.log(this.name)
}

let p = myNew(Person,'jjj',18)

console.log(p)  // Person {name: "jjj", age: 123}

p.say()  // jjj
