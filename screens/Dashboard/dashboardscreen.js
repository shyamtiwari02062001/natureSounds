/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from "react";
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Modal,
	AsyncStorage,
	Image,
	Alert
} from "react-native";
import GamePointContext from "../../context/GamePoints";
import DashboardData from "../../constants/Dashboard";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import Languages from "../../constants/language";
const DashboardScreen = (props) => {
	const {
		gamePoint,
		setGamePoint,
		setLanguageId,
		setAdditionData,
	}=React.useContext(GamePointContext);
	const [modalVisible, setModalVisible] = useState(false);
	const [id,setId]=useState(0);
	const [disable,setDisabled]=useState(false);
	// eslint-disable-next-line prefer-const
	let [time,setTime]=useState(1800);
	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem("@storage_Key", value);
		} catch (e) {
			console.log(e);
		}
	};
	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem("@storage_Key");
			if(value !== null) {
				setId(value);
				setLanguageId(value);
			}
		} catch(e) {
			console.log(e);
		}
	};
	const fetchData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("@AdditionData");
			setAdditionData(JSON.parse(jsonValue));
		} catch(e) {
		// error reading value
			console.log("It was not saved successfully");
		}
	};
	const retrieveData = async () => {
		try {
			const value = await AsyncStorage.getItem("@MySuperStore:key");
			if (value !== null) {
				const val=parseInt(value);
				setGamePoint(val);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const retrieveTime = async () => {
		try {
			const value = await AsyncStorage.getItem("@Time");
			if(value !== null) {
				const val=parseInt(value);
				timer(val);
			}
			if(value===null){
				timer(1800);
			}
		} catch(e) {
			console.log(e);
		}
	};
	const storeTime = async (value) => {
		try {
			await AsyncStorage.setItem("@Time", value);
		} catch (e) {
			console.log(e);
		}
	};
	const timer=(val)=>{
		setTimeout(()=>{
			if(val!==0){
				setTime(val);
				storeTime(`${val}`);
				timer(val-1);
			}
			if(val===0){
				alert();
				setDisabled(true);
			}
		},1000);
	};
	const alert = () =>
		Alert.alert(
			"Info",
			"Times up visit again after 2 hours",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel"
				},
				{ text: "OK", onPress: () => console.log("OK Pressed") }
			]
		);
	useEffect(()=>{
		retrieveTime();
		getData();
		fetchData();
		setTimeout(()=>{
			retrieveData();
		},2000);
	},[]);
	const redirect=(index)=>{
		if(index===0){
			props.navigation.navigate("BirdList");
		}
		if(index===1){
			props.navigation.navigate("AnimalList");
		}
		if(index===2){
			props.navigation.navigate("OddOneOut");
		}
		if(index===3){
			props.navigation.navigate("JumbledWords");
		}
		if(index===4){
			props.navigation.navigate("Listen");
		}
		if(index===5){
			props.navigation.navigate("EndangeredAnimal");
		}
		if(index===6){
			props.navigation.navigate("EpicsAnimal");
		}
	};
	return(
		<View style={{backgroundColor:"#7CFFCB",flex:1}}>
			<View style={{flex:1,
				flexDirection:"row",
				justifyContent:"space-around"}}
			>
				<Text style={{fontSize:20,marginTop:30}}>
					{Math.trunc(time/60)}:{Math.trunc((time%60))}
				</Text>
				<TouchableOpacity
					disabled={disable}
					style={{marginTop:20}}
					onPress={() => setModalVisible(true)}
				>
					{(id===null)&&<Text
						style={styles.language}>Select Language
					</Text>}
					{(id!==null)&&<Text
						style={styles.language}>{Languages[id]}
					</Text>}
				</TouchableOpacity>
				<View
					style={{marginBottom:"13%",
						flexDirection: "row",
						alignItems:"center"
					}}
				>
					<Image
						source={require("../../assets/coin.png")}
						style={{ height: 20, width: 20 }}
					/>
					<Text style={{
						fontSize: 20,
						color:"black",
						paddingLeft: 10
					}}>
						{gamePoint}
					</Text>
				</View>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<ScrollView
							showsVerticalScrollIndicator={false}
							showsHorizontalScrollIndicator={false}>
							{Languages.map((lan,index)=>
								<TouchableOpacity
									key={index}
									onPress={()=>{
										storeData(`${index}`);
										setId(index);
										setModalVisible(!modalVisible);
									}}
								>
									<Text style={styles.modalcontent}>
										{lan}
									</Text>
								</TouchableOpacity>
							)}
						</ScrollView>
					</View>
				</View>
			</Modal>
			<Animatable.View
				animation="bounceInUp"
				duration={3000}
				style={styles.container}>
				<ScrollView style={{marginTop:"3%"}}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}>
					<View style={styles.view}>
						<View
							style={styles.buttonContainer}
						>
							<TouchableOpacity style={styles.button}
								disabled={disable}

								onPress={()=>{redirect(0);}}
							>
								<Image source={DashboardData[id][0][1]}
									style={{
										height:100,
										width:100,
										alignItems:"center"
									}}
								/>
								<Text
									style={styles.text}>
									{DashboardData[id][0][0]}
								</Text>
							</TouchableOpacity>
						</View>
						<View
							style={styles.buttonContainer}
						>
							<TouchableOpacity style={styles.button}
								disabled={disable}

								onPress={()=>{redirect(1);}}
							>
								<Image source={DashboardData[id][1][1]}
									style={{
										height:100,
										width:100,
										alignItems:"center"
									}}
								/>
								<Text
									style={styles.text}>
									{DashboardData[id][1][0]}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.view}>
						<View
							style={styles.buttonContainer}
						>
							<TouchableOpacity style={styles.button}
								disabled={disable}

								onPress={()=>{redirect(2);}}
							>
								<Image source={DashboardData[id][2][1]}
									style={{
										height:100,
										width:100,
										alignItems:"center"
									}}
								/>
								<Text
									style={styles.text}>
									{DashboardData[id][2][0]}
								</Text>
							</TouchableOpacity>
						</View>
						<View
							style={styles.buttonContainer}
						>
							<TouchableOpacity style={styles.button}
								onPress={()=>{redirect(3);}}
								disabled={disable}

							>
								<Image source={DashboardData[id][3][1]}
									style={{
										height:100,
										width:100,
										alignItems:"center"
									}}
								/>
								<Text
									style={styles.text}>
									{DashboardData[id][3][0]}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.view}>
						<View
							style={styles.buttonContainer}
						>
							<TouchableOpacity style={styles.button}
								disabled={disable}

								onPress={()=>{redirect(4);}}
							>
								<Image source={DashboardData[id][4][1]}
									style={{
										height:100,
										width:100,
										alignItems:"center"
									}}
								/>
								<Text
									style={styles.text}>
									{DashboardData[id][4][0]}
								</Text>
							</TouchableOpacity>
						</View>
						<View
							style={styles.buttonContainer}
						>
							<TouchableOpacity style={styles.button}
								disabled={disable}

								onPress={()=>{redirect(5);}}
							>
								<Image source={DashboardData[id][5][1]}
									style={{
										height:100,
										width:100,
										alignItems:"center"
									}}
								/>
								<Text
									style={styles.text}>
									{DashboardData[id][5][0]}
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.view}>
						<View
							style={styles.buttonContainer}
						>
							<TouchableOpacity style={styles.button}
								disabled={disable}

								onPress={()=>{redirect(6);}}
							>
								<Image source={DashboardData[id][6][1]}
									style={{
										height:100,
										width:100,
										alignItems:"center"
									}}
								/>
								<Text
									style={styles.text}>
									{DashboardData[id][6][0]}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</Animatable.View>
		</View>
	);
};
const styles = StyleSheet.create({
	container:{
		flex:4.5,
		backgroundColor:"white",
		borderTopLeftRadius:50,
		borderTopRightRadius:50,
	},
	gradient: {
		width:Dimensions.get("window").width,
		height:Dimensions.get("window").height,
	},
	language:{
		fontSize:35,
		textAlign:"center",
	},
	buttonContainer:{
		flex:1,
		flexDirection:"row",
		justifyContent:"space-evenly",
		alignContent:"center",padding:10,
		width:"50%"
	},
	button:{
		alignItems:"center",
		backgroundColor:"teal",
		justifyContent:"center",
		borderRadius:50,
		padding:20
	},
	text: {
		fontSize:25,
		color:"white",
		textAlign:"center"
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop:0
	},
	modalView: {
		backgroundColor:"white",
		margin: 20,
		borderRadius: 40,
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
	modalcontent:{
		fontSize:20,
		textAlign:"center",
		padding:10
	},
	innerButton:{
		flex:1,
		borderTopColor:"white",
		borderTopWidth:2
	},
	view:{
		flexDirection:"row",
		justifyContent:"space-around",
	}
});
DashboardScreen.propTypes={
	navigation:PropTypes.any,
};
export default DashboardScreen;