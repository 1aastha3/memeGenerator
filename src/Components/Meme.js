import React from "react";
import memesdata from "../memesdata";

let url
export default function Meme(){

    const [display, setDisplay] = React.useState({
    topText : " ",
    bottomText : " ",
    image : ""})
    
    const [meme, setMeme] = React.useState(memesdata)

    React.useEffect(
        () => {
            fetch("https://api.imgflip.com/get_memes")
                .then(res => res.json())
                .then(data => setDisplay(data.data.memes))
        }, []
    )

    
    function getMemeImage(){
        const memesArray = meme.data.memes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url

        setDisplay(prevMeme => ({
            ...prevMeme,
            image : url,
        }))
    }

    function handleChange(event){
        const {name, value} = event.target

        setDisplay(prevDisplay => ({
            ...prevDisplay,
            [name] : value
        }))
    }

    return(
        <main>
            <div className="meme-input">
                <input 
                type = "text"
                placeholder="Top Text" 
                className="meme--text"
                name="topText"
                value={display.topText}
                onChange = {handleChange}>
                </input>

                <input
                type="text"
                placeholder="Bottom Text"
                className="meme--text"
                name="bottomText"
                value={display.bottomText}
                onChange = {handleChange}>
                </input>

                <button className="form--button" onClick={getMemeImage}>Generate a new Meme</button>
            </div>

            <div className="meme--display">
                
                <h2 className="meme--topText">{display.topText}</h2>
                <h2 className="meme--bottomText">{display.bottomText}</h2>
                <img src={display.image} className="meme--image" />
            </div>
            
        </main>
    
    )
}