import { storage } from 'core/api/firebase';

export const saveImage = async (data:string) => {
  storage.ref().child('test/image.png').putString(data, 'data_url').then((snapshot) => {
    console.log('UPLOAD SUCCESSFUL', snapshot);
  })
    .catch((error) => {
      throw error;
    });
};

export const getImage = async (path:string) => (
  storage.ref().child(path).getDownloadURL().then((url) => url)
    .catch((error) => {
      throw error;
    }));
