import React from 'react'
import { Container } from 'semantic-ui-react'
import './Banner.scss'

export function Banner() {
  return (
    <div className='banner'>
        <Container>
            <h1>Aprende Sobre los Mejores <br /> Animes y Manwhuas </h1>
            <h2> A través de las mejores webs consumibles</h2>
        </Container>

        <div className='banner__dark'></div>
    </div>
  )
}
