<script setup lang="tsx">
import { ContentWrap } from '@/components/ContentWrap'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { getProductListApi } from '@/api/product'
import type { ProductItem } from '@/api/product/types'
import { reactive, unref } from 'vue'
import { ElTag } from 'element-plus'
import { useTable } from '@/hooks/web/useTable'
import { BaseButton } from '@/components/Button'

const { tableRegister, tableState } = useTable({
  fetchDataApi: async () => {
    const { currentPage, pageSize } = tableState
    const res = await getProductListApi({
      page: unref(currentPage),
      per_page: unref(pageSize)
    })
    return {
      list: res.data.data,
      total: res.data.total
    }
  }
})
const { loading, dataList, total, currentPage, pageSize } = tableState

const { t } = useI18n()

const columns = reactive<TableColumn[]>([
  {
    field: 'selection',
    type: 'selection'
  },
  {
    field: 'index',
    label: t('tableDemo.index'),
    type: 'index'
  },
  {
    field: 'sku',
    label: 'SKU'
  },
  {
    field: 'name',
    label: '产品名称'
  },
  {
    field: 'type',
    label: '类型',
    formatter: (_: Recordable, __: TableColumn, cellValue: string) => {
      return (
        <ElTag type={cellValue === 'simple' ? 'success' : 'warning'}>
          {cellValue === 'simple' ? '简单产品' : '可变产品'}
        </ElTag>
      )
    }
  },
  {
    field: 'status',
    label: '状态',
    formatter: (_: Recordable, __: TableColumn, cellValue: string) => {
      const statusMap = {
        draft: { type: 'info' as const, label: '草稿' },
        pending: { type: 'warning' as const, label: '待审核' },
        publish: { type: 'success' as const, label: '已发布' }
      }
      const status = statusMap[cellValue as keyof typeof statusMap]
      return <ElTag type={status.type}>{status.label}</ElTag>
    }
  },
  {
    field: 'price',
    label: '价格'
  },
  {
    field: 'stock_quantity',
    label: '库存',
    formatter: (_: Recordable, __: TableColumn, cellValue: number | null) => {
      return cellValue ?? 'N/A'
    }
  },
  {
    field: 'stock_status',
    label: '库存状态',
    formatter: (_: Recordable, __: TableColumn, cellValue: string) => {
      return (
        <ElTag type={cellValue === 'instock' ? 'success' : 'danger'}>
          {cellValue === 'instock' ? '有库存' : '无库存'}
        </ElTag>
      )
    }
  },
  {
    field: 'category_id',
    label: '分类',
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return cellValue
    }
  },
  {
    field: 'created_at',
    label: '创建时间'
  },
  {
    field: 'action',
    label: '操作',
    slots: {
      default: (data: { row: ProductItem }) => {
        return (
          <div>
            <BaseButton type="primary" onClick={() => actionFn(data.row)}>
              编辑
            </BaseButton>
            <BaseButton type="danger" onClick={() => deleteFn(data.row)}>
              删除
            </BaseButton>
          </div>
        )
      }
    }
  }
])

const actionFn = (row: ProductItem) => {
  console.log('编辑产品:', row)
}

const deleteFn = (row: ProductItem) => {
  console.log('删除产品:', row)
}
</script>

<template>
  <ContentWrap :title="`${t('router.treeTable')} ${t('tableDemo.example')}`">
    <Table
      v-model:pageSize="pageSize"
      v-model:currentPage="currentPage"
      :columns="columns"
      :data="dataList"
      row-key="id"
      :loading="loading"
      sortable
      :pagination="{
        total: total
      }"
      @register="tableRegister"
    />
  </ContentWrap>
</template>

<style lang="less" scoped>
.el-button {
  margin-top: 10px;
}
</style>
