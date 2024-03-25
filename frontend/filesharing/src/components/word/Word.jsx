import Quill from 'quill'
import { useCallback, useState, useEffect,useContext } from 'react';
import "quill/dist/quill.snow.css";
import Link from 'quill/formats/link';
import "./word.css"

import { json, useParams } from 'react-router-dom';
import { useAuth } from '../../context';
import Qill_Navbar from './Qill_Navbar';


const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

const WS_URL = "ws://backend/ws";

function Word() {
  const { id: documentId } = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const { loginStatus ,username} = useAuth()
  
  console.log(loginStatus)
  console.log(username)
  // http://0.0.0.0:81
  useEffect(() => {
    const ws = new WebSocket(`ws://0.0.0.0:81/ws/${documentId}`);
    setSocket(ws)


    return () => { ws.close() }

  }, []);


  useEffect(() => {
    if (socket == null || quill == null || documentId == null) return;

    // Set up a flag to ensure the "load-document" event is handled only once
    // let isLoadDocumentHandled = false;

    // Define the event handler function
    const handleLoadDocument = (document) => {
      const data = JSON.parse(document.data)
      // console.log(data['load-document'])
      const delta = data['load-document']
      // console.log(delta)
      let isLoadDocumentHandled = false
      if (!isLoadDocumentHandled) {
        quill.setContents(delta);
        quill.enable();
        isLoadDocumentHandled = true;

        // Remove the event listener after handling the event
        socket.removeEventListener("message", handleLoadDocument);
      }
    };

    // Add the event listener
    socket.addEventListener("message", handleLoadDocument);

    const handler = () => {
      socket.send(JSON.stringify({ "get-document": username }))
    }
    socket.addEventListener('open', handler)


    // Cleanup: Remove the event listener when the component is unmounted
    return () => {
      socket.removeEventListener("message", handleLoadDocument);
    };
  }, [socket, quill, documentId]);


  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (event) => {
      const data = JSON.parse(event.data);
      const { "receive-changes": delta } = data;
      // console.log(delta)
      quill.updateContents(delta);
    };

    socket.addEventListener('message', handler);

    return () => {
      socket.removeEventListener('message', handler);
    }
  }, [socket, quill])


  useEffect(() => {
    if (!socket || !quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      // console.log(delta)
      const changes = delta
      socket.send(JSON.stringify({ "send-changes": changes }));
    };

    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (!socket || !quill) return;
    const handler = () => {
      // console.log("pussy")
      
      socket.send(JSON.stringify({ "save-document": [quill.getContents(),username]}));
    };


    socket.addEventListener("open", handler)
    const interval = setInterval(() => {
      // Check if the WebSocket is open before sending the message
      // console.log(username)
      if (socket.readyState === WebSocket.OPEN) {
        // console.log("Sending message");
        socket.send(JSON.stringify({ "save-document":[quill.getContents(),username] }));
      } else {
        console.log("WebSocket not open. State:", socket.readyState);
      }
    }, 2000);

    return () => {
      socket.removeEventListener('open', handler)
      clearInterval(interval)
    };
  }, [socket, quill]);





  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return
    wrapper.innerHTML = ''
    const editor = document.createElement('div')
    wrapper.append(editor)

    const q = new Quill(editor, { theme: "snow", modules: { toolbar: TOOLBAR_OPTIONS } });
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])
  return (<>{

    loginStatus ? (<div>
      <Qill_Navbar docId={documentId}/>
      <div ref={wrapperRef} className='container'></div>
       </div>) : <h1>Not autheticated</h1>
  }
  </>
  )
}

export default Word