import { useEffect, useRef, useState } from 'react';
import { db } from './firebase';
import { collection, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function PixelCanvas({ user }) {
  const canvasRef = useRef();
  const [color, setColor] = useState('#ff0000');
  const [pixels, setPixels] = useState({});
  const [canDraw, setCanDraw] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'pixels'), (snapshot) => {
      const newPixels = {};
      snapshot.forEach(doc => newPixels[doc.id] = doc.data().color);
      setPixels(newPixels);
      drawPixels(newPixels);
    });
    return unsub;
  }, []);

  const drawPixels = (pixels) => {
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0,0,1600,1200);
    for (let key in pixels) {
      const [x, y] = key.split('_').map(Number);
      ctx.fillStyle = pixels[key];
      ctx.fillRect(x*10, y*10, 10, 10);
    }
  };

  const handleClick = async (e) => {
    if (!canDraw) return alert("Veuillez attendre 30 secondes avant de dessiner à nouveau!");
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left)/10);
    const y = Math.floor((e.clientY - rect.top)/10);
    const id = `${x}_${y}`;
    await setDoc(doc(db, 'pixels', id), { color });
    setCanDraw(false);
    setTimeout(() => setCanDraw(true), 30000);
  };

  return (
    <>
      <TransformWrapper>
        <TransformComponent>
          <canvas ref={canvasRef} width={1600} height={1200} onClick={handleClick} style={{border:'1px solid black'}}/>
        </TransformComponent>
      </TransformWrapper>
      <input type="color" value={color} onChange={e=>setColor(e.target.value)} />
    </>
  );
}
