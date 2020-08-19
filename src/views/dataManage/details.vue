<template>
  <div class="app-container">
    <el-page-header content="统一社会信用代码详情" title="返回" @back="goBack" />
    <el-divider />
    <el-table
      v-loading="tableDataLoading"
      :data="tableData"
      :show-header="false"
      :height="'calc(100vh - 240px)'"
      border
      style="margin-bottom: 20px;"
    >
      <el-table-column
        v-for="(th, index) in tableHeader"
        :key="th.key"
        :prop="th.key"
        :label="th.name"
      >
        <template slot-scope="scope">
          <div v-if="editable && index % 2 === 1">
            <el-input :value="scope.row[th.key]" />
          </div>
          <div v-else :style="{ fontWeight: index % 2 === 0 ? 800 : 400 }">
            {{ scope.row[th.key] }}
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div>
      <el-button type="primary" @click="handleEdit">修改</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button @click="handleReset">重置</el-button>
    </div>

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves directive
// import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Details',
  // components: { Pagination },
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
      form: {
        dataSourceValue: undefined,
        dataSource: [1, 2, 3],
        unitCode: '',
        regionCode: '',
        regionName: '',
        page: 1,
        limit: 20
      },
      editable: false,
      tableHeader: [
        { key: 'fieldTitle1', name: '字段1' },
        { key: 'fieldContent1', name: '内容1' },
        { key: 'fieldTitle2', name: '字段2' },
        { key: 'fieldContent2', name: '内容2' },
        { key: 'fieldTitle3', name: '字段3' },
        { key: 'fieldContent3', name: '内容3' }
      ],
      tableData: [
        {
          fieldTitle1: '统一社会信用代码1',
          fieldContent1: '数据信息',
          fieldTitle2: '统一社会信用代码2',
          fieldContent2: '数据信息',
          fieldTitle3: '统一社会信用代码3',
          fieldContent3: '数据信息'
        },
        {
          fieldTitle1: '机构代码1',
          fieldContent1: '数据信息',
          fieldTitle2: '机构代码2',
          fieldContent2: '数据信息',
          fieldTitle3: '机构代码3',
          fieldContent3: '数据信息'
        },
        {
          fieldTitle1: '机构名称1',
          fieldContent1: '数据信息',
          fieldTitle2: '机构名称2',
          fieldContent2: '数据信息',
          fieldTitle3: '机构名称3',
          fieldContent3: '数据信息'
        },
        {
          fieldTitle1: '注册地址1',
          fieldContent1: '数据信息',
          fieldTitle2: '注册地址2',
          fieldContent2: '数据信息',
          fieldTitle3: '注册地址3',
          fieldContent3: '数据信息'
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 2,
      pageLayout: '总共, 页码, 上一页, pager, 下一页, 跳转',
      tableDataLoading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.tableDataLoading = true
      fetchList(this.listQuery).then(response => {
        // 赋值
        // this.tableData = response.data.items
        // this.totalCount = response.data.total
        const arr = new Array(60).fill(1).map((item) => (
          {
            fieldTitle1: '字段1',
            fieldContent1: '数据信息',
            fieldTitle2: '字段2',
            fieldContent2: '数据信息',
            fieldTitle3: '字段3',
            fieldContent3: '数据信息'
          }
        ))
        this.tableData = this.tableData.concat(arr)
        // Just to simulate the time of the request
        setTimeout(() => {
          this.tableDataLoading = false
        }, 1.5 * 1000)
      })
    },
    goBack() {
      console.log('go back')
      this.$router.go(-1)
    },
    handleEdit() {
      console.log('修改')
      this.editable = true
    },
    handleSave() {
      console.log('保存')
      this.editable = false
    },
    handleReset() {
      console.log('重置')
    }
  }
}
</script>
