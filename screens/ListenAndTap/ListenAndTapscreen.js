/* eslint-disable func-style */
import React, { useEffect, useState } from "react";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import LanguageContext from "../../context/LanguageContext";
import ListenAndTap from "../../constants/ListenAndTap";
import PropTypes from "prop-types";
const DashboardScreen = (props) => {
	const number=0;
	const [sound, setSound] = useState();
	const [option, setOption] = useState(null);
	async function PlaySound() {
		const { sound } = await Audio.Sound.createAsync(
			require("../../assets/koyal.mp3")
		);
		setSound(sound);
		await sound.playAsync();
		setTimeout(()=> {}, 3000);
	}
	const {
		id
	} = React.useContext(LanguageContext);
	useEffect(() => {
		return sound
			? () => {
				console.log("Unloading Sound");
				sound.unloadAsync();
			}
			: undefined;
	}, [sound]);
	return (
		<View>
			<LinearGradient
				colors={["#89f7fe", "#66a6ff"]}
				style={{
					width: Dimensions.get("window").width,
					height:"100%",
					justifyContent: "space-around",
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
				<Text style={styles.heading}>{ListenAndTap[id][number][0]}
				</Text>
				<View >
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							padding: 10,
						}}
					>
						<TouchableOpacity onPress={()=>{setOption(false);}}>
							<Image
								source={require("../../assets/penguin.png")}
								style={{ height: 125, width: 125 }}
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{setOption(true);}} >
							<Image
								source={require("../../assets/koyal.png")}
								style={{ height: 125, width: 160 }}
							/>
						</TouchableOpacity>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-around",
							alignItems: "center",
							padding: 10,
						}}
					>
						<TouchableOpacity onPress={()=>{setOption(false);}}>
							<Image
								source={require("../../assets/peacock.png")}
								style={{ height: 125, width: 125 }}
							/>
						</TouchableOpacity>
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							padding: 10,
						}}
					>
						<TouchableOpacity onPress={()=>{setOption(false);}}>
							<Image
								source={require("../../assets/crow.png")}
								style={{ height: 125, width: 125 }}
							/>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>{setOption(false);}}>
							<Image
								source={require("../../assets/owl.png")}
								style={{ height: 125, width: 125 }}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{ flexDirection: "row", alignSelf: "center" }}>
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
					>{ListenAndTap[id][number][1]}
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
				<View>
					{(option===true&&option!==null)&&
                    <Text style={styles.success}>{ListenAndTap[id][number][2]}
                    </Text>}
					{(option===false&&option!==null)&&
                    <Text style={styles.error}>{ListenAndTap[id][number][3]}
                    </Text>}
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: "serif",
		fontSize: 30,
		fontWeight: "bold",
		paddingLeft: 40,
		paddingRight: 40,
		padding: 10,
		color: "white",
		textAlign: "center",
	},
	englishText: {
		fontSize: 20,
		fontWeight: "bold",
		paddingLeft: 20,
		paddingRight: 20,
		color: "white",
		textAlign: "center",
		paddingBottom: 10,
	},
	shape: {
		backgroundColor: "#050637",
		borderRadius: 50,
		width: "80%",
	},
	success:{
		color:"green",
		fontSize:25,
		textAlign:"center",
		fontWeight:"bold"
	},
	error:{
		color:"red",
		fontSize:25,
		textAlign:"center",
		fontWeight:"bold"
	},
	heading:{
		fontSize:16,
		fontWeight:"bold",
		textAlign:"center",
		marginTop:20,
		color:"black"
	}
});
DashboardScreen.propTypes={
	navigation:PropTypes.any,
};
export default DashboardScreen;