import React from 'react';
import ThirdChild from './thirdChild';

function SecondChild(props: any) {
  // Let's use object destructuring here to access data from props
  // Instead of doing props.someData, props.anotherData etc you can use this way to get the variables
  const { someData, anotherData, firstChildData } = props;

  // For the third child I dont want to pass props, so I will leave it that way

  return (
    <div>
      <p>This is the second child</p>
      <p>Some data from parent in the second child: {someData}</p>
      <p>Another data from parent in the second child: {anotherData}</p>
      <p>Data from first child: {firstChildData}</p>
      <ThirdChild />
    </div>
  );
}

export default SecondChild;
