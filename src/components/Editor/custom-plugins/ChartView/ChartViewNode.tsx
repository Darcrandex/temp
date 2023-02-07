/**
 * @name ChartViewNode
 * @author darcrand
 * @description 节点
 */

import type { EditorConfig, LexicalNode, NodeKey, SerializedLexicalNode, Spread, LexicalEditor } from 'lexical'
import { DecoratorNode } from 'lexical'

import ChartViewComponent from './ChartViewComponent'

interface ChartViewNodePayload {
  data: number[]
}

export type SerializedChartViewNode = Spread<
  {
    chartOptions: ChartViewNodePayload
    type: 'chart-view'
    version: 1
  },
  SerializedLexicalNode
>

export class ChartViewNode extends DecoratorNode<JSX.Element> {
  __chartOptions: ChartViewNodePayload

  constructor(options: ChartViewNodePayload, key?: NodeKey) {
    super(key)
    this.__chartOptions = options
  }

  static getType(): string {
    return 'chart-view'
  }

  static clone(node: ChartViewNode): ChartViewNode {
    return new ChartViewNode(node.__chartOptions, node.__key)
  }

  static importJSON(serializedNode: SerializedChartViewNode): ChartViewNode {
    const node = $createChartViewNode(serializedNode.chartOptions)
    return node
  }

  exportJSON(): SerializedChartViewNode {
    return {
      chartOptions: this.__chartOptions,
      type: 'chart-view',
      version: 1,
    }
  }

  createDOM(config: EditorConfig): HTMLElement {
    const div = document.createElement('div')
    return div
  }

  updateDOM(): false {
    return false
  }

  decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element {
    return <ChartViewComponent chartOptions={this.__chartOptions} nodeKey={this.getKey()} />
  }

  setOptions(options: Partial<ChartViewNodePayload>) {
    const writable = this.getWritable()
    writable.__chartOptions = { ...options, data: options.data || [] }
  }
}

export function $createChartViewNode(options?: ChartViewNodePayload): ChartViewNode {
  return new ChartViewNode(options || { data: [] })
}

export function $isChartViewNode(node: LexicalNode | null | undefined): node is ChartViewNode {
  return node instanceof ChartViewNode
}
