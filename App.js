import React from 'react';
import {Animated, Dimensions, Image, StyleSheet, Text, View} from 'react-native';


const {width, height} = Dimensions.get('screen');
const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
    {
        "key": "3571572",
        "title": "Multi-lateral intermediate moratorium",
        "description": "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
        "image": "https://image.flaticon.com/icons/png/256/3571/3571572.png"
    },
    {
        "key": "3571747",
        "title": "Automated radical data-warehouse",
        "description": "Use the optical SAS system, then you can navigate the auxiliary alarm!",
        "image": "https://image.flaticon.com/icons/png/256/3571/3571747.png"
    },
    {
        "key": "3571680",
        "title": "Inverse attitude-oriented system engine",
        "description": "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
        "image": "https://image.flaticon.com/icons/png/256/3571/3571680.png"
    },
    {
        "key": "3571603",
        "title": "Monitored global data-warehouse",
        "description": "We need to program the open-source IB interface!",
        "image": "https://image.flaticon.com/icons/png/256/3571/3571603.png"
    }
]

const Indicator = ({scrollX}) => {
  return (
      <View style={{position:'absolute', bottom: 75, flexDirection: 'row'}}>
        {
          DATA.map((_, i) => {
            const inputRange =[(i-1)*width, i*width, (i+1)*width];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [0.65, 1.1, 0.65],
              extrapolate: 'clamp'
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.6, 0.9,0.6],
              extrapolate: 'clamp'
            });
            return (
                <Animated.View key={`indicator-${i}`} style={[styles.indicator, {
                  opacity,
                  transform: [
                    {
                      scale,
                    }
                  ]
                }]}/>
            )
          })
        }
      </View>
  )
}

const Background= ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, index)=> index * width),
    outputRange: bgs.map((bg)=> bg),
  })
  return (
      <Animated.View style={[
          StyleSheet.absoluteFillObject,
        {backgroundColor}]}
      />
  )
}

const Square = ({scrollX}) => {
    const YOLO = Animated.modulo(Animated.divide(
        Animated.modulo(scrollX, width),
        new Animated.Value(width)
    ),1);

    const rotate = YOLO.interpolate({
        inputRange: [0,.5,1],
        outputRange: ['35deg', '0deg', '35deg']
    });
    const translateX = YOLO.interpolate({
        inputRange: [0,.5,1],
        outputRange: [0, -height, 0]
    })
    return (
        <Animated.View
        style={{
            width: height,
            height: height+100,
            backgroundColor: '#fff',
            borderRadius: 86,
            position: 'absolute',
            bottom: height * 0.55,
            left: -height *0.3,
            transform: [
                {
                    rotate: rotate
                },
                {
                    translateX,
                }
            ]

        }}
        >

        </Animated.View>
    )
}

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
      <View style={styles.container}>
        <Background scrollX={scrollX}/>
        <Square scrollX={scrollX} />
        <Animated.FlatList
            data={DATA}
            horizontal
            scrollEventThrottle={32}
            pagingEnabled
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false}
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
            keyExtractor={item => item.key}
            renderItem={({item}) => {
              return (
                  <View style={styles.content}>
                    <View style={{flex: 0.6, justifyContent: 'center', padding: 20}}>
                      <Image
                          source={{uri: item?.image}}
                          style={{
                            width: width / 2, height: width / 2
                          }}
                      />
                    </View>
                    <View style={{flex: 0.4}}>
                      <Text style={styles.title}>{item.title}</Text>
                      <Text style={styles.description}>{item.description}</Text>
                    </View>
                  </View>
              )
            }}
        />
        <Indicator scrollX={scrollX}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    marginHorizontal: 20
  },
  description: {
    fontWeight: '500',
    color: '#fff',
    marginHorizontal: 20
  },
  indicator:{
    height:10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5
  }
});
