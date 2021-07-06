import React,{useState,useEffect} from "react";
import {View,
	Dimensions,
	StyleSheet,
	Image,
	Text,
	TouchableOpacity,
	AsyncStorage,
	Pressable
} from "react-native";
import PropTypes from "prop-types";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import Listen from "../../constants/ListenAndTap";
import PopUp from "../../components/PopUp";
import GamePointContext from "../../context/GamePoints";
const ListenScreen=(props)=>{
	const {gamePoint,setGamePoint}=React.useContext(GamePointContext);
	const [sound, setSound] = React.useState();
	// eslint-disable-next-line prefer-const
	let [gameLevel,setGameLevel]=useState(0);
	const [success,setSuccess]=useState(false);
	const [id,setId]=useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [selected,setSelected]=useState("");
	// eslint-disable-next-line func-style
	async function PlaySound() {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(
			Listen[id][gameLevel][1]
		);
		setSound(sound);

		console.log("Playing Sound");
		await sound.playAsync();
	}
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
	useEffect(() => {
		getData();
		return sound
			? () => {
				console.log("Unloading Sound");
				sound.unloadAsync();
			}
			: undefined;
	}, [sound]);
	const check=(index)=>{
		if(Listen[id][gameLevel][8]==index){
			setSuccess(true);
			setModalVisible(true);
		}
		else{
			setSuccess(false);
			setModalVisible(true);
		}
	};
	const retry=()=>{
		setModalVisible(false);
	};
	const nextLevel=()=>{
		storesData(`${gamePoint+10}`);
		setGamePoint(gamePoint+10);
		setModalVisible(false);
		setGameLevel(++gameLevel);
	};
	const moveBack=()=>{
		storesData(`${gamePoint+10}`);
		setGamePoint(gamePoint+10);
		setModalVisible(false);
		props.navigation.navigate("Dashboard");
	};
	return(
		<View>
			<View style={styles.container}>
				<LinearGradient
					colors={["#f04ca0", "#552fea"]}
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
					<Text style={styles.heading}>
						{Listen[id][gameLevel][0]}
					</Text>
					<View style={{flex:1,justifyContent:"space-around"}}>
						<View style={styles.view}>
							<TouchableOpacity
								style={{
									backgroundColor:"teal",
									padding:5,
									borderRadius:20
								}}
								onPress={()=>{
									check(1);
									setSelected(Listen[id][gameLevel][14]);
								}}>
								<Image
									source={Listen[id][gameLevel][2]}
									style={styles.image}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor:"teal",
									padding:5,
									borderRadius:20
								}}
								onPress={()=>{
									check(2);
									setSelected(Listen[id][gameLevel][15]);
								}}>
								<Image
									source={Listen[id][gameLevel][3]}
									style={styles.image}
								/>
							</TouchableOpacity>
						</View>
						<View style={{alignItems:"center"}}>
							<TouchableOpacity
								style={{
									backgroundColor:"teal",
									padding:5,
									borderRadius:20
								}}
								onPress={()=>{
									check(3);
									setSelected(Listen[id][gameLevel][16]);
								}}>
								<Image
									source={Listen[id][gameLevel][4]}
									style={styles.image}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.view}>
							<TouchableOpacity
								style={{
									backgroundColor:"teal",
									padding:5,
									borderRadius:20
								}}
								onPress={()=>{
									check(4);
									setSelected(Listen[id][gameLevel][17]);
								}}>
								<Image
									source={Listen[id][gameLevel][5]}
									style={styles.image}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									backgroundColor:"teal",
									padding:5,
									borderRadius:20
								}}
								onPress={()=>{
									check(5);
									setSelected(Listen[id][gameLevel][18]);
								}}>
								<Image
									source={Listen[id][gameLevel][6]}
									style={styles.image}
								/>
							</TouchableOpacity>
						</View>
						<View style={{alignItems:"center"}}>
							<TouchableOpacity
								style={styles.buttonContainer}
								onPress={()=>{PlaySound();}}
							>
								<View style={styles.buttonView}>
									<Text
										style={styles.buttonText}>
										{Listen[id][gameLevel][7]}
									</Text>
								</View>
								<View style={styles.buttonImageView}>
									<Image
										source={
											require("../../assets/volume.png")
										}
										style={styles.buttonImage}
									/>

								</View>
							</TouchableOpacity>
						</View>
					</View>
				</LinearGradient>
			</View>
			<PopUp visible={modalVisible} onClose={(val)=>{setSuccess(val);}}>
				<View style={{justifyContent:"space-evenly"}}>
					{(success===true)?
						<Text style={{
							textAlign:"center",
							fontSize:24,
							fontWeight:"bold",
							color:"green"
						}}>Yay! you did it</Text>:
						<Text style={{
							textAlign:"center",
							fontSize:24,
							fontWeight:"bold",
							color:"red"
						}}>Oops try again</Text>}

					{(success===true)&&
					<View>
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
					</View>}
					<View style={{
						flexDirection:"row",
						justifyContent:"space-around",
						marginTop:20,marginBottom:5
					}}>
						<Pressable
							onPress={()=>{
								moveBack();
							}} style={{marginRight:25}}>
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
						{(success===true)&&
						<Pressable
							onPress={()=>{nextLevel();}}
							style={{marginLeft:25}}>
							<Image
								source={require("../../assets/next.png")}
								style={{height:30,width:30}}/>
						</Pressable>
						}
					</View>
				</View>
			</PopUp>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 40,
		fontWeight: "bold",
		padding: 10,
		color: "white",
	},
	view:{
		flexDirection:"row",
		justifyContent:"space-around"
	},
	image:{
		height:150,
		width:140
	},
	heading:{
		textAlign:"center",
		fontSize:18,
		fontWeight:"bold"
	},
	buttonContainer:{
		flexDirection:"row",
		alignItems:"center",
		justifyContent:"center",
		width:"60%",
		padding:5
	},
	buttonView:{
		backgroundColor:"#050637",
		padding:10,
		borderBottomLeftRadius:20,
		borderTopLeftRadius:20
	},
	buttonText:{
		fontSize:25,
		paddingRight:4,
		color:"white"
	},
	buttonImageView:{
		backgroundColor:"#ffcc00",
		padding:7,
		borderTopRightRadius:20,
		borderBottomRightRadius:20
	},
	buttonImage:{
		height:40,
		width:40,
		tintColor:"#050637"
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		marginLeft:10,
		marginRight:10
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		fontSize:20,
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		fontSize:25,
		marginBottom: 15,
		textAlign: "center"
	}
});
ListenScreen.propTypes={
	navigation:PropTypes.any,
};
export default ListenScreen;
