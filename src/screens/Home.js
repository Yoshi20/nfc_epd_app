import React, { useState } from 'react';
import { Button, Icon, Container, Content, View, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ESignCard from '../components/ESignCard';
import Logger from '../services';

function Home({ navigation, route }) {
  const [eSignsArray, setESignsArray] = useState([]);

  const getESignsArray = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('eSignsArray');
      setESignsArray(JSON.parse(jsonValue != null ? jsonValue : []));
    } catch (e) {
      Logger.error('getESignsArray failed! Error:', e);
    }
  };

  const addESign = async () => {
    try {
      const newESign = {
        name: `E-Sign #${eSignsArray.length + 1}`,
        images: [],
      };
      const newESignsArray = eSignsArray.slice(); // copy the state array
      newESignsArray.push(newESign);
      await AsyncStorage.setItem('eSignsArray', JSON.stringify(newESignsArray));
      setESignsArray(newESignsArray);
    } catch (e) {
      Logger.error('AddESign failed! Error:', e);
    }
  };

  const deleteESign = async () => {
    try {
      const newESignsArray = eSignsArray.slice(); // copy the state array
      newESignsArray.pop();
      await AsyncStorage.setItem('eSignsArray', JSON.stringify(newESignsArray));
      setESignsArray(newESignsArray);
    } catch (e) {
      Logger.error('deleteESign failed! Error:', e);
    }
  };

  if (eSignsArray.length === 0) {
    getESignsArray();
  }

  return (
    <Container>
      <Content>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            eSignsArray.map(eSign => (
              <ESignCard
                navigation={navigation}
                route={route}
                name={eSign.name}
                images={[{ path: 'asdf' }, { path: 'qwer' }]} //blup
                // images={eSign.images}
              />
            ))
          }
        </View>

        <Button block transparent>
          <TouchableOpacity
            onPress={() => {
              addESign();
            }}
          >
            <Icon name="add-circle" style={{ color: 'orange', fontSize: 40 }} />
          </TouchableOpacity>
        </Button>

        <Button block transparent>
          <TouchableOpacity
            onPress={() => {
              deleteESign();
            }}
          >
            <Icon name="remove-circle" style={{ color: 'red', fontSize: 40 }} />
          </TouchableOpacity>
        </Button>

      </Content>
    </Container>
  );
}

export default Home;
