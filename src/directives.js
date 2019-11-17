import Vue from 'vue';

// v-dialogDrag: 弹窗拖拽
// Vue.directive('dialogDrag', {
//     bind(el, binding, vnode, oldVnode) {
//         const dialogHeaderEl = el.querySelector('.el-dialog__header');
//         const dragDom = el.querySelector('.el-dialog');
//         dialogHeaderEl.style.cursor = 'move';

//         // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
//         const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
        
//         dialogHeaderEl.onmousedown = (e) => {
//             // 鼠标按下，计算当前元素距离可视区的距离
//             let disX = e.clientX - dialogHeaderEl.offsetLeft;
//             let disY = e.clientY - dialogHeaderEl.offsetTop;
            
//             // 获取到的值带px 正则匹配替换
//             let styL, styT;

//             // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
//             if(sty.left.includes('%')) {
//                 styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
//                 styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
//             }else {
//                 styL = +sty.left.replace(/\px/g, '');
//                 styT = +sty.top.replace(/\px/g, '');
//             };
            
//             document.onmousemove = function (e) {
//                 // 通过事件委托，计算移动的距离 
//                 let l = e.clientX - disX;
//                 let t = e.clientY - disY;
//                 console.log(l,'l');
//                 console.log(t,'t');
//                 // 移动当前元素  
//                 dragDom.style.left = `${l + styL}px`;
//                 dragDom.style.top = `${t + styT}px`;

//                 //将此时的位置传出去
//                 //binding.value({x:e.pageX,y:e.pageY})
//                 document.body.style.overflowX="hidden";
//             };
//             //此处是为了防止在火狐浏览器下拖拽时会出现的两次阴影的效果，此处代码可以禁用
//             document.onmouseup = function (e) {
//                 document.onmousemove = null;
//                 document.onmouseup = null;
//             };
//         }
//     }
// })

Vue.directive('dialogDrag', {
    bind(el, binding, vnode, oldVnode) {
      const dialogHeaderEl = el.querySelector('.el-dialog__header')
      const dragDom = el.querySelector('.el-dialog')
      //dialogHeaderEl.style.cursor = 'move';
      dialogHeaderEl.style.cssText += ';cursor:move;'
      dragDom.style.cssText += ';top:0px;'
  
      // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
      const sty = (function() {
        if (window.document.currentStyle) {
          return (dom, attr) => dom.currentStyle[attr]
        } else {
          return (dom, attr) => getComputedStyle(dom, false)[attr]
        }
      })()
  
      dialogHeaderEl.onmousedown = e => {
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX - dialogHeaderEl.offsetLeft
        const disY = e.clientY - dialogHeaderEl.offsetTop
  
        const screenWidth = document.body.clientWidth // body当前宽度
        const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)
  
        const dragDomWidth = dragDom.offsetWidth // 对话框宽度
        const dragDomheight = dragDom.offsetHeight // 对话框高度
  
        const minDragDomLeft = dragDom.offsetLeft
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
  
        const minDragDomTop = dragDom.offsetTop
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight
  
        // 获取到的值带px 正则匹配替换
        let styL = sty(dragDom, 'left')
        let styT = sty(dragDom, 'top')
  
        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (styL.includes('%')) {
          styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
          styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
        } else {
          styL = +styL.replace(/\px/g, '')
          styT = +styT.replace(/\px/g, '')
        }
  
        document.onmousemove = function(e) {
          // 通过事件委托，计算移动的距离
          let left = e.clientX - disX
          let top = e.clientY - disY
  
          // 边界处理
          if (-left > minDragDomLeft) {
            left = -minDragDomLeft
          } else if (left > maxDragDomLeft) {
            left = maxDragDomLeft
          }
  
          if (-top > minDragDomTop) {
            top = -minDragDomTop
          } else if (top > maxDragDomTop) {
            top = maxDragDomTop
          }
  
          // 移动当前元素
          dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
        }
  
        document.onmouseup = function(e) {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  })

// v-dialogDragWidth: 弹窗宽度拖大 拖小
// Vue.directive('dialogDragWidth', {
//     bind(el, binding, vnode, oldVnode) {
//         const dragDom = binding.value.$el.querySelector('.el-dialog');

//         el.onmousedown = (e) => {
//             document.body.style.overflowX="hidden";
//             // 鼠标按下，计算当前元素距离可视区的距离
//             const disX = e.clientX - el.offsetLeft;
            
//             document.onmousemove = function (e) {
//                 e.preventDefault(); // 移动时禁用默认事件

//                 // 通过事件委托，计算移动的距离 
//                 const l = e.clientX - disX;
//                 dragDom.style.width = `${l}px`;
//             };

//             document.onmouseup = function (e) {
//                 document.onmousemove = null;
//                 document.onmouseup = null;
//             };
//         }  
//     }
// })