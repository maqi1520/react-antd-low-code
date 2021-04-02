import React, { ReactElement, useState } from 'react'
import { Input, Button, Form, Modal } from 'antd'

interface Props {
  onChange: (data: Record<string, string>[]) => void
}

export default function ApiModal({ onChange }: Props): ReactElement {
  const [visible, setVisible] = useState(false)

  const [apiResult, setApiResult] = useState<Record<string, any> | null>(null)
  const [apiForm, setApiForm] = useState({
    api: '',
    header: '',
    dataField: '',
  })

  const handleApiField = (type: 'api' | 'header' | 'dataField', v: string) => {
    setApiForm((prev) => ({
      ...prev,
      [type]: v,
    }))
  }

  const handleGetApiFn = () => {
    const { api, header } = apiForm
    if (api) {
      fetch(api, {
        cache: 'no-cache',
        headers: Object.assign(
          { 'content-type': 'application/json' },
          header ? JSON.parse(header) : {}
        ),
        method: 'GET',
        mode: 'cors',
      })
        .then((res) => res.json())
        .then((res) => {
          setApiResult(res)
        })
    }
  }
  const handleOk = () => {
    const { dataField } = apiForm
    if (dataField && apiResult) {
      let data = apiResult[dataField]
      if (data && data instanceof Array) {
        data = data.map((item, i) => ({ key: i + '', ...item }))
        onChange(data)
      }
      setVisible(false)
    }
  }
  return (
    <span>
      <Button ghost type="primary" onClick={() => setVisible(true)}>
        第三方API
      </Button>
      <Modal
        title="配置api"
        visible={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        okText="确定"
        cancelText="取消"
      >
        <div>
          <Form.Item>
            <Input
              placeholder="请输入api地址"
              onChange={(e) => handleApiField('api', e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              placeholder="请输入头信息, 如{token: 123456}, 格式必须为json对象"
              rows={4}
              onChange={(e) => handleApiField('header', e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleGetApiFn}>
              发送请求
            </Button>
          </Form.Item>
          {apiResult && (
            <>
              <Form.Item>
                <Input.TextArea
                  rows={6}
                  value={JSON.stringify(apiResult, null, 4)}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  placeholder="设置数据源字段"
                  onChange={(e) => handleApiField('dataField', e.target.value)}
                />
              </Form.Item>
              <p style={{ color: 'red' }}>
                数据源字段是接口返回的图表数据对应的字段, 必填,
                否则无法正确导入数据
              </p>
            </>
          )}
        </div>
      </Modal>
    </span>
  )
}
