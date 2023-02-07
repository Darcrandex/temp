/**
 * @name Counter
 * @author darcrand
 * @description
 */

import { useCounter } from '@/sotres/counter'
import { http } from '@/utils/http'
import { useQuery } from '@tanstack/react-query'
import { Button, Space } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Counter: React.FC = () => {
  const navigate = useNavigate()
  const { count, add, sub } = useCounter()

  const { data } = useQuery(['topics'], () => http.get('https://cnodejs.org/api/v1/topics'))

  return (
    <>
      <h1 className='m-8 font-bold'>
        <span className='underline text-blue-300 mr-2 cursor-pointer' onClick={() => navigate(-1)}>
          返回
        </span>
        <span>Counter</span>
      </h1>

      <section className='text-center my-6'>
        <p className='mb-4 flex justify-center'>
          <span>count:</span>
          <span className='w-10 text-right'>{count}</span>
        </p>
        <Space>
          <Button onClick={add}>Add</Button>
          <Button onClick={sub}>Sub</Button>
        </Space>
      </section>
    </>
  )
}

export default Counter
