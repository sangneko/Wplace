import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function Chat({ user }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'chat'), snapshot => {
      const msgs = snapshot.docs.map(d => d.data());
      setMessages(msgs);
    });
    return unsub;
  }, []);

  const sendMessage = async () => {
    if (text.trim() === '') return;
    await addDoc(collection(db, 'chat'), {
      user: user.displayName,
      message: text,
      timestamp: serverTimestamp()
    });
    setText('');
  };

  return (
    <div style={{border:'1px solid gray', padding:'5px', width:'300px'}}>
      <div style={{height:'200px', overflowY:'scroll'}}>
        {messages.map((m,i)=><div key={i}><b>{m.user}:</b> {m.message}</div>)}
      </div>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Écrire un message"/>
      <button onClick={sendMessage}>Envoyer</button>
    </div>
  );
}
