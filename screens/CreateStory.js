import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import DropDownPicker from 'react-native-dropdown-picker';

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      preview_images:"image_1",
      dropDownHeight:40,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }


  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
        let preview_image = {image_1: require('../assets/story_image_1.png'),
                             image_2: require('../assets/story_image_2.png'),
                             image_3: require('../assets/story_image_3.png'),
                             image_4: require('../assets/story_image_4.png'),
                             image_5: require('../assets/story_image_5.png')}          
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <View style={styles.appTitle}>

            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              />
            </View>

            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New Story</Text>
            </View>

          </View>

          <View style={styles.fieldContainer}>
            <ScrollView>
                <Image 
                    source={preview_image[this.state.preview_images]}
                    style={styles.previewImage}
                />
                <View style={{height:RFValue(this.state.dropDownHeight)}}>
                    <DropDownPicker 
                        items = {[
                            {label:'image_1', value:'image_1'},
                            {label:'image_2', value:'image_2'},
                            {label:'image_3', value:'image_3'},
                            {label:'image_4', value:'image_4'},
                            {label:'image_5', value:'image_5'},
                        ]}
                        defaultValue = {this.state.preview_images}
                        containerStyle={{height:40, borderRadius:20, marginBottom:10}}
                        onOpen={()=>{
                            this.setState({
                                dropDownHeight:170
                            })
                        }}
                        onClose={()=>{
                            this.setState({
                                dropDownHeight:40
                            })
                        }}
                        style={{backgroundColor:'transparent'}}
                        itemStyle={{justifyContent:"flex-start"}}
                        dropDownStyle={{backgroundColor:"#2f345d"}}
                        labelStyle={{color:"white", fontFamily:'Bubblegum-Sans'}}
                        arrowStyle={{color:"white", fontFamily:'Bubblegum-Sans'}}
                        onChangeItem={item=>
                            this.setState({
                                preview_images:item.value
                            })
                        }
                    />
                </View>
                <TextInput 
                    style={styles.inputFont}
                    onChangeText={title=>
                        this.setState({
                            title
                        })
                    }
                    placeholder={"Title"}
                    placeholderTextColor="white"
                />
                <TextInput 
                    style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                    onChangeText={description=>
                        this.setState({
                            description
                        })
                    }
                    placeholder={"Description"}
                    placeholderTextColor="white"
                    multiline={true}
                    numberOfLines={4}
                />
                <TextInput 
                    style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                    onChangeText={storyPlot=>
                        this.setState({
                            storyPlot
                        })
                    }
                    placeholder={"Story"}
                    placeholderTextColor="white"
                    multiline={true}
                    numberOfLines={30}
                />
                <TextInput 
                    style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                    onChangeText={moral=>
                        this.setState({
                            moral
                        })
                    }
                    placeholder={"Moral"}
                    placeholderTextColor="white"
                    multiline={true}
                    numberOfLines={10}
                />
            </ScrollView>
          </View>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  fieldContainer:{
    flex:0.85
  },
  previewImage:{
    width:'90%',
    height:RFValue(250),
    alignSelf:"center",
    borderRadius:RFValue(10),
    marginVertical:RFValue(10),
    resizeMode:"contain",
  },
  inputFont:{
    height:RFValue(40),
    borderColor:"white",
    borderWidth:RFValue(1),
    borderRadius:RFValue(10),
    paddingLeft:RFValue(10),
    color:"white",
    fontFamily:'Bubblegum-Sans',
  },
  inputFontExtra:{
    marginTop:RFValue(15),
  },
  inputTextBig:{
      textAlignVertical:"top",
      padding:RFValue(5),
  }
});
