import { StatusBar } from 'expo-status-bar';
import React, { Component, useEffect, useState } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
   SafeAreaView, ActivityIndicator, Image, View
} from 'react-native';
import image from './R4.png'
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { StackNavigator } from 'react-navigation';


import { createStackNavigator } from '@react-navigation/stack';



const status=(props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  
  useEffect(()=>{
    fetch('https://elevatorapi.herokuapp.com/Elevator/'+id)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));                      
}, [data]);

  function activate () {
    fetch('https://elevatorapi.herokuapp.com/Elevator/' + id + '/status',  {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      
      body: JSON.stringify({
        status : 'Active'
      }),
    })
    .then((response) => response.text())
        .then((responseText) => {
            alert("Changed Status")
        })
        .catch((error) => {
            console.error(error);
        });
    };
    function logout (){
      props.navigation.navigate('Login')
    }
  const { id } = props.route.params;
  
  
      useEffect(() => {
        return () => {
          console.log("cleans useEffect");
        };
    }, [isLoading]);
   
  
  function home (){
    props.navigation.navigate('Home')
  }
  return (
    <SafeAreaView style={styles.container}>
     <Image
      source={image}
      style={{ width: 300, height: 200}}
    />
    <View>
    <Text style={{width: 300, textAlign: 'center'}}>____________________________________________________________</Text>
  </View>
      <Text style={styles.title}>Elevator Status: </Text>
       
                   {isLoading ? <ActivityIndicator/> : (
                    <Text  
                        style={[
                        styles.status,
                        data.status == "Inactive" ?
                        { backgroundColor: '#dc143c' } 
                        : { backgroundColor: 'green' }
                    ]}>
                        {data.status}
                    </Text>
                )}
                
      
      <TouchableOpacity
          data={data}
          onPress={activate}
          style={{width:100,padding:10,backgroundColor:'blue',alignItems:'center',borderRadius: 20 }}>
          <Text style={styles.makeActive}>Turn Active</Text>
        </TouchableOpacity>
          
       
      
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
    width:100,
    textAlign: "center",
    marginVertical: 3,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    backgroundColor:'#dc143c',
    alignSelf: 'flex-end',
    marginTop: -5,
    top: -560,
   
},
  item: {
    padding: 7,
    marginVertical: 3,
    marginHorizontal: 6,
  },
  title: {
    fontSize: 32,
  },
  makeActive:{
    padding: 7,
    width:100,
    textAlign: "center",
    marginVertical: 3,
    marginHorizontal: 6,
    fontSize: 18,
    color: 'white',
    backgroundColor:'blue',
    borderRadius: 20
    
  },
  status: {
    padding: 7,
    width:200,
    textAlign: "center",
    marginVertical: 3,
    marginHorizontal: 6,
    fontSize: 22,
    color: 'white',
    borderRadius: 10
  }
});

export default status
