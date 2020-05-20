import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import api from '../../services/api';

export default function Main({navigation}){
    const [pokemons, setPokemons] = useState([]);
    const [total, setTotal] = useState(0);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPokemons();
    }, [])

    async function loadPokemons() {
        const totalPokemons = 151;
        if(loading){
            return;
        }
        if(total > 0 && pokemons.length == totalPokemons){
            return;
        }
        setLoading(true);
        let limit = 20;

        const response = await api.get(`pokemon`,{
            params: {offset, limit}
        })

        setPokemons([... pokemons, ... response.data.results]);
        setOffset(offset + 20);
        setLoading(false);
    }


    return(
        <View>
            <FlatList
                data={pokemons}
                keyExtractor={pokemon => String(pokemon.name)}
                onEndReached={loadPokemons}
                onEndReachedThreshold={0.1}
                renderItem={
                    ({ item : pokemon}) => (
                        <Button
                            title = {pokemon.name}
                            onPress={() => navigation.navigate('Details', {pokemon}) }
                        />
                    )
                }
            />
        </View>
    )
}