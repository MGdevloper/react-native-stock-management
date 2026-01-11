import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

const Lowstock = ({ data = [] }) => {

  // Always keep this as an ARRAY
  const [lowstock, setLowstock] = useState([]);

  useEffect(() => {

    if(data==null){
      return 
    }
    const filtered = data?.filter(item => item.quantity <= 10);
    setLowstock(filtered);


  }, [data]);

  // If no low stock items
  if (lowstock.length === 0) {
    return (
      <Text style={styles.noStockText}>
        No Low Stock...
      </Text>
    );
  }

  return (
    <View>
      {lowstock.map(item => (
        <View
          key={item.id}
          style={[
            styles.itemsCtn,
            {
              backgroundColor:
                item.quantity <= 10 
                  && '#ff00005a'   // critical
                  // : '#ff98005a'   // warning
            }
          ]}
        >
          <Text style={styles.itemsText}>
            {item.itemName}
          </Text>

          <Text style={styles.itemsText}>
            {item.quantity}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Lowstock;

const styles = StyleSheet.create({
  itemsCtn: {
    width: '95%',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingVertical: 6,
    alignSelf: 'center'
  },
  itemsText: {
    marginHorizontal: 25,
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'capitalize',
    color: '#181818'
  },
  noStockText: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
    color: '#181818'
  }
});
