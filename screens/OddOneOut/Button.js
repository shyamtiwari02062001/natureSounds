/* eslint-disable react/prop-types */
import React,{useState} from "react";
import { Image,TouchableOpacity } from "react-native";
const Buttons =(props)=>{
	const [color,setcolor]=useState("teal");
	const click=()=>{
		if(props.source!==props.required){
			setcolor("red");
			setTimeout(()=>{
				setcolor("teal");
			},1000);
			props.fun(false);
		}
		if(props.source===props.required){
			props.fun(true);
			setcolor("green");
			setTimeout(()=>{
				setcolor("teal");
			},1000);
		}
	};
	return(
		<TouchableOpacity
			style={{borderWidth:10,borderColor:color,backgroundColor:"white"}}
			onPress={()=>{click();}}>
			<Image source={props.source} style={{height:100,width:100}}/>
		</TouchableOpacity>
	);
};
export default Buttons;