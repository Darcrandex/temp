/**
 * @name ValueTextNode
 * @author darcrand
 * @description
 */

import React from 'react'
import type { EditorConfig, LexicalNode, NodeKey, SerializedLexicalNode, Spread } from 'lexical'
import { DecoratorNode } from 'lexical'

const ValueTextComponent = React.lazy(() => import('./ValueTextComponent'))

export type SerializedValueTextNode = Spread<
  {
    value: number | string
    type: 'value-text'
    version: 1
  },
  SerializedLexicalNode
>

export class ValueTextNode extends DecoratorNode<JSX.Element> {
  __value: number | string

  constructor(value: number | string, key?: NodeKey) {
    super(key)
    this.__value = value
  }

  static getType(): string {
    return 'value-text'
  }

  static clone(node: ValueTextNode): ValueTextNode {
    return new ValueTextNode(node.__value, node.__key)
  }

  static importJSON(serializedNode: SerializedValueTextNode): ValueTextNode {
    const node = $createValueTextNode(serializedNode.value)
    return node
  }

  exportJSON(): SerializedValueTextNode {
    return {
      value: this.__value,
      type: 'value-text',
      version: 1,
    }
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement('span')
    return span
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return (
      <React.Suspense fallback={null}>
        <ValueTextComponent value={this.__value} nodeKey={this.getKey()} />
      </React.Suspense>
    )
  }

  setValue(value: number | string) {
    const writable = this.getWritable()
    writable.__value = value
  }
}

export function $createValueTextNode(value?: number | string): ValueTextNode {
  return new ValueTextNode(value || '')
}

export function $isValueTextNode(node: LexicalNode | null | undefined): node is ValueTextNode {
  return node instanceof ValueTextNode
}
