<template>
  <!-- <canvas id="canvas" width="100" height="100"></canvas> -->
  <!-- <div id="app"> -->
  <!-- <h2 class="title">Vue Sign Canvas 电子签名板</h2> -->
  <!-- <sign-canvas class="sign-canvas" ref="SignCanvas" :options="options" v-model="value" /> -->
  <!-- <img v-if="value" class="view-image" :src="value" width="150" height="150" /> -->
  <div class="hello">
    <div id="canvas"></div>
    <p @click="handelClearEl()">清除</p>
    <p @click="handelSaveEl()">保存</p>
    <p @click="handelThickness()">粗细</p>
    <p @click="handelColour()">颜色</p>
    <img :src="imgsrc" alt="" />
  </div>

  <!-- </div> -->
</template>

<script>
let canvas = document.createElement("canvas");
let cxt = canvas.getContext("2d");

export default {
  name: "HelloWorld",
  components: {},
  data() {
    return {
      linewidth: 1, //线条粗细，选填
      color: "black", //线条颜色，选填
      background: "pink", //线条背景，选填
    //   imgsrc: "../assets/img/sign.png",
    }
  },
  mounted() {
    console.log("mounted");
    console.log(this.color);
    this.getCanvas();
  },
  methods: {
    getCanvas() {
      let el = document.getElementById("canvas");
      el.appendChild(canvas);
      canvas.width = el.clientWidth;
      canvas.height = el.clientHeight;
      cxt.fillStyle = this.background; //填充绘图的背景颜色
      cxt.fillRect(0, 0, canvas.width, canvas.height); //绘制“已填色”的矩形
      cxt.strokeStyle = this.color; //笔触的颜色
      cxt.lineCap = "round"; //线条末端线帽的样式
      let linewidth = this.linewidth;
      //开始绘制
      canvas.addEventListener(
        "touchstart",
        function (e) {
          cxt.beginPath();
          cxt.lineWidth = linewidth; //当前线条的宽度，以像素计
          cxt.moveTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        }.bind(this),
        false
      );
      //绘制中
      canvas.addEventListener(
        "touchmove",
        function (e) {
          cxt.lineTo(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
          cxt.stroke();
        }.bind(this),
        false
      );
      //结束绘制
      canvas.addEventListener(
        "touchend",
        function () {
          cxt.closePath();
        }.bind(this),
        false
      );
    },
    handelColour() {
      this.color = "red";
      this.getCanvas();
    },
    handelThickness() {
      this.linewidth = 5;
      this.getCanvas();
    },
    handelClearEl() {
      cxt.clearRect(0, 0, canvas.width, canvas.height);
    },
    handelSaveEl() {
      let imgBase64 = canvas.toDataURL();
      console.log(imgBase64);
      this.imgsrc = imgBase64;
    },
  },
};
</script>


<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
#canvas {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: red;
}
#canvas canvas {
  display: block;
}
</style>

// 画线 // canvas 都设置跟屏幕等高
还是出现滚动条,如图片下面会出现空隙,canvas默认的display是inline元素，设置宽高是没有用的
// let canvas = document.getElementById("canvas"); // // canvas.width =
document.documentElement.clientWidth // canvas.height =
document.documentElement.clientHeight//获取的是文档的高度，而不是body的高度 //
let ctx = canvas.getContext("2d"); // ctx.fillStyle = "black"; // //
ctx.strokeStyle = 'none'; // ctx.strokeStyle = 'black'; // ctx.lineWidth = 8; //
// 线的边缘变成圆的 // ctx.lineCap = "round"; // // 设置一个信号 // let painting
= false // // 1.声明上一次 // let last // //
优化，让手机也可以使用画板，但是切到手机毫无反应，下边监听的鼠标事件 // //
检测浏览器是否支持鼠标事件 // // 浏览器是否支持移动端的 // let isTouchDevice =
'ontouchstart' in document.documentElement; // // 如果支持移动端 // if
(isTouchDevice) { // // 开始触发touch事件时，获取第一个x y， 将这个x y作为last
// canvas.ontouchstart = (e) => { // let x = e.touches[0].clientX // let y =
e.touches[0].clientY // last = [x, y] // } // canvas.ontouchmove = (e) => { //
// 这个e包含了多个手指的事件(滑动屏幕不一定是单个手指去滑动,所以是touches,0:
Touch代表的是一个手指，这里面就有ClientX,Y) // let x = e.touches[0].clientX //
let y = e.touches[0].clientY // drawLine(last[0], last[1], x, y) // last = [x,
y] //
//在手机端，没按下鼠标onmousedown事件，所以没有第一个last，所以我现在也连接不到上一个last
// // ctx.beginPath(); // // ctx.arc(x, y, 10, 0, 2 * Math.PI); // //
ctx.stroke(); // // ctx.fill(); // // console.log(x, y); // //
console.log(e.touches[0]);//通过log的方法来获取 // //
移动端有个好处就是不用监听，鼠标抬起和按下，手指抬起自动就停下画了 // } // //
console.log('目前什么也没写'); // } else { // //
如果不是移动触屏设备，那就监听鼠标的3个事件 // // 按下鼠标 变绿灯 //
canvas.onmousedown = (e) => { // painting = true // //
2.当鼠标按下时，将这个点作为上一次的点 // last = [e.clientX, e.clientY] // } //
// 在move时判断是红灯还是绿灯 // canvas.onmousemove = (e) => { // if (painting
=== true) { // // console.log(last); // // 3.每次动的时候连接上一次
与这一次，同时实时更新当前已经完成的 // drawLine(last[0], last[1], e.clientX,
e.clientY) // // 每画一个点，都会从0发射，画的直线，但问题出现在，起点是(0,0) //
//
但是现在我想要的是上一个点的位置，与现在的位置连在一起划线，但又不知道上个点是什么？
// // 当我在动的时候，每次连接上一次与这一次 // //
让上一次点的实时更新，又作为下次的上一次 // last = [e.clientX, e.clientY] // //
松开鼠标 变成红灯 // canvas.onmouseup = () => { // painting = false // } // } //
function drawLine(x1, y1, x2, y2) { // ctx.beginPath(); // ctx.moveTo(x1, y1);
// ctx.lineTo(x2, y2); // ctx.stroke(); // }
