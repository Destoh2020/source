import React from 'react';
import SecondChild from './secondChild';

function FirstChild(props: any) {
  // To use the props frrom parent we access props and read the value we passed
  // We can also use something called object destructuring but I will show you this in secondChild
  const someData = props.someData;
  const anotherData = props.anotherData;

  // We can pass all props from parent to second child, we can also add other props from firstChild to secondChild
  return (
    <div>
      <p>This is the first child</p>
      <p>Some data from parent: {someData}</p>
      <p>Another data from parent: {anotherData}</p>
      <SecondChild
        {...props} // This is how to pass all props from parent to child
        firstChildData='Some value from first child to second child'
      />
    </div>
  );
}

export default FirstChild;
