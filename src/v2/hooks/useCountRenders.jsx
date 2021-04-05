import { useRef } from 'react'

const useCountRenders = (text) => {
  const renders = useRef(0)
  console.log(`${text} - renders: `, renders.current++)
}

export default useCountRenders
