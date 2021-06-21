import * as React from "react";
import {LogBox} from "react-native";
import{ NavigationContainer }	from	"@react-navigation/native";
import{ createStackNavigator }	from	"@react-navigation/stack";
import SplashScreen	from	"./screens/splashscreen/splashscreen";
import DashboardScreen from "./screens/Dashboard/dashboardscreen";
import BirdsListScreen from "./screens/BirdsList/BirdsListScreen";
import AnimalListScreen from "./screens/AnimalList/AnimalListScreen";
import BirdsLearningScreen from "./screens/BirdLearning/BirdsLearningscreen";
import AnimalsLearningScreen
	from "./screens/AnimalLearning/AnimalLearningScreen";
import OddOneOutScreen from "./screens/OddOneOut/OddOneOutScreen";
import JumbledWords from "./screens/jumbledWords/JumbledWordsScreen";
import ListenScreen from "./screens/listen/listenScreen";
const Stack = createStackNavigator();
const  App=()=> {
	LogBox.ignoreAllLogs();
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false,}}
				initialRouteName="Splash"
			>
				<Stack.Screen name="Splash"	component={SplashScreen}/>
				<Stack.Screen name="Dashboard" component={DashboardScreen}/>
				<Stack.Screen name="BirdList" component={BirdsListScreen}/>
				<Stack.Screen name="AnimalList"
					component={AnimalListScreen}
				/>
				<Stack.Screen name="BirdLearning"
					component={BirdsLearningScreen}
				/>
				<Stack.Screen name="AnimalLearning"
					component={AnimalsLearningScreen}
				/>
				<Stack.Screen name="OddOneOut"
					component={OddOneOutScreen}
				/>
				<Stack.Screen name="JumbledWords"
					component={JumbledWords}
				/>
				<Stack.Screen name="Listen"
					component={ListenScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;