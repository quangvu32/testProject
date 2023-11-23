import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Alert, Image, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';

Stack = createStackNavigator();
const renderItem = ({item}) => {
  return(
  <View style={styles.itemList} key = {item.id}>
        <TouchableOpacity onPress={() => {Alert.alert(item.title, item.description)}}>
            <Image style={styles.image} source={{uri: item.image}}/>
            <Text style={styles.itemText}>${item.price}</Text>
        </TouchableOpacity>
  </View>
  );
}

const Menu = ({navigation}) => {
  const[tokens, setToken] = useState([])
  useEffect(() => {
  axios.get('https://fakestoreapi.com/products')
  
  .then((response)=>{
    setToken(response.data);
    //onst decode = jwtDecode(response.data.token);
    console.log('Response:', response.data);
    //console.log('Token:', decode);
  })
  .catch((error)=>{
      console.log(error);
  })
  .then(()=>{
    
      console.log('Done');
  });
}, []);
  return(
    <FlatList
              data = {tokens}
              renderItem={renderItem}
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              style={styles.container}
          />
  );
}

const MainMenu = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Button title="Go to Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}
const App = () => {
  
  return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MainMenu" component={MainMenu} />
            <Stack.Screen name="Menu" component={Menu} />
          </Stack.Navigator>
        </NavigationContainer>
  );
      };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image:{
    width: 180,
    height: 180,
    alignContent:'space-between',
    marginVertical: 8,
    alignSelf: 'center',

  },
  container:{
    alignSelf: 'center'
  },
  itemText:{
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal:50,
    color: '#0D47A1'
  },
});

export default App;