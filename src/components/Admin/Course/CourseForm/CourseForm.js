import React, { useCallback } from 'react'
import { Form, Image, } from 'semantic-ui-react';
import { useDropzone }from 'react-dropzone';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './CourseForm.form';
import { Course } from '../../../../api/';
import { useAuth } from '../../../../hooks'
import { ENV } from '../../../../Utils';
import './Course.Form.scss'

export function CourseForm(props) {

  const courseController = new Course();
  const { accessToken } = useAuth();
  const { onClose, onReload, course } = props;

  const formik = useFormik({
    initialValues: initialValues(course),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit:async (formValue) => {
      try {

        if(!course){

          await courseController.createCourse(accessToken, formValue);
        }else {
          await courseController.updateCourse(
            accessToken,
            course._id,
            formValue
          )
        }

        onReload();
        onClose();
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop,
  });

  const getMiniature = () =>{
    if(formik.values.file){
      return formik.values.miniature
    }else if(formik.values.miniature){
      return `${ENV.BASE_PATH}/${formik.values.miniature}`;
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
          
          {!course ? 'Crear Curso' : 'Actualizar Curso'}
        </Form.Button>

    </Form>
  )
}
