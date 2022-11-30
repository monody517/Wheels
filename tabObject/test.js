!function(ROOT){

    function Tab(elem){
        this.index = 0
        this.tabHeader = elem.firstElementChild;
        this.items = this.tabHeader.children;
        this.tabContent = elem.lastElementChild;
        this.itemboxes = this.tabContent.children;
        this.max = this.items.length - 1;

        this.init()
    }

    Tab.prototype = {
        constructor: Tab,
        init: function() {
            this.tabHeader.addEventListener('click',this.clickHander.bind(this),false)
        },
        clickHander: function(e){
            const a = [].slice.call(e.target.classList).indexOf('item')
            if(a>-1){
                this.switchTo(e.target.dataset.index)
            }
        },
        switchTo: function (i){
            if(i === this.index){
                return
            }
        this.items[this.index].classList.remove('active')
        this.itemboxes[this.index].classList.remove('active')
        this.index = i
        this.items[this.index].classList.add('active')
        this.itemboxes[this.index].classList.add('active')
        },
        next: function(){
            let tgIndex
            if(this.index>=this.max){
                tgIndex = 0
            }else{
                tgIndex = this.index + 1
            }
            this.switchTo(tgIndex)
        },
        pre: function(){
            let tgIndex
            if(tgIndex === 0){
                tgIndex = this.max
            }else{
                tgIndex = this.index - 1
            }
            this.switchTo(tgIndex)
        },
        getIndex: function(){
            return this.index
        }
    }

    ROOT.Tab = Tab
}(window)

var tab = new Tab(document.querySelector('#tab_wrap'));
var tab1 = new Tab(document.querySelector('#tab_wrap1'))

document.querySelector('.next').addEventListener('click', function() {
    tab.next();
    console.log(tab.getIndex());
}, false);

document.querySelector('.prev').addEventListener('click', function() {
    tab.pre();
    console.log(tab.getIndex());
}, false);



