import * as Yup from 'yup';

export function initialValues(){
    return{
        title:'',
        path:'',
        content:'',
        miniature:'',
        file:null,

    };
}

export function validationSchema() {
    return Yup.object({
        title: Yup.string().required(true),
        path: Yup.string().required(true),
        content: Yup.string().required(true),
        miniature: Yup.string().required(true),
    });
}

