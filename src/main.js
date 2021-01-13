const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

getTime = () => {
    let date = new Date
    let date1 = date.toLocaleString();
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if (minutes >= 0 && minutes < 10) {
        minutes = '0' + minutes
    }
    $('.time').text(hours + ':' + minutes)
}
setInterval('getTime()', 1000)

window.hashMap = xObject || [
    { logo: 'F', url: "https://www.figma.com" },
    { logo: "M", url: "https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5" },
    { logo: "J", url: "http://jigsaw.w3.org/css-validator/#validate-by-input" },
    { logo: "E", url: "https://es6.ruanyifeng.com/" },
    { logo: "G", url: "https://github.com" },
    { logo: "I", url: "https://www.iconfont.cn/" }

]

const removeX = (url) => {
    return url.replace('http://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除/开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
 <li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${removeX(node.url)}</div>
                <div class='close'>
                    <svg class="icon" >
                        <use xlink:href="#icon-baseline-close-px"></use>
                    </svg>
                 </div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on('click',
            () => {
                window.open(node.url)
            })
        $li.on('click', '.close', (event) => {
            event.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()


$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问你要添加的网址是？')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: removeX(url)[0],
            logoType: 'text',
            url: url
        })

        render()
    })

window.onbeforeunload = () => {
        const string = JSON.stringify(hashMap)
        localStorage.setItem('x', string)
    }
    // 以下为键盘事件
$(document).on('keypress', (e) => {
    // e.key为按下的按键
    const { key } = e
    for (i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})

$('input').on('keypress', (e) => {
    e.stopPropagation()
})