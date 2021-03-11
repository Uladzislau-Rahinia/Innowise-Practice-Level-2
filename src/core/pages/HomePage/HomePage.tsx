import React, { useEffect, useState } from 'react';
import Button from 'core/components/Button/Button';
import ButtonLink from 'core/components/Link';
import LINKS from 'core/utils/constants/links';
import { logoutUser } from 'core/services/firebaseAuthQueries';
import { getImage } from 'core/services/firebaseStorageQueries';
import { useHistory } from 'react-router-dom';
import { TodoListWrapper, ButtonWrapper } from './styles';

const HomePage:React.FC = () => {
  const history = useHistory();

  const [image, setImage] = useState('');

  const handleLogOut = async () => {
    await logoutUser();
    history.push(LINKS.LOGIN);
  };

  const getImageHandler = async () => {
    const res = await getImage('test/image.png');
    setImage(res);
  };

  useEffect(() => {
    getImageHandler();
  }, []);

  return (
    <TodoListWrapper>
      <ButtonWrapper>
        <ButtonLink
          to={LINKS.PAINT}
          text="+ New painting"
        />
        <Button onClick={handleLogOut} text="Log Out" />
      </ButtonWrapper>
      <img src={image} alt="" />
    </TodoListWrapper>
  );
};

export default HomePage;
