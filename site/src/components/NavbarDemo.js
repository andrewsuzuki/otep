import React from 'react'

import {
  Container,
  Navbar,
  NavbarItem,
  NavbarLink,
  AtLeft,
  AtRight,
  AtCenter,
  utils,
} from '../../../dist'


export default function NavbarDemo() {
  return (
    <Container fluid>
      {[false, true].map((bold) =>
        utils.validBrandsOrDefaultOrLightOrDark.map((brand) =>
          <Navbar key={`${brand}${bold ? 'bold' : 'notbold'}`} brand={brand} bold={bold}>
            <AtLeft>
              <NavbarItem>Hallo</NavbarItem>
              <NavbarItem>Hallo</NavbarItem>
              <NavbarItem>Hallo</NavbarItem>
            </AtLeft>
            <AtCenter>
              {brand}
            </AtCenter>
            <AtRight>
              <NavbarLink href="#">Hallo</NavbarLink>
              <NavbarLink tab href="#">Hallo</NavbarLink>
            </AtRight>
          </Navbar>,
        ))}
    </Container>
  )
}
