import React, { useState, FC, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Platform, TouchableHighlight, Animated, StyleSheet } from 'react-native';

interface ToggleButtonProps {
  autoFocus?: boolean;
  checked?: boolean;
  checkedChildren?: React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: 'small' | 'default' | 'large';
  unCheckedChildren?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  onClick?: () => void;
  value: boolean;
  title: string;
  backgroundColor: any;
}

const ToggleButton: FC<ToggleButtonProps> = ({
  autoFocus,
  checked,
  checkedChildren,
  defaultChecked,
  disabled,
  size = 'default',
  unCheckedChildren,
  onChange,
  value,
  title,
  backgroundColor,
}) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || value);
  const animationValue = useRef<Animated.Value>(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: value ? 1 : 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateXValue = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-4, -1],
  });

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const isWeb = Platform.OS === 'web';
  const ToggleComponent: any = isWeb ? TouchableOpacity : TouchableOpacity;

  const accessibilityLabel = isChecked ? checkedChildren : unCheckedChildren;
  const accessibilityHint = isChecked ? 'Double tap to turn off' : 'Double tap to turn on';

  return (
      <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
    <ToggleComponent
    testID="toggle-button" 
      disabled={disabled}
      style={[
        styles.container,
        disabled && styles.disabled,
        size === 'small' && styles.smallContainer,
        size === 'large' && styles.largeContainer,
      ]}
      onPress={handleToggle}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked }}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
        
        <View
          testID="toggle-indicator"
          style={[
            styles.indicator,
            size === 'small' && styles.smallIndicator,
            size === 'large' && styles.largeIndicator,
            { backgroundColor },
            {
              backgroundColor: isChecked ? backgroundColor : 'gray',
              alignItems: isChecked ? 'flex-end' : 'flex-start',
              paddingLeft: isChecked ? 35 : 5,
            },
          ]}
        >
          <Animated.View
            testID="inner-indicator"
            style={[
              styles.innerIndicator,
              size === 'small' && styles.smallInnerIndicator,
              size === 'large' && styles.largeInnerIndicator,
              {
                transform: [{ translateX: translateXValue }],
              },
            ]}
          />
        </View>
    </ToggleComponent>
    </View>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallContainer: {
    width: 40,
    height: 24,
  },
  largeContainer: {
    width: 60,
    height: 36,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginRight: 10,
    textAlign: 'center',
  },
  indicator: {
    width: 50,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
  },
  smallIndicator: {
    width: 40,
    height: 20,
  },
  largeIndicator: {
    width: 55,
    height: 30,
  },
  innerIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  smallInnerIndicator: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  largeInnerIndicator: {
    width: 22,
    height: 22,
    borderRadius: 22,
    backgroundColor: 'white'
  },
  disabled: {
    opacity: 0.5,
  },
});
