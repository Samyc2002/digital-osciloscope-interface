import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from "react-native-responsive-linechart";

import Colors from "../../ref/Colors";

const MonitorScreen = () => {
  const [data, setData] = React.useState([
    { x: -20, y: 15 },
    { x: -19, y: 10 },
    { x: -18, y: 12 },
    { x: -17, y: 7 },
    { x: -16, y: 6 },
    { x: -15, y: 8 },
    { x: -14, y: 10 },
    { x: -13, y: 8 },
    { x: -12, y: 12 },
    { x: -11, y: 14 },
    { x: -10, y: 12 },
    { x: -9, y: 13.5 },
    { x: -8, y: 18 },
    { x: -7, y: 12 },
    { x: -6, y: 14 },
    { x: -5, y: 12 },
    { x: -4, y: 13.5 },
    { x: -3, y: 18 },
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 1, y: 7 },
    { x: 2, y: 6 },
    { x: 3, y: 8 },
    { x: 4, y: 10 },
    { x: 5, y: 8 },
    { x: 6, y: 12 },
    { x: 7, y: 14 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 },
    { x: 11, y: 7 },
    { x: 12, y: 6 },
    { x: 13, y: 8 },
    { x: 14, y: 10 },
    { x: 15, y: 8 },
    { x: 16, y: 12 },
    { x: 17, y: 14 },
    { x: 18, y: 12 },
    { x: 19, y: 13.5 },
    { x: 20, y: 18 }
  ]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.Background
      }}
    >
      <ScrollView>
        <View style={{ marginTop: 60 }}>
          <Text
            style={{
              color: Colors.Text,
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: 30,
              letterSpacing: 0.05,
              marginLeft: 40
            }}
          >
            Welcome, Samy!
          </Text>
          <Text
            style={{
              color: Colors.Text,
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: 20,
              letterSpacing: 0.05,
              marginLeft: 40
            }}
          >
            Get a look at how your heart is working
          </Text>
        </View>
        {/* <ReactApexChart optons={options} series={series} type="area" height={350} /> */}
        <Chart
          style={{ height: 200, width: 400 }}
          data={data}
          padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
          xDomain={{ min: -20, max: 20 }}
          yDomain={{ min: 0, max: 20 }}
          viewport={{ size: { width: 10 } }}
        >
          <VerticalAxis
            tickValues={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
            tickCount={11}
            theme={{ labels: { formatter: (v) => v.toFixed(2) } }}
          />
          <HorizontalAxis tickCount={41} />
          <Area
            theme={{
              gradient: { from: { color: Colors.Theme }, to: { color: Colors.Theme, opacity: 0.4 } }
            }}
          />
          <Line
            theme={{
              stroke: { color: Colors.Theme, width: 5 },
              scatter: { default: { width: 4, height: 4, rx: 2 } }
            }}
          />
        </Chart>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MonitorScreen;
