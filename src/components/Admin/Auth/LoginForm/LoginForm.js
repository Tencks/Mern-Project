import React from 'react';
import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { Auth } from '../../../../api';
import { initialValues, validationSchema } from './LoginForm.form';
import { useAuth } from '../../../../hooks';

const authController = new Auth();

export function LoginForm() {
    const {login} = useAuth();
    const Formik = useFormik({
        initialValues:initialValues,
        validationSchema:validationSchema,
        validateOnChange:false,
        onSubmit: async(formValue)=>{
            try{
                const response = await authController.login(formValue);

                
                authController.setAccessToken(response.access)
                authController.setRefreshToken(response.refresh)
                
                login(response.access);
                console.log(response);
                
            }catch{ 
                console.error()
            }
        }
    })
  return (
    <div>
        <h1>Iniciar Sesion Nyaa~~</h1>
        <Form onSubmit={Formik.handleSubmit}>
        <Form.Input 
        name ='email'
        placeholder='Correo Electrónico'
        onChange={Formik.handleChange}
        value={Formik.values.email}
        error={Formik.errors.email}
        />
        <Form.Input 
        name ='password'
        type='password'
        placeholder='Contraseña'
        onChange={Formik.handleChange}
        value={Formik.values.password}
        error={Formik.errors.password}
        />
        <Form.Button type='submit' primary fluid loading={Formik.isSubmitting}>
            Entrar
        </Form.Button>
        </Form>

    </div>
  )
}
