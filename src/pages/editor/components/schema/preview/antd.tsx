import React from 'react'
import { Button, Table, Input, InputNumber, Radio, Form,Progress } from 'antd'

const previewFields = {
  Input,
  InputNumber,
  Radio: Radio.Group,
  Button,
  Table,
  Form,
  'Form.Item': Form.Item,
  Progress
}

export default previewFields
