import React from 'react';

function ThirdChild(props: any) {
  // If you dont pass any props this props value will remain empty, so that's why when we are not passing data we dont have to add props as an argument
  // In the login example from SMS i used props even though I did not pass props, this is because elements like Router will add props internally if you want to use them
  return (
    <div>
      <p>This is the third child</p>
    </div>
  );
}

export default ThirdChild;
