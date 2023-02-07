/**
 * @name ValueTextPlugin
 * @author darcrand
 * @description 用于注册到编辑器的组件
 */

import React, { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { LexicalCommand, createCommand, COMMAND_PRIORITY_EDITOR, $insertNodes } from 'lexical'
// import { $insertNodeToNearestRoot } from '@lexical/utils'
import { $createValueTextNode } from './ValueTextNode'

export const INSERT_VALUE_TEXT: LexicalCommand<string> = createCommand('INSERT_VALUE_TEXT')

export const ValueTextPlugin: React.FC = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand<string>(
      INSERT_VALUE_TEXT,
      (payload) => {
        const node = $createValueTextNode()
        // $insertNodeToNearestRoot(node)
        $insertNodes([node])
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
}
