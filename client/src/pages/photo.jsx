import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './photo.css';
const Photo = ({notification,login,setheade,setimgine}) => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!login) {
          navigate('/login');
          return;
        }
        setheade("Dashboard");
        // setloader(true);
      }, [])
    const WIDTH = 200;
    const [isfile, setisfile] = useState(false);
    let newimage;

    const common = (event) => {
        let image_file = event.target.files[0] || event;

        let name = image_file.name
        // console.log(name);
        let reader = new FileReader
        reader.readAsDataURL(image_file)
        reader.onload = async (event) => {
            let image_url = event.target.result
            let image = document.createElement('img');
            image.src = image_url;
            // document.querySelector("#wrapper").appendChild(image)
            image.onload = async (e) => {
                let canvas = document.createElement("canvas")
                let ratio = WIDTH / e.target.width
                canvas.width = WIDTH
                canvas.height = e.target.height * ratio
                //    console.log(canvas.height)
                const context = canvas.getContext("2d")
                context.drawImage(image, 0, 0, canvas.width, canvas.height)

                let new_image_url = context.canvas.toDataURL("image/jpeg", 100)

                let new_image = document.createElement("img");

                newimage = urlToFile(new_image_url, name);
                new_image.src = new_image_url
                document.querySelector("#wrapper").innerHTML = "";
                document.querySelector("#wrapper").appendChild(new_image);
                setisfile(true);
            }
        }
    }

    const hi = async (event) => {
        common(event);
    }

    const sub = async (event) => {
        // console.log("submit button called")
        let image_file = document.getElementById('dfe').files[0];
        let name = image_file.name
        // console.log(name);
        let reader = new FileReader
        reader.readAsDataURL(image_file)
        reader.onload = async (event) => {
            let image_url = event.target.result
            let image = document.createElement('img');
            image.src = image_url;
            // document.querySelector("#wrapper").appendChild(image)
            image.onload = async (e) => {
                let canvas = document.createElement("canvas")
                let ratio = WIDTH / e.target.width
                canvas.width = WIDTH
                canvas.height = e.target.height * ratio
                //    console.log(canvas.height)
                const context = canvas.getContext("2d")
                context.drawImage(image, 0, 0, canvas.width, canvas.height)

                let new_image_url = context.canvas.toDataURL("image/jpeg", 100)

                let new_image = document.createElement("img");

                newimage = urlToFile(new_image_url, name);
                new_image.src = new_image_url
               
                let data = new FormData();
                let userid = localStorage.getItem("id");
                data.append('file', newimage)
                data.append('user', userid)
                // console.log(newimage);
                const res = await fetch('/photo', {
                    method: "POST",
                    body: data
                })
                const resu = await res.json();
                console.log(resu);
                notification.success("Photo Updated Successfully",1500);
                setimgine(name);
                navigate('/');
            }
        }
       
    }

    const urlToFile = (url, naam) => {
        let arr = url.split(",");
        let mime = arr[0].match(/:(.*?);/)[1]
        let data = arr[1]
        // console.log(mime)
        // console.log(data)
        let dataStr = atob(data)
        let n = dataStr.length
        let dataArr = new Uint8Array(n)

        while (n--) {
            dataArr[n] = dataStr.charCodeAt(n)
        }
        let file = new File([dataArr], naam, { type: mime })
        // console.log(file);
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
    const reset = () => {
        document.querySelector("#wrapper").innerHTML = "";
        document.querySelector("input").value = "";
        setisfile(false);
        console.log(newimage)
    }

    return (
        <>
            <div className="photo">
                <div className="box">
                    <input type="file" onChange={hi} name="" id="dfe" />
                    {/* <input type="file"  name="" id="here" /> */}
                    <div id="wrapper">
                    </div>
                    <div id='btn'>
                        <button onClick={sub} style={isfile ? xdfvf : dfvfdv}  ><i className="fa fa-cloud-upload" aria-hidden="true"></i>Upload</button>
                        {isfile ? <button onClick={reset} style={isfile ? xdfvf : dfvfdv}  ><i className="fa fa-undo" aria-hidden="true"></i>Clear</button> : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Photo