<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
// var count = 0; //计时器
// var outTime = 0.1; //分钟
// window.setInterval(go, 1000);

// function go() {
//   count++;
//   if (count == outTime * 60) {
//     // this.goLock()
//   }
// }

// var x
// var y

export default {
  data() {
    return {
      count: 0,
      outTime: 0.1,
      x: null,
      y: null
    };
  },
  // updated(){
  //   this.setInterval(go, 1000);
  // },
  mounted() {
    let self = this;
    clearInterval(timer);
    let timer = setInterval(startTime, 1000);
    window.addEventListener("mousemove", this.isMouseOver, false);
    window.addEventListener("click", this.isClick, false);
    window.addEventListener("keydown", this.isKeyDown, false);
    // 计时器开始
    function startTime() {
      // 当前路径在锁屏页面停止计时
      if (self.$route.path == "/lock") {
        clearInterval(timer)
      } else {
        self.count++;
        if (self.count == self.outTime * 60) {

          clearInterval(timer);
          // self.goLock();
        }
      }
    }
  },
  computed: {},
  methods: {
    isClick() {
      // 监听点击
      document.onclick = function() {
        this.count = 0;
        // console.log("点击了");
      };
    },
    isMouseOver(event) {
      //监听鼠标
      var x1 = event.clientX;
      var y1 = event.clientY;

      if (this.x != x1 || this.y != y1) {
        this.count = 0;
      }
      this.x = x1;
      this.y = y1;
      // console.log(this.x,this.y)
    },
    isKeyDown() {
      //监听键盘
      document.onkeydown = function() {
        this.count = 0;
        // console.log("键盘敲了");
      };
    },
    goLock() {
      this.$router.push("/lock");
    }
  }
};
</script>
<style lang="less">
</style>
