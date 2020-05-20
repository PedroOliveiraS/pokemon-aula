import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    background-color: #49d0b0;
    justify-content: space-between;
    padding-top: 30px;
`;

export const Header = styled.View`
    flex: 1;
    margin-left: 30px;
    margin-right: 30px;

`;

export const Types = styled.View`
    flex: 1;
    flex-direction: row;

`;

export const ImageContainer = styled.View`
    width: 160px;
    height: 160px;
    position: absolute;
    alignSelf: center;
    top: -100px;
`;

export const Type = styled.View`
    background-color: rgba(0,0,0,0.15);
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 10px;
`

export const TypeName = styled.Text`
    color: #FFF;
`
export const Name = styled.Text`
    color: #FFF;
    font-size: 35px;
    font-weight: bold;
    margin-top 50px;
`;

export const Content = styled.View`
    background-color: #FFF;
    height: 50%;
    flex: 1;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding: 30px;
`;