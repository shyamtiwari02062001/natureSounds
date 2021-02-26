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
import PropTypes from "prop-types";
const AnimalListScreen=(props)=>{
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
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}>
					<View style={{
						flex:1,
						flexDirection:"row",
						justifyContent:"center"
					}}>
						<View style={{marginBottom:"5%"}}>
							{(AnimalsList[id].map((val,index)=>
								(index%2===0)&&<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											// eslint-disable-next-line max-len
											storeData(AnimalsList[id][index][0]);
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
						<View style={{marginBottom:"5%"}}>
							{(AnimalsList[id].map((val,index)=>
								(index%2!==0)&&<View key={index}
									style={styles.view}>
									<TouchableOpacity style={styles.shape}
										onPress={()=>{
											// eslint-disable-next-line max-len
											storeData(AnimalsList[id][index][0]);
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
		height:125,
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