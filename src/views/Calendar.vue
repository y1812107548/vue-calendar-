<template>
  <div class="calendar">
    <div class="calendar-wrapper">
      <div class="calendar_inner">
       
        <div class="tableHead">
            <div class="titleWeek">
              星期
            </div>
            <div class="weekClass" v-for="(weeklists,m) in calendarWeekList " :key="m">
                {{weeklists.week}}
            </div>
        </div>
        <div class="calendarFather" v-for="(item, index) of calendarList" :key="index">
          <div class="month">{{ index+1 }}月</div>
          <!-- <div class="week">
            <div class="week_item" v-for="week of weekList" :key="week">星期{{ week }}</div>
          </div> -->
          <div
            @click="getMonthOuterTime(month)"
            class="calendar_item"
            v-for="(month,i) in item"
            :key="i">
            {{ month.date }}

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}
import { log } from "util";
export default {
  data() {
    return {
      calendarWeekList:[],
      current: {}, // 当前时间
      calendarList: [], // 用于遍历显示
      shareDate: new Date() // 享元模式，用来做优化的
    };
  },
  computed: {
    // 显示当前时间
    currentDateStr() {
      let { year, month } = this.current;
      return `${year}年${this.pad(month + 1)}月`;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    getMonthOuterTime(row){
      console.log(row);
      
    },
    init() {
      // 初始化当前时间
      this.setCurrent();
      this.calendarCreator();
    },
    // 当前月的第一天是星期几
    getFirstDayByMonths(year, month) {
      return new Date(year, month, 1).getDay();
    },
    // 当前月的最后一天是星期几
    getLastDayByMonth(year, month) {
      return new Date(year, month + 1, 0).getDay();
    },
    // 判断当前月有多少天
    getDaysByMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    },
    // 对小于 10 的数字，前面补 0
    pad(str) {
      return str < 10 ? `0${str}` : str;
    },
    // 点击上一月
    prevMonth() {
      this.current.month--;
      // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
      this.correctCurrent();
      // 生成新日期
      this.calendarCreator();
    },
    // 生成固定月份
    initMounthNumber() {},
    // 点击下一月
    nextMonth() {
      this.current.month++;
      // 因为 month的变化 会超出 0-11 的范围， 所以需要重新计算
      this.correctCurrent();
      // 生成新日期
      this.calendarCreator();
    },
    // 格式化时间，与主逻辑无关
    stringify(year, month, date) {
      let str = [year, this.pad(month + 1), this.pad(date)].join("-");
      return str;
    },
    // 设置或初始化 current
    setCurrent(d = new Date()) {
      let year = d.getFullYear();
      let month = d.getMonth();
      let date = d.getDate();
      this.current = {
        year,
        month,
        date
      };
    },
    // 修正 current
    correctCurrent() {
      let { year, month, date } = this.current;

      let maxDate = this.getDaysByMonth(year, month);
      // 预防其他月跳转到2月，2月最多只有29天，没有30-31
      date = Math.min(maxDate, date);

      let instance = new Date(year, month, date);
      this.setCurrent(instance);
    },
    GetDate(currentDate, num) {
      var date = new Date(currentDate);
      date = date.valueOf();
      date = date + num * 24 * 60 * 60 * 1000;
      date = new Date(date);
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.date = date.getDate();
      this.day = new Array("周日", "周一",  "周二","周三", "周四","周五","周六")[date.getDay()];
      this.hour =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      this.minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      this.second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var currentTime = this.month + "-" + this.date + " " + this.day;
      return currentTime;
    },
    // 生成日期
    calendarCreator() {
      let curmonth = -1;
      let getMinWeek = -1
      let isAddOldDate= -1
      let addBack =-1
      let curyear = 2019
      const oneDayMS = 24 * 60 * 60 * 1000;
      let list = [];
      let weekMinList = []
      let addOldDate = []
      let addDateBack =[]
      for (let j = 0; j < 12; j++) {
        getMinWeek++;
        // console.log(new Date(curyear, getMinWeek, 1),'yue');
        // 当前月，第一天的周num
        let begin = new Date(curyear, getMinWeek, 1).getDay()
        weekMinList.push(begin)
      }
      // 获取当年每月1号最小的周num
      let curYearMinWeek =Math.min.apply(Math, weekMinList)
      for (let k = 0; k < 12; k++) {
        isAddOldDate++;
        // 当前月份第一天是星期几, 0-6
        let firstDayOldDate = this.getFirstDayByMonths(curyear, isAddOldDate) 
        // 填充多少天，因为我将星期日放到最后了，所以需要另外调整下
        let prefixDaysLength = firstDayOldDate - curYearMinWeek

        // 向前移动之后的毫秒数
        let begin = new Date(curyear, isAddOldDate, 1).getTime() - (oneDayMS * prefixDaysLength)
        let end = new Date(curyear, isAddOldDate , 1).getTime()
        // console.log(parseTime(begin,'{y}-{m}-{d}'),'减去的日期')
        while (begin < end) {
          // 享元模式，避免重复 new Date
          this.shareDate.setTime(begin);
          let year = this.shareDate.getFullYear();
          let curMonth = this.shareDate.getMonth();
          let date = this.shareDate.getDate();
          let week = new Array("星期日", "星期一", "星期二","星期三", "星期四","星期五","星期六")[this.shareDate.getDay()]
          let weekNum = this.shareDate.getDay()
          addOldDate.unshift({
            year: year,
            month: curMonth,
            date: date,
            week:week,
            weekNum:weekNum,
            value: this.stringify(year, curMonth, date)
          })
          begin += oneDayMS
        }
      }
      
      for (let i = 0; i < 12; i++) {
        curmonth++;
        // 当前月，第一天和最后一天的毫秒数
        let begin = new Date(curyear, curmonth, 1).getTime();
        let end = new Date(curyear, curmonth + 1, 0).getTime();
        /* ----------------------------------------------------- */
        // 当前月份第一天是星期几, 0-6
        // let firstDay = this.getFirstDayByMonths(curyear, curmonth)
        // console.log(firstDay,'当前第一天');
        
        // 填充多少天，因为我将星期日放到最后了，所以需要另外调整下
        // let prefixDaysLen = firstDay
        // console.log(prefixDaysLen,'向前几天');
        
        // 向前移动之后的毫秒数
        // let begin = new Date(curyear, curmonth, 1).getTime() - (oneDayMS * prefixDaysLen)
        // console.log( new Date(curyear, curmonth, 1).getTime(), begin )
        // console.log(parseTime(begin,'{y}-{m}-{d}'),'减去的日期')
        

        // 当前月份最后一天是星期几, 0-6
        // let lastDay = this.getLastDayByMonth(curyear, curmonth)
        // // 填充多少天，因为我将星期日放到最后了，所以需要另外调整下
        // let suffixDaysLen = lastDay === 0 ? 0 : 7 - lastDay
        // 向后移动之后的毫秒数
        // let end = new Date(curyear, curmonth + 1, 0).getTime() + (oneDayMS * suffixDaysLen)
        // let end = new Date(curyear, curmonth + 1, 0).getTime()

        while (begin <= end) {
          // 享元模式，避免重复 new Date
          this.shareDate.setTime(begin);
          let year = this.shareDate.getFullYear();
          let curMonth = this.shareDate.getMonth();
          let date = this.shareDate.getDate();
          let week = new Array("星期日", "星期一", "星期二","星期三", "星期四","星期五","星期六")[this.shareDate.getDay()]
          let weekNum = this.shareDate.getDay()
          list.push({
            year: year,
            month: curMonth,
            date: date,
            week:week,
            weekNum:weekNum,

            value: this.stringify(year, curMonth, date)
          })
          begin += oneDayMS;
        }
      }

      this.calendarList = list;
      
      let newArray = [[], [], [], [], [], [], [], [], [], [], [], []];
      let newWeek = []
      newArray.length = 12
      list.forEach(e => {
        switch (e.month) {
          case 0:
            newArray[0].push(e);
            break;
          case 1:
            newArray[1].push(e);
            break;
          case 2:
            newArray[2].push(e);
            break;
          case 3:
            newArray[3].push(e);
            break;
          case 4:
            newArray[4].push(e);
            break;
          case 5:
            newArray[5].push(e);
            break;
          case 6:
            newArray[6].push(e);
            break;
          case 7:
            newArray[7].push(e);
            break;
          case 8:
            newArray[8].push(e);
            break;
          case 9:
            newArray[9].push(e);
            break;
          case 10:
            newArray[10].push(e);
            break;
          case 11:
            newArray[11].push(e);
            break;
          default:
        }


      })
      
      addOldDate.forEach(f => {
        switch (f.month) {
          case 11:
            newArray[0].unshift(f);
            break;
          case 0:
            newArray[1].unshift(f);
            break;
          case 1:
            newArray[2].unshift(f);
            break;
          case 2:
            newArray[3].unshift(f);
            break;
          case 3:
            newArray[4].unshift(f);
            break;
          case 4:
            newArray[5].unshift(f);
            break;
          case 5:
            newArray[6].unshift(f);
            break;
          case 6:
            newArray[7].unshift(f);
            break;
          case 7:
            newArray[8].unshift(f);
            break;
          case 8:
            newArray[9].unshift(f);
            break;
          case 9:
            newArray[10].unshift(f);
            break;
          case 10:
            newArray[11].unshift(f);
            break;
          default:
        }

      })
      
      // 获取最长日历的一个月
      let longDayArray=[]
      let curMax = newArray[0].length
      newArray.forEach(g => {
        let curLength = g.length
        if (curLength > curMax ) {
          curMax = curLength
          longDayArray=g
        }
        
      })
      for (let i = 0; i < 12; i++) {
          // debugger
        addBack++;
       let reduceNum = newArray[i].length
        // 获取每个月最后一天的星期num
        let lastDayMonthBack = this.getLastDayByMonth(curyear, addBack)
        let suffixDaysLenAddBack = Math.abs( curMax - reduceNum  )
        let endAddBack = new Date(curyear, addBack + 1, 1).getTime() + (oneDayMS * suffixDaysLenAddBack)

        let beginBack =  new Date(curyear, addBack + 1, 1).getTime()
        
        while ( beginBack < endAddBack  ) {
          // 享元模式，避免重复 new Date
          this.shareDate.setTime(beginBack);
          let year = this.shareDate.getFullYear();
          let curMonth = this.shareDate.getMonth();
          let date = this.shareDate.getDate();
          let week = new Array(
            "星期日",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六"
          )[this.shareDate.getDay()];
          let weekNum = this.shareDate.getDay();
          addDateBack.push({
            year: year,
            month: curMonth,
            date: date,
            week: week,
            status: 6,
            weekNum: weekNum,
            id: "",
            disabled:true,
            content: "工作日",
            value: this.stringify(year, curMonth, date)
          })
          beginBack += oneDayMS;
        }
      }
      console.log(addDateBack,'back22222223333');
      
      addDateBack.forEach(g => {
        switch (g.month) {
          case 1:
            newArray[0].push(g);
            break;
          case 2:
            newArray[1].push(g);
            break;
          case 3:
            newArray[2].push(g);
            break;
          case 4:
            newArray[3].push(g);
            break;
          case 5:
            newArray[4].push(g);
            break;
          case 6:
            newArray[5].push(g);
            break;
          case 7:
            newArray[6].push(g);
            break;
          case 8:
            newArray[7].push(g);
            break;
          case 9:
            newArray[8].push(g);
            break;
          case 10:
            newArray[9].push(g);
            break;
          case 11:
            newArray[10].push(g);
            break;
          case 0:
            newArray[11].push(g);
            break;
          default:
        }
      })
      

      // console.log(newArray,'lastarr');
      this.calendarWeekList = longDayArray
      this.calendarList = newArray
      console.log(newArray,'last');
      
      
    }
  }
};
</script>

<style lang="less" >
.calendar_inner {
  .tableHead{
    display: flex;
    .weekClass{
      margin: 10px;
      width: 24px;
    }
    .titleWeek{
      margin: 10px;
      width: 24px;
    }
  }
  .calendarFather {
    display: flex;
    .month {
      margin: 10px;
    }
    .week {
      margin: 10px;
    }
    .calendar_item {
      margin: 10px;
      width: 24px;
    }
  }
}
</style>
