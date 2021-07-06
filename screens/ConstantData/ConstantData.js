/* eslint-disable max-len */
import React, {  useEffect } from "react";
import {
	StyleSheet,
	Image,
	View,
	Text,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import GamePointContext from "../../context/GamePoints";
import * as Speech from "expo-speech";
const ConstantData=(props)=> {
	const {AdditionData}=React.useContext(GamePointContext);
	const speak = () => {
		const thingToSay = `It is a ${AdditionData[0]}
        Weight : ${AdditionData[1]}
        Lifespan : ${AdditionData[2]}
        Main Prey : ${AdditionData[3]}
        Favorite Food : ${AdditionData[4]}
        Predators : ${AdditionData[5]}
        `;
		Speech.speak(thingToSay,{rate:0.8,language:"hi-IN"});
	};
	useEffect(() => {
		speak();
	}, []);
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
				<Image
					source={{uri:AdditionData[6]}}
					style={{ height: 200, width: 200 }}
				/>
				<Text style={styles.heading}>It is a {AdditionData[0]}</Text>
				<View>
					<Text style={styles.normalText}>
						Weight : {AdditionData[1]}
					</Text>
					<Text style={styles.normalText}>
						Lifespan : {AdditionData[2]}
					</Text>
					<Text style={styles.normalText}>
						Main Prey : {AdditionData[3]}
					</Text>
					<Text style={styles.normalText}>
						Favorite Food : {AdditionData[4]}
					</Text>
					<Text style={styles.normalText}>
						Predators : {AdditionData[5]}
					</Text>
				</View>
			</LinearGradient>
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
ConstantData.propTypes={
	navigation:PropTypes.any,
};
export default ConstantData;