import { useState, useCallback } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

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

  return (
    <>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </>
  )
}

export default App
