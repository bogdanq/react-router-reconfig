import React from 'react'
import styled from 'styled-components'
import { Menu } from '../organisms/menu'

export const Template = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`

export const MainTemplate = ({ children }) => {
  return (
    <Row>
      <SideBar>
        <Menu />
      </SideBar>
      <ContentWrapper>{children}</ContentWrapper>
    </Row>
  )
}

const SideBar = styled.div`
  width: 40%;
  background-color: #e74c3c;
  height: 100vh;
  color: #fff;
  text-align: center;
  margin-right: 25px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`

const ContentWrapper = styled.div`
  width: 70%;
`
