import Row from './components/Row';
import Add from './components/Add';
import { useCallback, useEffect } from 'react';
import Search from './components/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@items_key'

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
