import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Image, FlatList } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';

let customFonts = {'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}

export default class StoryCard extends Component {
    constructor(props){
        super(props);
        this.state={
            fontLoaded:false,
        }
    }

    async _loadFont(){
        await Font.loadAsync(customFonts)
        this.setState({
            fontLoaded:true
        })
    }

    componentDidMount(){
        this._loadFont()
    }

    keyExtracter = (item, index)=>index.toString();

    renderItem({item:story}){
        return(
            <StoryCard  story={story} />
        );
    }

    render() {
        if(!this.state.fontLoaded){
            return (
                <AppLoading />
            )
        }
        else{
            return(
                <View style={styles.container}>
                        <View style={styles.cardContainer}>
                                <Image 
                                    source={require('../assets/story_image_1.png')}
                                    style={styles.storyImage}
                                />
                            <View style={styles.titleContainer}>
                                <Text style={styles.storyTitleText}>{this.props.story.title}</Text>
                                <Text style={styles.authortext}>{this.props.story.author}</Text>
                                <Text style={styles.descriptionText}>{this.props.story.description}</Text>
                            </View>
                            <View style={styles.actionContainer}>
                                <View style={styles.likeButton}>
                                    <Ionicons name={'heart'} size={RFValue} color={'white'} />
                                    <Text style={styles.likeText}>12k</Text>
                                </View>
                            </View>
                        </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    cardContainer:{
        margin:RFValue(13),
        backgroundColor:'#2f345d',
        borderRadius:RFValue(20),
    },
    storyImage:{
        resizeMode:'contain',
        width:'95%',
        alignSelf:"center",
        height:RFValue(250),
    },
    titleContainer:{
        paddingLeft:RFValue(20),
        justifyContent:"center",
    },
    storyTitleText:{
        color:"white",
        fontSize:RFValue(25),
        fontFamily:'Bubblegum-Sans'
    },
    authortext:{
        color:"white",
        fontSize:RFValue(18),
        fontFamily:'Bubblegum-Sans'
    },
    descriptionText:{
        color:"white",
        fontSize:13,
        fontFamily:'Bubblegum-Sans',
        paddingTop:RFValue(10),
    },
    actionContainer:{
        justifyContent:"center",
        alignItems:"center",
        padding:RFValue(10),
    },
    likeButton:{
        width:RFValue(160),
        height:RFValue(40),
        justifyContent:"center",
        alignItems:"center",
        flexDirection:'row',
        backgroundColor:'#eb3948',
        borderRadius:RFValue(30),
    },
    likeText:{
        color:"white",
        fontFamily:'Bubblegum-Sans',
        fontSize:RFValue(25),
        marginLeft:RFValue(5),
    },
})