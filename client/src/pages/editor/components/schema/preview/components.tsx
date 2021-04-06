import React from 'react'
import {Area,Line,Column,Bar,Pie} from '@ant-design/charts'
import cl from 'classnames'

function Grid({
  cols,
  rows,
  gapX,
  gapY,
  ...other
}: {
  cols: number
  rows: number
  gapX: number
  gapY: number
}) {
  return (
    <div
      {...other}
      className={cl('grid', {
        [`grid-cols-${cols}`]: cols,
        [`grid-rows-${rows}`]: rows,
        [`gap-x-${gapX}`]: gapX,
        [`gap-y-${gapY}`]: gapY,
      })}
    />
  )
}

const previewFields = {
  Grid,
  Area,
  Column,
  Bar,
  Pie,
  Line,
}

export default previewFields
