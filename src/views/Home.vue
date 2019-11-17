<template>
  <div class="home">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    欢迎来到首页 今日任务完成echarts报表
    <div>
      <el-radio-group v-model="radio">
        <el-radio @click.native.prevent="clickitem(1)" :label="1">本月数据</el-radio>
        <el-radio @click.native.prevent="clickitem(2)" :label="2">本周数据</el-radio>
      </el-radio-group>
    </div>
    <div id="sellCharts" style="height:400px;"></div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="180"
      ></el-table-column>
    </el-table>
    <div>
      
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "home",
  components: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      radio: 1,
      // x轴
      // xData: ['19-06-20', '19-06-21', '19-06-22', '19-06-23', '19-06-24', '19-06-25', '19-06-26'],
      // 核心数据
      // seriesData: [100, 1000, 901, 934, 200, 1330, 300],
      xAxis: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      series: [
        {
          data: [
            2.0,
            4.9,
            7.0,
            23.2,
            25.6,
            76.7,
            135.6,
            162.2,
            32.6,
            20.0,
            6.4,
            3.3
          ]
        },
        {
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3
          ]
        },
        {
          data: [
            2.0,
            2.2,
            3.3,
            4.5,
            6.3,
            10.2,
            20.3,
            23.4,
            23.0,
            16.5,
            12.0,
            6.2
          ]
        }
      ]
    };
  },
  methods: {
    clickitem(e) {
      e === this.radio ? (this.radio = "") : (this.radio = e);
      console.log(e);
    },
    // 重新加载数据
    getData() {
      // getSellData()
      //     .then(res => {
      //         // 接收数据
      //         let {category, value} = res;
      //         // 渲染
      //         this.xData = category;
      //         this.seriesData = value;
      //         // 重新调用报表
      //         var option = {
      //             // x轴
      //             xAxis: {
      //                     type: 'category',
      //                     data: this.xData
      //             },
      //             // y轴
      //             yAxis: {
      //                 type: 'value',
      //             },
      //             // 核心数据
      //             series: [{
      //                 data: this.seriesData,
      //                 type: 'line',
      //             }]
      //         }
      //         this.drawCharts(option);
      //     })
      //     .catch(err => {
      //         console.log(err)
      //     })
    },
    // 生成报表的函数
    drawCharts(option) {
      // 1. 初始化报表
      let sellChart = this.echarts.init(document.getElementById("sellCharts"));
      // 3. 使用配置生成报表
      sellChart.setOption(option);
    }
  },
  mounted() {
    let option = {
      // x轴
      // xAxis: {
      //         type: 'category',
      //         data: this.xData
      // },
      // y轴
      // yAxis: {
      //     type: 'value'
      // },
      // 核心数据
      // series: [{
      //     data: this.seriesData,
      //     type: 'bar'
      // }]
      // 提示面板
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999"
          }
        }
      },
      //工具栏 可选
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      // 大标题
      legend: {
        data: ["蒸发量", "降水量", "平均温度"]
      },
      xAxis: [
        {
          type: "category",
          data: this.xAxis,
          axisPointer: {
            type: "shadow"
          }
        }
      ],
      // 配置y轴信息
      yAxis: [
        {
          type: "value",
          name: "水量",
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: "{value} ml"
          }
        },
        {
          type: "value",
          name: "温度",
          min: 0,
          max: 40,
          interval: 8,
          axisLabel: {
            formatter: "{value} °C"
          }
        }
      ],
      // 主要数据
      series: [
        {
          name: "蒸发量",
          type: "bar",
          data: this.series[0].data,
          itemStyle: {
            color: "blue"
          }
        },
        {
          name: "降水量",
          type: "bar",
          data: this.series[1].data,
          itemStyle: {
            color: "red"
          }
        },
        {
          name: "平均温度",
          type: "line",
          yAxisIndex: 1,
          data: this.series[2].data
        }
      ]
    };
    this.drawCharts(option);
  }
};
</script>
<style lang="less">

table td{
max-width:100px!important; 
word-wrap:break-word; 
text-overflow:ellipsis; 
white-space:nowrap; 
overflow:hidden; 
}
table td:hover{ 
white-space:normal; 
overflow:auto;
}

</style>
