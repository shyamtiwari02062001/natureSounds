import React from "react";
import {
	StyleSheet,
	View,
	Dimensions,
	ImageBackground
} from "react-native";
import * as Animatable	from "react-native-animatable";
import PropTypes from "prop-types";
import { useFonts } from "expo-font";
const SplashScreen = (props) => {
	setTimeout(() => {
		props.navigation.replace("Language");
	}, 5000);
	const [loaded] = useFonts({
		FrederickatheGreat: require(
			"../../assets/fonts/FrederickatheGreat-Regular.ttf"
		),
	});

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
            Nature Sounds
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