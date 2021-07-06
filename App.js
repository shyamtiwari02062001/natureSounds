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
import EndangeredAnimal from "./screens/EndangeredAnimal/EndangeredAnimal";
import EpicsAnimal from "./screens/EpicsAnimal/EpicsAnimal";
import DataTakingPage from "./screens/DataTakingPage/DataTakingPage";
import ConstantData from "./screens/ConstantData/ConstantData";
import { GamePointProvider } from "./context/GamePoints";
const Stack = createStackNavigator();
const  App=()=> {
	LogBox.ignoreAllLogs();
	return (
		<GamePointProvider>
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
					<Stack.Screen name="EndangeredAnimal"
						component={EndangeredAnimal}
					/>
					<Stack.Screen name="EpicsAnimal"
						component={EpicsAnimal}/>
					<Stack.Screen name="DataTakingPage"
						component={DataTakingPage}/>
					<Stack.Screen name="ConstantData"
						component={ConstantData}/>
				</Stack.Navigator>
			</NavigationContainer>
		</GamePointProvider>
	);
};

export default App;