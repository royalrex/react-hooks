// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(key, initialValue) {
  const getInitialValue = () => {
    console.log("read")
    const lsValue = localStorage.getItem(key)
    if (lsValue) {
      if (typeof initialValue === 'string') return lsValue

      return JSON.parse(lsValue)
    }

    return initialValue
  }
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [value, setValue] =  React.useState(() => getInitialValue())
  React.useEffect(() => {
    // useEffect gets called after each render cycle, only limited by the dependency array. Dependency is more like run only if logic, and not triggers.
    if (typeof initialValue === 'string') {
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
    console.log("set")
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  console.log("render")
  // const getInitialName = () => {
  //   console.log("read")
  //   const lsName = localStorage.getItem('name')
  //   if (lsName) return lsName
  //
  //   return initialName
  // }
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') ?? initialName
  const [obj, setName] = useLocalStorageState('name', {initialName, name:initialName})

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName((prev) => {
      return {...prev, name:event.target.value}
    })
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={obj.name} onChange={handleChange} id="name" autoComplete="off" />
      </form>
      {obj.name ? <strong>Hello {obj.name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [number, setNumber] = useLocalStorageState('counter', 0)
console.log(typeof number, number)
  return <>
    <button onClick={() => setNumber(number+1)}>{number}</button>
    <Greeting />
  </>
}

export default App
