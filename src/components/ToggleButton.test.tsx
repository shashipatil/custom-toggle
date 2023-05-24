import React from 'react';
import { render, fireEvent} from '@testing-library/react-native';
import ToggleButton from './ToggleButton';

describe('ToggleButton', () => {
    it('renders correctly', () => {
      const { getByText, getByTestId } = render(<ToggleButton backgroundColor={"gray"} value={false} title="Toggle Button" />);
  
      // Check if the component is rendered
      expect(getByTestId('toggle-button')).toBeDefined();
  
      // Check if the title is rendered
      expect(getByText('Toggle Button')).toBeDefined();
  
      // Check if the initial state is correct
    const indicator = getByTestId('inner-indicator');
    const { style } = indicator.props;
    expect(style?.transform?.[0]?.translateX).toBe(-4);
    });
  
    it('toggles state on button press', () => {
      const { getByTestId } = render(<ToggleButton backgroundColor={"gray"} value={false} title="Toggle Button" />);
  
      const toggleButton = getByTestId('toggle-indicator');
      // Check the initial state
      const styles = toggleButton.props.style;

      expect(styles[3].backgroundColor).toBe('gray'); // Unchecked background color
      expect(styles[4].backgroundColor).toBe('gray'); // Checked background color
      expect(styles[4].alignItems).toBe('flex-start');
      expect(styles[4].paddingLeft).toBe(5);
      // Simulate button press
      fireEvent.press(toggleButton);
      
    });
  
    it('changes background color when checked', () => {
        const { getByTestId } = render(<ToggleButton value={false} title="Toggle Button" backgroundColor="red" />);
        const toggleButton = getByTestId('toggle-indicator');
        fireEvent.press(toggleButton);
        expect(toggleButton.props.style[4]?.backgroundColor).toBe('red');
      });

      it('changes background color when unchecked', () => {
        const { getByTestId } = render(<ToggleButton value={false} title="Toggle Button" backgroundColor="gray" />);
        const toggleButton = getByTestId('toggle-indicator');
        fireEvent.press(toggleButton);
        expect(toggleButton.props.style[4].backgroundColor).toBe('gray');

      });

      it('calls onChange callback and updates isChecked state when pressed', () => {
        const onChangeMock = jest.fn();
        const { getByTestId } = render(
          <ToggleButton
            value={false}
            title="Toggle Button"
            backgroundColor="red"
            onChange={onChangeMock}
          />
        );
        const toggleButton = getByTestId('toggle-button');
    
        fireEvent.press(toggleButton);
    
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith(true);
      });
      it('renders with the correct size class', () => {
        const { getByTestId } = render(
          <ToggleButton
            value={false}
            title="Toggle Button"
            backgroundColor="red"
            size="small"
          />
        );
        const toggleButton = getByTestId('toggle-indicator');
    
        expect(toggleButton.props.style[0]).toEqual(expect.objectContaining({ width: 50, height: 30, borderRadius: 15, justifyContent: 'center'}));
      });

      it('renders with the correct size class for default size', () => {
        const { getByTestId } = render(
          <ToggleButton
            value={false}
            title="Toggle Button"
            backgroundColor="red"
            size="default"
          />
        );
        const toggleButton = getByTestId('toggle-indicator');
    
        const style = toggleButton.props.style[0]; // Adjusted index for default size
        expect(style).toEqual(expect.objectContaining({ width: 50, height: 30 }));
      });
    
      it('renders with the correct size class for large size', () => {
        const { getByTestId } = render(
          <ToggleButton
            value={false}
            title="Toggle Button"
            backgroundColor="red"
            size="large"
          />
        );
        const toggleButton = getByTestId('toggle-indicator');
    
        const style = toggleButton.props.style[2]; // Adjusted index for large size
        expect(style).toEqual(expect.objectContaining({ width: 55, height: 30 }));
      });
    // Add more test cases as needed...
  });
  