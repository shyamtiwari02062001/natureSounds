import React,{useState} from 'react';
import {View,Text,Image,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from "expo-linear-gradient";
const Accordion = (props) => {
    const{
        title,
        children,
        Styles
    }=props;
    const [clicked,setClicked]=useState(false);
    const check = () => {
        if(clicked===true){
            setClicked(false);
        }
        else{
            setClicked(true);
        }
    };
    return(
        <View
            style={{...Styles,...Defaultstyles.container}}
            data-test="container"
        >
            <LinearGradient
        colors={["#89f7fe", "#66a6ff"]}
        style={{
          flex: 1,
        }}
      >
            <TouchableOpacity onPress={()=>{check();}} >
                <View style={{...Defaultstyles.view}}>
                    <Text style={{...Defaultstyles.text}}>{title}</Text>
                    {(clicked)?
                        <Image
                            source={require('../assets/up.png')}
                            style={{...Defaultstyles.image}}
                        />:
                        <Image
                            source={require('../assets/down.png')}
                            style={{...Defaultstyles.image}}
                        />
                    }
                </View>
            </TouchableOpacity>
            {(clicked)&&<Text style={{padding:10}}>{children}</Text>}
            </LinearGradient>
        </View>
    );
};
Accordion.propTypes={
    title:PropTypes.string,
    childern:PropTypes.any,
    Styles:PropTypes.object
};
const Defaultstyles=StyleSheet.create({
    container:{
        marginTop:5,
        marginBottom:5,
        borderColor:'gray',
        borderWidth:0.5,
        borderRadius:5
    },
    view:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    image:{
        height:20,
        width:20,
        marginRight:10,
    },
    text:{
        fontSize:20,
        padding:10
    }
});
export default Accordion;