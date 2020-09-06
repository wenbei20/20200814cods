<template>
  <div class="app-container">
    <div class="el-row">
      <div class="el-col-12">
        <div id="pieChart" :style="{ width: '100%', height: '400px' }" />
      </div>
      <div class="el-col-12">
        <div id="lineChart" :style="{ width: '100%', height: '400px' }" />
      </div>
      <div class="el-col-24">
        <div id="barChart" :style="{ width: '100%', height: '400px' }" />
      </div>
    </div>

  </div>
</template>

<script>
import echarts from 'echarts'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'Home',
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      pieChart: null,
      pieChartOption: {
        title: {
          text: '各登记部门数据量',
          textAlign: 'center',
          left: '50%'
        },
        color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          show: true
        },
        legend: {
          show: false
        },
        series: [
          {
            name: '业务警种',
            type: 'pie',
            radius: [0, 120],
            top: 130,
            data: [
              { value: 20, name: '国宝' },
              { value: 30, name: '治安' },
              { value: 25, name: 'rose3' },
              { value: 25, name: 'rose4' },
              { value: 20, name: 'rose5' }
            ]
          }
        ]
      },
      lineChart: null,
      lineChartOption: {
        title: {
          text: '传统折线图',
          textAlign: 'center',
          left: '50%'
        },
        color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['2010年', '2011年', '2012年', '2013年', '2014年'],
          bottom: 50
        },
        grid: {
          top: 70,
          left: '10%',
          right: '10%',
          bottom: '100',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          data: ['东北', '华东', '华中', '华北', '华南', '西北', '西南']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '2010年',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '2011年',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '2012年',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '2013年',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '2014年',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      barChart: null,
      barChartOption: {
        title: {
          text: '传统柱状图',
          textAlign: 'center',
          left: '50%'
        },
        color: ['#37a2da', '#32c5e9', '#9fe6b8', '#ffdb5c', '#ff9f7f', '#fb7293', '#e7bcf3', '#8378ea'],
        legend: {
          bottom: 20
        },
        grid: {
          top: 50,
          right: 50,
          bottom: 100,
          left: 50
        },
        tooltip: {
          trigger: 'axis'
        },
        dataset: {
          source: [
            ['product', '东北', '华东', '华中', '华北', '华南', '西北', '西南'],
            ['图书', 43.3, 85.8, 93.7, 43.3, 85.8, 93.7, 53.1],
            ['家居厨具', 83.1, 73.4, 55.1, 83.1, 73.4, 55.1, 63.1],
            ['家用电器', 86.4, 65.2, 82.5, 86.4, 65.2, 82.5, 54.6],
            ['手机数码', 72.4, 53.9, 39.1, 72.4, 53.9, 39.1, 46.3],
            ['服装箱包', 43.3, 85.8, 93.7, 43.3, 85.8, 93.7, 53.1],
            ['汽车用品', 83.1, 73.4, 55.1, 83.1, 73.4, 55.1, 63.1],
            ['电脑办公', 86.4, 65.2, 82.5, 86.4, 65.2, 82.5, 54.6],
            ['运动户外', 83.1, 73.4, 55.1, 83.1, 73.4, 55.1, 63.1]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      }
    }
  },
  created() {},
  mounted() {
    this.drawChart('pieChart', 'pieChart', this.pieChartOption)
    this.drawChart('lineChart', 'lineChart', this.lineChartOption)
    this.drawChart('barChart', 'barChart', this.barChartOption)
  },
  methods: {
    drawChart(varible, id, option) {
      this[varible] = echarts.init(document.getElementById(id))
      this[varible].setOption(option)
    }
  }
}
</script>
