import { Pressable, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Allitems from './src/Allitems'
import Lowstock from './src/Lowstock'
import Create from './src/Create'
import AsyncStorage from '@react-native-async-storage/async-storage'
const App = () => {
  const [view, setview] = useState(0)
  const [data, setdata] = useState(null)

  
  async function init() {

    // await AsyncStorage.clear((e)=>{console.log(e)})
    let items = await AsyncStorage.getItem('Items')

    console.log("startingitem:", items);

    items && setdata(JSON.parse(items))
  }
  
  function EditItem(id){
    console.log("edit:",id);
    setdata(data.map((i)=>{
      if(i.id==id.id) {
        i.itemName=id.itemName

        i.quantity=id.quantity


      }

      return i

    }))
    
    
  }
  
  async function setdatainAsyncStorage() {
    

    if(data == null){
      console.log("item not store in ASYNCSTORAGE !...")
      return 
    }

    data !=null && await AsyncStorage.setItem('Items', JSON.stringify(data))
    
    console.log("item set in async storage.........");
    
  }
  
  
   function addItem(d) {
    console.log("data in add item:",d);
    
    data == null ?
    setdata([{ id: Date.now(), ...d }]) :
    
    setdata([...data, { id: Date.now(), ...d }])
    
  }
  
  function removeItem(id){
    console.log(id);
    
    setdata(data.filter((i)=>i.id!=id))
  }
  
  
  useEffect(() => {
    setdatainAsyncStorage()
    console.log("data state:",data);
    
  }, [data])
  
  
  
  useEffect(() => {
    init()
    
  }, [])
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#f5f5f5' }]}> 
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <Text style={styles.dashborad}>Dashbored</Text>
      <View style={styles.tabs}>
        <Pressable onPress={() => setview(0)}>
          <Text style={[styles.tabText, { backgroundColor: view == 0 ? '#45c91c45' : 'transparent' }]}>All items</Text>
        </Pressable>
        <Pressable onPress={() => setview(1)}>
          <Text style={[styles.tabText, { backgroundColor: view == 1 ? '#45c91c45' : 'transparent' }]}>Low stock</Text>
        </Pressable>
        <Pressable onPress={() => setview(2)}>
          <Text style={[styles.tabText, { backgroundColor: view == 2 ? '#45c91c45' : 'transparent' }]}>Create</Text>
        </Pressable>
      </View>

      <Text style={{ width: '100%', height: 1, backgroundColor: '#45c91c45', margin: 10 }} />

      <>
        {view === 0 && <Allitems data={data} />}
        {view === 1 && <Lowstock data={data} />}
        {view === 2 && <Create addItem={addItem} removeItem={removeItem} EditItem={EditItem} datas={data}/>} 
      </>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // light neutral background for consistency
    width: '100%',
    minHeight: '100%',
  },
  dashborad: {
    fontSize: 30,
    fontWeight: '800',
    color: '#181818',
    width: '100%',
    paddingLeft: 20,
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
  }
  ,
  tabs: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    height: 50,
    alignItems: 'center',
    paddingLeft: 20,
    gap: 20,
  },
  tabText: {
    borderWidth: 2,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 15,
    borderColor: '#45c91c',
    color: '#181818',
    fontWeight: '500',
    fontSize: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
  }
})