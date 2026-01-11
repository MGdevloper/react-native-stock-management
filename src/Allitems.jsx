import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

const Allitems = ({ data }) => {

    return (
        
        data
         ?
        <>
        <View style={styles.headerBar}>
            <Text style={styles.headerText}>Item</Text>
            <Text style={styles.headerText}>quantity</Text>
        </View>

        
            {
                data.map((i) => {

                    return (

                        <View style={[styles.itemsCtn,{backgroundColor:(i.quantity<=10?'#ff00005a':'#45c91c45')}]} key={i.id}>
                            <Text style={styles.itemsText}>{i.itemName}</Text>
                            <Text style={styles.itemsText}>{i.quantity}</Text>
                        </View>
                    )
                })
            }
        </>
        :
        <>
            {
                data==null && <Text>NO items...</Text>
            }

            
        </>
    )
}
export const styles=StyleSheet.create({
    headerBar:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
        
    },
    headerText:{
        marginHorizontal:25,
        fontSize:20,
        fontWeight:'500',
        textTransform:'capitalize',
        color:'#181818'
    },
    itemsCtn:{
        width:'95%',
        borderRadius:5,
        display:'flex',
        flexDirection:'row',
        marginTop:8,
        justifyContent:'space-between',
    
        
        // backgroundColor:'#45c91c45',
        // backgroundColor:'#ff00005a',
        paddingVertical:5,
        
        
        
    },
    itemsText:{
        marginHorizontal:25,
        fontSize:15,
        fontWeight:'500',
        textTransform:'capitalize',
        color:'#181818'
    }
})
export default Allitems