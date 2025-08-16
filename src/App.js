import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './Login';
import PixelCanvas from './Canvas';
import Chat from './Chat';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div style={{display:'flex', gap:'20px', padding:'20px'}}>
      {user ? <>
        <PixelCanvas user={user}/>
        <Chat user={user}/>
      </> : <Login />}
    </div>
  );
}

export default App;
