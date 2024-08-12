import React, {useState} from 'react';
import { Tab, Button } from 'semantic-ui-react';
import './Users.scss';

import {BasicModal} from '../../../components/Shared'
import { UserForm, ListUsers } from '../../../components/Admin/Users';

export function Users() {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState)

  

  const panes = [
    {
      menuItem:'Usuario Activos',
      render: () =>(
        <Tab.Pane attached ={false}>
          <ListUsers usersActive={true} />
        </Tab.Pane>
      ),
    },
    {
      menuItem:'Usuario Inactivos',
      render: () => (
        <Tab.Pane attached ={false}>
        <ListUsers usersActive={false} />
       </Tab.Pane>
      ),
    },
  ]
  return (
    <>
    
    <div className='users-page'>
    <Button 
    className='users-page__add' 
    primary 
    onClick={onOpenCloseModal}
    >
    Nuevo Usuario
    </Button>

    <Tab menu={{secondary: true}} panes={panes} />
    </div>

    <BasicModal show= {showModal} close={onOpenCloseModal} title='Crear Nuevo Usuario'>
      <UserForm close ={onOpenCloseModal}/>
    </BasicModal>
    
    </>
  )
}
