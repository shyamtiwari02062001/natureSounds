import React from "react";
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	StyleSheet,
	ScrollView
} from "react-native";
import LanguageContext from "../../context/LanguageContext";
import DashboardData from "../../constants/Dashboard";
import SelectGame from "../../constants/SelectGame";
import PropTypes from "prop-types";

const DashboardScreen = (props) => {
	const {
		id
	} = React.useContext(LanguageContext);
	const callPage=(index)=>{
		if(index===0){
			props.navigation.navigate("Learning");
		}
		else if(index===1){
			props.navigation.navigate("ListenTap");
		}
	};
	return(
		<View style={{backgroundColor:"#7CFFCB",flex:1}}>
			<Text style={styles.language}>{SelectGame[id]}</Text>
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
		marginTop:"10%",
		marginBottom:"10%"
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
		color:"white"
	}
});
DashboardScreen.propTypes={
	navigation:PropTypes.any,
};
export default DashboardScreen;