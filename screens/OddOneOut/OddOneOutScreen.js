import React,{useState,useEffect} from "react";
import {
	View,
	Text,
	StyleSheet,
	AsyncStorage,
	Dimensions,
	TouchableOpacity,
	Image,
	Pressable
} from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import oddoneout from "../../constants/OddOneOut";
import Buttons from "./Button";
import PopUp from "../../components/PopUp";
import GamePointContext from "../../context/GamePoints";
const OddOneOutScreen = (props) =>{
	const {gamePoint,setGamePoint}=React.useContext(GamePointContext);
	const [id,setId]=useState(0);
	// eslint-disable-next-line prefer-const
	let [gameLevel,setGameLevel]=useState(0);
	const [success,setSuccess]=useState(false);
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
	const storesData = async (input) => {
		try {
			await AsyncStorage.setItem(
				"@MySuperStore:key",
				input
			);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(()=>{
		getData();
	});
	const call=(val)=>{
		if(val===true){
			setSuccess(true);
		}
	};
	const retry=()=>{
		setSuccess(false);
	};
	const nextLevel=()=>{
		storesData(`${gamePoint+10}`);
		setSuccess(false);
		setGameLevel(++gameLevel);
		setGamePoint(gamePoint+10);
	};
	const moveBack=()=>{
		storesData(`${gamePoint+10}`);
		setSuccess(false);
		props.navigation.navigate("Dashboard");
		setGamePoint(gamePoint+10);
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
				<View
					style={{
						flexDirection: "row",
						backgroundColor: "#050637",
						width: Dimensions.get("window").width,
						justifyContent: "space-between",
					}}
				>
					<View style={{ marginLeft: "5%", marginTop: "7%" }}>
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
					<View
						style={{
							marginTop: "7%",
							flexDirection: "row",
							position: "relative",
							alignItems: "center",
							marginRight: 20,
						}}
					>
						<Image
							source={require("../../assets/coin.png")}
							style={{ height: 20, width: 20 }}
						/>
						<Text style={{
							color: "white",
							fontSize: 20,
							paddingLeft: 10
						}}>
							{gamePoint}
						</Text>
					</View>
				</View>
				<PopUp visible={success} onClose={(val)=>{setSuccess(val);}}>
					<View style={{justifyContent:"space-evenly"}}>
						<Text style={{
							textAlign:"center",
							fontSize:24,
							fontWeight:"bold",
							color:"green"
						}}>Yay! you did it</Text>
						<View style={{alignItems:"center"}}>
							<Image
								source={require("../../assets/coin.gif")}
								style={{height:100,width:100}}
							/>
						</View>
						<View style={{
							flexDirection:"row",
							alignItems:"center",
							justifyContent:"center",
							marginTop:20}}>
							<Text style={{
								fontSize:16,textAlign:"center"
							}}>{"10 "}</Text>
							<Image
								source={require("../../assets/dollar.png")}
								style={{height:30,width:30}}
							/>
							<Text style={{
								fontSize:16,textAlign:"center"
							}}>{" earned"}</Text>
						</View>
						<View style={{
							flexDirection:"row",
							justifyContent:"space-around",
							marginTop:20,marginBottom:5
						}}>
							<Pressable
								onPress={()=>{
									moveBack();
								}} style={{marginRight:20}}>
								<Image
									source={require("../../assets/home.png")}
									style={{height:30,width:30}}
								/>
							</Pressable>
							<Pressable
								onPress={()=>{retry();}}
								style={{marginLeft:25,marginRight:25}}>
								<Image
									source={require("../../assets/retry.png")}
									style={{height:30,width:30}}
								/>
							</Pressable>
							<Pressable onPress={()=>{nextLevel();}}
								style={{marginLeft:25}}>
								<Image
									source={require("../../assets/next.png")}
									style={{height:30,width:30}}/>
							</Pressable>
						</View>
					</View>
				</PopUp>
				<View>
					<Text style={styles.text}>
						{oddoneout[id][gameLevel][0]}
					</Text>
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
		marginTop:"5%"
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