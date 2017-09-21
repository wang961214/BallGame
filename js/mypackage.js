/**
 * Created by Administrator on 2017/9/18.
 */

//
// function animate(ele, target) {
//     //------确定每步走多少
//     var step = (target - ele.offsetLeft) / 10;
//     //------因为目标值有可能大于或者小于ele.offsetLeft；所以step有正有负。
//     step = step > 0 ? Math.ceil(step) : Math.floor(step);
//     //------每个box只能对应一个定时器，避免与其他定时器产生冲突
//     ele.timer = setInterval(function () {
//         //------缓冲公式
// //            var val=target-box.offsetLeft;
//         box.style.left = box.offsetLeft + step + "px";
//         //------停下来
//         //------如果差值小于每步的大小，没必要走了
//         if (Math.abs(target - box.offsetLeft) < Math.abs(step)) {
//             box.style.left = target + "px";
//             clearInterval(ele.timer);
//         }
//     }, 30);
// }

function animateLeft(ele, target) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var step = (target - ele.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        ele.style.left = ele.offsetLeft + step + "px";
        // console.log("差值"+(target - ele.offsetLeft));
        // console.log("step"+step);
        if (Math.abs(target - ele.offsetLeft) < Math.abs(step)) {
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    }, 25);
}

function animateTop(ele, target) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var step = (target - ele.offsetTop) / 10;

        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        ele.style.top = ele.offsetTop + step + "px";
        if (Math.abs(target - ele.offsetTop) < Math.abs(step)) {
            ele.style.top = target + "px";
            clearInterval(ele.timer);
        }
    }, 25);
}

function scroll() {
    //----谷歌火狐IE9+
    if (window.pageXOffset !== undefined || window.pageYOffset !== undefined) {
        return {
            "top": window.pageYOffset,
            "left": window.pageXOffset
        };
    }
    //--------IE678（已经声明DTD模式）
    else if (document.compatMode === "CSS1Compat") {
        return {
            "top": document.documentElement.scrollTop,
            "left": document.documentElement.scrollLeft
        };
    }
    //------只谷歌识别(未声明DTD模式)
    else {
        return {
            "top": document.body.scrollTop,
            "left": document.body.scrollLeft
        };
    }
}

function client() {
    if (window.innerHeight !== undefined) {//---火狐/谷歌/ie9+以上支持的
        return {
            "width": window.innerWidth,
            "height": window.innerHeight
        }
    } else if (document.compatMode === "CSS1Compat") {
        return {//---已经声明DTD,（IE678只认识他）,compatMode渲染模式
            "width": document.documentElement.clientWidth,
            "height": document.documentElement.clientHeight
        }
    } else {
        return {//---未声明 DTD（谷歌只认识他）
            "width": document.body.clientWidth,
            "height": document.body.clientHeight
        }
    }
}
