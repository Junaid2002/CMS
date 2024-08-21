import React from 'react'
import Allroutes from './component/Allroutes';
import { border } from '@chakra-ui/react';
const App = () => {
  return (
    <div Style={{border:'1px solid',width : '100%'}}
    >  
      <Allroutes/>
    </div>
);
}

export default App;