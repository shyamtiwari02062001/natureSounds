import * as React from "react";
import{ NavigationContainer }	from	"@react-navigation/native";
import{ createStackNavigator }	from	"@react-navigation/stack";
import SplashScreen	from	"./screens/splashscreen/splashscreen";
import LanguageScreen from "./screens/languageScreen/langugeScreen";
import DashboardScreen from "./screens/Dashboard/dashboardscreen";
import {LanguageProvider} from "./context/LanguageContext";
import LearningMaterial from "./screens/Learning/Learningscreen";
import ListenAndTap from "./screens/ListenAndTap/ListenAndTapscreen";
const Stack = createStackNavigator();
const  App=()=> {
	return (
		<LanguageProvider>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false,}}
					initialRouteName="Splash"
				>
					<Stack.Screen name="Splash"	component={SplashScreen}/>
					<Stack.Screen name="Language" component={LanguageScreen}/>
					<Stack.Screen name="Dashboard" component={DashboardScreen}/>
					<Stack.Screen name="Learning" component={LearningMaterial}/>
					<Stack.Screen name="ListenTap" component={ListenAndTap}/>
				</Stack.Navigator>
			</NavigationContainer>
		</LanguageProvider>
	);
};

export default App;