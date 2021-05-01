import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TouchableOpacity,TextInput,Button,Keyboard
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StackNavigator } from 'react-navigation';
import HomePage from './src/components/HomePage.js';
import StatusPage from './src/components/StatusPage.js';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={log} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function log() {
    const login = ({navigation}) =>{
      const [email, onChangeText] = React.useState('')
      
      
      fetch('https://elevatorapi.herokuapp.com/api/Employees/valid/' + email)
      
      
      .then((response) => response.json())
       .then((responseJson)=>{
         if(responseJson == true){
           // redirect to profile page
           alert("Successfully Login");
           () => navigation.navigate("Home");
         }else{
           alert("Wrong Login Details");
         }
       })

    }
    return (
	<View style={styles.container}>    
	{/* <Text style={{padding:10,margin:10,color:'red'}}>{this.state.email}</Text> */}
	
	<TextInput
	placeholder="Enter Email"
	style={{width:200, margin:10}}
	onChangeText={(email) => onChangeText(email)}
	/>

	<TouchableOpacity
  onPress={() => navigation.navigate('Home')}
	onPress={login}
	style={{width:200,padding:10,backgroundColor:'blue',alignItems:'center'}}>
	<Text style={{color:'white'}}>Login</Text>
	</TouchableOpacity>
	
	
     </View>
  
   );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

export default App