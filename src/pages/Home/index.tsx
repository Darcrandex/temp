/**
 * @name Home
 * @author darcrand
 * @description
 */

import React, { useState } from 'react'
import Editor from '@/components/Editor'
import { SerializedEditorState } from 'lexical'

const Home: React.FC = () => {
  const [json, setJSON] = useState<SerializedEditorState>()

  return (
    <>
      <h1 className='mx-8 text-blue-500 font-bold text-3xl'>Home</h1>

      <Editor onChange={setJSON} />

      <hr />

      <p className='m-4 break-words'>{JSON.stringify(json)}</p>
    </>
  )
}

export default Home
