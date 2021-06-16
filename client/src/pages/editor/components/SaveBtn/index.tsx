import React, { ReactElement, useState } from 'react'
import { message, Modal } from 'antd'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useAsyncFn } from 'react-use'
import cl from 'classnames'

import { useAppStore } from '/~/app/hooks'
import axios from 'axios'

interface Props {}

export interface ComponentData {
  name: string
  code: string
  data: string
}

export default function SaveBtn({}: Props): ReactElement {
  const [visible, setVisible] = useState(false)
  const store = useAppStore()
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: '组件',
      code: 'Component',
    },
  })
  const history = useHistory()
  const [state, doFetch] = useAsyncFn(async (data) => {
    const rootState = store.getState()

    const res = await axios.post('/api/component', {
      ...data,
      data: JSON.stringify(rootState.codeTree),
    })
    return res.data
  }, [])
  const onSubmit = async (data: ComponentData) => {
    const res = await doFetch(data)
    if (res.success) {
      message.success('保存成功！')
      history.push('/component')
    }
  }
  return (
    <>
      <button onClick={() => setVisible(true)} className="btn btn-primary ml-2">
        save
      </button>
      <Modal
        footer={false}
        onCancel={() => setVisible(false)}
        title="组件"
        visible={visible}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-5 text-gray-700">
              名称
            </label>
            <div className="mt-1">
              <input
                name="name"
                type="text"
                ref={register({
                  required: true,
                })}
              />
            </div>
          </div>
          {errors.name?.type === 'required' && (
            <div className="mt-1 text-red-600">name is required</div>
          )}

          <div className="mt-6">
            <label className="block text-sm font-medium leading-5 text-gray-700">
              Code
            </label>
            <div className="mt-1">
              <input
                name="code"
                type="text"
                ref={register({
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
              />
            </div>
          </div>
          {errors.code && (
            <div className="mt-1 text-red-600">Code is required</div>
          )}

          <div className="mt-6">
            <button
              disabled={state.loading}
              type="submit"
              className={cl('btn w-full btn-primary btn-lg', {
                'opacity-50': state.loading,
              })}
            >
              {state.loading ? 'loading' : '提交'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}
