/* eslint-disable max-len */
import React,{useState,useEffect} from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	AsyncStorage,
	Pressable
} from "react-native";
import EndangeredAnimal from "../../constants/EndangeredAnimal";
import AnimalDetail from "../../constants/EndangeredAnimalData";
import { LinearGradient } from "expo-linear-gradient";
import GamePointContext from "../../context/GamePoints";
import PropTypes from "prop-types";
import PopUp from "../../components/PopUp";
import * as Speech from "expo-speech";
const AnimalListScreen=(props)=>{
	const [visible,setVisible]=useState(false);
	const [input,setInput]=useState(0);
	// eslint-disable-next-line no-unused-vars
	const {gamePoint,setGamePoint}=React.useContext(GamePointContext);
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
	const speak = (speakNumber) => {
		const thingToSay = `${EndangeredAnimal[id][speakNumber][0]}
		 State Animal of ${EndangeredAnimal[id][speakNumber][0]} is  ${AnimalDetail[id][speakNumber][0]}
		 State Bird of ${EndangeredAnimal[id][speakNumber][0]} is  ${AnimalDetail[id][speakNumber][1]}
		 State Tree of ${EndangeredAnimal[id][speakNumber][0]} is  ${AnimalDetail[id][speakNumber][2]}
		 State Flower of ${EndangeredAnimal[id][speakNumber][0]} is  ${AnimalDetail[id][speakNumber][3]}`;
		Speech.speak(thingToSay,{rate:0.8,language:"hi-IN"});
	};
	return(
		<View>
			<LinearGradient
				colors={["#42FCDB", "#3EE577"]}
				style={{
					width: Dimensions.get("window").width,
					alignItems: "center",
					justifyContent: "space-evenly",
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
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}>
					<View style={{
						flex:1,
						flexDirection:"row",
						justifyContent:"center"
					}}>
						<View style={{
						}}>
							{(EndangeredAnimal[id].map((val,index)=>
								(index%2===0)&&<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											setVisible(true);
											setInput(index);
											speak(index);
										}}>
										<Image source={val[1]}
											style={styles.image} />
										<Text style={styles.text}
										>{val[0]}{"\n"}</Text>
									</TouchableOpacity>
								</View>
							)
							)}
						</View>
						<View style={{
						}}>
							{(EndangeredAnimal[id].map((val,index)=>
								(index%2!==0)&&<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											// eslint-disable-next-line max-len
											// eslint-disable-next-line max-len
											setVisible(true);
											setInput(index);
											speak(index);
										}}>
										<Image source={val[1]}
											style={styles.image} />
										<Text style={styles.text}
										>{val[0]}{"\n"}</Text>
									</TouchableOpacity>
								</View>
							)
							)}
						</View>
					</View>
					<PopUp visible={visible} onClose={()=>{setVisible(false);}}>
						<Text style={{
							fontSize:18,fontWeight:"bold"
						}}>{`${EndangeredAnimal[id][input][0]}`}</Text>
						<View
							style={{
								marginBottom:10,
								marginTop:10,
								alignContent:"flex-start"
							}}>
							<Text>
								{`Animal :  ${AnimalDetail[id][input][0]}`}
							</Text>
							<Text>
								{`Bird :  ${AnimalDetail[id][input][1]}`}
							</Text>
							<Text>
								Tree :  {`${AnimalDetail[id][input][2]}`}
							</Text>
							<Text>
								{`Flower :  ${AnimalDetail[id][input][3]}`}
							</Text>
						</View>
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
				</ScrollView>
			</LinearGradient>
		</View>
	);
};
const styles = StyleSheet.create({
	image:{
		height:150,
		width:150
	},
	text:{textAlign:"center",
		color:"white",
		fontSize:18
	},
	view:{padding:5,flex:1,alignItems:"center"},
	shape:{backgroundColor:"teal",borderRadius:50,padding:10}
});
AnimalListScreen.propTypes={
	navigation:PropTypes.any,
};
export default AnimalListScreen;