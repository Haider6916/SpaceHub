import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';

const Carousel = ({ data, timeoutDuration }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < data.length - 1) {
        carouselRef.current.scrollToIndex({ index: currentIndex + 1 });
        setCurrentIndex(currentIndex + 1);
      } else {
        carouselRef.current.scrollToIndex({ index: 0 });
        setCurrentIndex(0);
      }
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleSlide = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const newIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(newIndex);
  };

  const renderDot = ({ item, index }) => (
    <View
      style={[
        styles.dot,
        index === currentIndex ? styles.activeDot : null,
      ]}
      key={item.id}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={carouselRef}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.color }]} />
        )}
        onScroll={handleSlide}
        scrollEventThrottle={16}
      />
      <View style={styles.dotContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderDot}
        />
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.6,
    borderRadius: 8,
    marginHorizontal: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#333',
  },
});

export default Carousel;
