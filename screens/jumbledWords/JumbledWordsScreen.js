import React, { useState, useEffect } from "react";
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	AsyncStorage
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";
import { Audio } from "expo-av";
import jumbledWords from "../../constants/jumbledWords";
const Main = (props) => {
	// eslint-disable-next-line prefer-const
	let [answeres, setAnswers] = useState([]);
	const [success, setSuccess] = useState("");
	const [sound, setSound] = React.useState();
	const [id,setId]=useState(0);
	// eslint-disable-next-line prefer-const
	let [gameLevel,setGamelevel]=useState(0);
	// eslint-disable-next-line prefer-const
	let [count, setCount] = useState(0);
	// eslint-disable-next-line prefer-const
	let [alphabets, setAlphabet] = useState(jumbledWords[id][gameLevel][0]);
	const [correct,setCorrect]=useState(jumbledWords[id][gameLevel][1]);
	const change = (index) => {
		if (correct.length > count) {
			const val = alphabets[index];
			setAlphabet(alphabets.filter((alphabet) => alphabet != val));
			answeres.push(val);
			setAnswers(answeres);
			Check();
			setCount(++count);
		}
	};
	const Check = () => {
		if (answeres.length === correct.length) {
			for (let i = 0; i < answeres.length; i++) {
				if (correct[i] === answeres[i]) {
					setSuccess("true");
				} else {
					setSuccess("wrong");
					break;
				}
			}
		}
	};
	const changeAnswere = (index) => {
		if (count >= 1) {
			setCount(--count);
			const val = answeres[index];
			setAnswers(answeres.filter((answere) => answere != val));
			alphabets.push(val);
			setAlphabet(alphabets);
			setSuccess("false");
		}
	};
	// eslint-disable-next-line func-style
	async function PlaySound() {
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(
			jumbledWords[id][gameLevel][2]
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
	useEffect(() => {
		getData();
		return sound
			? () => {
				console.log("Unloading Sound");
				sound.unloadAsync();
			}
			: undefined;
	}, [sound]);
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={["#f04ca0", "#552fea"]}
				style={{
					flex: 1,
					width: Dimensions.get("window").width,
					alignItems: "center",
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
              3457
						</Text>
					</View>
				</View>
				<View
					style={{
						alignItems: "center",
						backgroundColor: "#050637",
						width: Dimensions.get("window").width,
						flex: 0.6,
						Top: "20%",
						borderBottomLeftRadius: 250,
						borderBottomRightRadius: 250,
					}}
				>
					<Text
						style={{
							fontSize: 30,
							fontWeight: "bold",
							color: "white",
							marginTop: "5%",
						}}
					>
						{jumbledWords[id][gameLevel][4]}
					</Text>
					<View style={{ flexDirection: "row" }}>
						{alphabets.map((alphabet, index) => (
							<TouchableOpacity key={index}
								onPress={() => change(index)}>
								<Text style={styles.text}>{alphabet}</Text>
							</TouchableOpacity>
						))}
					</View>
					<View
						style={{
							backgroundColor: "#ffcc00",
							borderRadius: 500,
							marginTop: "10%",
							position: "absolute",
							top: "48%",
						}}
					>
						<Image
							source={jumbledWords[id][gameLevel][3]}
							style={{ height: 170, width: 200 }}
						/>
					</View>
				</View>
				<View
					style={{
						flex: 0.57,
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<View style={{ flexDirection: "row" }}>
						{answeres.map((answere, index) => (
							<TouchableOpacity
								key={index}
								onPress={() => changeAnswere(index)}
								style={{ padding: 2, marginTop: "25%" }}
							>
								<View
									style={{
										borderColor: "black",
										borderWidth: 2,
										borderRadius: 10,
									}}
								>
									<Text style={[styles.text]}>{answere}</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
					{success === "true" && (
						<View style={{ flexDirection: "row", marginTop: "7%" }}>
							<Text
								style={{
									fontSize: 20,
									color: "green",
									textAlign: "center",
									backgroundColor: "#050637",
									padding: 10,
									width: "40%",
									fontWeight: "bold",
									borderTopLeftRadius: 25,
									borderBottomLeftRadius: 25,
								}}
							>
								{jumbledWords[id][gameLevel][8]}
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
										source={
											require("../../assets/volume.png")
										}
										style={{
											height: 30,
											width: 30,
											tintColor: "#050637",
											marginLeft: 4,
										}}
									/>
								</View>
							</TouchableOpacity>
						</View>
					)}
					{success === "wrong" && (
						<View style={{ marginTop: "7%" }}>
							<Text
								style={{
									fontSize: 20,
									textAlign: "center",
									width: "70%",
									color: "#fc0124",
									backgroundColor: "#050637",
									padding: 11,
									fontWeight: "bold",
									borderRadius: 50,
								}}
							>
								{jumbledWords[id][gameLevel][9]}
							</Text>
						</View>
					)}
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: "70%",
						marginLeft: "5%",
						marginBottom: "5%",
					}}
				>
					<TouchableOpacity onPress={()=>{
						setGamelevel(--gameLevel);
						alphabets=[];
						answeres=[];
						setCount(0);
						setAnswers([]);
						setSuccess("false");
						setAlphabet(jumbledWords[id][gameLevel][0]);
						setCorrect(jumbledWords[id][gameLevel][1]);
					}}>
						<Text
							style={{
								fontSize: 15,
								textAlign: "center",
								color: "white",
								fontWeight: "bold",
							}}
						>
							{jumbledWords[id][gameLevel][6]}
						</Text>
					</TouchableOpacity>
					{success === "wrong" && (
						<TouchableOpacity onPress={()=>{
							setGamelevel(gameLevel);
							alphabets=[];
							answeres=[];
							setAnswers([]);
							setSuccess("false");
							setCount(0);
							setAlphabet(jumbledWords[id][gameLevel][0]);
							setCorrect(jumbledWords[id][gameLevel][1]);
						}}>
							<Text
								style={{
									fontSize: 15,
									textAlign: "center",
									color: "white",
									fontWeight: "bold",
								}}
							>
								{jumbledWords[id][gameLevel][7]}
							</Text>
						</TouchableOpacity>
					)}
					{success === "true" && (
						<TouchableOpacity onPress={()=>{
							setGamelevel(++gameLevel);
							alphabets=[];
							answeres=[];
							setAnswers([]);
							setSuccess("false");
							setCount(0);
							setAlphabet(jumbledWords[id][gameLevel][0]);
							setCorrect(jumbledWords[id][gameLevel][1]);
						}}>
							<Text
								style={{
									fontSize: 15,
									textAlign: "center",
									color: "white",
									fontWeight: "bold",
								}}
							>
								{jumbledWords[id][gameLevel][5]}
							</Text>
						</TouchableOpacity>
					)}

				</View>
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
	text: {
		fontSize: 40,
		fontWeight: "bold",
		padding: 10,
		color: "white",
	},
});
Main.propTypes={
	navigation:PropTypes.any,
};
export default Main;