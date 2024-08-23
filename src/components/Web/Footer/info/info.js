import React from 'react'
import { Button } from 'semantic-ui-react'
import { map } from 'lodash'
import { Icon } from '../../../../assets'
import { socialData } from '../../../../Utils'
import './info.scss'



export function info() {
  return (
    <div className='footer-info'>
        <Icon.LogoWhite className='logo' />
        <p>
            Vivan las lolis, son lo mejor de lo mejor que existe en lo mejor de la vida, Loli's on Fire! 🥵🥵🥵🥵🥵.
        </p>

        {map(socialData,(social =>(
                    <Button key={social.type}
                    as='a'
                    target='_blank'
                    href={social.link}
                    color={social.type}
                    icon={social.type}
                    />

                    
                )))}
    </div>
  )
}
