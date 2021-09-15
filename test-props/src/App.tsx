import React from 'react';
import { useDispatch } from 'react-redux';
import FirstChild from './components/firstChild';
import {
  setName,
  setSomeBoolean,
  setSomeVariable,
} from './store/slices/testSlice';

function App() {
  // To pass some data from parent to child we pass it in props
  // In this example I am passing a prop called someData and another prop called anotherData. You can use any variable name you want

  const anotherData = 'Something from parent to child';

  // When we want to write to the redux store we 'dispatch an action to the store'
  // So we use the redux useDispatch method to do this
  const dispatch = useDispatch();

  const handleDispatchClick = () => {
    // Now instead of using props and adding them to child components, we can dispatch any action we want and that will store the data we want to the redux store
    // any child component that wants the data can read from the store without caring about props
    // The things about props is they tend to be tied to the parent-child dynamics, so if I want to share data between 2 components that are siblings, I will have to pass the data
    // from one child to the parent, and then parent to the other child.
    // With redux, one child writes to the store and the other child reads from that store

    // Be careful with the store as well because as the project grows bigger you may lose track of who is writing to the store

    dispatch(setName('Denzel'));
    dispatch(setSomeBoolean(true));
    dispatch(setSomeVariable('Random string'));

    // Let's read the store data from the thirdChild component
  };

  return (
    <div>
      <p>This is the parent</p>
      <button onClick={handleDispatchClick}>Dispatch action to store</button>
      <FirstChild someData='Hello' anotherData={anotherData} />
    </div>
  );
}

export default App;
