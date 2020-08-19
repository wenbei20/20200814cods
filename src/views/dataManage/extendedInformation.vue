<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="数据源" style="width: 100%">
          <el-select
            v-model="form.dataSourceValue"
            placeholder="请选择"
            clearable
            style="width: 300px"
            class="filter-item"
          >
            <el-option
              v-for="item in form.dataSource"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="查询字段"
          style="width: 100%"
        >
          <div style="width: fit-content; display: inline-block;">
            <el-row
              :gutter="10"
              style=" width: 100%;"
            >
              <el-col :span="3" :offset="3">
                <el-select value="leftBracket">
                  <el-option label="(" value="leftBracket" />
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-select value="unitcode">
                  <el-option label="统一代码" value="unitcode" />
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-select value="rightBracket">
                  <el-option label=")" value="rightBracket" />
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-select value="equalSign">
                  <el-option label="=" value="equalSign" />
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-input placeholder="条件内容" />
              </el-col>
              <el-col :span="1">
                <el-link type="success" :underline="false" @click="addItem"><i class="el-icon-circle-plus" style="font-size: 24px;" /></el-link>
              </el-col>
              <el-col :span="2">
                <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
                  查询
                </el-button>
              </el-col>
            </el-row>
            <!-- 动态项 -->
            <el-row
              v-for="(item, index) in newItems"
              :key="index"
              :gutter="10"
              style=" width: 100%; margin-bottom: 8px;"
            >
              <el-col
                v-for="num in 5"
                :key="num"
                :span="3"
              >
                <!-- item[`opt${num}`] -->
                <el-select
                  :value="item[`opt${num}`].value"
                  @change="selectChange(1)"
                >
                  <el-option
                    :label="item[`opt${num}`].label"
                    :value="item[`opt${num}`].value"
                  />
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-input :value="item.text" placeholder="条件内容" />
              </el-col>
              <el-col :span="1">
                <el-link type="danger" :underline="false" @click="removeItem(index)"><i class="el-icon-remove" style="font-size: 24px;" /></el-link>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
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
  name: 'ExtendedInformation',
  components: { Pagination },
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
      initOptions: {
        opt1: { value: 'and', label: 'and' },
        opt2: { value: 'leftBracket', label: '(' },
        opt3: { value: 'unitcode', label: '统一代码' },
        opt4: { value: 'rightBracket', label: ')' },
        opt5: { value: 'equalSign', label: '=' },
        text: ''
      },
      originalItem: {
        opt1: '',
        opt2: { value: 'leftBracket', label: '(' },
        opt3: { value: 'unitcode', label: '统一代码' },
        opt4: { value: 'rightBracket', label: ')' },
        opt5: { value: 'equalSign', label: '=' },
        text: ''
      },
      newItems: [],
      tableHeader: [
        { key: 'unitCode', name: '统一代码' },
        { key: 'regionCode', name: '机构代码' },
        { key: 'regionName', name: '机构名称' },
        { key: 'legalPerson', name: '法人或负责人' },
        { key: 'registerAddr', name: '注册地址' },
        { key: 'registerDate', name: '注册日期' },
        { key: 'validityFrom', name: '有效期限自' },
        { key: 'validityTo', name: '有效期限至' },
        { key: 'status', name: '状态' },
        { key: 'options', name: '详情' }
      ],
      tableData: [
        {
          unitCode: '9846519816516515',
          regionCode: 'JKHSD515165161',
          regionName: '北京市XXX商务有限公司',
          legalPerson: '张三',
          registerAddr: '北京市海淀区大运广场B607',
          registerDate: '2016-05-02',
          validityFrom: '2016-05-02',
          validityTo: '2016-05-02',
          status: '1'
        },
        {
          unitCode: '9846519816516515',
          regionCode: 'JKHSD515165161',
          regionName: '北京市XXX商务有限公司',
          legalPerson: '张三',
          registerAddr: '北京市海淀区大运广场B607',
          registerDate: '2016-05-02',
          validityFrom: '2016-05-02',
          validityTo: '2016-05-02',
          status: '1'
        }
      ],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 2,
      pageLayout: '总共, 页码, 上一页, pager, 下一页, 跳转',
      tableDataLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
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
      this.$router.push({ path: `/dataManage/extendedInformation/${item.unitCode}` })
    },
    addItem() {
      console.log('新增')
      this.newItems.push(JSON.parse(JSON.stringify(this.initOptions)))
    },
    removeItem(index) {
      console.log('删除一项', index)
      this.newItems.splice(index, 1)
    }
  }
}
</script>
