import React from 'react'

const Header = ({title}) => {
  const headerstyle ={
    
      backgroundColor: 'mediumblue',
      color:'#fff'
    
  };
  return (
    <header style={headerstyle}>
      {title}
    </header>
  )
}
Header.defaultProps = {
    title:"Default Title"
}

export default Header