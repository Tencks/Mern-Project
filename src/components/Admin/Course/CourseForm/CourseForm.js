import React, { useCallback } from 'react'
import { Form, Image, } from 'semantic-ui-react';
import { useDropZone }from 'react-dropzone';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './CourseForm.form';
import './Course.Form.scss'

export function CourseForm() {

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit:async (formValue) => {
      try {
        console.log(formValue);
      } catch (error) {
        console.error(error);
      }
    }
  })

  const onDrop = useCallback((aFiles) => {
      const file = aFiles[0]
      formik.setFieldValue('miniature', URL.createObjectURL(file));
      formik.setFieldValue('file', file)
  })  

  const { getRootProps, getInputProps } = useDropZone({
    accept: 'iage/jpeg, image/png',
    onDrop,
  });

  const getMiniature = () =>{
    if(formik.values.file){
      return formik.values.miniature
    }else if(formik.values.miniature){
      return ''
    }
    return null;
  }


  return (
    <Form className='course-form' onSubmit={formik.handleSubmit}>
        <div className='course-form__miniature' {...getRootProps()}>
        <input {...getInputProps()} />
          {getMiniature () ? (
            <Image size='small' src={getMiniature()} />
          ):(
            <div>
              <span>Arratra la miniatura here</span>
            </div>
          )}
        </div>

        <Form.Input 
        name='title' 
        placeholder='nombre del curso' 
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
        />
        <Form.Input 
        name='url' 
        placeholder='link del curso' 
        onChange={formik.handleChange}
        value={formik.values.url}
        error={formik.errors.url}
        />
        <Form.TextArea
          name='description'
          placeholder='Pequeña descripción del curso'
          onChange={formik.handleChange}
          value={formik.values.description}
          error={formik.errors.description}
        />  

        <Form.Group widths='equal'>
          <Form.Input 
          type='number' 
          name='price' 
          placeholder='Precio del curso'
          onChange={formik.handleChange}
          value={formik.values.price}
          error={formik.errors.price}
          />
          <Form.Input 
          type='number' 
          name='score' 
          placeholder='Puntuación del curso'
          onChange={formik.handleChange}
          value={formik.values.score}
          error={formik.errors.score}
          />
        </Form.Group>
        
        <Form.Button type='submit' primary fluid loading={formik.isSubmitting} >
          Crear Curso
        </Form.Button>

    </Form>
  )
}
