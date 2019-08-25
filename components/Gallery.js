import React, { Component } from "react";
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
  TouchableWithoutFeedback,
  TextInput,
  CameraRoll,
} from "react-native";

type Props = {};
const height = Math.round(Dimensions.get('window').height) * (13/100);
export default class Gallery extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      lastCursor: null,
      noMorePhotos: false,
      loadingMore: false,
    };
  }
  tryPhotoLoad() {
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true }, () => { this.loadPhotos(); });
    }
  }
  
  loadPhotos() {
    const fetchParams = {
      first: 1,
      assetType: 'Photos',
    };
    if (this.state.lastCursor) {
     // console.log("last cursor "+this.state.lastCursor)
      fetchParams.after = this.state.lastCursor;
    }
  
    CameraRoll.getPhotos(fetchParams).then((data) => {
      this.appendAssets(data);
    }).catch((e) => {
    //  console.log(JSON.stringify(e));
    });
  }
  
  appendAssets(data) {
    console.log("\n"+"\n"+"\n"+JSON.stringify(data)+"\n"+"\n"+"\n")
    const assets = data.edges;
    const nextState = {
      loadingMore: false,
    };
  
    if (!data.page_info.has_next_page) {
      nextState.noMorePhotos = true;
    }
  
    if (assets.length > 0) {
      this.setState({lastCursor: data.page_info.end_cursor})
   //   nextState.lastCursor = data.page_info.end_cursor;
      let len = assets.length;
     // console.log(len);
      for (let i = 0; i < len; i++) {
        let row = assets[i];
      //  console.log(row);
        this.setState(prevState => ({
          photos: [...prevState.photos, row]
        }));
      }
    }
   //  console.log("\n"+"\n"+"\n"+JSON.stringify(nextState)+"\n"+"\n"+"\n");
    this.setState(nextState);
  }
  
  endReached() {
    if (!this.state.noMorePhotos) {
      this.tryPhotoLoad();
    }
  }
  componentDidMount(){
    this.tryPhotoLoad();
  }

  render() {
    const images =(
      <FlatList
        data={this.state.photos}
        numColumns={4}
        renderItem={({ item, index }) => (
          <View style={{width: '25%',
             height: height}}>
          <Image
           key={index}
           resizeMode={'cover'}
           style={{
             flex: 1
           }}
           source={{ uri: item.node.image.uri }}
         /></View>
        )}
        keyExtractor={(item, index) => `list-item-${index}`}
        onEndReached={this.endReached()}
        onEndReachedThreshold={0}
       />
    );
    return (
      <View
        style={{ flex: 1, backgroundColor: "#DDDBC7", flexDirection: "column" }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "transparent",
            height: 20,
            width: Dimensions.get("window").width * (85.1 / 100),
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 52 + StatusBar.currentHeight,
            marginBottom: 100
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.goBack()}
          >
            <View
              style={{
                width: 14,
                height: 20,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 12, height: 20 }}
                source={require("../back.png")}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text
            style={{
              color: "rgba(0, 0, 0, 0.3)",
              fontFamily: "zsBold",
              fontSize: 16,
              color: '#DDDBC7'
            }}
          >
            Save
          </Text>
          <Text style={{ color: "black", fontFamily: "zsBold", fontSize: 16, color: '#DDDBC7' }}>
            Add
          </Text>
        </View>
        <ScrollView>
         {images}
        </ScrollView>
        <View
          style={{height: 50, backgroundColor: '#dddbc7', 
          alignItems: 'center', borderTopColor: 'black',
          borderTopWidth: 2, width: '100%', justifyContent:'space-between',
          width: '100%'}}
      >
       <View style={{flexDirection: 'row', backgroundColor: '#dddbc7',
            width: '85.07%', alignItems: 'center', justifyContent: 'space-between' ,
            alignSelf: 'center', marginTop: 16}}>
       <Text style={{fontFamily: 'zsSemiBold', 
       fontSize: 16, color: '#DDDBC7', textAlign: 'center',}}>
         Gallery
       </Text>
       <Text style={{fontFamily: 'zsSemiBold', 
       fontSize: 16, color: 'black', textAlign: 'center',}}>
         Gallery
       </Text>
       <Text style={{fontFamily: 'zsSemiBold', 
       fontSize: 16, color: 'rgba(0, 0, 0, 0.3)', textAlign: 'center',}}>
         Camera
       </Text>
       </View>
      </View>
      </View>
    );
  }
}
// https://join.slack.com/t/comptware/shared_invite/enQtNTk2ODg2MDkxNzUwLTZhOTU5NTYyMWYwZjg2Y2FmODNmMDAwYzJkOTFjMWUzOTJhOGZmZjdkZmJjNDVkZDUxMGFiNGE2NDA4OTM4NjQ
const styles = StyleSheet.create({
  placeholder: {
    color: "rgba(0, 0, 0, 0.2)",
    fontSize: 15,
    fontFamily: "zsMedium"
  },
  text: {
    fontSize: 15,
    fontFamily: "zsMedium",
    color: "black"
  },
  boldYellow: {
    width: 14,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow"
  },
  boldNormal: {
    width: 14,
    height: 26,
    alignItems: "center",
    justifyContent: "center"
  },
  richText: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
},
});
/*
<View style={{height: 56, width: (Dimensions.get('window').width),
            borderTopWidth: 2, borderBottomWidth: 2, borderColor: 'black',
            marginTop: 100, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'rgba(0, 0, 0, 0.2)', fontFamily: 'zsBold',
            fontSize: 16, marginLeft: 28}}>
            The Title
            </Text>
            </View>
            <TextInput    
            allowFontScaling={false}
       underlineColorAndroid={'transparent'}
       placeholder="Your Note..."
       multiline={true}
       selectionColor={'yellow'}
                  placeholderStyle={{fontSize: 15, fontFamily: 'zsMedium',}}
                  placeholderTextColor="rgba(0, 0, 0, 0.2)"
style={{
                      paddingLeft: 28,
                      paddingTop: 28,
                      paddingRight: 28,
                      width: '100%',
                      backgroundColor: 'transparent',
                      fontSize: 15, fontFamily: 'zsMedium', color: 'black',
                  }}/>
*/
