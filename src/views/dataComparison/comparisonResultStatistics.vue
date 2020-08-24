<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="任务名称">
          <el-select
            v-model="form.taskName"
            placeholder="请选择"
            clearable
            style="width: 300px"
            class="filter-item"
          >
            <el-option
              v-for="item in form.taskSource"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-waves type="primary" @click="handleSearch">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        width="50"
        label="序号"
      />
      <el-table-column
        v-for="th in tableHeader"
        :key="th.key"
        :prop="th.key"
        :label="th.name"
      >
        <template slot-scope="scope">
          {{ scope.row[th.key] }}
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="totalCount > 0"
      :total="totalCount"
      :page.sync="pageIndex"
      :limit.sync="pageSize"
      @pagination="getList"
    />

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComparisonResultStatistics',
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      form: {
        taskName: undefined,
        taskSource: [1, 2, 3],
        dataStatus: undefined,
        dataStatusSource: [1, 2, 3]
      },
      tableHeader: [
        { key: 'dataStatus', name: '数据状态' },
        { key: 'comparisonCount', name: '比对量' }
      ],
      tableData: [
        {
          dataStatus: '代码名称一致',
          comparisonCount: ''
        },
        {
          dataStatus: '代码一致名称不一致',
          comparisonCount: ''
        },
        {
          dataStatus: '名称一致代码不一致',
          comparisonCount: ''
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 2,
      pageLayout: '总共, 页码, 上一页, pager, 下一页, 跳转',
      tableDataLoading: true
    }
  },
  methods: {
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
    handleDownload() {
      console.log('下载...')
    },
    handleView() {
      console.log('查看...')
    }
  }
}
</script>
