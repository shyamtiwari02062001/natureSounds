import React,{useState,useEffect} from "react";
import {View,Text,ImageBackground,StyleSheet,Image,AsyncStorage,TouchableOpacity} from "react-native";
import oddoneout from "../../constants/OddOneOut";
const OddOneOutScreen = () =>{
	const [id,setId]=useState(0);
	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem("@storage_Key");
			if(value !== null) {
				setId(value);
			}
		} catch(e) {
			console.log(e);
		}
	};
	useEffect(()=>{
		getData();
	});
	return(
		<View>
			<Text style={styles.text}>Choose the odd one out</Text>
			<ImageBackground source={require("../../assets/background.png")}
				style={{height:500,width:"100%"}}>
				{oddoneout[id].map((lan,index)=>
					<View style={{alignItems:"center"}}>
						<View style={{flexDirection:"row"}}>
							<TouchableOpacity></TouchableOpacity>
							<Image source={lan[1]} style={styles.image}/>
						</View>
						<View>
							<Image source={lan[2]} style={styles.image}/>
						</View>
						<View style={{flexDirection:"row"}}>
							<Image source={lan[3]} style={styles.image}/>
							<Image source={lan[4]} style={styles.image}/>
						</View>
					</View>
				)}
			</ImageBackground>
		</View>
	);
};
const styles=StyleSheet.create({
	text:{
		textAlign:"center",
		fontSize:30,
		fontWeight:"bold",
		marginTop:"10%",
		marginBottom:"5%"
	},
	image:{
		height:150,
		width:150
	}
});
export default OddOneOutScreen;