//import React, { useEffect, useState } from 'react';
//import { Text, View, TextInput, Pressable, Switch, FlatList, SafeAreaView, StatusBar, TouchableOpacity, } from 'react-native'; 
//import StyleSheet from './Styles';
//import styles from './Styles';
//datan tallennus
import Row from './components/Row';
import Add from './components/Add';
import { useCallback, useEffect } from 'react';
import Search from './components/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items_key'

//mihin väliin tämä geData koodi tulee??!!
const getData = async() => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY)
    const json = JSON.parse(value)
    if (json === null) {
      //let json = []}
      json = []
    }
    setData(json)
  } catch (ex) {
    console.log(ex)
  }
} 

// Entä mihin väliin tämä tulee???!!
// Add another function for saving/storing data in App.js
const storeData = async(value) => {
  try {
    const json = JSON.stringify(value)
    await AsyncStorage.setItem(STORAGE_KEY,json)
  } catch (ex) {
    console.log(ex)
  }
}


export default function App() {
  const [data, setData] = useState([])
  //lisätään filtteröintiä/etsintää varten
  const [criteria, setCriteria] = useState('')
  const items = useMemo(() =>
    criteria.length > 0 ? data.filter((item)=>item.name.startsWith(criteria)) : data, [data,criteria])
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    //AsyncStorage.clear()
    getData()
  }, [])

  useEffect(() => {
    storeData(data)
  }, [data])

  //mihin tämä alla oleva tulee?? add.js vai app.js???
  const add = useCallback((name) => {
    const newItem = {
      id: uui.v4(),
      name: name
    }
    const tempData = [...data, newItem]
    setData(tempData)
  }, [data])


    
  return (    
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <Add add={data} setData={setData} />
      <FlatList
        data={items}
        keyExtractor= {(item) => item.id}
        extraData={selectedId}
        renderItem={({ item }) => (
            <Row 
              item={item} 
              selectedId={selectedId}
              select={select}
              data={data}
              setData={setData}
            />
        )}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
      flexDirection: 'row', // Takes up the full available space
      justifyContent: 'space-between', // Distributes space evenly between fields
      marginBottom: 16,
      //padding: 20, // Adds padding around the content

      // Inline styles
      color: 'blue',
      textDecorationLine: 'underline',
  },
  header: {
      flexDirection: 'row', // Takes up the full available space
      justifyContent: 'space-between', // Distributes space evenly between fields
      marginBottom: 16,
      fontSize: 16,
      fontWeight: 'bold',
  
      // Inline styles
      color: 'blue',
      textDecorationLine: 'underline',
  },
});


/*
//data..
const STORAGE_KEY = '@items_key'
const getData = async() => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY)
    const json = JSON.parse(value)
    if (json === null) {let json = []}
    setData(json)
  } 
  catch (ex) {console.log(ex)}
}
  //////
const storeData = async(value) => {
  try {
    const json = JSON.stringify(value)
    await AsyncStorage.setItem(STORAGE_KEY,json)
  } catch (ex) {
    console.log(ex)
  }
}
//datan...loppuu

  const renderItem = ({ item: task }) => ( // Destructure item to task
    <View style={styles.listItem}>  {/* Use View instead of Li *//*}
      <Switch
        value={task.completed}
        onValueChange={() => handleToggleTask(task.id)}
      />
      <Text style={styles.taskText}>{task.text}</Text>
      <Pressable 
        style={[styles.button, styles.buttonDeleteData]}
        onPress={() => handleDeleteTask(task.id)}>
        <Text style={styles.pressableText}>Poista</Text>
      </Pressable>
    </View>
  );
*/


/*
export default function App() 
  {
    //datan...
    const [data, setData] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    // Call getData on component mount (empty dependency array [])
    useEffect(() => {
        //AsyncStorage.clear()
        getData
        }, [] )
    // Call storeData whenever data state changes (dependency array [data])
    useEffect(() => {
        storeData(data);
        }, [data] )

  //alkup.
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState([
    { id: Date.now(), text: ' Poista ensin tämä esimerkkirivi ', completed: false }
    ]);

  const handleAddTask = (name) => {
      //setTasks([...tasks, { id: Date.now(), text, completed: false }]);
      // Luo uusi tehtäväolio
      const newTask = { id: Date.now(), text: name, completed: false };
      // Päivitä tasks-tila lisäämällä uusi tehtävä
      setTasks([...tasks, newTask]);
      setName(''); // Tyhjennä TextInputin arvo
    };

  const handleToggleTask = (id) => {
      setTasks(
        tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id  
    !== id));
    };
  
  const handleSaveData = () => {
    storeData(data); // Call storeData to save current data
    };

  const TaskItem = ({ task, handleToggleTask, handleDeleteTask }) => {
    // ... content of TaskItem component
    };

  return (    
    <>
      <View style={styles.todoListText}>
        <Text>Todo list</Text>
        <Text> </Text>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.textInput}
          placeholder="Kirjoita tehtävä tähän"
          placeholderTextColor="#aaa" // Muuta placeholder-tekstin väriä halutessasi
        />
      </View>
      <Pressable 
        style={[styles.button, styles.buttonAddData]}
        onPress={() => handleAddTask(name)}><Text style={styles.pressableText}>Lisää tehtävä todo-listalle</Text></Pressable>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskItem task={item} handleToggleTask={handleToggleTask} handleDeleteTask={handleDeleteTask} />}
        keyExtractor={(item) => item.id}
      />
        {tasks.map((task) => (
          <View style={styles.taskItem}>
            <Switch
              value={task.completed}
              onValueChange={() => handleToggleTask(task.id)}
            />
            <Text style={styles.taskText}>{task.text}</Text>
            <Pressable
              style={[styles.button, styles.buttonDeleteData]}
              onPress={() => handleDeleteTask(task.id)}>
              <Text style={styles.pressableText}>X</Text>
            </Pressable>
          </View>
        ))}
      {/* Add an empty View to create space *//*}
      <View style={{ height: 20 }} /> 
      <Pressable 
        style={[styles.button, styles.buttonSaveData]}
        onPress={handleSaveData}>
        <Text style={styles.pressableText}>Tallenna data puhelimelle</Text>
      </Pressable>
    </>
  );
}
 */
