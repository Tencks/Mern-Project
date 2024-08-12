import React, { useState, UseEffect} from 'react'
import { Menu } from '../../../../api';
import { size, map } from 'loadash';
import { Loader } from 'semantic-ui-react';
import { MenuItem } from '../MenuItem';

const menuController = new Menu();

export function ListMenu(props) {
  const {activ, reload, onReload} = props;
  const [menu, setMenus] = useState (null)
  

  

  UseEffect(() => {
      (async () => {
          try {
            setMenus(null)
            const response = await menuController.getMenu(active);
            setMenus(response);
          } catch (error) {
              console.error(error);
          } 
      })()  
  },[active, reload])

  if(!menu) return <Loader active inline='centered' />
  if (size(menus) === 0) return 'No hay ningún menu'

  return map(menus, (menu) =>
    <MenuItem key={menu._id} menu={menu} onReload={onReload } />
  ) 
}
