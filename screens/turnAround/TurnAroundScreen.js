import React from "react";
import {View,
	Dimensions,
	StyleSheet,
	Image,
	Text,
	TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
const TurnAroundScreen=(props)=>{
	return(
		<View>
			<View style={styles.container}>
				<LinearGradient
					colors={["#f04ca0", "#552fea"]}
					style={{
						width: Dimensions.get("window").width,
						height:"100%",
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
				</LinearGradient>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
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
TurnAroundScreen.propTypes={
	navigation:PropTypes.any,
};
export default TurnAroundScreen;