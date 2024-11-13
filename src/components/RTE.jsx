import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { useForm, Controller } from 'react-hook-form'

function RTE({name, label, control, defaultValue="" , className}) {


  return (
    <div className='w-3/4 mt-5'>
        {label && <label className={`inline-block mb-1 pl-1`}   >{label}</label>}
        <Controller 
        name={name || "editor"}
        className={`${className}`}
        control={control}
        render={({field: {onChange}})=>(
            <Editor
            initialValue={defaultValue}
            apiKey='rn19xaih2j2uirpso2orzihxx6afi75psy2ihi33d09ebatk'
            init={{
                initialValue:{defaultValue},
                height:500,
                menubar:true,
                
                plugins:[
                    'image', 'advlist', 'autolink', 'lists', 'link',
                    'image', 'charmap', 'preview', 'anchor', 'searchreplace',
                    "visualblocks", 'code', 'fullscreen', 'inserdatetime','media',
                    'table','code','help','wordcount','anchor'
                ],
                toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
            
            ></Editor>
        )}
        ></Controller>
    </div>
  )
}

export default RTE