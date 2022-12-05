function imageLoad(url) {
    const img = new Image()
    img.src = url
    return new Promise((resolve, reject) => {
        img.onload = function () {
            resolve('图片加载成功')
        }
        img.onerror = function () {
            reject('图片加载失败')
        }
    })
}

imageLoad('xxx.png').then(res => {
    console.log(res)
})
    .catch(err => {
        console.log(err)
    })
