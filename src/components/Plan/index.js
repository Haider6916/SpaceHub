import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../config/theme';
import { Text } from '..';

const Plan = ({ options, onSelectOption, selectedOptionId }) => {
  const colors = useTheme();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedOptionId) {
      const option = options.find((option) => option._id === selectedOptionId);
      setSelectedOption(option);
    }
  }, [selectedOptionId, options]);

  const handleOptionSelect = (option) => {
    onSelectOption(option._id);
    setSelectedOption(option);
  };

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option._id}
          onPress={() => handleOptionSelect(option)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: colors.appPrimary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedOption?._id === option._id && (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: colors.appPrimary,
                }}
              />
            )}
          </View>
          <View style={{ marginLeft: 26 }}>
            <Text regular heading2 blackColor>
              {option.title}
            </Text>
            <View style={{ marginTop: 4 }}>
              {option.meetingRoomHours && (
                <Text regular body1 secondaryColor style={{ lineHeight: 21 }}>
                  {`meeting room hours: ${option.meetingRoomHours} hour`}
                </Text>
              )}
              {option.duration && (
                <Text regular body1 secondaryColor style={{ lineHeight: 21 }}>
                  {`duration: ${option.duration} months`}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Plan;
