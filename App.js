import * as React from "react";
import{ NavigationContainer }	from	"@react-navigation/native";
import{ createStackNavigator }	from	"@react-navigation/stack";
import SplashScreen	from	"./screens/splashscreen/splashscreen";
import DashboardScreen from "./screens/Dashboard/dashboardscreen";
import BirdsListScreen from "./screens/BirdsList/BirdsListScreen";
import AnimalListScreen from "./screens/AnimalList/AnimalListScreen";
import BirdsLearningScreen from "./screens/BirdLearning/BirdsLearningscreen";
import AnimalsLearningScreen
	from "./screens/AnimalLearning/AnimalLearningScreen";
const Stack = createStackNavigator();
const  App=()=> {
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
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;