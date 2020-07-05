import React, { useState, useEffect } from 'react';
import { Button, Icon, Container, Content, View, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity } from 'react-native';
import { eSignsStorage } from '../services';
// import AsyncStorage from '@react-native-community/async-storage';
import ESignCard from '../components/ESignCard';

function HomeScreen({ navigation, route }) {
  const [eSignsArray, setESignsArray] = useState([]);

  useEffect(() => {
    if (route.params?.deleteESignId) {
      // console.warn('eSignsArray = ', JSON.stringify(eSignsArray)); // blup
      // let eSignsArray = getESignsArray();
      // console.warn('eSignsArray = ', JSON.stringify(eSignsArray)); // blup
      // deleteESign(route.params.deleteESignId);
    }
  }, [route.params?.deleteESignId]);

  const initScreen = async () => {
    // get the eSignsArray when it's empty
    if (eSignsArray.length === 0) {
      setESignsArray(await eSignsStorage.getESignsArray());
    }
    // update the eSignsArray also regularly to recognice if an image was added or removed
    setTimeout(() => {
      if (eSignsArray.length > 0) {
        const asyncFunction = async () => {
          setESignsArray(await eSignsStorage.getESignsArray());
        };
        asyncFunction();
      }
    }, 100); // blup: this is quite ugly xD
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

        <Button block transparent style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={async () => {
              await eSignsStorage.addESign();
              const eSigns = await eSignsStorage.getESignsArray();
              setESignsArray(eSigns);
            }}
          >
            <Icon name="add-circle" style={{ color: 'orange', fontSize: 40 }} />
          </TouchableOpacity>
        </Button>

        {/* <Button block transparent>
          <TouchableOpacity
            onPress={async () => {
              await eSignsStorage.deleteESign();
              const eSigns = await eSignsStorage.getESignsArray();
              setESignsArray(eSigns);
            }}
          >
            <Icon name="remove-circle" style={{ color: 'red', fontSize: 40 }} />
          </TouchableOpacity>
        </Button> */}

      </Content>
    </Container>
  );
}

export default HomeScreen;
