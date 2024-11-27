import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*(){}[]|+-*/,;:~?";

    for(let i=0; i<length; i++) {
      pass += str.charAt(Math.floor(Math.random()*str.length))
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 101)
    window.navigator.clipboard.writeText(password)
  }, [password]) 

  useEffect(() => {passwordGenerator()}, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      {/* This div is for outer dark mode */}
      <div className='flex bg-neutral-900 w-screen h-screen justify-center'>
        {/* This div is for inner box which contains all contents */}
        <div className='flex flex-col items-center bg-neutral-600 w-[70%] h-fit mt-10 rounded-xl'>
        <h1 className='text-white mt-2 font-medium text-center mb-2'>Password generator🔻</h1>
          {/* This div has an input and button*/}
          <div className='flex w-[80%] h-8 rounded-xl overflow-x-hidden'>
            <input
            className='w-5/6 bg-neutral-200 h-full px-3'
            type='text'
            value={password}
            readOnly
            placeholder='Password'
            ref={passwordRef}
            />
            <button
            onClick={copyPasswordToClipboard}
            className='flex w-1/6 bg-blue-700 hover:bg-blue-600 active:bg-blue-400 transition h-full justify-center items-center text-white font-medium'>
              copy
            </button>
          </div>
          <div className='w-[80%] mt-4 mb-6'>
            <div className='w-5/6 flex flex-col md:flex-row flex-wrap items-center justify-center gap-2 md:gap-5'>
                <div className='flex justify-center items-center gap-[5px]'>
                    <input
                    type='range'
                    min={4}
                    max={100}
                    value={length}
                    className='cursor-pointer mt-1'
                    onChange={(e) => setLength(e.target.value)}
                    />
                    <label className='text-gray-200 font-medium'>Length ({length})</label>
                </div>
                <div className='flex justify-center items-center gap-[5px]'>
                    <input
                    type='checkbox'
                    className='cursor-pointer mt-1'
                    id='num'
                    defaultChecked={numAllowed}
                    onChange={() => setNumAllowed(prev => !prev)}
                    /> 
                    <label htmlFor='num' className='cursor-pointer text-gray-200 font-medium'>Numbers</label>
                </div>
                <div className='flex justify-center items-center gap-[5px]'>
                    <input
                    type='checkbox'
                    className='cursor-pointer mt-1'
                    id='char'
                    defaultChecked={charAllowed}
                    onChange={() => setCharAllowed(prev => !prev)}
                    /> 
                    <label htmlFor='char' className='cursor-pointer font-medium text-gray-200'>Characters</label>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
