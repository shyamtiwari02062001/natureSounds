import React, { useState } from "react";
import PropTypes from "prop-types";
import {
	View,
	TextInput,
	Text,
} from "react-native";

const FloatingLabelInput = (props) => {
	const {
		label,
		width,
		activeColor,
		textColor,
		paddingLeft,
		paddingRight,
		type,
		required,
		onValueChange
	} = props;
	const [isFocused, setIsFocused] = useState(false);
	const [error, setError] = useState(false);
	const [value, setValue] = useState("");

	const onTextChange = (text) => {
		setValue(text);
		onValueChange(text);
		if(required && text.length===0)
		{
			setError(true);
			return;
		}
		else{
			setError(false);
		}
	};
	const handleFocus = () => {
		setIsFocused(true);

	};
	const handleBlur = () => setIsFocused(false);

	const labelStyle = {
		position: "absolute",
		left:paddingLeft || 5,
		top: isFocused ? 0 : (value==="" ? 22 : 0),
		fontSize: isFocused ? 16 : (value==="" ? 24 : 16),
		color: !isFocused ? "#aaa" : activeColor || "teal",
	};

	return (
		<View style={{
			paddingTop:22,
			paddingBottom:10,
			paddingLeft:paddingLeft || 5,
			paddingRight:paddingRight || 5
		}}>
			<Text style={labelStyle}>
				{label}
			</Text>
			<TextInput
				style={{ height: 30,
					fontSize: 22,
					color: textColor || "#000",
					borderBottomWidth: 1,
					borderBottomColor: error?"red":
						(!isFocused ? "#bbb" :
							activeColor || "teal"),
					width
				}}
				value={value}
				onChangeText={(text)=>{onTextChange(text);}}
				onFocus={handleFocus}
				onBlur={handleBlur}
				secureTextEntry={(type==="password")}
				keyboardType={(type==="phone")?"phone-pad":
					(type==="number")?"number-pad":
						(type==="email")?"email-address":
							"default"}
			/>
		</View>
	);
};

export default FloatingLabelInput;

FloatingLabelInput.propTypes = {
	label: PropTypes.string,
	width: PropTypes.number,
	activeColor: PropTypes.string,
	textColor: PropTypes.string,
	paddingLeft:PropTypes.number,
	paddingRight:PropTypes.number,
	type:PropTypes.string,
	required:PropTypes.bool,
	onValueChange:PropTypes.func
};