import React from 'react';
import { useSelector } from 'react-redux';
import { name, someBoolean, someVariable } from '../store/slices/testSlice';

function ThirdChild(props: any) {
  // If you dont pass any props this props value will remain empty, so that's why when we are not passing data we dont have to add props as an argument
  // In the login example from SMS i used props even though I did not pass props, this is because elements like Router will add props internally if you want to use them

  // I am using this child to test the store because it is not receiving any props from it's parents
  // You can test the other child components later

  // To read from store we use 'useSelector' and give the name of the state object that we want
  const nameFromStore = useSelector(name);
  const someVar = useSelector(someVariable);
  const someBool = useSelector(someBoolean);

  const handleReadStateClick = () => {
    console.log(nameFromStore);
    console.log(someVar);
    console.log(someBool);

    // If you are able to read this values from the console then the store works as expected
  };

  return (
    <div>
      <button onClick={handleReadStateClick}>
        Read state from redux store
      </button>
      <p>This is the third child</p>
    </div>
  );
}

export default ThirdChild;
