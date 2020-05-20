import React, {useState} from 'react';
import {useRoute, useFocusEffect} from '@react-navigation/native';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { View, Text, Image, Dimensions } from 'react-native';
import { Container, Content, Header, Name, Types, Type, TypeName, ImageContainer} from './styles'

import api from './../../services/api'
import PokemonImages from '../../services/pokemonImages'


const Details = () =>{
    const route = useRoute();
    const pokemon = route.params.pokemon;

    const [pokemonDetails, setPokemonDetails] = useState('');
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'description', title: 'Descrição' },
        { key: 'status', title: 'Status' },
    ]);

    function capitalizeFirstLetter(text){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    async function loadPokemonDetails(){
        //const url = `pokemon/${pokemon}`;
        const response = await api.get(pokemon.url);

        const details =  {
            id: response.data.id,
            height: response.data.height,
            weight: response.data.weight,
            name: capitalizeFirstLetter(response.data.name),
            types: [],
        }

        const types =  response.data.types;
        types.sort((a,b) => (a.slot > b.slot) ? 1 : -1);
        details.types = types.map(item => {
            return capitalizeFirstLetter(item.type.name);
        })
        
        setPokemonDetails(details);    
    }

    useFocusEffect(
        React.useCallback(()=> {
            loadPokemonDetails();
        }, [pokemon])
    );

    const FirstRoute = () => (
        <View><Text>Aba de descrição</Text></View>
    );

    const SecondRoute = () => (
        <View><Text>Aba de Status</Text></View>
    );

    const renderScene = SceneMap({
        description: FirstRoute,
        status: SecondRoute,
      });

    const renderTabBar = props =>(
        <TabBar
            {... props}
            indicatorStyle={{backgroundColor: '#4b4b57', height: 3}}
            activeColor='#000'
            inactiveColor='#7b7b7b'
            style={{backgroundColor: 'transparent', marginTop: 30, shadowOpacity: 0, elevation: 0}}
            />
    )
    return(
    <Container>
        <Header>
            <Name>{ pokemonDetails.name }</Name>
            <Types>
            {
                    pokemonDetails.types && pokemonDetails.types.map(item =>{
                        return <Type key = {item}>
                            <TypeName>{item} </TypeName>
                        </Type> 
                    })
                }
                
            </Types>
        </Header>
        <Content>
            <ImageContainer>
                <Image source={PokemonImages[pokemonDetails.id]}/>
            </ImageContainer>
            
            <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{width: Dimensions.get('window').width}}
            />
        </Content>
    </Container>
    )
}

export default Details;