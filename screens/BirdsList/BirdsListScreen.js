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
} from "react-native";
import BirdsList from "../../constants/BirdsList";
import { LinearGradient } from "expo-linear-gradient";
import GamePointContext from "../../context/GamePoints";
import PropTypes from "prop-types";
const BirdListScreen=(props)=>{
	const {gamePoint,AdditionData}=React.useContext(GamePointContext);
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
		try {
			await AsyncStorage.setItem("@BirdName", value);
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(()=>{
		getData();
	},[]);
	console.log(AdditionData);
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
							marginTop:"5%",padding:10}}>
							{(BirdsList[id].map((val,index)=>
								(index%2===0)&&<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											storeData(BirdsList[0][index][0]);
											// eslint-disable-next-line max-len
											props.navigation.navigate("BirdLearning");
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
							marginTop:"5%",
							padding:10
						}}>
							{(BirdsList[id].map((val,index)=>
								(index%2!==0)&&<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											storeData(BirdsList[0][index][0]);
											// eslint-disable-next-line max-len
											props.navigation.navigate("BirdLearning");
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
					<View style={{
						padding:10,marginBottom:20
					}}>
						{(AdditionData!==null)&&
						<View
							style={{alignItems:"center"}}>
							<TouchableOpacity style={styles.shape}
								onPress={()=>{
									props.navigation.navigate("ConstantData");
								// eslint-disable-next-line max-len
								}}>
								<Image source={{
									uri: AdditionData[6],
								}}style={[styles.image,{borderRadius:50}]} />
								<Text style={styles.text}
								>{AdditionData[0]}</Text>
							</TouchableOpacity>
						</View>}
					</View>
				</ScrollView>
				<View style={{position:"absolute",bottom:-25,right:-40}} >
					<TouchableOpacity onPress={()=>
					{props.navigation.navigate("DataTakingPage");}}
					style={{position:"absolute",bottom:40,right:50}}>
						<Image source={require("../../assets/add.png")}
							style={{height:50,width:50}}/>
					</TouchableOpacity>
				</View>
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
BirdListScreen.propTypes={
	navigation:PropTypes.any,
};
export default BirdListScreen;