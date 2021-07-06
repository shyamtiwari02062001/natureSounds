import React from "react";
import {  Modal, View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles/index";
const Popup = (props) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={props.visible}
			style={{height:"40%"}}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={{marginTop:20,justifyContent:"space-around"}}>
						{props.children}
					</View>
				</View>

			</View>
		</Modal>
	);
};
Popup.propTypes = {
	type:PropTypes.string,
	visible:PropTypes.bool,
	content:PropTypes.string,
	onClose:PropTypes.func,
	title:PropTypes.string,
};
export default Popup;