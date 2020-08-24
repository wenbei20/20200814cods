<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row type="flex" align="middle">
          <el-col :span="10">
            <el-form-item label="任务名称" style="width: 100%">
              <el-select
                v-model="form.taskName"
                placeholder="请选择"
                clearable
                style="width: 100%"
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
            <el-form-item label="数据状态" style="width: 100%">
              <el-select
                v-model="form.dataStatus"
                placeholder="请选择"
                clearable
                style="width: 100%"
                class="filter-item"
              >
                <el-option
                  v-for="item in form.dataStatusSource"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item>
              <el-button v-waves type="primary" @click="handleSearch">
                查询
              </el-button>
              <el-button v-waves type="default" @click="handleDownload">
                结果文件下载
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
          <template v-if="th.key === 'options'">
            <el-button type="default" size="small" @click="handleView(scope.row)">查看</el-button>
          </template>
          <template v-else>
            {{ scope.row[th.key] }}
          </template>
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
  name: 'ComparisonResultQuery',
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
        { key: 'sourceId', name: '源流水号' },
        { key: 'sourceUnitCode', name: '源统一代码' },
        { key: 'sourceRegionCode', name: '源机构代码' },
        { key: 'sourceRegionName', name: '源机构名称' },
        { key: 'sourceRegistryNo', name: '源登记号' },
        { key: 'dataStatus', name: '数据状态' },
        { key: 'unitCode', name: '统一代码' },
        { key: 'regionCode', name: '机构代码' },
        { key: 'regionName', name: '机构名称' },
        { key: 'registryNo', name: '登记号' },
        { key: 'options', name: '详情' }
      ],
      tableData: [
        {
          sourceId: '',
          sourceUnitCode: '',
          sourceRegionCode: '',
          sourceRegionName: '',
          sourceRegistryNo: '',
          dataStatus: '',
          unitCode: '',
          regionCode: '',
          regionName: '',
          registryNo: ''
        },
        {
          sourceId: '',
          sourceUnitCode: '',
          sourceRegionCode: '',
          sourceRegionName: '',
          sourceRegistryNo: '',
          dataStatus: '',
          unitCode: '',
          regionCode: '',
          regionName: '',
          registryNo: ''
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
