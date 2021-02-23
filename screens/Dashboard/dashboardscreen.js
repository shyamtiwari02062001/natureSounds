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
import BirdsConstant from "../../constants/Games";
const DashboardScreen = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const {
		id,
		setId,
		gameId,
		setGameId
	} = React.useContext(LanguageContext);
	const storeData = async (value) => {
		try {
			await AsyncStorage.setItem("@storage_Key", value);
		} catch (e) {
			console.log(e);
		}
	};
	return(
		<View style={{backgroundColor:"#7CFFCB",flex:1}}>
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
			<ScrollView style={styles.container}
				showsVerticalScrollIndicator={false}
				showsHorizontalScrollIndicator={false}>
				{DashboardData[id].map((lan,index)=>
					<View style={styles.buttonContainer} key={index}>
						<TouchableOpacity style={styles.button}
							onPress={()=>{setGameId(index);}}
						>
							<Text style={styles.text}>{lan}</Text>
							{(gameId===index)&&
							BirdsConstant[gameId].map((lan,index)=>
								<View style={{flex:1,alignContent:'center'}} key={index}>
									<TouchableOpacity
										onPress={()=>{}}
									>
										<Text style={styles.text}>{lan}</Text>
									</TouchableOpacity>
								</View>
							)}
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
		alignItems:"center",padding:10
	},
	button:{
		backgroundColor:"#050637",
		width:"80%",
		justifyContent:"center",
		borderRadius:50,
		padding:10
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
	modalcontent:{
		fontSize:20,
		textAlign:"center",
		padding:10
	}
});
DashboardScreen.propTypes={
	navigation:PropTypes.any,
};
export default DashboardScreen;