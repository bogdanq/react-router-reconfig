import React from 'react'
import { Back } from '..'

export function Admin(props) {
  return (
    <div className="block">
      <Back />
      <h1>For admin</h1>
    </div>
  )
}

export function Manager() {
  return (
    <div className="block">
      <Back />
      <h1>For Manager</h1>
    </div>
  )
}
