import React, {useCallback} from 'react';
import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({theme}) => theme.background};
`;

const StyledText = styled.Text`
  font-size: 30px;
  margin-bottom: 10px;
  margin-top: 300px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.buttonBackground};
  align-items: center;
  border-radius: 4px;
  width: 200px;
  padding: 10px;
  margin: 20px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const ButtonText = styled.Text`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${({ theme }) => theme.buttonTitle};
`;

const Complete = ({ navigation }) => {
  
  const _handleHomeButtonPress = useCallback(async() => {
    navigation.navigate('홈');
  }, );

  return (
    <Container>
      <StyledText>주문이 완료되었습니다</StyledText>
      <Button
        onPress={_handleHomeButtonPress}
      >
        <ButtonText>홈으로 가기</ButtonText>    
      </Button>  

    </Container>
  );
};

export default Complete;
