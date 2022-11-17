import React  from 'react'
import { useState,useEffect,useRef } from 'react'
import axios from 'axios'
const Updata = () => {
    const [image, setImage] = useState()
    // const handleImage = (e) => {
    //   setImage(e.target.files[0])
    //   console.log(e.target.files)
    // }

    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    // const uploadFileImage = () => {
    //   cloudinaryRef.current = window.cloudinary
    //   widgetRef.current = cloudinaryRef.current.createUploadWidget({
    //     cloudName: 'dvz7vll4o',
    //     upload_preset: 'jr0m4p9w'
    //   }, function(error, result) {
    //     setImage(result.info.secure_url)
    //     console.log( result.info.secure_url)
    //     return
    //   })
    //   console.log( image)
    // }
    // const uploadFileImage = async () =>{
    //     formData.append("file", image);
    //     formData.append("upload_preset", "jr0m4p9w");
    //     xhr.send(formData);
    //     console.log(formData)
    //     try {
    //         const res = await axios.post("https://res.cloudinary.com/v1_1/dvz7vll4o/image/upload", formData);
    //         console.log(res)
    //         // return res.data.url;
    //       } catch (error) {
    //         console.log(error);
    //       }
    // }
    const handleUploadWidget = () => {
      cloudinaryRef.current = window.cloudinary
      const myUpload = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'dvz7vll4o',
        upload_preset: 'jr0m4p9w'
      }, function(error, result) {
        if(result.event === 'success')
        setImage(result.info.secure_url)
        console.log(result.info)
        return
      })
      myUpload.open()
      return
    }
    console.log(image)
  return (
    <div>
      <p>upload image</p>
      <button onClick={handleUploadWidget}>upload</button>
      <div>
      <img src={image} alt='img'/>
      </div>
        {/* <input
        type="file"
        name="file"
        onChange={handleImage} 
        className=""/>
        <button onClick={uploadFileImage}>click</button> */}
    </div>
  )
}

export default Updata