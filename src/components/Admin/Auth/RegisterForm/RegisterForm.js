import React ,{useState} from 'react';
import { Form } from 'semantic-ui-react';
import {useFormik} from 'formik';
import { Auth } from '../../../../api';
import {initialValues, validationSchema} from './RegisterForm.form';
import './RegisterForm.scss';

const authController = new Auth();

export function RegisterForm(props) {
    const { openLogin } = props;
    const [error, setError]  = useState('');

    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema:validationSchema(),
        validateOnChange:false,
        onSubmit: async (formValue) =>{
            try{
                setError('');
                await authController.register(formValue);
                console.log(formValue);
                openLogin();
            } catch(error){
                console.error(error)
                setError('Error en el servidor')
            }
        } 
    })

  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
        <h2>RegisterForm Nyaa~~</h2>
        <Form.Input name='firstname' 
        placeholder='Nombre de usuario'  
        onChange={formik.handleChange} 
        value={formik.values.firstname} 
        error={formik.errors.firstname}
        />
        <Form.Input name='email' type='email'
        placeholder='Correo Electrónico'  
        onChange={formik.handleChange} 
        value={formik.values.email} 
        error={formik.errors.email}
        />
        <Form.Input 
        name='password' type='password' 
        placeholder='Contraseña'  
        onChange={formik.handleChange} 
        value={formik.values.password}
        error={formik.errors.password}
        />
        <Form.Input 
        name='repeatPassword' type='password' 
        placeholder='Repetir la Contraseña'  
        onChange={formik.handleChange} 
        value={formik.values.repeatPassword} 
        error={formik.errors.repeatPassword}
        />
        <Form.Checkbox 
        name='conditionsAcepted' 
        label='He leído y aeptado las políticas de privacidad'  
        onChange={(_,data) => formik.setFieldValue('conditionsAcepted', data.checked)} 
        value={formik.values.conditionsAcepted} 
        error={formik.errors.conditionsAcepted}
        />
        
        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
            Crear Cuenta
        </Form.Button>    

        <p className='register-form__error'>{error}</p>
    </Form>
  )
}
