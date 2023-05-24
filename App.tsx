import React, { useState } from 'react';
import { View} from 'react-native';
import ToggleButton from './src/components/toggleButton';

const App: React.FC = () => {
  const [toggleValue, setToggleValue] = useState(false);

  const handleToggleChange = (value: boolean) => {
    setToggleValue(value);
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
      <ToggleButton
        onChange={handleToggleChange}
        value={toggleValue}
        title="Toggle Button"
        size='large'
        autoFocus
        defaultChecked
        backgroundColor={"red"}
      />
    </View>
  );
};

export default App;
