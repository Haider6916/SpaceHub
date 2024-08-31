import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '..';

const Barchart = () => {
  const [selectedBarIndex, setSelectedBarIndex] = useState(-1);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const data = [
    {label: '1 PM', value: 100},
    {label: '2 PM', value: 50},
    {label: '3 PM', value: 30},
    {label: '4 PM', value: 70},
    {label: '5 PM', value: 100},
    {label: '6 PM', value: 0},
  ];

  const maxHeight = data.reduce((max, item) => Math.max(max, item.value), 0); // get the maximum value in the data

  const handleBarPress = index => {
    setSelectedBarIndex(index);
    setIsPopoverVisible(true);
  };

  const handlePopoverClose = () => {
    setSelectedBarIndex(-1);
    setIsPopoverVisible(false);
  };

  return (
    <View style={[styles.container, {height: 200}]}>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <TouchableOpacity
            style={styles.barContainer}
            onPress={() => handleBarPress(index)}>
            <View
              style={[
                styles.bar,
                index === selectedBarIndex && styles.selectedBarContainer,
                {height: (item.value / maxHeight) * 200},
              ]}
            />
            <View style={[styles.detailBoxContainer]}>
              {selectedBarIndex === index && isPopoverVisible && (
                <View
                  style={[
                    styles.popover,
                    selectedBarIndex === 0
                      ? {top: item.value / maxHeight, left: -10, zIndex: 10}
                      : {top: item.value / maxHeight, zIndex: 10},
                    item.value === 0
                      ? {top: item.value / maxHeight - 50, left: 0, zIndex: 10}
                      : {top: item.value / maxHeight, zIndex: 10},
                  ]}>
                  <Text style={styles.popoverText}>{item.label} </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        width: 7,
                        height: 7,
                        backgroundColor: 'rgba(141, 85, 162, 1)',
                        borderRadius: 4,
                        marginRight: 5,
                        marginTop: 7,
                      }}></View>
                    <Text style={styles.popoverText}>{item.value}</Text>
                  </View>
                  {/* <TouchableOpacity style={styles.closeButton} onPress={handlePopoverClose}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity> */}
                </View>
              )}
            </View>
            <View
              style={{position: 'absolute', bottom: -20, marginVertical: -5}}>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          </TouchableOpacity>
          {index < data.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default Barchart;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  selectedBarContainer: {
    backgroundColor: 'rgba(141, 85, 162, 1)',
  },
  bar: {
    width: 28,
    borderRadius: 4,
    backgroundColor: 'rgba(213, 191, 222, 1)',
    marginBottom: 5,
  },
  detailBoxContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  popover: {
    position: 'absolute',
    left: -40,
    width: 70,
    height: 60,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingTop: 8,
    paddingLeft: 14,
  },
  popoverText: {
    color: '#ffffff',
    fontSize: 12,
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '700',
  },
  closeButton: {
    position: 'absolute',
    bottom: -15,
    backgroundColor: 'rgba(141, 85, 162, 1)',
    borderRadius: 4,
    padding: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    color: '#7D7B7C',
    textAlign: 'center',
    lineHeight: 21,
    fontSize: 14,
    fontWeight: '400',
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
    height: 200,
  },
});
