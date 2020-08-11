const config = {
  requestID: 700,
  HetuForm: {
    formItems: [
      {
        type: 'inputExtra',
        name: 'plu',
        label: 'PLU'
      },
      {
        type: 'input',
        name: 'waveType',
        label: '货位'
      },
      {
        type: 'pickerRange',
        picker: 'date-time',
        name: 'execBeginAt',
        label: '创建时间'
      },
      {
        type: 'select',
        name: 'source',
        label: '来源',
        options: [
          { value: 0, label: 'WMS发送' },
          { value: 1, label: '自动创建' },
          { value: 2, label: '人工填单' },
          { value: 3, label: '二次人工盘点' }
        ]
      },
    ]
  },
  HetuTableTemp: {
    hasSetting: true,
    exportUrl: 'http://10.170.124.78:10150/api/v1/wesReport/export',
    queryUrl: '/api/v1/wesReport/query',
    columns: [
      {
        title: '序号',
        dataIndex: 'id',
        fixed: 'left',
        width: 60
      },
      {
        title: '盘点单号',
        dataIndex: 'waveNo',
        width: 120,
        fixed: 'left'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 320,
        fixed: 'right',
        hideConfig: true,
        fixedColumn: true,
        render: (v: undefined, rowObj: any) => {
          return (
            <Button disabled={rowObj?.state === 0 ? true : false} type="link">
              打印差异
            </Button>
          )
        }
      }
    ]
  }
}