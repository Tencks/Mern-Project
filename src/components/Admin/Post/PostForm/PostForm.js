import React, {useCallback} from 'react'
import { Form, Image } from 'semantic-ui-react'
import { useDropzone } from 'react-dropzone'
import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './PostForm.form'
import './PostForm.scss'


export function PostForm() {
    
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                
            } catch (error) {
                 console.error(error);
                 
            }
        }

    })




    const onDrop = useCallback((aFiles) =>{
        const file = aFiles[0]
        formik.setFieldValue('miniature', URL.createObjectURL(file))
        formik.setFieldValue('file', file);
    })

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop,
    })

    const getMiniature = () => {
        if(formik.values.file){
            return formik.values.miniature
        }
        
        return null
    }


  return (
    <Form className='post-form' onSubmit={formik.handleSubmit}>
        <Form.Group widths='equal'>
            <Form.Input 
            name='title' 
            placeholder='Titulo del post' 
            onChange={formik.handleChange}
            value={formik.values.path}
            error ={formik.errors.path}
            />
            <Form.Input name='path' placeholder='Path del post' />
        </Form.Group>

        <Editor 
            init={{
                height:400,
                menubar:true,
                plugins:[
                    
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media paste code help wordcount"
                ],
                toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
            }}
            initialValue={formik.values.content}
            onBlur={(e) => formik.setFieldValue('content',e.target.getContent())}
        />
        
        <div className='post-form__miniature' {...getRootProps()}>
            <input {...getInputProps()} />
            {getMiniature() ? (
                <Image size='small' src={getMiniature()} />
            ) : (
                <div>
                    <span>Arrastra tu imagen</span>
                </div>

            )
        
        }
        </div>

        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
            Crear post
        </Form.Button>

    </Form>
  )
}
