import React from 'react'
import Area from '../../VisualComponents/Area'
import Chart from '../../VisualComponents/Chart'
import Pie from '../../VisualComponents/Pie'
import Line from '../../VisualComponents/Line'
import XProgress from '../../VisualComponents/XProgress'
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
  Chart,
  Pie,
  Line,
  XProgress,
}

export default previewFields
