import React, { useContext, useEffect, useRef,forwardRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { TranslateContext } from '../../../Context/TranslateProvider';
import { deleteImageService, uploadImageService } from '../../../Service/PostService';
import { Spin } from 'antd'
import classes from './EditorMCE.module.scss'
import { convertBlobtoUrl } from '../../../Helper';
const EditorMCE = (props,ref) => {
  const { t, lang } = useContext(TranslateContext)
  const [public_id, setPublicId] = React.useState([]);
  const [url, setUrl] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  let size = props.size || '500'
  if (props.takeValue) {
    const delete_id =  convertBlobtoUrl(url,public_id)||[]
    if(delete_id.length > 0)
    {  const setDelete = new Set(delete_id)
      deleteImageService(delete_id.toString())
    }
  }
  return (
    <> {loading && <div className={classes.loading} ><Spin size='large'></Spin></div>}
      <Editor
        apiKey="qin76yfp8r2f4t0tmfwfllg4gxibrh6qpd5qoiusqbxnuq20"
        ref={ref}
        initialValue={props.initvalue ? props.initvalue : `<h2>${t("Subheadings_must_be_format_heading_2")}</h2>`}
        init={{
          height: size,
          file_picker_types: 'file image media',
          selector: 'textarea',
          width: '100%',
          language: (lang == 'vie' ? 'vi' : lang == 'en' ? 'en_US' : 'zh_CN'),
          menubar: true,
          plugins: [
            'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
            'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks',
            'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime', 'media', 'table', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          images_file_types: 'jpg,svg,webp,png',
          image_title: true,
          paste_data_images: true,
          /* enable automatic uploads of images represented by blob or data URIs*/
          automatic_uploads: true,
          file_picker_callback: (cb, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.addEventListener('change', (e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.addEventListener('load', async () => {
                const id = 'blobid' + (new Date()).getTime();
                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                let form = new FormData();
                form.append('image', file);
                try{
                  setLoading(true)
                   const {data:{public_id,url}} = await uploadImageService(form)
                    setPublicId(pre =>[public_id,...pre])
                    setUrl(pre=>[url,...pre])
                  
                }finally{
                  setLoading(false)
                }
                
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), { title: file.name });
              });
              reader.readAsDataURL(file);
            });
            input.click();
          }
        }}
      />
    </>
  )
}
export default forwardRef(EditorMCE)
// 13/5 them chuc nang khi huy thi se xoa anh tu tren cloudinary va tu database sua cung the add them public_id