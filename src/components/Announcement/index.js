//import liraries
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from '..';
import { useTheme } from '../../config/theme';
// create a component
const Announcement = ({
Title,
Description,
tag,
date,
}) => {
    const colors = useTheme();
    return (
        <View style={{flexDirection: 'row',marginBottom:24}}>
        <View
          style={{
            height: 154,
            flex: 0.28,
            justifyContent: 'center',
            borderRightWidth: 1,
            borderRightColor: colors.textGreyDark,
          }}>
          <Text netural regular body1 style={{lineHeight:28}} >{`Today`}</Text>
          <Text netural regular body2 style={{lineHeight:28}} >{date}</Text>
          <Text netural regular body2 style={{lineHeight:28}}>{`24h ago`}</Text>
        </View>
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <Text regular blackColor title3 numberOfLines={1}>{Title}</Text>
          {/* <View
            style={{
              width: 46,
              height: 28,
              borderRadius: 40,
              backgroundColor: colors.textGreyDark,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 4,
              marginBottom: 8,
              paddingHorizontal:5
            }}>
            <Text
              regular
              body1
              netural
              style={{lineHeight: 28}}>
              {tag}
            </Text>
          </View> */}
           {/* <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 4,
            marginBottom: 8,
            paddingHorizontal: 5,
            
          }}
        >
          {tag.slice(0, 5).map((tagItem, index) => (
            <View
              key={index}
              style={{
                borderRadius: 40,
                backgroundColor: colors.textGreyDark,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginRight: 5,
                marginBottom: 5,
              }}
            >
              <Text regular body1 netural style={{ lineHeight: 28 }} numberOfLines={1}>
              {tagItem.slice(0, 5)}
              </Text>
            </View>
          ))}
        </View> */}
               <View
          horizontal
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 4,
            marginBottom: 8,
            paddingHorizontal: 5,
          }}
        >
          {tag.slice(0, 3).map((tagItem, index) => (
            <View
              key={index}
              style={{
                borderRadius: 40,
                backgroundColor: colors.textGreyDark,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginRight: 5,
                marginBottom: 5,
              }}
            >
              <Text
                regular
                body1
                netural
                style={{ lineHeight: 28 }}
                numberOfLines={1}
              >
                {tagItem.slice(0, 5)}
              </Text>
            </View>
          ))}
        </View>
          <View>
            <Text regular body1 style={{lineHeight: 28}} numberOfLines={3}>
              {Description}
            </Text>
          </View>
        </View>
      </View> 
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default Announcement;
