import React from 'react'
import { Grid, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './Menu.scss'

export function Menu() {
  return (
    <div className='footer-menu'>
        <h4>Navegación</h4>

        <Grid columns={2}>
            <Grid.Column>
                <Link to='#'>
                    <Icon name='book'/> Cursos Online
                </Link>

                <Link to='#'>
                    <Icon name='code'/> Desarrollo Web
                </Link>

                <Link to='#'>
                    <Icon name='database'/> Base de datos
                </Link>

                <Link to='#'>
                    <Icon name='code'/> UI/UX
                </Link>
            </Grid.Column>

            <Grid.Column>
            <Link to='#'>
                    <Icon name='server'/> Sistemas / Servers
                </Link>

                <Link to='#'>
                    <Icon name='cogs'/> CMS
                </Link>

                <Link to='#'>
                    <Icon name='database'/> Base de datos
                </Link>

                <Link to='#'>
                    <Icon name='python'/> Backend
                </Link>
            </Grid.Column>
            
        </Grid>
    </div>
  )
}
