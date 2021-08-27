import React from 'react';
import FirstChild from './components/firstChild';

function App() {
  // To pass some data from parent to child we pass it in props
  // In this example I am passing a prop called someData and another prop called anotherData. You can use any variable name you want

  const anotherData = 'Something from parent to child';

  return (
    <div>
      <p>This is the parent</p>
      <FirstChild someData='Hello' anotherData={anotherData} />
    </div>
  );
}

export default App;
