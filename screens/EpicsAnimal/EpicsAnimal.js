import React,{useState,useEffect} from "react";
import {
	View,
	Text,
	Dimensions,
	StyleSheet,
	AsyncStorage,
	TouchableOpacity,
	Image,
	Pressable,
	ScrollView} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RamayanEpic from "../../constants/RamayanEpic";
import MahabharatEpic from "../../constants/MahabharatEpics";
import GamePointContext from "../../context/GamePoints";
import PopUp from "../../components/PopUp";
import RamayanEpicSpeechText from "../../constants/RamayanEpicSpeechText";
import PropTypes from "prop-types";
import * as Speech from "expo-speech";
import MahabharatEpicSpeech from "../../constants/MahabharatEpicsSpeech";
const EpicsAnimal=(props)=>{
	// eslint-disable-next-line no-unused-vars
	const {gamePoint,setGamePoint}=React.useContext(GamePointContext);
	const [id,setId]=useState(0);
	const [input,setInput]=useState(0);
	const [input1,setInput1]=useState(0);
	const [visible,setVisible]=useState(false);
	const [audioPlay,setAudioPlay]=useState(0);
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
	const speak = (speakNumber) => {
		setAudioPlay(0);
		const thingToSay =`${RamayanEpicSpeechText[id][speakNumber]}`;
		Speech.speak(thingToSay,{rate:0.8,language:"hi-IN"});
	};
	const speak1 = (speakNumber) => {
		setAudioPlay(1);
		const thingToSay =`${MahabharatEpicSpeech[id][speakNumber]}`;
		Speech.speak(thingToSay,{rate:0.8,language:"hi-IN"});
	};
	return(
		<View style={styles.container}>
			<LinearGradient
				colors={["#f04ca0", "#552fea"]}
				style={{
					flex: 1,
					width: Dimensions.get("window").width,
					alignItems: "center",
				}}
			>
				<PopUp visible={visible} onClose={()=>{setVisible(false);}}>
					<Text style={{
						fontSize:18,fontWeight:"bold"
					}}>
						{(audioPlay===0)?RamayanEpicSpeechText[id][input]:
							MahabharatEpicSpeech[id][input1]}
					</Text>
					<Pressable onPress={()=>{
						setVisible(false);}}
					style={{
						padding:10,
						alignItems:"center",
						backgroundColor:"skyblue",
						borderRadius:50
					}}>
						<Text>Close</Text>
					</Pressable>
				</PopUp>
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
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}>
					<View style={{
						flex:1,
						justifyContent:"space-between",
						flexDirection:"row"
					}}>
						<View>
							{(MahabharatEpic[id].map((val,index)=>
								<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											setVisible(true);
											speak1(index);
											setInput1(index);
										}}>
										<Image source={val[1]}
											style={styles.image} />
										<Text style={styles.text}
										>{val[0]}{"\n"}</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
						<View style={{alignContent:"center"}}>
							{(RamayanEpic[id].map((val,index)=>
								<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											setVisible(true);
											speak(index);
											setInput(index);
										}}>
										<Image source={val[1]}
											style={styles.image} />
										<Text style={styles.text}
										>{val[0]}{"\n"}</Text>
									</TouchableOpacity>
								</View>
							))}
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	image:{
		height:150,
		width:150
	},
	text:{textAlign:"center",
		color:"white",
		fontSize:18
	},
	view:{padding:10,flex:1,alignItems:"center"},
	shape:{backgroundColor:"teal",borderRadius:50}
});
EpicsAnimal.propTypes={
	navigation:PropTypes.any,
};
export default EpicsAnimal;