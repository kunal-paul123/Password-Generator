import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  let [length, setLength] = useState(8);
  let [numberAllowed, setNumberAllowed] = useState(false);
  let [characterAllowed, setCharAllowed] = useState(false);
  let [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "!@#$%&^&*-+/={}[]~`"

    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random()*str.length + 1);
      pass +=  str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, characterAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password]);

    useEffect(() => {
      passwordGenerator()
    }, 
    [length, numberAllowed, characterAllowed, setPassword])

  return (
    <>
    <div className='w-full max-w-md mx-auto
      rounded-lg px-4 py-6 bg-gray-800 text-orange-400 mt-8'>
        <h3 className='text-white text-center mb-3'>Password Generator</h3>
      <div className='flex rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} 
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly 
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-900 text-white
        px-3 py-0.5 shrink-0'>copy</button>
      </div>
      <div className='flex items-center gap-x-2'>
        <input type="range"
         min={6}
         max={100}
         value={length}
         className='cursor-pointer' 
         onChange={(e) => {setLength(e.target.value)}}
         />
         <label>Length: {length}</label>
         <input type="checkbox"
         defaultChecked={numberAllowed}
         id='numberinput'
         onChange={() => {
              setNumberAllowed((prev) => !prev)
        }} 
        />
        <label>Number: {numberAllowed}</label>
         <input type="checkbox"
         defaultChecked={characterAllowed}
         id='numberinput'
         onChange={() => {
              setCharAllowed((prev) => !prev)
        }} 
        />
        <label>Character: {characterAllowed}</label>
      </div>
    </div>
    </>
  )
}

export default App
