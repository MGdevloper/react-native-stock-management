import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import  from 'react-native-vector-icons'
const Create = ({ addItem, datas, removeItem ,EditItem}) => {

    const [data, setdata] = useState({ itemName: '', quantity: '' })
    const [editid,seteditid]=useState(null)
    const [edit, setedit] = useState(false)
    const input = useRef(null)
    useEffect(() => {
        console.log("create", data);

    }, [])
    function handlebtn() {
        addItem(data)
        setdata({ itemName: '', quantity: '' })
    }

    function Edit(id, item) {
        console.log(id, item);
        seteditid(id)
        setedit(true)
        setdata({ ...data, itemName: item })
        input.current.focus()

        // removeItem(id),
        // addItem(data)


    }

    function cancleedit(){
        setedit(false)
        setdata({ itemName: '', quantity: '' })
        seteditid(null)
    }
    return (
        <>
            <View style={[styles.container]}>

                {
                    edit ?

                        <TextInput editable={false} value={data.itemName} style={[styles.inputtext]} placeholder='Enter Item ...' placeholderTextColor="#888" /> :

                        <TextInput value={data.itemName} onChangeText={(text) => setdata({ ...data, itemName: text })} style={[styles.inputtext]} placeholder='Enter Item ...' placeholderTextColor="#888" />
                }

                <TextInput ref={input} value={data.quantity} onChangeText={(text) => setdata({ ...data, quantity: Number(text) })} style={[styles.inputtext]} placeholder='Enter Stock ...' placeholderTextColor="#888" />

                {
                    edit ?
                        <View style={{ 
                            width:"90%",
                            display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: "space-between" ,}}>
                            <Pressable onPress={()=>EditItem({...data,id:editid})} style={({ pressed }) => (
                                pressed ? { width: '40%', backgroundColor: '#c320c07d', padding: 13, borderRadius: 5, alignItems: 'center' }
                                    :
                                    { width: '45%', backgroundColor: '#c320c07d', padding: 15, borderRadius: 5, alignItems: 'center' }
                            )}>


                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>{"Edit"}</Text>


                            </Pressable>
                            <Pressable onPress={cancleedit} style={({ pressed }) => (
                                pressed ? { width: '40%', backgroundColor: '#c320c07d', padding: 13, borderRadius: 5, alignItems: 'center' }
                                    :
                                    { width: '45%', backgroundColor: '#c320c07d', padding: 15, borderRadius: 5, alignItems: 'center' }
                            )}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>cancle Edit</Text>
                            </Pressable>
                        </View>
                        :

                        <Pressable onPress={handlebtn} style={({ pressed }) => (
                            pressed ? { width: '85%', backgroundColor: '#c320c07d', padding: 13, borderRadius: 5, alignItems: 'center' }
                                :
                                { width: '90%', backgroundColor: '#c320c07d', padding: 15, borderRadius: 5, alignItems: 'center' }
                        )}>


                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>{edit ? "Edit" : "Add Item"}</Text>


                        </Pressable>

                }
            </View>
            {

                datas
                    ?
                    <>
                        {/* <View style={styles.headerBar}>
                            <Text style={styles.headerText}>Items</Text>
                            
                        </View> */}


                        {
                            datas.map((i) => {

                                return (

                                    <View style={[styles.itemsCtn, { backgroundColor: (i.quantity <= 10 ? '#ff00005a' : '#45c91c45') }]} key={i.id}>
                                        <Text style={styles.itemsText}>{i.itemName}</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>

                                            <Text style={styles.itemsText}>{i.quantity}</Text>
                                            <Pressable onPress={() => Edit(i.id, i.itemName)} >

                                                <MaterialIcons name="edit" size={24} color="#1e88e5" />
                                            </Pressable>
                                            <Pressable onPress={() => { removeItem(i.id) }}>

                                                <MaterialIcons name="delete" size={24} color="#f64004" />
                                            </Pressable>
                                        </View>

                                    </View>
                                )
                            })
                        }
                    </>
                    :
                    <>
                        {
                            datas == null && <Text>NO items...</Text>
                        }


                    </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent:'center',
        width: '100%',
        backgroundColor: '#fff',
        gap: 20,
        height: 200

    },
    inputtext: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#c320c0d2',
        padding: 10,
        borderRadius: 5,
        color: '#181818',
    },
    headerBar: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'

    },
    headerText: {
        marginHorizontal: 25,
        fontSize: 20,
        fontWeight: '500',
        textTransform: 'capitalize',
        color: '#181818'
    },
    itemsCtn: {
        width: '95%',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-between',


        // backgroundColor:'#45c91c45',
        // backgroundColor:'#ff00005a',
        paddingVertical: 5,



    },
    itemsText: {
        marginHorizontal: 25,
        fontSize: 15,
        fontWeight: '500',
        textTransform: 'capitalize',
        color: '#181818'
    }
})

export default Create