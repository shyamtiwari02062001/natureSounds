import * as React from "react";
import{ NavigationContainer }	from	"@react-navigation/native";
import{ createStackNavigator }	from	"@react-navigation/stack";
import SplashScreen	from	"./screens/splashscreen/splashscreen";
import DashboardScreen from "./screens/Dashboard/dashboardscreen";
import {LanguageProvider} from "./context/LanguageContext";
const Stack = createStackNavigator();
const  App=()=> {
	return (
		<LanguageProvider>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false,}}
					initialRouteName="Splash"
				>
					<Stack.Screen name="Splash"	component={SplashScreen}/>
					<Stack.Screen name="Dashboard" component={DashboardScreen}/>
				</Stack.Navigator>
			</NavigationContainer>
		</LanguageProvider>
	);
};

export default App;