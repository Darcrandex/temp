/**
 * @name Editor
 * @author darcrand
 * @description 把官网的 demo 拿过来用
 */

import React, { useCallback } from 'react'
import { LexicalComposer, InitialConfigType } from '@lexical/react/LexicalComposer'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { EditorState, LexicalEditor, SerializedEditorState } from 'lexical'

import { SharedAutocompleteContext } from './context/SharedAutocompleteContext'
import { SharedHistoryContext } from './context/SharedHistoryContext'
import PlaygroundNodes from './nodes/PlaygroundNodes'
import { TableContext } from './plugins/TablePlugin'
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme'
import LEdiror from './Editor'

import { ValueTextNode } from './custom-plugins/ValueText/ValueTextNode'
import { ChartViewNode } from './custom-plugins/ChartView/ChartViewNode'
import { InitialStatePlugin } from './custom-plugins/InitialState/InitialStatePlugin'

// 保存的数据
const stateJSONString =
  '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"2112321","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"value":1675785218478,"type":"value-text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":2,"mode":"normal","style":"","text":"2222233","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'

interface EditorProps {
  onChange?: (stateJSON: SerializedEditorState) => void
}

const Editor: React.FC<EditorProps> = (props) => {
  const initialConfig: InitialConfigType = {
    namespace: 'Playground',
    nodes: [...PlaygroundNodes, ValueTextNode, ChartViewNode],
    onError: (error: Error) => {
      throw error
    },
    theme: PlaygroundEditorTheme,

    editable: true,
    editorState: undefined,
  }

  const onChange = useCallback(
    (editorState: EditorState, editor: LexicalEditor) => {
      if (typeof props.onChange === 'function') {
        props.onChange(editorState.toJSON())
      }
    },
    [props.onChange]
  )

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div className='editor-shell'>
                <LEdiror />

                <OnChangePlugin onChange={onChange} />
                <InitialStatePlugin editorStateJSONString={stateJSONString} />
              </div>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </>
  )
}

export default Editor
