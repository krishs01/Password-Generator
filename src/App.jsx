import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  // useRef hook
const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllow) str += "0123456789"
    if(charAllow) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    
    };

    setPassword(pass)

  }, [length, numAllow, charAllow, setPassword])

  const copyPassword = useCallback(()=> {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=> {passwordGenerator()}, [length, numAllow, charAllow, passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800'>
      <h1 className='text-4xl text-white my-2'>Password Generator</h1>
      
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" value={password} className='outline-none w-full py-1 px-3 rounded-md' placeholder='Password'  readOnly  ref={passwordRef}/>
        <button className='outline-none bg-blue-700 text-white mx-2 rounded-xl px-3 py-0.5 shrink-0 hover:bg-blue-500 active:bg-blue-700' onClick={copyPassword}>Copy</button>
        </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value )}}/>
          <label className='text-white'>Length: {length}</label>
        </div>
        <div className='flex text-sm gap-x-2'>
          <input type="checkbox" id="numberInput" defaultChecked={numAllow}  onChange={()=> { setNumAllow ((prev) => !prev)}}/>
          <label htmlFor="numnerInput" className='text-white'>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={charAllow} id='characterInput' onChange={()=> {setCharAllow((prev)=> !prev)}} />
          <label htmlFor="characterInput" className='text-white'>Characters</label>
        </div>
       </div>
        </div>
    </>
  )
}

export default App
