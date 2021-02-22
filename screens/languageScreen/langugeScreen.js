import React from "react";
import {
	View,
	ScrollView,
	StyleSheet,
	Dimensions,
	Text,
	TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import Language from "../../constants/language";
import LanguageContext from "../../context/LanguageContext";
const LanguageSelector = (props) => {
	const {
		setId
	} = React.useContext(LanguageContext);
	return (
		<View style={{backgroundColor:"#7CFFCB"}}>
			<Text style={styles.language}>Select Language</Text>

			<ScrollView style={styles.container}>
				{Language.map((lan,index)=>
					<View style={styles.buttonContainer} key={index}>
						<TouchableOpacity
							style={styles.button}
							onPress={()=>{
								setId(index);
								props.navigation.navigate("Dashboard");
							}}
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
		fontSize:45,
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
LanguageSelector.propTypes={
	navigation:PropTypes.any,
};
export default LanguageSelector;
