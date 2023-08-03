/**
 * @name App
 * @description
 * @author darcrand
 */

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'

const A = () => <h1>A</h1>
const A1 = () => <h1>a-1</h1>
const A2 = () => <h1>a-2</h1>
const A3 = () => <h1>a-3</h1>
const A31 = () => <h1>a-3-1</h1>
const A32 = () => <h1>a-3-2</h1>
const A33 = () => <h1>a-3-3</h1>
const B = () => <h1>B</h1>
const C = () => <h1>C</h1>

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '/a', element: <A /> },
      { path: '/b', element: <B /> },
      { path: '/c', element: <C /> },

      { path: '/a/a-1', element: <A1 /> },
      { path: '/a/a-2', element: <A2 /> },
      { path: '/a/a-3', element: <A3 /> },

      { path: '/a/a-3-1', element: <A31 /> },
      { path: '/a/a-3-2', element: <A32 /> },
      { path: '/a/a-3-3', element: <A33 /> },
    ],
  },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
