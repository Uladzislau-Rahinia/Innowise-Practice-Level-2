import { storage } from 'core/api/firebase';

export const saveImage = (data:string) => {
  storage.ref().child('test/image.png').putString(data, 'data_url').then((snapshot) => {
    console.log('UPLOAD SUCCESSFUL', snapshot);
  })
    .catch((error) => {
      throw error;
    });
};

export const getImage = () => {
  // placeholder
};
