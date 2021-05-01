import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TouchableOpacity,TextInput,Button,Keyboard,
  FlatList, SafeAreaView, Image
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StackNavigator } from 'react-navigation';
import HomePage from './src/components/HomePage.js';
import status from './src/components/StatusPage.js';
import { createStackNavigator } from '@react-navigation/stack';
import image from './src/components/R4.png';
 

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={home} />
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Status" component={status} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
  function login (props) {
    const [email, onChangeText] = React.useState('')

    const authenticate = () =>{ 
      
      fetch('https://elevatorapi.herokuapp.com/api/Employees/valid/' + email)

        .then((response) => response.json())
        .then((responseJson)=>{
          if(responseJson == true){
            // redirect to profile page
            alert("Successfully Login");
            props.navigation.navigate("Home");
          }else{
            alert("Wrong Login Details");
          }
        })
      }   
        return (
          <View style={styles.container}>    
         <Image
            source={image}
            style={{ width: 300, height: 200}}
          />
          

          <TextInput
          placeholder="Enter Email"
          style={{width:200, margin:10}}
          onChangeText={(text) => onChangeText(text)}
          value = {email}
          />

          <TouchableOpacity
          onPress={authenticate}
          style={{width:200,padding:10,backgroundColor:'blue',alignItems:'center'}}>
          <Text style={{color:'white'}}>Login</Text>
          </TouchableOpacity>
          </View>
        );   
}

//HOME PAGE
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const home = (props) => {
  const [isLoading, setLoading] = useState(true);
  
  const[data, setData]  = useState([]);
  
  

  useEffect(()=>{
    fetch("https://elevatorapi.herokuapp.com/Elevator/inactive")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  
  // console.log("This is the API" +DATA("https://elevatorapi.herokuapp.com/Elevator/inactive"))
      // },[]
      
     

  function logout (){
    props.navigation.navigate('Login')
  }

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
       <Image
            source={image}
            style={{ width: 300, height: 200}}
          />
          <View>
          <Text style={{width: 300, textAlign: 'center'}}>____________________________________________________________</Text>
          </View>
      <Text style={styles.title}>Elevators</Text>
      <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <Button
                    title={`Elevator  ${item.id}`}
                    onPress={() => {
                    props.navigation.navigate("Status", {
                        id: item.id,
                        status: item.status,
                    });
                    }}
                >
                    id:{item.id}
                    status:{item.status}
                    style={styles.buttonText}
                </Button>
                )}
            />
      
      
      <TouchableOpacity
          onPress={logout}
          style={styles.logout}>
          <Text style={{color:'white'}}>Logout</Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
};






const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
},
logout: {
  
  padding: 7,
    width:90,
    textAlign: "center",
    marginVertical: 3,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    backgroundColor:'#dc143c',
    alignSelf: 'flex-end',
    marginTop: -5,
    top: -710,
},
  item: {
    padding: 7,
    marginVertical: 3,
    marginHorizontal: 6,
  },
  title: {
    fontSize: 32,
  },
  status: {
    fontSize: 22,
    color: 'red'
  }
});

export default App