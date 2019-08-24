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
  TextInput
} from "react-native";
import {RichTextEditor, RichTextToolbar, actions} from 'react-native-zss-rich-text-editor';

type Props = {};
export default class NewNote extends Component<Props> {
  static navigationOptions = {
    header: null,
    drawerLockMode: "locked-closed"
  };
  constructor(props) {
    super(props);
    this.state = {
      photoPermission: "",
      songs: [],
      loaded: true,
      loading: false,
      new_Press: false,
      text: "",
      selection: [0, 0],
      pressed: false,
      boldButton: false,
      underlineButton: false,
      italicButton: false,
      attached: "",
      previousSelections: [],
      text2: "",
      unbolded: []
    };
    this.textBar = this.textBar.bind(this);
    this.inputer = this.inputer.bind(this);
    this.fire = this.fire.bind(this);
    this.getHTML = this.getHTML.bind(this);
this.setFocusHandlers = this.setFocusHandlers.bind(this);
    //     this.seeker = this.seeker.bind(this);
  }
  componentDidUpdate() {
    if (this.state.pressed) {
      this.TextInput.focus();
    }
  }
  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }

  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
    //alert(titleHtml + ' ' + contentHtml)
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      //alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      //alert('content focus');
    });
  }

  replaceLast(find, replace, string) {
    var lastIndex = string.lastIndexOf(find);
    if (lastIndex === -1) {
      return string;
    }
    var beginString = string.substring(0, lastIndex);
    var endString = string.substring(lastIndex + find.length);
    return beginString + replace + endString;
  }
  fire() {
    const {
      selection: [start, end],
      text,
      previousSelections,
      text2
    } = this.state;
    console.log(JSON.stringify(previousSelections) + "\n" + "\n" + "\n");
    if (previousSelections[0]) {
      console.log("the zeros are here");
      const n = 0;
      let length = previousSelections.length;
      console.log(length);
      if (length >= 1) {
        n = 7;
        if (length >= 2) {
          for (i = 1; i < length; i++) {
            n += 7;
          }
        }
      }
      if (
        previousSelections[length - 1][1] == start - n ||
        previousSelections[length - 1][1] + 1 == start - n
      ) {
        console.log(previousSelections[length - 1][0]+'\n'+end - n)
        const attacher =
          text.substring(0, previousSelections[length - 1][0]) +
          text.substring(previousSelections[length - 1][0], start - n) +
          "{b}" +
          text.substring(previousSelections[length - 1][0], end - n) +
          "{/b}" +
          text.substring(end - n, text.length);
        console.log(attacher + "//" + start + "<<startend>>" + end);
        this.setState({ text: attacher });
        console.log("aaa" + "\n" + "\n" + "\n" + "\n");
        const ps = previousSelections;
        const last = ps[length - 1];
        ps.splice(length - 1, 1);
        ps.push([last[0], end - n]);
        this.setState(prevState => ({
          unbolded: [...prevState.unbolded, [end - n, this.state.text2.length]]
        }));
        this.setState({ previousSelections: ps });
      } else if (previousSelections[length - 1][0] >= start - n) {
        console.log("bbb" + "\n" + "\n" + "\n");
        if (previousSelections[length - 1][1] >= end - n) {
          const str = replaceLast("{/b}", "", text);
          str = replaceLast("{b}", "", str);
          console.log(str + "<<str");
          const attacher =
            str.substring(0, start - n + 7) +
            str.substring(start - n + 7, previousSelections[length - 1][1]) +
            "{b}" +
            text2.substring(start - n + 7, previousSelections[length - 1][1]) +
            "{/b}" +
            text2.substring(previousSelections[length - 1][1], text2.length);
          /*        const attacher =
            text2.substring(0, start - n) +
            "{b}" +
            text2.substring(start - n, previousSelections[length - 1][1]) +
            "{/b}" +
            text2.substring(previousSelections[length - 1][1], text2.length);*/
          this.setState({ text: attacher });
          console.log("subbb" + "\n" + "\n" + "\n");
          const ps = previousSelections;
          const last = ps[length - 1];
          ps.splice(length - 1, 1);
          ps.push([start - n + 7, last[1]]);
          console.log(ps + "\n" + "\n" + "\n" + "\n");
          this.setState(
            prevState => ({
              unbolded: [
                ...prevState.unbolded,
                [last[1], this.state.text2.length - 1]
              ]
            }),
            console.log(this.state.unbolded + "\n" + "\n" + "\n" + "\n")
          );
          this.setState({ previousSelections: ps });
        } else {
          console.log("tubbb" + "\n" + "\n" + "\n");
          const attacher =
            text2.substring(0, start - n) +
            "{b}" +
            text2.substring(start - n, end - n) +
            "{/b}" +
            text2.substring(end - n, text2.length);
          this.setState({ text: attacher });
          const ps = previousSelections;
          const last = ps[length - 1];
          ps.splice(length - 1, 1);
          ps.push([start - n, end - n]);
          this.setState(prevState => ({
            unbolded: [
              ...prevState.unbolded,
              [end - n, this.state.text2.length - 1]
            ]
          }));
          this.setState({ previousSelections: ps });
        }
      } else {
        console.log(
          "ccc" +
            start +
            "\n" +
            end +
            "\n" +
            "\n" +
            "\n" 
        );
        console.log(length + "lengthhh");
        if (length >= 1) {
          n = 7;
          if (length >= 2) {
            console.log("2 is here, i got here");
            for (i = 1; i < length; i++) {
              n += 7;
            }
          }
        }
        console.log(n + "<<<n for c" + "\n" + "\n" + "\n");
        console.log(
          previousSelections + "----" + "\n" + "\n" + "\n" + "\n" + "\n" + "\n"
        );
        const attacher =
          text.substring(0, start) +
          "{b}" +
          text.substring(start, end) +
          "{/b}" +
          text.substring(end, text.length);
        console.log(attacher + "//" + start + "<<startend>>" + end);
        this.setState({ text: attacher });
        this.setState(
          prevState => ({
            previousSelections: [
              ...prevState.previousSelections,
              [start - n, end - n]
            ]
          }),
          console.log(previousSelections)
        );
        this.setState(
          prevState => ({
            unbolded: [
              ...prevState.unbolded,
              [previousSelections[length - 1][1], start - n]
            ]
          }),
          console.log(this.state.unbolded + "<<unbolded")
        );
      }
    } else {
      const attacher =
        text.substring(0, start) +
        "{b}" +
        text.substring(start, end) +
        "{/b}" +
        text.substring(end, text.length);
      this.setState({ text: attacher });
      this.setState(prevState => ({
        previousSelections: [...prevState.previousSelections, [start, end]]
      }));
    }
  }
  bolddd() {
    const {
      selection: [start, end],
      text,
      text2
    } = this.state;
    if(start != end){
    this.setState({ boldButton: true });
    if (text && (start || start == 0) && end != 0) {
      console.log(
        start +
          ":" +
          ":" +
          end +
          ":" +
          ":" +
          text.length +
          ":" +
          ":" +
          ":" +
          text2.length
      );
      this.fire();
    }
    this.setState({ pressed: false });  
    }
    
  }
  textinputter() {
    this.setState({ pressed: true });
  }
  attacher(value) {
    this.setState({ attached: value });
  }
  inputer(text) {
    this.setState({ text: text });
    this.setState({ boldButton: false });
    const someString = text;
    anotherString = someString.replace(/{b}|{\/b}|{\/b|{b|{\//g, "");
    console.log(anotherString);
    this.setState({ text2: anotherString });
  }
  seeker() {
    this.setState({ pressed: true });
    this.setState({ boldButton: false });
  }
  textBar() {
    const B = props => (
      <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
    );
    const {
      selection: [start, end],
      text,
      text2,
      previousSelections,
      unbolded
    } = this.state;
    console.log(
      "unbolded>>" + unbolded + "\n" + "previoussels>>" + previousSelections
    );
    if (text2) {
      if (previousSelections.length > 1) {
        console.log(
          "textBar1>>>" +
            "\n" +
            "\n" +
            "\n" 
        );
        let length = previousSelections.length;
        if (previousSelections.length == 2) {
          console.log("textBar==2" + "\n" + "\n" + "\n" + "\n");
          if (
            previousSelections[0][1] == previousSelections[1][0] ||
            previousSelections[0][1] + 1 == previousSelections[1][0]
          ) {
            console.log(
              "textBar[0][1]" +
                "\n" +
                "\n" +
                "\n" 
            );
            return (
              <Text style={styles.text}>
                {text2.substring(0, previousSelections[0][0])}
                <B>
                  {text2.substring(
                    previousSelections[0][0],
                    previousSelections[1][1]
                  )}
                </B>
                {text2.substring(previousSelections[1][1], text2.length)}
              </Text>
            );
          } else {
            console.log(
              "textBarelseee!!!1" +
                ":" +
                text2.length +
                "\n" +
                "\n" +
                "\n" 
            );
            return (
              <Text style={styles.text}>
                {text2.substring(0, previousSelections[0][0])}
                <B>
                  {text2.substring(
                    previousSelections[0][0],
                    previousSelections[0][1]
                  )}
                </B>
                <Text>
                  {text2.substring(
                    previousSelections[0][1],
                    previousSelections[1][0]
                  )}
                </Text>
                <B>
                  {text2.substring(
                    previousSelections[1][0],
                    previousSelections[1][1]
                  )}
                </B>
                {text2.substring(previousSelections[1][1], text2.length)}
              </Text>
            );
          }
        } else {
          const new_text = text2;
          console.log(
            "otherelse" +
              "\n" +
              "\n" +
              text2 +
              "<<text2text1>>" +
              text +
              "\n" +
              "\n"
          );
          const items = [];
          const items_ = [];
          console.log(
            previousSelections +
              "\n" +
              "^previousselectionsunbolded>>" +
              unbolded
          );
          for (i = 0; i < previousSelections.length; i++) {
            items.push([
              text2.substring(
                previousSelections[i][0],
                previousSelections[i][1]
              )
            ]);
            console.log(
              previousSelections[i][0] +
                "\n" +
                previousSelections[i][1] +
                "prev" +
                "\n" +
                "\n" 
            );
          }
          for (i = 0; i < unbolded.length; i++) {
            items_.push([text2.substring(unbolded[i][0], unbolded[i][1])]);
            console.log(
              unbolded[i][0] +
                "\n" +
                unbolded[i][1] +
                "\n" +
                "\n" +
                "\n" 
            );
          }
          console.log(items + "?????" + items_ + "\n" + "\n" + "\n" + "\n");
          const M = items.map((item, index) => (
            <Text key={index}>
              <B>{item}</B>
              <Text>{items_[index]}</Text>
            </Text>
          ));

          return (
            <Text style={styles.text}>
              {text2.substring(0, previousSelections[0][0])}
              {M}
              {text2.substring(previousSelections[length - 1][1], text2.length)}
            </Text>
          );
        }
      } else {
        if ((start || start == 0) && previousSelections[0] && end != 0) {
          console.log(
            start +
              end +
              "\n" +
              "\n" +
              "\n" 
          );
          return (
            <Text style={styles.text}>
              {text2.substring(0, previousSelections[0][0])}
              <B>
                {text2.substring(
                  previousSelections[0][0],
                  previousSelections[0][1]
                )}
              </B>
              {text2.substring(previousSelections[0][1], text2.length)}
            </Text>
          );
        } else {
          console.log(
            "textBarelse" +
              "\n" +
              "\n" +
              "\n" 
          );
          return <Text style={styles.text}>{text2}</Text>;
        }
      }
    } else {
      return <Text style={styles.placeholder}>Your Note...</Text>;
    }
  }
  onSelectionChange = event => {
    const {
      selection: [start, end],
      text,
      pressed,
      boldButton,
      previousSelections
    } = this.state;
    const selection = event.nativeEvent.selection;
    console.log(
      selection.start +
        "<<selection.start::selection.end>>" +
        selection.end +
        "\n" +
        "\n" +
        "\n" 
    );
    // const selected = text.substring(start, end);
    this.setState({
      selection: [selection.start, selection.end]
    });
  };

  render() {
    const B = props => (
      <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
    );
    const I = props => (
      <Text style={{ fontStyle: "italic" }}>{props.children}</Text>
    );
    const U = props => (
      <Text style={{ textDecorationLine: "underline" }}>{props.children}</Text>
    );
    const {
      selection: [start, end],
      text,
      pressed
    } = this.state;
    const selected = text.substring(start, end);
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
              fontSize: 16
            }}
          >
            Save
          </Text>
          <Text style={{ color: "black", fontFamily: "zsBold", fontSize: 16 }}>
            Add
          </Text>
        </View>
        <RichTextEditor
              ref={(r)=>this.richtext = r}
              style={styles.richText}
              titlePlaceholder={'The Title'}
              contentPlaceholder={'Your Note...'}
          //    setFontFamily={'zsBold'}
             // customCSS={("fontFamily:'zsBold'")}
         //     initialContentHTML={'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'}
              editorInitializedCallback={() => this.onEditorInitialized()}
          />
          <RichTextToolbar
          
            getEditor={() => this.richtext}
/>
   {/*    <View
        style={{
            width: Dimensions.get("window").width,
            height: 42,
            borderTopWidth: 2,
            borderColor: "black",
            marginBottom: 16,
            backgroundColor: "transparent",
            justifyContent: "flex-end"
          }}
        >
          <View
            style={{
              width: Dimensions.get("window").width * (85.1 / 100),
              height: 24,
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderColor: "black",
                width: 19,
                height: 19,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 19, height: 19 }}
                source={require("../checkBox.png")}
              />
            </View>
            <View
              style={{
                width: 21,
                height: 18,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 21, height: 18 }}
                source={require("../number.png")}
              />
            </View>
            <View
              style={{
                width: 20,
                height: 14,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                resizeMode="contain"
                style={{ width: 21, height: 18 }}
                source={require("../bullet.png")}
              />
            </View>
            <TouchableWithoutFeedback onPress={this.bolddd.bind(this)}>
              <View
                style={
                  this.state.boldButton ? styles.boldYellow : styles.boldNormal
                }
              >
                <Text
                  style={{
                    fontSize: 21.4573,
                    color: "black",
                    textAlign: "center",
                    fontFamily: "zsSemiBold"
                  }}
                >
                  B
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                width: 7,
                height: 26,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 21.4573,
                  color: "black",
                  textAlign: "center",
                  fontFamily: "zsMediumItalic"
                }}
              >
                I
              </Text>
            </View>
            <View
              style={{
                width: 24,
                height: 24,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 17.9118,
                  color: "black",
                  textAlign: "center",
                  fontFamily: "zsSemiBold",
                  textDecorationLine: "underline"
                }}
              >
                U
              </Text>
            </View>
            <View
              style={{
                width: 23,
                height: 22.06,
                backgroundColor: "#FAFA00",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 21.0229,
                  color: "black",
                  textAlign: "center",
                  fontFamily: "zsSemiBold"
                }}
              >
                T
              </Text>
            </View>
          </View>
        </View>*/}
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
