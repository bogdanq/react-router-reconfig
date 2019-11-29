import React from 'react'
import { Back } from '..'
import { Link } from 'react-router-dom'

export function PostList(props) {
  console.log('update: PostList')

  return (
    <div>
      <h1>Post</h1>
      <Back />
      {/* required renderNestedRoute */}
      {props.renderNestedRoute()}
    </div>
  )
}

const list = [
  { id: 1, text: 'some post 1' },
  { id: 2, text: 'some post 2' },
  { id: 3, text: 'some post 3' }
]

export function Posts() {
  return (
    <div className="block">
      <h1>Posts user</h1>
      <hr />
      <Link to="/posts/create">Create post (auth rule)</Link>
      <hr />
      {list.map(item => (
        <div key={item.id}>
          <h3 key={item.id}>{item.text}</h3>
          <Link to={`/posts/update/${item.id}`}>
            Update (Manager/Admin rule)
          </Link>
        </div>
      ))}
    </div>
  )
}

export function PostCreate() {
  return (
    <div className="block">
      <h1>PostCreate user</h1>
    </div>
  )
}

export function PostUpdate({ postId }) {
  return (
    <div className="block">
      <h1>PostUpdate {postId}</h1>
    </div>
  )
}
