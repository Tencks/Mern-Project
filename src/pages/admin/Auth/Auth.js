import React, {useState} from 'react';
import {Icon} from '../../../assets';
import { Tab } from 'semantic-ui-react';
import {LoginForm, RegisterForm} from '../../../components/Admin/Auth';
import './Auth.scss';


export function Auth() {
    const [activeIndex, setActiveIndex] = useState(0);

    const openLogin = ()=> setActiveIndex(0);


  const panes = [
    {
      menuItem: 'Entrar',
      render: () => (
        <Tab.Pane>
          <LoginForm/>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Nuevo Usuario',
      render: () => (
        <Tab.Pane>
          <RegisterForm openLogin={openLogin} />
        </Tab.Pane>
      )
    }
  ];



  return (
    <div className='auth'>
      <Icon.LogoWhite className='logo'/>
        <h1>Formulario de login </h1>

        <Tab panes={panes} className='auth__forms' activeIndex={activeIndex} onTabChange={(_,data)=> setActiveIndex(data.activeIndex)}></Tab>
    </div>
  )
}
