const autumn = document.querySelector('.autumn')

let startX = 0;
let startY = 0;

const sourceX = 0;
const sourceY = 0;

// 获取当前浏览器支持的transform兼容写法
function getTransform() {
    var transform = '',
        divStyle = document.createElement('div').style,
        _transforms = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'],
        i = 0,
        len = _transforms.length;

    for (; i < len; i++) {
        if (_transforms[i] in divStyle) {
            // 找到之后立即返回，结束函数
            return transform = _transforms[i];
        }
    }

    // 如果没有找到，就直接返回空字符串
    return transform;
}

// 获取当前浏览器中的elem的元素样式
function getStyle(elem,property) {
    return document.defaultView.getComputedStyle ?
        document.defaultView.getComputedStyle(elem,false)[property]
        :
        elem.currentStyle[property]
}

// 获取元素位置
function getTargetPos(elem){
    let pos = {x:0,y:0}
    const transform = getTransform()
    if(transform){
        let transformValue = getStyle(elem,transform);
        if(transformValue === 'none'){
            elem.style[transform] = 'translate(0,0)'
            return pos
        }else{
            const temp = transformValue.match(/-?d+/g)
            return pos = {
                x: parseInt(temp[4].trim()),
                y: parseInt(temp[5].trim())
            }
        }
    }else{
        if(getStyle(elem,'position') === 'static'){
            elem.style.position = 'relative'
            return pos
        }else{
            const x = parseInt(elem,'left') ? parseInt(elem,'left') : 0
            const y = parseInt(elem,'top') ? parseInt(elem,'top') : 0
            return pos = {x,y}
        }
    }
}

document.addEventListener('mousedown', start, false);
document.addEventListener('mouseup', end, false);

// 设置元素位置
function setTargetPos(elem,pos){
    console.log(elem.style.width);
    const transform = getTransform()
    if(transform){
        elem.style[transform] = `translate(${pos.x}px,${pos.y}px)`
    }else{
        elem.style.left = pos.x + 'px'
        elem.style.top = pos.y + 'px'
    }
    return elem
}

// 鼠标事件
function start(event){
    // 鼠标当前位置
    document.addEventListener('mousemove', move, false);
}
function move(event){
    // 鼠标当前位置
    const currentX = event.pageX;
    const currentY = event.pageY;

    // 计算移动后的差值
    const distanceX = currentX - startX;
    const distanceY = currentY - startY;

    setTargetPos(autumn,{
        x: (distanceX + sourceX-25).toFixed(),
        y: (distanceY + sourceY-25).toFixed()
    })
}

function end(event) {
    document.removeEventListener('mousemove', move);
    // do other things
}



