<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="任务名称">
          <el-input v-model="form.name" style="width: 300px" />
        </el-form-item>
        <el-form-item label="任务描述">
          <el-input v-model="form.description" style="width: 500px" type="textarea" />
        </el-form-item>
        <el-form-item label="比对类型">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">精确比对</el-radio>
            <el-radio :label="2">精确+模糊</el-radio>
            <el-radio :label="3">模糊比对</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="返回字段">
          <el-card shadow="never">
            <el-checkbox-group v-model="form.fieldsGroupChecked">
              <el-checkbox
                v-for="item in form.fieldsGroup"
                :key="item"
                :label="item"
                style="width: 240px; margin: 5px 0;"
              >
                {{ item }}
              </el-checkbox>
            </el-checkbox-group>
          </el-card>
        </el-form-item>
        <el-form-item>
          <el-button v-waves type="primary" @click="handleSave">
            保存任务
          </el-button>
          <el-button v-waves type="default" @click="handleReset">
            重置任务
          </el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'ComparisonTask',
  directives: { waves },
  data() {
    return {
      form: {
        name: '',
        description: '',
        radio: 1,
        fieldsGroup: [],
        fieldsGroupChecked: []
      }
    }
  },
  created() {
    const arr = []
    arr.length = 60
    arr.fill(1)
    this.form.fieldsGroup = arr.map((item, index) => `字段${index + 1}`)
    console.log(78, this.form.fieldsGroup)
  },
  methods: {
    handleSave() {
      console.log('保存...')
    },
    handleReset() {
      console.log('重置...')
    }
  }
}
</script>
