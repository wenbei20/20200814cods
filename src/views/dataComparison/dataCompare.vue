<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" :inline="true" label-width="80px">
        <el-form-item label="任务名称" style="width: 100%">
          <el-select
            v-model="form.taskName"
            placeholder="请选择"
            clearable
            style="width: 300px"
            class="filter-item"
          >
            <el-option
              v-for="item in form.taskSrouce"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文件上传" style="width: 100%">
          <el-row :gutter="20" style="width: 400px;">
            <el-col :span="12">
              <el-input v-model="form.fileName" />
            </el-col>
            <el-col :span="12">
              <el-upload
                ref="upload"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                :multiple="false"
              >
                <el-button slot="trigger" size="small" type="primary">浏览</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
            </el-col>
          </el-row>
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
          <template v-if="th.key === 'compare'">
            <el-button type="default" size="small" @click="handleCompare(scope.row)">比对</el-button>
          </template>
          <template v-if="th.key === 'delete'">
            <el-button type="default" size="small" @click="handleDelete(scope.row)">删除</el-button>
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
  name: 'DataCompare',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      fileList: [
        // { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        // { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      form: {
        taskName: undefined,
        taskSrouce: [1, 2, 3],
        fileName: ''
      },
      tableHeader: [
        { key: 'taskId', name: '任务ID' },
        { key: 'taskName', name: '任务名称' },
        { key: 'count', name: '数据量' },
        { key: 'status', name: '状态' },
        { key: 'taskDetails', name: '任务详情' },
        { key: 'compare', name: '比对' },
        { key: 'delete', name: '删除' }
      ],
      tableData: [
        {
          taskId: 'as153d135a1',
          taskName: '任务一',
          count: '5651',
          status: '1',
          taskDetails: '--'
        },
        {
          taskId: 'das412165485',
          taskName: '任务二',
          count: '1651',
          status: '2',
          taskDetails: '--'
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
  watch: {
    fileList(value) {
      if (value.length) {
        this.form.fileName = value[0].name
      }
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
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSearch() {
      console.log('查询...')
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCompare(item) {
      console.log('比对', item)
    },
    handleDelete(item) {
      console.log('删除', item)
    }
  }
}
</script>
