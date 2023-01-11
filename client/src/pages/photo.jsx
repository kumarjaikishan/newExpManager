import React, { useState } from 'react'
import './photo.css';
const Photo = () => {
    const WIDTH = 200;
    const [isfile, setisfile] = useState(false);
   let newimage;
    const hi = (event) => {
        let image_file = event.target.files[0];
        let name = image_file.name
        // console.log(name);
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
                newimage =  urlToFile(new_image_url,name);
                setisfile(true);
            }
        }
    }
    const urlToFile =(url, naam)=>{
        let arr = url.split(",");
        let mime = arr[0].match(/:(.*?);/)[1]
        let data = arr[1]
        // console.log(mime)
        // console.log(data)
        let dataStr = atob(data)
        let n = dataStr.length
        let dataArr = new Uint8Array(n)

        while (n--) {
            dataArr[n]=dataStr.charCodeAt(n)
        }
        let file = new File([dataArr], naam, {type:mime})
        console.log(file);
        return file;
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
    const sub =async()=>{
        var input = document.querySelector('input[type="file"]')
        let data = new FormData();
        let userid = localStorage.getItem("id");
        // console.log(userid)
        data.append('file', newimage)
        data.append('user', userid)

        const res = await fetch('/photo', {
            method: "POST",
            body: data
        })
        const resu =await res.json();
        console.log(resu);
    }
    return (
        <>
            <div className="photo">
                <div className="box">
                    <input type="file" onChange={hi} name="" id="" />
                    {/* <input type="file"  name="" id="here" /> */}
                    <div id="wrapper">
                    </div>
                    <div id='btn'>
                        <button onClick={sub} style={isfile ? xdfvf : dfvfdv}  ><i class="fa fa-cloud-upload" aria-hidden="true"></i>Upload</button>
                        {isfile ? <button onClick={reset} style={isfile ? xdfvf : dfvfdv}  ><i class="fa fa-undo" aria-hidden="true"></i>Clear</button> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Photo