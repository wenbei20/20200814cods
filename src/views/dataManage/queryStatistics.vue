<template>
  <div class="app-container">
    <el-container style="height: calc(100vh - 50px - 40px);">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246); margin: 0;">
        <el-tree
          :data="treeNodes"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        />
      </el-aside>
      <el-main style="padding: 0 20px;">
        <div class="commandPart">
          <el-input
            v-model="textareaValue"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
          />
        </div>
        <div class="handlePart">
          <el-button type="primary">执行</el-button>
          <el-button type="primary">导出</el-button>
          <el-button @click="clickHistory">历史记录</el-button>
        </div>
        <el-tabs
          v-if="tabsVisible"
          v-model="activeKey"
          type="card"
          style="margin-bottom: 15px;"
          @tab-click="tabsClick"
        >
          <el-tab-pane
            v-for="pane in tabsKeys"
            :key="pane.name"
            :label="pane.label"
            :name="pane.name"
          >
            <el-table
              :data="tabsPanes[pane.name].tbody"
              stripe
              style="width: 100%"
            >
              <el-table-column
                v-for="col in tabsPanes[pane.name].thead"
                :key="col.key"
                prop="date"
                :label="col.name"
                :width="col.key === 'no' ? 50 : 'auto'"
              >
                <template slot-scope="scope">
                  <template v-if="col.key === 'query'">
                    <el-tag size="mini">{{ scope.row[col.key] }}</el-tag>
                  </template>
                  <template v-else>
                    {{ scope.row[col.key] }}
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <div class="tablePart">
          <el-table
            :data="tableData"
            :height="'100%'"
            border
          >
            <el-table-column
              v-for="th in tableHeader"
              :key="th.key"
              :prop="th.key"
              :label="th.name"
            >
              <template slot-scope="scope">
                <template v-if="th.key !== 'options'">
                  {{ scope.row[th.key] }}
                </template>
                <template v-else>
                  <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="resultPart" />
      </el-main>
    </el-container>

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'QueryStatistics',
  directives: { waves },
  data() {
    return {
      treeNodes: [
        {
          label: '库1',
          children: [{ label: '表1' }, { label: '表2' }, { label: '表3' }]
        },
        {
          label: '库2',
          children: [{ label: '表1' }, { label: '表2' }, { label: '表3' }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      form: {
        dataSourceValue: undefined,
        dataSource: [1, 2, 3],
        unitCode: '',
        regionCode: '',
        regionName: '',
        page: 1,
        limit: 20
      },
      tableHeader: [
        { key: 'col1', name: 'tydm' },
        { key: 'col2', name: 'jgdm' },
        { key: 'col3', name: 'jgmc' },
        { key: 'col4', name: 'fddbr' },
        { key: 'col5', name: 'jgdz' },
        { key: 'col6', name: 'zcrq' },
        { key: 'col7', name: 'yxqxz' },
        { key: 'col8', name: 'yxqxe' },
        { key: 'col9', name: 'jyzt' }
      ],
      tableData: [
        {
          col1: '--',
          col2: '--',
          col3: '--',
          col4: '--',
          col5: '--',
          col6: '--',
          col7: '--',
          col8: '--',
          col9: '--'
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 2,
      pageLayout: '总共, 页码, 上一页, pager, 下一页, 跳转',
      tableDataLoading: true,
      textareaValue: '',
      tabsKeys: [
        { label: '最近查询', name: 'first' },
        { label: '结果', name: 'second' }
      ],
      tabsPanes: {
        first: {
          thead: [
            { key: 'time', name: '时间' },
            { key: 'query', name: '查询' }
          ],
          tbody: [
            { time: '2018-04-17 下午3点5分58秒', query: 'select * from db_xzqh;' },
            { time: '2018-04-17 下午3点5分58秒', query: 'select * from db_xzqh2;' },
            { time: '2018-04-17 下午3点5分58秒', query: 'select * from db_xzqh1233;' },
            { time: '2018-04-17 下午3点5分58秒', query: 'select * from db_xzqh12;' },
            { time: '2018-04-17 下午3点5分58秒', query: 'select * from db_xzqh1;' }
          ]
        },
        second: {
          thead: [
            { key: 'no', name: '' },
            { key: 'jgmc', name: 'jgmc' }
          ],
          tbody: [
            { no: '0', jgmc: '嘻嘻嘻有限责任公司' },
            { no: '1', jgmc: '嘻嘻嘻有限责任公司' },
            { no: '2', jgmc: '嘻嘻嘻有限责任公司' },
            { no: '3', jgmc: '嘻嘻嘻有限责任公司' },
            { no: '4', jgmc: '嘻嘻嘻有限责任公司' },
            { no: '5', jgmc: '嘻嘻嘻有限责任公司' }
          ]
        }
      },
      activeKey: 'first',
      tabsVisible: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    tabsClick(tab, event) {
      console.log(tab, event)
    },
    handleNodeClick(data) {
      console.log('点击节点', data)
    },
    getList() {
      this.tableDataLoading = true
      fetchList(this.listQuery).then(response => {
        // 赋值
        // this.tableData = response.data.items
        // this.totalCount = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.tableDataLoading = false
        }, 1.5 * 1000)
      })
    },
    handleSearch() {
      console.log('查询...')
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleClick(item) {
      console.log('查询详情', item)
      this.$router.push({ path: `/dataManage/unifiedCode/${item.unitCode}` })
    },
    clickHistory() {
      this.tabsVisible = !this.tabsVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tree{ background: transparent;}
.commandPart{ height: 200px; border: #ddd solid 1px; font-size: 12px; line-height: 1.5; white-space: pre;
  .el-textarea{ height: 100%;
    ::v-deep{
      .el-textarea__inner{ height: 100%; border: none; resize: none;}
    }
  }
}
.handlePart{ margin: 15px 0;}
.tablePart{ height: calc(100% - 435px); margin-bottom: 15px;}
.resultPart{ height: 150px; border: #ddd solid 1px; padding: 15px; font-size: 12px; line-height: 1.5; white-space: pre;}
</style>
