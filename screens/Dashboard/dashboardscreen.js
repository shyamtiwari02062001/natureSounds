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
	Image
} from "react-native";
import DashboardData from "../../constants/Dashboard";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import Languages from "../../constants/language";
const DashboardScreen = (props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [id,setId]=useState(0);
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
			}
		} catch(e) {
			console.log(e);
		}
	};
	useEffect(()=>{
		getData();
	});
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
			props.navigation.navigate("TurnAround");
		}
		if(index===5){
			props.navigation.navigate("Listen");
		}
	};
	return(
		<View style={{backgroundColor:"#7CFFCB",flex:1}}>
			<View style={{flex:1}}>
				<TouchableOpacity
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
						<View style={{alignItems:"center"}}>
							{DashboardData[id].map((lan,index)=>
								(index%2==0)&&
								<View
									style={styles.buttonContainer}
									key={index}>
									<TouchableOpacity style={styles.button}
										onPress={()=>{redirect(index);}}
									>
										<Image source={lan[1]}
											style={{
												height:100,
												width:100,
												alignItems:"center"
											}}
										/>
										<Text
											style={styles.text}>
											{lan[0]}
										</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
						<View style={{alignItems:"center"}}>
							{DashboardData[id].map((lan,index)=>
								(index%2!==0)&&
								<View
									style={styles.buttonContainer}
									key={index}>
									<TouchableOpacity style={styles.button}
										onPress={()=>{redirect(index);}}
									>
										<Image source={lan[1]}
											style={{
												height:100,
												width:100,
												alignItems:"center"
											}}
										/>
										<Text
											style={styles.text}>
											{lan[0]}
										</Text>
									</TouchableOpacity>
								</View>
							)}
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
		justifyContent:"center",
		alignItems:"center",padding:10,
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
		marginTop:"5%",
		flexDirection:"row",
		justifyContent:"space-around",
		alignItems:"center"
	}
});
DashboardScreen.propTypes={
	navigation:PropTypes.any,
};
export default DashboardScreen;