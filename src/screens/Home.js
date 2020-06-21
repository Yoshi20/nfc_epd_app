import React, { useState, useEffect } from 'react';
import { Button, Icon, Container, Content, View, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ESignCard from '../components/ESignCard';
import Logger from '../services';

import RNFS from 'react-native-fs';
import { PATHS } from '../constants';

function Home({ navigation, route }) {
  const [eSignsArray, setESignsArray] = useState([]);

  useEffect(() => {
    if (route.params?.deleteESignId) {
      console.warn('deleteESignId = ', JSON.stringify(route.params.deleteESignId)); // blup
      // console.warn('eSignsArray = ', JSON.stringify(eSignsArray)); // blup
      // let eSignsArray = getESignsArray();
      // console.warn('eSignsArray = ', JSON.stringify(eSignsArray)); // blup
      // deleteESign(route.params.deleteESignId);
    }
  }, [route.params?.deleteESignId]);

  const getESignsArray = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('eSignsArray');
      setESignsArray(JSON.parse(jsonValue != null ? jsonValue : []));
    } catch (e) {
      Logger.error('getESignsArray failed! Error:', e);
    }
  };

  const saveESignsArray = async (newESignsArray) => {
    await AsyncStorage.setItem('eSignsArray', JSON.stringify(newESignsArray));
    setESignsArray(newESignsArray);
  };

  const addESign = async () => {
    try {
      const newESign = {
        // random hex string id with 16 characters:
        id: (Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)),
        name: `E-Sign #${eSignsArray.length + 1}`,
        images: [],
      };
      const newESignsArray = eSignsArray.slice(); // copy the state array
      newESignsArray.push(newESign);
      saveESignsArray(newESignsArray);
    } catch (e) {
      Logger.error('AddESign failed! Error:', e);
    }
  };

  const deleteESign = async (id) => {
    try {
      const newESignsArray = eSignsArray.slice(); // copy the state array
      if (id) {
        // find index of the eSign to delete
        const currentESignIndex = newESignsArray.findIndex((eS) => {
          return eS.id === id;
        });
        newESignsArray.splice(currentESignIndex, 1); // this removes one eSign at given position
      } else {
        newESignsArray.pop();
      }
      saveESignsArray(newESignsArray);
    } catch (e) {
      Logger.error('deleteESign failed! Error:', e);
    }
  };

  const initScreen = async () => {
    // console.warn('eSignsArray = ', JSON.stringify(eSignsArray)); // blup
    // get the eSignsArray when it's empty
    if (eSignsArray.length === 0) {
      getESignsArray();
    }
    // update the eSignsArray also regularly to recognice if an image was added or removed
    setTimeout(() => {
      if (eSignsArray.length > 0) {
        getESignsArray();
      }
    }, 2000);
  };

  initScreen();

  return (
    <Container>
      <Content>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            eSignsArray.map(eSign => (
              <ESignCard
                navigation={navigation}
                route={route}
                eSign={eSign}
                originScreen="Home"
                //name={eSign.name}
                //images={[{ path: `${RNFS.PicturesDirectoryPath}/Zelda/zelda.jpg`, pos: 0 }, { path: `${PATHS.IMAGES}/moby.jpg`, pos: 1 }]} // blup
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
