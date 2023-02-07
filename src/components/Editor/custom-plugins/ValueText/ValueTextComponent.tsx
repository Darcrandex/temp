/**
 * @name ValueTextComponent
 * @author darcrand
 * @description 显示的内容
 */

import React, { useCallback } from 'react'
import { Button, Drawer } from 'antd'
import type { NodeKey } from 'lexical'
import { $getNodeByKey } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useToggle } from 'react-use'

import { $isValueTextNode } from './ValueTextNode'

interface ValueTextComponentProps {
  value: number | string
  nodeKey: NodeKey
}

const ValueTextComponent: React.FC<ValueTextComponentProps> = (props) => {
  const [editor] = useLexicalComposerContext()
  const [open, toggle] = useToggle(false)

  const onChange = useCallback(() => {
    editor.update(() => {
      const node = $getNodeByKey(props.nodeKey)
      if ($isValueTextNode(node)) {
        node.setValue(Date.now())
      }
    })
  }, [editor, props.nodeKey])

  return (
    <>
      <Button onClick={() => toggle()}>{props.value || 0}</Button>

      <Drawer title='配置' open={open} onClose={() => toggle()}>
        <Button onClick={onChange}>更新数值</Button>
      </Drawer>
    </>
  )
}

export default ValueTextComponent
