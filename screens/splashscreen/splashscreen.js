import React,{useEffect} from "react";
import {
	StyleSheet,
	View,
	Dimensions,
	ImageBackground,
	AsyncStorage
} from "react-native";
import * as Animatable	from "react-native-animatable";
import PropTypes from "prop-types";
import { useFonts } from "expo-font";
import LanguageContext from "../../context/LanguageContext";
const SplashScreen = (props) => {
	const {
		setId
	} = React.useContext(LanguageContext);
	setTimeout(() => {
		props.navigation.navigate("Dashboard");
	}, 2000);
	const [loaded] = useFonts({
		FrederickatheGreat: require(
			"../../assets/fonts/FrederickatheGreat-Regular.ttf"
		),
	});
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
	},[]);
	if (!loaded) {
		return null;
	}
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/splash1.png")}
				style={styles.imageBackground}
			>
				<View
					style={styles.textView}
				>
					<Animatable.Text
						animation="bounceInLeft"
						style={styles.headingText}
					>
            Animopedia
					</Animatable.Text>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
	},
	headingText: {
		fontSize: 60,
		fontFamily:"FrederickatheGreat",
		color: "#050637",
		textAlign: "center",
	},
	textView: {
		height: "100%",
		width: "100%",
		opacity: 0.95,
		alignItems: "center",
		justifyContent: "center",
	},
	imageBackground: {
		flex: 1,
		justifyContent: "center",
		width:Dimensions.get(
			"window"
		).width,
	}
});
export default SplashScreen;
SplashScreen.propTypes={
	navigation:PropTypes.any,
};