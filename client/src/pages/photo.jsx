import React, { useState } from 'react'
import './photo.css';
const Photo = () => {
    const WIDTH = 200;
    const [isfile, setisfile] = useState(false);
    const hi = (event) => {
        let image_file = event.target.files[0];

        let reader = new FileReader
        reader.readAsDataURL(image_file)
        reader.onload = (event) => {
            let image_url = event.target.result
            let image = document.createElement('img');
            image.src = image_url;
            // document.querySelector("#wrapper").appendChild(image)
            image.onload = (e) => {
                let canvas = document.createElement("canvas")
                let ratio = WIDTH / e.target.width
                canvas.width = WIDTH
                canvas.height = e.target.height * ratio
                //    console.log(canvas.height)
                const context = canvas.getContext("2d")
                context.drawImage(image, 0, 0, canvas.width, canvas.height)

                let new_image_url = context.canvas.toDataURL("image/jpeg", 100)

                let new_image = document.createElement("img");
                new_image.src = new_image_url
                document.querySelector("#wrapper").innerHTML = "";
                document.querySelector("#wrapper").appendChild(new_image);
                setisfile(true);
            }
        }
    }
    const xdfvf = {
        background: "rgb(0, 204, 255)",
        color: "white"
    }
    const dfvfdv = {
        background: "grey",
        color: "black",
        opacity: 0.4,
    }
    const reset = ()=>{
        document.querySelector("#wrapper").innerHTML="";
        document.querySelector("input").value = "";
        setisfile(false);
    }
    return (
        <>
            <div className="photo">
                <div className="box">
                    <input type="file" onChange={hi} name="" id="" />
                    <div id="wrapper">
                    </div>
                    <div id='btn'>
                        <button style={isfile ? xdfvf : dfvfdv}  ><i class="fa fa-cloud-upload" aria-hidden="true"></i>Upload</button>
                        {isfile ? <button onClick={reset} style={isfile ? xdfvf : dfvfdv}  ><i class="fa fa-undo" aria-hidden="true"></i>Clear</button> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Photo