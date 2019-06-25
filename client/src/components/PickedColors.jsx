import React from 'react';

let PickedColors = (props) => {
  const containerStyle = {
    display: 'flex'
  };

  let colorBlocks = props.colors.map((color, index) => {
    return (<div key={index} className='colorBlock' style={{backgroundColor:color}} onClick={() => {props.handleClick(color)}}></div>);
  });
  return (
    <div style={containerStyle}>
      {colorBlocks}
    </div>
  );
};

export default PickedColors;