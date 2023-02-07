/**
 * @name ChartViewPlugin
 * @author darcrand
 * @description 图表插件
 */

import React, { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $insertNodeToNearestRoot } from '@lexical/utils'
import { LexicalCommand, createCommand, COMMAND_PRIORITY_EDITOR } from 'lexical'

import { $createChartViewNode } from './ChartViewNode'

export const INSERT_CHART_VIEW: LexicalCommand<string> = createCommand('INSERT_CHART_VIEW')

export const ChartViewPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand<string>(
      INSERT_CHART_VIEW,
      (payload) => {
        const node = $createChartViewNode()
        // 直接在根节点插入图表
        $insertNodeToNearestRoot(node)
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}
