import React,{useState,useEffect} from "react";
import {
	View,
	Text,
	StyleSheet,
	AsyncStorage,
	Dimensions,
	TouchableOpacity,
	Image
} from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import oddoneout from "../../constants/OddOneOut";
import Buttons from "./Button";
const OddOneOutScreen = (props) =>{
	const [id,setId]=useState(0);
	const [gameLevel,setGameLevel]=useState(0);
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
	const call=(val)=>{
		if(val===true){
			setTimeout(()=>{
				setGameLevel(gameLevel+1);
			},1000);
		}
	};
	return(
		<View>
			<LinearGradient
				colors={["#42FCDB", "#3EE577"]}
				style={{
					width: Dimensions.get("window").width,
					height:"100%",
				}}
			>
				<View style={{
					position:"absolute",
					marginLeft: "2%",
					marginTop: "12.5%",
					flexDirection:"row"
				}}>
					<TouchableOpacity
						onPress={() =>
							props.navigation.navigate("Dashboard")}
					>
						<Image
							source={require("../../assets/back.png")}
							style={{
								height: 20,
								width: 20,
								tintColor: "white"
							}}
						/>
					</TouchableOpacity>
				</View>
				<Text style={styles.text}>{oddoneout[id][gameLevel][0]}</Text>
				<View style={
					{flexDirection:"row",justifyContent:"center"}
				}>
					<View>
						{(oddoneout[id][gameLevel].map((val,index)=>
							(index!==0&&index%2!=0)&&
							<View
								key={index}
								style={{flexDirection:"row",padding:20}}>
								<Buttons source={val}
									required={require("../../assets/dog.png")}
									fun={(val)=>{call(val);}}
								/>
							</View>
						))}
					</View>
					<View>
						{(oddoneout[id][gameLevel].map((val,index)=>
							(index!==0&&index%2==0)&&
							<View
								key={index}
								style={{flexDirection:"row",padding:20}}>
								<Buttons source={val}
									required={require("../../assets/dog.png")}
									fun={(val)=>{call(val);}}
								/>
							</View>
						))}
					</View>
				</View>
			</LinearGradient>
		</View>
	);
};
const styles=StyleSheet.create({
	text:{
		textAlign:"center",
		fontSize:28,
		fontWeight:"bold",
		marginTop:"10%",
		marginBottom:"5%"
	},
	image:{
		height:150,
		width:150
	}
});
OddOneOutScreen.propTypes={
	navigation:PropTypes.any,
};
export default OddOneOutScreen;