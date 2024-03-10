import React from 'react'

const Container = ({children, classes}) => {
  return (
    <div className={`h-full max-w-[1240px] px-4 l:px-0 mx-auto p-0 ${classes}`}>{children}</div>
  )
}

export default Container