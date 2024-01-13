/* eslint-disable react/prop-types */



function Button({
    handleClick, 
    children, 
    width , 
    height,
    backgroundColor,
    color,
    margin
}) {
  return (
    <button 
    style={{
        backgroundColor: backgroundColor ? backgroundColor : '#4763E4',
        color: color? color :'#FFF',
        width: width ? width : 320,
        height: height? height : 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        margin: margin ? margin : 0,
        cursor: 'pointer',
        fontWeight: 500,
        fontFamily:'inherit',
        border:'none',
        fontSize: 16,
      }}
    onClick={handleClick}>
        {children}
    </button>
  )
}

export default Button

