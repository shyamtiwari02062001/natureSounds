import React,{useState,useEffect} from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	AsyncStorage
} from "react-native";
import AnimalsList from "../../constants/AnimalList";
import { LinearGradient } from "expo-linear-gradient";
import GamePointContext from "../../context/GamePoints";
import PropTypes from "prop-types";
const AnimalListScreen=(props)=>{
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
	const storeData = async (value) => {
		console.log(value);
		try {
			await AsyncStorage.setItem("@AnimalName", value);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(()=>{
		getData();
	});
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
							marginBottom:"20%",marginTop:"10%",padding:5
						}}>
							{(AnimalsList[id].map((val,index)=>
								(index%2===0)&&<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											// eslint-disable-next-line max-len
											storeData(AnimalsList[0][index][0]);
											// eslint-disable-next-line max-len
											props.navigation.navigate("AnimalLearning");
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
							marginTop:"10%",marginBottom:"20%",padding:5
						}}>
							{(AnimalsList[id].map((val,index)=>
								(index%2!==0)&&<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											// eslint-disable-next-line max-len
											storeData(AnimalsList[0][index][0]);
											// eslint-disable-next-line max-len
											props.navigation.navigate("AnimalLearning");
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
	view:{padding:10,flex:1,alignItems:"center"},
	shape:{backgroundColor:"teal",borderRadius:50}
});
AnimalListScreen.propTypes={
	navigation:PropTypes.any,
};
export default AnimalListScreen;