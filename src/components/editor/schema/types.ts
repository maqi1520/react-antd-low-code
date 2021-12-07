import { fields } from '../Right/fields'
import preview from './preview/index'

export interface FieldNode {
  type: keyof typeof preview
  h?: number
  displayName?: string
  module?: string
  props: Record<string, any>
}

export interface Field extends Record<string, any> {
  key: string
  name: string
  type: keyof typeof fields
}
