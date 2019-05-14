import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    StatusBar,
    ScrollView,
    View,
    DeviceEventEmitter,
    FlatList,
    ActivityIndicator,
    TouchableWithoutFeedback
} from 'react-native';

type Props = {};
export default class Home extends Component<Props> {
    static navigationOptions = {
        header: null,
        drawerLockMode: 'locked-closed'
    };
    constructor(props) {
        super(props);
        this.state = {
            photoPermission: '',
            songs: [], 
            loaded: true,
            loading: false,
            new_Press: false
        };
      }
    render() {   
        return (
            <View style={{flex: 1, backgroundColor: '#DDDBC7', 
            flexDirection: 'column', }}>
            <ScrollView contentContainerstyle={{
                            flexGrow: 1,
                            }} 
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        automaticallyAdjustContentInsets={false}
                                        directionalLockEnabled={true}
                                        bounces={false}
                                        scrollsToTop={false}>
            <Image resizeMode="contain"
        style={{width: 121, height: 345,alignSelf: 'center',
        marginTop: 56+StatusBar.currentHeight}}
        source={require('../bulb.png')}/>
           <View style={{width: 50, height: 29, 
           position: 'absolute',marginTop: 48+StatusBar.currentHeight,
           marginLeft: 28 }}>
           <Text style={{fontFamily: 'zsBold', 
           fontSize: 15, color: 'black'}}>
           Zen{'\n'}note</Text>
           </View>
           <View style={{position: 'absolute', width: 17,right: 0,
           height: 17, marginTop: 54+StatusBar.currentHeight,
           marginRight: 28}}>
           <Image resizeMode="contain"
        style={{width: 17, height: 17,}}
        source={require('../searchz.png')}/>
           </View>
           <Text style={{fontFamily: 'zsSemiBold',marginLeft: 12, 
           fontSize: 9, color: 'black', transform: [{ rotate: '-90deg'}],
           position: 'absolute', marginTop: (Dimensions.get('window').height)*(42.6/100)+StatusBar.currentHeight,}}>
           Be Minimalist</Text>
           <View style={{width: 2, height: 15, marginTop: (Dimensions.get('window').height)*(45/100)+StatusBar.currentHeight,
           backgroundColor: 'black', right: 0,marginRight: 31, position: 'absolute' }}>
           </View>
           <TouchableWithoutFeedback onPressIn={()=>this.setState({new_Press: true})}
           onPressOut={()=> this.setState({new_Press: false})}
           onPress={()=> this.props.navigation.navigate('NewNote',)}>
            <View style={ this.state.new_Press? styles.new_Press: styles.old_Press}>
           <Text style={this.state.new_Press? styles.textNew: styles.textOld}>
           New Note</Text>
           </View>
           </TouchableWithoutFeedback> 
           <Text style={{fontFamily: 'zsSemiBold', marginTop: '5%',
           fontSize: 18, color: 'rgba(51, 51, 51, 0.4)', alignSelf: 'center'}}>
           or</Text>
           <Text style={{fontFamily: 'zsSemiBold', marginTop: '5%',
           fontSize: 18, color: 'black', alignSelf: 'center'}}>
           Browse Notes</Text>
           </ScrollView>
           </View>
        );
    }
}
// https://join.slack.com/t/comptware/shared_invite/enQtNTk2ODg2MDkxNzUwLTZhOTU5NTYyMWYwZjg2Y2FmODNmMDAwYzJkOTFjMWUzOTJhOGZmZjdkZmJjNDVkZDUxMGFiNGE2NDA4OTM4NjQ
const styles = StyleSheet.create({
  new_Press: {
    width: 151, height: 43, 
    backgroundColor: 'black', marginTop: (Dimensions.get('window').height)*(8/100)+StatusBar.currentHeight, alignSelf: 'center',
     justifyContent: 'center',
  },
  old_Press: {
    width: 151, height: 43, borderWidth: 2, borderColor: 'black',
    backgroundColor: 'transparent', 
    marginTop: (Dimensions.get('window').height)*(8/100)+StatusBar.currentHeight, alignSelf: 'center',
     justifyContent: 'center', flexGrow: 1
  },
  textNew: {
    fontFamily: 'zsSemiBold', 
           fontSize: 18, color: '#DDDBC7', textAlign: 'center',
  },
  textOld:{
    fontFamily: 'zsSemiBold', 
    fontSize: 18, color: 'black', textAlign: 'center',
  }
});
