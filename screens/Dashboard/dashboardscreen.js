import React, {useState} from "react";
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Modal,
	AsyncStorage
} from "react-native";
import LanguageContext from "../../context/LanguageContext";
import DashboardData from "../../constants/Dashboard";
import PropTypes from "prop-types";
import Languages from "../../constants/language";
const DashboardScreen = (props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const {
		id,
		setId
	} = React.useContext(LanguageContext);
	const callPage=(index)=>{
		if(index===0){
			props.navigation.navigate("Learning");
		}
		else if(index===1){
			props.navigation.navigate("ListenTap");
		}
	};
	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem("@storage_Key", value);
		} catch (e) {
			console.log(e);
		}
	};
	console.log(id);
	return(
		<View style={{backgroundColor:"#7CFFCB",flex:1}}>
			<TouchableOpacity  onPress={() => setModalVisible(true)}>
				<Text style={styles.language}>Select Language</Text>
			</TouchableOpacity>

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
						<ScrollView>
							{Languages.map((lan,index)=>
								<TouchableOpacity
									key={index}
									onPress={()=>{
										storeData(`${index}`);
										setId(index);
										setModalVisible(!modalVisible);
									}}
								>
									<Text style={styles.language}>{lan}</Text>
								</TouchableOpacity>
							)}
						</ScrollView>
					</View>
				</View>
			</Modal>
			<ScrollView style={styles.container}>
				{DashboardData[id].map((lan,index)=>
					<View style={styles.buttonContainer} key={index}>
						<TouchableOpacity style={styles.button}
							onPress={()=>{callPage(index);}}
						>
							<Text style={styles.text}>{lan}</Text>
						</TouchableOpacity>
					</View>
				)}
			</ScrollView>
		</View>
	);
};
const styles = StyleSheet.create({
	container:{
		backgroundColor:"#7CFFCB",
		marginBottom:"40%"
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
		marginBottom:"10%",
		alignItems:"center",
	},
	button:{
		backgroundColor:"#050637",
		height:50,
		width:"80%",
		justifyContent:"center",
		borderRadius:50
	},
	text: {
		fontSize:25,
		textAlign:"center",
		color:"white",
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
});
DashboardScreen.propTypes={
	navigation:PropTypes.any,
};
export default DashboardScreen;