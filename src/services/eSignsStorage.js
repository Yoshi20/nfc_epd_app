import { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';
import Logger from './Logger';

class eSignsStorage extends Component {
  constructor() {
    super();
    this.state = {
      eSignsArray: [],
    };
    this.getESignsArray(); // blup
  }

  static setESignsArray(newESignsArray) {
    this.setState({ eSignsArray: newESignsArray });
  }

  static async getESignsArray() {
    try {
      const jsonValue = await AsyncStorage.getItem('eSignsArray');
      console.warn('jsonValue = ', jsonValue);//blup
      this.setESignsArray(JSON.parse(jsonValue != null ? jsonValue : []));
    } catch (e) {
      Logger.error('getESignsArray failed! Error:', e);
    }
  }

  static async saveESignsArray(newESignsArray) {
    await AsyncStorage.setItem('eSignsArray', JSON.stringify(newESignsArray));
    this.setESignsArray(newESignsArray);
  }

  static async addESign() {
    console.warn('blup0');
    try {
      console.warn('blup0.5');
      console.warn(this.state);
      const { eSignsArray } = this.state;
      console.warn('blup1');
      const newESign = {
        // random hex string id with 16 characters:
        id: (Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)),
        name: `Mein E-Sign #${eSignsArray.length + 1}`,
        images: [],
      };
      console.warn('blup2');
      const newESignsArray = eSignsArray.slice(); // copy the state array
      console.warn('blup3');
      newESignsArray.push(newESign);
      console.warn('blup4');
      this.saveESignsArray(newESignsArray);
      console.warn('blup5');
    } catch (e) {
      Logger.error('AddESign failed! Error:', e);
    }
  }

  async deleteESign(id) {
    try {
      const { eSignsArray } = this.state;
      const newESignsArray = eSignsArray.slice(); // copy the state array
      let eSign;
      if (id) {
        // find index of the eSign to delete
        const currentESignIndex = newESignsArray.findIndex((eS) => {
          return eS.id === id;
        });
        [eSign] = newESignsArray.splice(currentESignIndex, 1); // this removes one eSign at given position
      } else {
        eSign = newESignsArray.pop();
      }
      // delete all images of the eSign
      const results = [];
      for (let n = 0; n < eSign.images.length; n += 1) {
        if (eSign.images[n].path) {
          results.push(RNFS.unlink(eSign.images[n].path).catch((e) => {
            Logger.error('delete file failed! Error:', e);
          }));
        }
      }
      try {
        await Promise.all(results);
      } catch {
        // ignore File does not exist errors
      }
      this.saveESignsArray(newESignsArray);
    } catch (e) {
      Logger.error('deleteESign failed! Error:', e);
    }
  }

  // render () {
  //   return();
  // }
}

export default eSignsStorage;
