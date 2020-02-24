import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { keyframes } from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Wrapper } from '../atoms/wrapper'
import { Template } from '../template/main'

export const Transition = withRouter(
  ({ animationName, location, children }) => {
    return (
      <Wrapper animationName={animationName}>
        <TransitionGroup className="transition-group_page-wrapper">
          <CSSTransition
            key={location.key}
            timeout={500}
            classNames="transition-group_animate"
            unmountOnExit
          >
            <Template>{children}</Template>
          </CSSTransition>
        </TransitionGroup>
      </Wrapper>
    )
  }
)

export const scaleIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5)
  }
  50% {
    opacity: 1;
    transform: scale(1)
  }
  80% {
    opacity: 1;
    transform: scale(0.8)
  }
  100% {
    opacity: 1;
    transform: scale(1)
  }
`

export const translateIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100px)
  }
  100% {
    opacity: 1;
    transform: translateX(0)
  }
`
