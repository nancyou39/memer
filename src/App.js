import React, {useState} from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchIcon from '@material-ui/icons/Search';
import './media.css'

function App() {
  const[text, setText] = useState('')
  const[memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)



  async function getMemes() {
    setLoading(true)
    console.log("Get Memes")
    const key = 'WFLczxFz1MJ61HYIFmwr3Q8Bb8sNTG6Y'
    let url= 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key='+key
    url += '&q='+text
    const r = await fetch(url)
    const body = await r.json() 
    setMemes(body.data)
    setText('')
    setLoading(false)

  }

  console.log()

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth variant="outlined"
            label="Search for Memes"
            value={text}
            onChange={e=> setText(e.target.value)}
            onKeyPress={e=>{
              if(e.key==='Enter') getMemes()
            }}/>
          <Button variant="contained" color="primary"
            onClick={getMemes}>
            <SearchIcon/>
          </Button>
        </div>
      </header>
      {loading && <LinearProgress />}
      <div className="memes">
        {memes.map((meme, i)=> <Meme key ={i} {...meme}/>)}
      </div>
    </div>
);
}


function Meme({images, title}){
  const url = images.fixed_height.url

  return (<div className="meme" onClick={()=>window.open(url, '_blank')}>
    <div className="meme-title">{title}</div>
    {<img alt="meme" src={url} />}
  </div>)
}


//const suffix = '.gif?alt=media'
//<div className="msg-text">{m.text}
//{m.img && <img src={bucket + m.img + suffix} alt="pic"/>}
//</div>


  

export default App;