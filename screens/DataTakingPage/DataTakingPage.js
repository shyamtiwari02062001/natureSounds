import React,{useState} from "react";
import {View,AsyncStorage,TouchableOpacity,Text} from "react-native";
import FloatingLabelInput from "../../components/FloatingInput";
import GamePointContext from "../../context/GamePoints";
import PropTypes from "prop-types";
const DataTakingPage=(props)=>{
	const {AdditionData,setAdditionData}=React.useContext(GamePointContext);
	const [BirdName,setBirdName]=useState();
	const [weight,setWeight]=useState();
	const [lifespan,setLifespan]=useState();
	const [mainPrey,setMainPrey]=useState();
	const [favoritefood,setFavoritefood]=useState();
	const [predators,setPredators]=useState();
	const [image,setImage]=useState();
	const pushData = async () => {
		const value=
			[BirdName,
				weight,
				lifespan,
				mainPrey,
				favoritefood,
				predators,
				image]
		;
		try {
			const jsonValue = JSON.stringify(value);
			console.log("s"+jsonValue);
			await AsyncStorage.setItem("@AdditionData", jsonValue);
			console.log("It was saved successfully");
			fetchData();
		} catch (e) {
		// saving error
			console.log("It was not saved successfully");
		}
	};
	const fetchData = async () => {
		try {
			const jsonValue = await AsyncStorage.getItem("@AdditionData");
			setAdditionData(JSON.parse(jsonValue));
			console.log(AdditionData);
			jsonValue != null ? JSON.parse(jsonValue) : null;
		} catch(e) {
		// error reading value
			console.log("It was not saved successfully");
		}
	};
	return (
		<View style={{width:"100%",flex:1,alignItems:"center"}}>
			<View
				style={{
					borderColor:"teal",
					borderWidth:1,
					padding:20,
					marginTop:"9%",
					borderRadius:50
				}}>
				<Text
					style={{
						textAlign:"center",
						fontSize:20,
						fontWeight:"bold"
					}}>Add Bird</Text>
				<FloatingLabelInput
					label="Bird Name"
					width={240}
					height={20}
					onValueChange={(val)=>{setBirdName(val);}}/>
				<FloatingLabelInput
					label="Weight"
					width={240}
					onValueChange={(val)=>{setWeight(val);}}/>
				<FloatingLabelInput
					label="Lifespan"
					width={240}
					onValueChange={(val)=>{setLifespan(val);}}/>
				<FloatingLabelInput
					label="Main Prey"
					width={240}
					onValueChange={(val)=>{setMainPrey(val);}}/>
				<FloatingLabelInput
					label="Favorite Food"
					width={240}
					onValueChange={(val)=>{setFavoritefood(val);}}/>
				<FloatingLabelInput
					label="Predators"
					width={240}
					onValueChange={(val)=>{setPredators(val);}}/>
				<FloatingLabelInput
					label="Image Url"
					width={240}
					onValueChange={(val)=>{setImage(val);}}/>
				<TouchableOpacity
					style={{
						backgroundColor:"skyblue",
						padding:10,
						borderRadius:50,
						marginTop:"5%",
						alignItems:"center"
					}}
					onPress={()=>{pushData();setTimeout(()=>{
						fetchData();
						props.navigation.navigate("BirdList");
					},2000);}}
				>
					<Text style={{
						fontSize:20,
						textAlign:"center",
						fontWeight:"bold"
					}}>Submit</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
DataTakingPage.propTypes={
	navigation:PropTypes.any,
};
export default DataTakingPage;