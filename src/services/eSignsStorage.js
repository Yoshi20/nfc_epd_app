import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';
import Logger from './Logger';

const eSignsStorage = {
  getESignsArray,
  saveESignsArray,
  addESign,
  deleteESign,
  addImage,
  deleteImage,
  updateImage,
  moveImageDown,
};

let eSignsArray = [];

async function getESignsArray() {
  try {
    const jsonValue = await AsyncStorage.getItem('eSignsArray');
    eSignsArray = JSON.parse(jsonValue != null ? jsonValue : []);
  } catch (e) {
    Logger.error('getESignsArray failed! Error:', e);
  }
  return eSignsArray;
}

async function saveESignsArray(newESignsArray) {
  await AsyncStorage.setItem('eSignsArray', JSON.stringify(newESignsArray));
}

async function addESign() {
  try {
    const newESign = {
      // random hex string id with 16 characters:
      id: (Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)),
      name: `Mein E-Sign #${eSignsArray.length + 1}`,
      images: [],
    };
    eSignsArray.push(newESign);
    saveESignsArray(eSignsArray);
  } catch (e) {
    Logger.error('AddESign failed! Error:', e);
  }
}

async function deleteESign(id) {
  try {
    let eSign;
    if (id) {
      // find index of the eSign to delete
      const currentESignIndex = eSignsArray.findIndex((eS) => {
        return eS.id === id;
      });
      [eSign] = eSignsArray.splice(currentESignIndex, 1); // this removes one eSign at given position
    } else {
      eSign = eSignsArray.pop();
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
    saveESignsArray(eSignsArray);
  } catch (e) {
    Logger.error('deleteESign failed! Error:', e);
  }
}
function findESign(id) {
  // find index of the eSign
  const currentESignIndex = eSignsArray.findIndex((eS) => {
    return eS.id === id;
  });
  return eSignsArray[currentESignIndex];
}

async function updateESign(eSign) {
  try {
    getESignsArray();
    // find index of the current eSign
    const currentESignIndex = eSignsArray.findIndex((eS) => {
      return eS.id === eSign.id;
    });
    // update eSignsArray in the AsyncStorage
    eSignsArray[currentESignIndex] = eSign;
    saveESignsArray(eSignsArray);
  } catch (e) {
    Logger.error('updateESign failed! Error:', e);
  }
}

async function addImage(eSignId) {
  try {
    const newImage = {
      // random hex string id with 16 characters:
      id: (Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)),
      path: '',
    };
    const eSign = findESign(eSignId);
    eSign.images.push(newImage);
    updateESign(eSign);
    return eSign;
  } catch (e) {
    Logger.error('AddImage failed! Error:', e);
    return null;
  }
}

async function deleteImage(eSignId, imageId) {
  try {
    const eSign = findESign(eSignId);
    let image;
    if (imageId) {
      // find index of the image to delete
      const currentImageIndex = eSign.images.findIndex((img) => {
        return img.id === imageId;
      });
      [image] = eSign.images.splice(currentImageIndex, 1); // this removes one image at given position
    } else {
      image = eSign.images.pop();
    }
    if (image.path) {
      await RNFS.unlink(image.path).catch((e) => {
        Logger.error('delete file failed! Error:', e);
      });
    }
    updateESign(eSign);
    return eSign;
  } catch (e) {
    Logger.error('deleteImage failed! Error:', e);
    return null;
  }
}

async function updateImage(eSignId, imageId, image) {
  try {
    const eSign = findESign(eSignId);
    // find index of the image to update
    const currentImageIndex = eSign.images.findIndex((img) => {
      return img.id === imageId;
    });
    if (currentImageIndex >= 0) {
      /* replace image */
      eSign.images.splice(currentImageIndex, 1, image); // this removes one image at given position
    } else {
      /* add new image */
      eSign.images.push(image);
    }
    updateESign(eSign);
    return eSign;
  } catch (e) {
    Logger.error('updateImage failed! Error:', e);
    return null;
  }
}

async function moveImageDown(eSignId, imageId) {
  try {
    const eSign = findESign(eSignId);
    // find index of the image to move
    const currentImageIndex = eSign.images.findIndex((img) => {
      return img.id === imageId;
    });
    eSign.images.splice(currentImageIndex + 1, 0, eSign.images.splice(currentImageIndex, 1)[0]);
    updateESign(eSign);
    return eSign;
  } catch (e) {
    Logger.error('moveImage failed! Error:', e);
    return null;
  }
}

export default eSignsStorage;
