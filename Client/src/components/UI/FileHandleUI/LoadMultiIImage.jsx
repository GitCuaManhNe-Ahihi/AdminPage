import React from 'react'
import ReactDOM from 'react-dom'
import classes from './LoadMultilImage.module.scss'
import { GrAdd } from 'react-icons/gr'
import { AiOutlineDelete, AiOutlineEye, AiOutlineClose } from 'react-icons/ai'
import uniqid from 'uniqid'
export default function LoadMultiIImage(props) {
  const [stateImage, setStateImage] = React.useState([])
  const [isPreview, setIsPreview] = React.useState(false)
  const [imagePreview, setImagePreview] = React.useState(null)
  const readbase64 = (file) => {
    
    try {
      for(let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(file[i]);
      reader.onload = () => {
        setStateImage(pre => [...pre, { file: reader.result, id: uniqid(),ofile:file[i] }])
        props.setArrayfiles(pre =>[...pre, file[i]])
      }
    }
    }
    catch {
      console.log("error")
    }

  }
  return (
    <>
      <div className={classes.container}>
        {
          stateImage.map((item) => {
            return (
              <div className={classes.image} key={item?.id}>
                <img src={item?.file} />
                <div className={classes.icon}>
                  <AiOutlineDelete size={25} onClick={() => {
                    setStateImage(pre => pre.filter(i => i.id !== item.id))
                    props.setArrayfiles(pre => pre.filter(i => i.name !== item.ofile.name))
                  }} />
                  <AiOutlineEye size={25} onClick={() => {
                    setImagePreview(item.file)
                    setIsPreview(true)
                  }} />
                </div>

              </div>
            )
          })}
        <div >
          <label htmlFor="file">
            <div className={classes.addmoreImge}>
              <GrAdd size={30} />
            </div>
          </label>
          <input multiple  style={{ display: 'none' }} id='file' type="file" onChange={(e) => {
            readbase64(e.target.files)
          }}
            name="file"
            accept='image/*' />
        </div>
      </div>
      {
        isPreview ? ReactDOM.createPortal(<div className={classes.preview}>
         <div className={classes.previewContainer}>
          <img src={imagePreview} />
            <div className={classes.close}>
              <AiOutlineClose size={30} onClick={() => {
            console.log("close")
              setIsPreview(false)
            }}/>
            </div>
         </div>
        </div>, document.getElementById('preview')) : null
      }
    </>
  )
}
