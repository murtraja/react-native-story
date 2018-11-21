import React, { Component } from 'react';
import { View, Button, Text, Image } from 'react-native';
import Svg,{
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image as SVGImage,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

function offsetDegree(n) {
  if(n === 1) {
    return 0;
  }
  const degree = (49-2*n)/9
  return degree
}

const cx = 53;
const cy = 53;
const radius = 50;

const N = 8;
data=Array.from(new Array(N),(val,index)=>index);

const imageSize = 80;
const origin = 53 - imageSize/2;

class StoryCircle extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Svg height={300} width={300} viewBox="0 0 106 106">
      <Defs>
      <ClipPath id="clip">
            <Circle cx="50%" cy="50%" r="40%"/>
        </ClipPath>
      </Defs>
      <G>
      {Array.from({length: this.props.size}, (item, index) => {

        const size = this.props.size;
        const stepDegree = 360/size;
        // const offsetDegree = size == 1 ? 0 : 5
        const startDegree = index * stepDegree + offsetDegree(size);
        const endDegree = (index+1)*stepDegree - offsetDegree(size);
        const color = index < this.props.read ? 'grey' : 'blue';
        return (
        <Path
        key={index} 
        d={describeArc(cx,cy,radius, startDegree, endDegree)}
        fill="none"
        stroke={color}
        strokeWidth={3}
        />);
        } 
        )}
        </G>
        <SVGImage x={origin} y={origin} height={imageSize} width={imageSize} href={require('./square.jpeg')}        clipPath="url(#clip)"/>
        </Svg>
    );
  }
}

export default class Test extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      size: 5
    }
    console.log(data);
  }
  render() {
    return (
      <View style={{flex: 1, borderWidth: 1, borderColor: 'red'}}>
        <View style={{flex:0.5, borderWidth: 1, borderColor: 'purple'}}>
          <Button onPress={() => this.setState((ps)=>({size:ps.size+1}))} title={'Increase'}/>
          <Image style={{height: 300, width: 300}} source={require('./square.jpeg')}/>
        </View>

        <View style={{flex:0.5, borderWidth: 1, borderColor: 'yellow'}}>
          <View style={{padding: 7, borderWidth: 1}}>
            <StoryCircle size={this.state.size} read={1}/>
          </View>
            <Text>Hi</Text>
        </View>
        
      </View>
      );
    }
  }