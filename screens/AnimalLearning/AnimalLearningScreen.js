/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Image,
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Modal,
	Dimensions,
	AsyncStorage
} from "react-native";
import { Audio } from "expo-av";
import Accordion from"../../Accordion";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import Learning from "../../constants/AnimalLearning";
const AnimalLearningscreen=(props)=> {
	const [id,setId]=useState(0);
	const [AnimalName,setAnimalName]=useState("Dog");
	const [sound, setSound] = useState();
	const [playing, setPlaying] = useState();
	const [modalVisible, setModalVisible] = useState(false);
	// eslint-disable-next-line func-style
	async function PlaySound() {
		const { sound } = await Audio.Sound.createAsync(
			Learning[id][AnimalName][31]
		);
		setSound(sound);
		setPlaying(true);
		await sound.playAsync();
		setTimeout(()=> {
			setPlaying(false);
		}, 3000);
	}
	useEffect(() => {
		getData();
		return sound
			? () => {
				console.log("Unloading Sound");
				sound.unloadAsync();
			}
			: undefined;
	}, [sound]);
	const getData = async () => {
		try {
			const value = await AsyncStorage.getItem("@storage_Key");
			if(value !== null) {
				setId(value);
			}
		} catch(e) {
			console.log(e);
		}
		try {
			const value = await AsyncStorage.getItem("@AnimalName");
			if(value !== null) {
				setAnimalName(value);
			}
		} catch(e) {
			console.log(e);
		}
	};
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={["#89f7fe", "#66a6ff"]}
				style={{
					flex: 1,
					width: Dimensions.get("window").width,
					height: Dimensions.get("window").height,
					alignItems: "center",
					justifyContent: "space-evenly",
				}}
			>
				<View style={{ position: "absolute", top: 10, left: 10 }}>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate("Dashboard");
						}}
					>
						<Image
							source={require("../../assets/back.png")}
							style={{ height: 30, width: 30, tintColor: "teal" }}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity
					onPress={() => {
						setModalVisible(true);
					}}
					style={{
						borderRadius: 50,
						position: "absolute",
						top: 30,
						right: 10,
						height: 50,
						width: 50,
						alignItems:"center",
						justifyContent: "center",
					}}
				>
					<Image
						style={{ height: 30, width: 30,tintColor:"#2C6975" }}
						source={require("../../assets/more.png")}
					/>
				</TouchableOpacity>
				{playing === true ? (
					<Image
						source={Learning[id][AnimalName][30]}
						style={{ height: 200, width: 200 }}
					/>
				) : (
					<Image
						source={Learning[id][AnimalName][29]}
						style={{ height: 200, width: 200 }}
					/>
				)}
				<View style={{ flexDirection: "row" }}>
					<Text
						style={{
							fontSize: 25,
							color: "green",
							textAlign: "center",
							backgroundColor: "#050637",
							padding: 10,
							width: "60%",
							fontWeight: "bold",
							borderTopLeftRadius: 25,
							borderBottomLeftRadius: 25,
						}}
					>
						{Learning[id][AnimalName][0]}
					</Text>
					<TouchableOpacity
						onPress={() => {
							PlaySound();
						}}
					>
						<View
							style={{
								backgroundColor: "#ffcc00",
								padding: 10,
								borderTopRightRadius: 25,
								borderBottomRightRadius: 25,
							}}
						>
							<Image
								source={require("../../assets/volume.png")}
								style={{
									height: 35,
									width: 35,
									tintColor: "#050637",
									marginLeft: 4,
								}}
							/>
						</View>
					</TouchableOpacity>
				</View>
				<Text style={styles.heading}>{Learning[id][AnimalName][1]}</Text>
				<View>
					<Text style={styles.normalText}>
						{Learning[id][AnimalName][2]} : {Learning[id][AnimalName][3]}
					</Text>
					<Text style={styles.normalText}>
						{Learning[id][AnimalName][4]} : {Learning[id][AnimalName][5]}
					</Text>
					<Text style={styles.normalText}>
						{Learning[id][AnimalName][6]} : {Learning[id][AnimalName][7]}
					</Text>
					<Text style={styles.normalText}>
						{Learning[id][AnimalName][8]} : {Learning[id][AnimalName][9]}
					</Text>
					<Text style={styles.normalText}>
						{Learning[id][AnimalName][10]} : {Learning[id][AnimalName][11]}
					</Text>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity style={{position:"absolute",left:"25%"}}>
						<Text style={styles.text}>
							{Learning[id][AnimalName][32]}
						</Text></TouchableOpacity>
					<TouchableOpacity style={{position:"absolute",right:"25%"}}><Text style={styles.text}>
						{Learning[id][AnimalName][33]}
					</Text></TouchableOpacity>
				</View>
			</LinearGradient>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
			>
				<ScrollView style={{ marginTop: "0%" }}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={[styles.heading,{color:"white"}]}>
								{Learning[id][AnimalName][28]}</Text>

							<View style={{ width: "100%" }}>
								<Accordion title={Learning[id][AnimalName][12]}>
									<Text style={styles.normalText}>
										{Learning[id][AnimalName][13]}
									</Text>
								</Accordion>
								<Accordion title={Learning[id][AnimalName][14]}>
									<Text style={styles.normalText}>
										{Learning[id][AnimalName][15]}
									</Text>
								</Accordion>
								<Accordion title={Learning[id][AnimalName][16]}>
									<Text style={styles.normalText}>
										{Learning[id][AnimalName][17]}
									</Text>
								</Accordion>
								<Accordion title={Learning[id][AnimalName][18]}>
									<Text style={styles.normalText}>
										{Learning[id][AnimalName][19]}
									</Text>
								</Accordion>
								<Accordion title={Learning[id][AnimalName][20]}>
									<Text style={styles.normalText}>
										{Learning[id][AnimalName][21]}
									</Text>
								</Accordion>
								<Accordion title={Learning[id][AnimalName][22]}>
									<Text style={styles.normalText}>
										{Learning[id][AnimalName][23]}
									</Text>
								</Accordion>
								<Accordion title={Learning[id][AnimalName][24]}>
									<Text style={styles.normalText}>
										{Learning[id][AnimalName][25]}
									</Text>
								</Accordion>
								<Accordion title={Learning[id][AnimalName][26]}>
									<Text style={styles.normalText}>
										{Learning[id][AnimalName][27]}
									</Text>
								</Accordion>
							</View>
							<TouchableOpacity
								style={{ ...styles.openButton }}
								onPress={() => {
									setModalVisible(!modalVisible);
								}}
							>
								<Image
									source={require("../../assets/cancel.png")}
									style={{
										tintColor:"white",
										height:20,width:20
									}}
								/>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "space-around",
	},
	heading: {
		fontWeight: "bold",
		fontSize: 32,
		marginBottom:10,
		color:"#205072"

	},
	normalText: {
		fontSize: 17,
		paddingLeft: 15,
		paddingRight: 35,
		paddingBottom: 5,
		color:"#205072"
	},
	modalView: {
		margin: 7,
		backgroundColor: "#050637",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
		position:"absolute",
		right:10,
		top:10
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	footer:{
		flexDirection:"row",
	},
	text:{
		fontSize:20,
		color:"black",
		fontWeight:"bold"
	}
});
AnimalLearningscreen.propTypes={
	navigation:PropTypes.any,
};
export default AnimalLearningscreen;