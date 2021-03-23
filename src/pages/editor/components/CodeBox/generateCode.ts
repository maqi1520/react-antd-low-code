import { reduce, isArray, map } from 'lodash'
import { traverseUp } from '/~/utils'
import { State } from '../../codeTreeSlice'

type GenerateComponentCode = Record<
  string,
  (sub: State, props: string) => string
>

const generateComponentCode: GenerateComponentCode = {
  select: (sub, props) => {
    const children = reduce(
      sub.props.children,
      (acc, item) =>
        `${acc}<option value="${item.value}">${item.label}</option>`,
      ''
    )
    return `<${sub.type}${props}>
      ${children}
    </${sub.type}>`
  },
}

export const generateCode = (state: State) => {
  console.log(state)

  let module: Record<string, string[]> = {}

  function render(sub: State): string {
    if (sub.module) {
      if (module[sub.module] && module[sub.module].indexOf(sub.module) === -1) {
        module[sub.module] = [...module[sub.module], sub.type]
      }
      if (!module[sub.module]) {
        module[sub.module] = [sub.type]
      }
    }

    let props = ''
    if (sub.props) {
      Object.keys(sub.props).forEach((key) => {
        if (key !== 'children' && sub.props[key]) {
          const value = isArray(sub.props[key])
            ? `{${JSON.stringify(sub.props[key])}}`
            : `'${sub.props[key]}'`

          props = `${props} ${key}=${value}`
        }
      })
    }
    const children = map(sub.children, render).join('') || sub.props.children
    if (children) {
      return `<${sub.type}${props}>
        ${children}
      </${sub.type}>`
    } else {
      return `<${sub.type}${props}/>`
    }
  }

  const code = render(state)

  let moduleCode = ''
  Object.keys(module).forEach((m) => {
    moduleCode += `import {${module[m].join(',')}} from '${m}';`
  })

  return `import React from 'react';
  ${moduleCode}
  
  function App() {
      return (
          ${code}
      );
  }
  
  export default App;`
}
