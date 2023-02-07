/**
 * @name ChartViewComponent
 * @author darcrand
 * @description 图表组件
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Line, Column } from '@antv/g2plot'
import { Button, Drawer } from 'antd'
import { useToggle } from 'react-use'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { NodeKey, $getNodeByKey } from 'lexical'

import { $isChartViewNode } from './ChartViewNode'

interface ChartViewComponentProps {
  nodeKey: NodeKey
  chartOptions: {
    data: number[]
  }
}

const ChartViewComponent: React.FC<ChartViewComponentProps> = (props) => {
  const [open, toggle] = useToggle(false)
  const refContainer = useRef<HTMLDivElement>(null)
  const [chartInstance, setChart] = useState<Column>()
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!refContainer?.current) return

    const data = props.chartOptions.data?.map((value, index) => ({ type: `Bar - ${index + 1}`, value }))
    const chart = new Column(refContainer?.current, {
      data,
      xField: 'type',
      yField: 'value',
      legend: false,
    })

    chart.render()

    setChart(chart)
  }, [])

  useEffect(() => {
    if (chartInstance) {
      const data = props.chartOptions.data?.map((value, index) => ({ type: `Bar - ${index + 1}`, value }))
      chartInstance.changeData(data)
    }
  }, [props.chartOptions, chartInstance])

  const onSetData = useCallback(() => {
    editor.update(() => {
      const node = $getNodeByKey(props.nodeKey)
      if ($isChartViewNode(node)) {
        node.setOptions({ data: Array.from({ length: 20 }).map(() => ~~(Math.random() * 200)) })
      }
    })
  }, [editor, props.nodeKey])

  return (
    <>
      <section>
        <h1 className='text-center'>
          <span className='mr-4'>图表</span>
          <Button onClick={() => toggle()}>编辑</Button>
        </h1>
        <div ref={refContainer}></div>
      </section>

      <Drawer title='配置' open={open} onClose={() => toggle()}>
        <Button onClick={onSetData}>生成数据</Button>
      </Drawer>
    </>
  )
}

export default ChartViewComponent
