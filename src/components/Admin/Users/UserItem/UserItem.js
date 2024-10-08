import React, {useState} from 'react';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react';
import './UserItem.scss';
import { image } from '../../../../assets';
import { ENV } from '../../../../Utils';
import { UserForm } from '../UserForm';
import { BasicModal } from '../../../Shared';
import { User } from '../../../../api';
import { useAuth } from '../../../../hooks'

export function UserItem(props){
    const { user, onReload } = props;
    const { accessToken }  = useAuth();


        console.log('UserItem props:', props);



    const [showModal, setShowModal] = useState(false )
    const [titleModal, setTitleModal] = useState('')

    const [showConfirm, setShowConfirm] = useState(false)
    const [confirmMessage, setConfirmMessage] = useState('')
    const [isDelete, setIsDelete] = useState(false)

    const userController = new User();


    const onOpenCloseModal = () => setShowModal((prevState) => !prevState)
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState)

    const openUpdateUser = () => {
        setTitleModal(`Actualizar ${user.email }`)
        onOpenCloseModal();
    };

    const onActivateDesactivate = async () => {
        try {
            await userController.updateUser( accessToken, user._id, {
                active: !user.active
            });
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

    const openDesativateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(user.active ? `Desactivar usuario ${user.email}` : `Activar usuario ${user.email}`);
        onOpenCloseConfirm();
    }

   

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Eliminar usuario ${user.email}`);
        onOpenCloseConfirm();
    }

    const onDelete = async () => {
        try {
            await userController.deleteUser(accessToken, user._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }
 
    return (
        <>
        
        <div className='user-item'>


            <div className='user-item_info'>
                <Image avatar src={user.avatar ?  `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar }/>
            </div>
            <p>{user.firstname} {user.lastname} </p>
            <p>{user.email}</p>
        </div>

        <div>
            <Button icon primary onClick = {openUpdateUser}>
                <Icon name='pencil'/>
            </Button>

            <Button icon color={user.active ? 'orange' : 'teal'} onClick={ openDesativateActivateConfirm }>
                <Icon name={user.active ? 'ban' : 'check'} />
            </Button>

            <Button icon color='red' onClick={openDeleteConfirm} >
                <Icon name='trash' />
            </Button>
        </div>

        <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal}>
            <UserForm close={onOpenCloseModal}
            onReload = {onReload}
            user ={user} />
        </BasicModal>
        

        <Confirm 
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete  : onActivateDesactivate}
        content={confirmMessage}
        size='mini'
        />
        </>
    )
}