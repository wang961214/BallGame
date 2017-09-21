/**
 * Created by Administrator on 2017/9/19.
 */
window.onload = function () {
    var box = document.getElementById("box");
    var ball = document.getElementById("ball");
    var plate = document.getElementById("plate");
    var Score = document.getElementById("Score");
    var Stop = document.getElementById("Stop");
    var startTime = document.getElementById("startTime");
    var Continue = document.getElementById("Continue");
    var bg = document.getElementById("bg");
    var model = document.getElementById("model");
    var board = document.getElementById("board");
    var esc = document.getElementById("esc");
    var score = 0;//-----------得分
    var moveX = 1;//-----------球向左
    var moveY = 1;//-----------球向上
    var posL = Math.floor(Math.random() * 1000);//------X轴随机一个位置
    var posT = 80;
    var timer = null;
    var timer1 = null;
    var point = 0;//---------球最下方点的X位置
    model.onclick = function () {
        model.style.display = "none";
        bg.style.display = "none";
        var date1 = new Date();
        timer1 = setInterval(function () {
            var date2 = new Date();
            var time = (date2 - date1) / 1000;
            startTime.innerHTML = toTwo(Math.floor(time / 3600)) + ":" + toTwo(Math.floor(time % 60));
        }, 1000);
        Start();

    };
    Stop.onclick = function () {
        if (score >= 2) {
            score = score - 1;
            Score.innerHTML = score;
            clearInterval(timer);
        }
    };
    Continue.onclick = function () {
        clearInterval(timer);
        Start();
    };
    board.onclick = function () {
        bg.style.display = "none";
        board.style.display = "none";
        score = 0;//-----------得分
        moveX = 1;//-----------球向左
        moveY = 1;//-----------球向上
        posL = Math.floor(Math.random() * 1000);//------X轴随机一个位置
        posT = 80;
        startTime.innerHTML = "00:00";
        var date1 = new Date();
        timer1 = setInterval(function () {
            var date2 = new Date();
            var time = (date2 - date1) / 1000;
            startTime.innerHTML = toTwo(Math.floor(time / 3600)) + ":" + toTwo(Math.floor(time % 60));
        }, 1000);
        Start();
    };
//----键盘操作
    var direction = {left: false, right: false};
    var timer2 = null;
    setInterval(function () {
        if (direction.left) {
            if (plate.offsetLeft >= 20) {
                plate.style.left = plate.offsetLeft - 20 + "px";
            } else {
                plate.style.left = 0;
            }
        } else if (direction.right) {
            if (box.clientWidth - plate.offsetWidth - plate.offsetLeft >= 20) {
                plate.style.left = plate.offsetLeft + 20 + "px";
            } else {
                plate.style.left = box.clientWidth - plate.offsetWidth + "px";
            }
        }
    }, 50);
    document.onkeydown = function (ev) {
        var evl = ev || event;
        if (evl.keyCode === 37 || evl.keyCode === 65) {
            direction.left = true;
        } else if (evl.keyCode === 39 || evl.keyCode === 68) {
            direction.right = true;
        }
    };
    document.onkeyup=function () {
        direction={left: false, right: false};
    };
    function Start() {
        clearInterval(timer);
        timer = setInterval(function () {
            //-----X轴运动
            if (moveX === 1) {//---负值向左运动
                posL--;       //----向左
                if (posL <= 0) {//---到左的边改方向
                    moveX = 0;
                } else {
                    ball.style.left = posL + "px"; //------运动
                }
            } else {
                posL++; //-----向右
                if (box.clientWidth - ball.clientWidth <= posL) {
                    moveX = 1;
                } else {
                    ball.style.left = posL + "px";
                }
            }
            if (moveY === 1) {//---向上
                posT--;
                if (posT <= 0) {//---到最上方点
                    moveY = 0;//---向下
                } else {
                    ball.style.top = posT + "px";
                }
            } else {        //----向下
                posT++;
                if (box.clientHeight - ball.clientHeight <= posT) {//-----到底结束
                    clearInterval(timer);
                    clearInterval(timer1);
                    board.innerHTML = "您的最终得分为" + score + " 分！";
                    bg.style.display = "block";
                    board.style.display = "block";
                } else {
                    ball.style.top = posT + "px";
                }
                if (posT === 400) {//----到板子所在X轴
                    point = ball.offsetLeft + 25;//球的最下点的位置（X轴）
                    if (point >= plate.offsetLeft && point <= plate.offsetLeft + plate.offsetWidth) {
                        moveY = 1;//-----判断在板上，反弹
                        score++;//-----得分+1
                        Score.innerHTML = score;
                    }
                }
            }
        }, 4);
    }
};
function toTwo(i) {
    if (i < 10) {
        return "0" + i;
    } else {
        return i;
    }
}
