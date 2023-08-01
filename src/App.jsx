import { useState } from 'react';
import './App.scss';
import axios from 'axios';
import { youtube_parser } from './utils'

export const App = () => {

  const [message, setMessage] = useState("");
  const [urlResult, setUrlResult] = useState("");
  const [update, setUpdate] = useState(false);
  const [ytupdate, setYTupdate] = useState(false);


  const Update = (event) => {
    setMessage(event.target.value);
    setUpdate(true)
  }

  const SendData = (e) => {
    const YouTubeid = youtube_parser(message);

    const options = {
      method: 'GET',
      url: process.env.RapidAPI_URL,
      headers: {
        'X-RapidAPI-Key': process.env.RapidAPI_Key,
        'X-RapidAPI-Host': process.env.RapidAPI_Host
      },
      params: { id: YouTubeid },
    };
    axios(options).then(res => setUrlResult(res.data.link)).catch(err => console.log(err));
    setMessage('');
    setUpdate(false);
    setYTupdate(true);
  }

  const OffBtn = () => {
    setYTupdate(false);
  }
  return (
    <div className="songbot">
      <div className="box">
        <h2>SongBot</h2>
        <p>Convert YouTube videos into MP3 in just a few click!</p>
        <input type="text" value={message} onChange={Update} spellCheck={false} placeholder="Paste YouTube link here..." />
        <div className="btn">

          {ytupdate ? <a rel='norefrrer' href={urlResult} download=''><button type='button' onClick={OffBtn}>Download</button></a> : <button style={{ background: '#272626', border: '2px solid #808080', cursor: 'none' }} type='button' disabled={true}>Download</button>}
          {update ? <button type="button" onClick={SendData}>Submit</button> : <button style={{ background: '#272626', border: '2px solid #808080', cursor: 'none' }} type='button' disabled={true}>Submit</button>}
        </div>
      </div>
    </div>
  )
}
