import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

export default function Login() {
  const login = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <button onClick={login} style={{padding:'10px 20px', fontSize:'16px'}}>
      Login avec Google
    </button>
  );
}
