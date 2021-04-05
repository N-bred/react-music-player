import { useState, useEffect } from 'react'

const useLocalStorage = (key, value, cd = (e) => e) => {
  const localStorageVal = localStorage.getItem(key)

  const [val, setVal] = useState(cd(localStorageVal) || value)

  useEffect(() => {
    localStorage.setItem(key, val)
  }, [val, key])

  return [val, setVal]
}

export default useLocalStorage
