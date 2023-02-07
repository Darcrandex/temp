/**
 * @name InitialStatePlugin
 * @author darcrand
 * @description 设置默认内容的插件
 */

import React, { useEffect } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

interface InitialStatePluginProps {
  editorStateJSONString?: string
}

export const InitialStatePlugin: React.FC<InitialStatePluginProps> = (props) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (props.editorStateJSONString) {
      const editorState = editor.parseEditorState(props.editorStateJSONString)

      // 重新更新内容需要添加延迟，否则报错
      const t = setTimeout(() => {
        editor.setEditorState(editorState)
        clearTimeout(t)
      }, 500)
    }
  }, [editor, props.editorStateJSONString])

  return null
}
