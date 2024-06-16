import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [characters, setCharacters] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const passwordRef = useRef(null);

  const handleGeneratePassword = useCallback(() => {
    let pass = '';
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) {
      charset += '0123456789';
    }
    if (characters) {
      charset += '!@#$%^&*()_+{}|:<>?~';
    }
    for (let i = 0; i < passwordLength; i++) {
      pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(pass);
  }, [passwordLength, characters, numbers]);

  useEffect(() => {
    handleGeneratePassword();
  }, [handleGeneratePassword, passwordLength, characters, numbers]);

  const handleCopyPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <>
      <div className="relative w-full h-screen">
        <img
          src="https://wallpaperaccess.com/full/1261646.jpg"
          alt=""
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-md px-4 py-6 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg shadow-lg">
            <h1 className="text-2xl text-center font-bold text-white my-5">
              Password Generator
            </h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
              <input
                ref={passwordRef}
                type="text"
                className="w-full p-2"
                value={password}
                readOnly
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCopyPassword}
              >
                Copy Password
              </button>
            </div>
            <div className="flex flex-col text-sm gap-y-2">
              <div className="flex items-center gap-x-1 my-3">
                <input
                  type="range"
                  min={6}
                  max={15}
                  value={passwordLength}
                  className="cursor-pointer size-20"
                  onChange={(e) => setPasswordLength(Number(e.target.value))}
                />
                <label className="text-white">
                  Password length: {passwordLength}
                </label>
              </div>
              <div className="flex items-center gap-x-1 my-3">
                <input
                  type="checkbox"
                  checked={characters}
                  className="cursor-pointer"
                  onChange={() => setCharacters((prev) => !prev)}
                />
                <label className="text-white">Special Characters</label>
              </div>
              <div className="flex items-center gap-x-1 my-3">
                <input
                  type="checkbox"
                  checked={numbers}
                  className="cursor-pointer"
                  onChange={() => setNumbers((prev) => !prev)}
                />
                <label className="text-white">Numbers</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
