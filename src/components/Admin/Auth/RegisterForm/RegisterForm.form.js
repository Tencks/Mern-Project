import * as Yup from 'yup'

export function initialValues() {
    return{
        firstname:'',
        email:"",
        password:'',
        repeatPassword:'',
        conditionsAcepted:false,        
    }
}

export function validationSchema(){
    return Yup.object ({
        firstname: Yup.string().required('Campo obligatorio'),
        email: Yup.string().email('El email no es válido'),
        password: Yup.string()
        .required('Campo obligatorio'),
        repeatPassword: Yup.string()
        .required('Campo obligatorio')
        .oneOf([Yup.ref('password')], 'Las contraseñas deben ser idénticas'),
        conditionsAcepted: Yup.bool().isTrue(true),
    })
}