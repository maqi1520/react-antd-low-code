import React, { ReactElement } from 'react'
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

interface Option {
  value: string
  label: string
}

const previewFields = {
  div: (props: any) => <div {...props} />,
  // eslint-disable-next-line jsx-a11y/heading-has-content
  h1: (props: any) => <h1 {...props} />,
  p: (props: any) => <p {...props} />,
  span: (props: any) => <span>{props.children}</span>,
  Link: (props: any) => <a {...props} />,
  img: (props: any) => <img {...props} alt="" />,
  input: (props: any) => <input {...props} />,
  select: ({ children, ...other }: { children: Option[] }) => (
    <select {...other}>
      {children.map((option) =>
        option.value && option.label ? (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ) : null
      )}
    </select>
  ),
  button: (props: any) => <button {...props} />,
}

export default previewFields
