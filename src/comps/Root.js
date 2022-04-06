import '../App.css';
import { ThemeProvider } from 'styled-components';
import React, { useEffect, useState } from 'react'
import { AiFillFire } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../slices/app';
import { CloseButton, Header, MoreButton, Pokemon, PokemonDesc, PokemonInfo, PokemonPopup, PokemonSprite, PokemonTiles, ThemeParagraph, Types } from './styled';

function Root() {
  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(undefined)

  const myTheme = useSelector(s => s.app.theme)

  const dispatch = useDispatch()

  const getPokemons = async () => {
    function sendData(jsonData) {
      setPokemons(pokemons.concat(jsonData))
  }

    const promises = [];
    for (let i = pokemons.length+1; i <= pokemons.length+20; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then(res => res.json()));
    }

    Promise.all(promises).then(res => {
      const pokemon = res.map(data => {
        return {
          name: data.name,
          id: data.id,
          img: data.sprites.front_default,
          type: data.types,
          ability: data.abilities,
          moves: data.moves
        }
      });
      sendData(pokemon)
    })
  }



  useEffect(() => {
    setPokemons([])
    getPokemons()
  }, [])

  return (
    <ThemeProvider theme={{ theme: myTheme }}>
      <div className="App">
      <Header>
      <ThemeParagraph><button onClick={() => { dispatch(toggleTheme()) }}>Zmień schemat</button></ThemeParagraph>
        <p><AiFillFire />Lista pokemonów!</p>
      </Header>
      <PokemonTiles>
        {
        pokemons.map((el, i) => (
          <Pokemon key={`pokemon-${i}`} onClick={() => { setSelectedPokemon(el) }}>
            <PokemonSprite src={el.img} />
            <PokemonDesc>
              <h4>{el.name}</h4>
              <Types>
                {el.type.map((el, i) => <h5 key={`type-${i}`}>{el.type.name}</h5>)}
              </Types>
            </PokemonDesc>
          </Pokemon>
        ))
        }
        </PokemonTiles>
        {
        selectedPokemon !== undefined && <PokemonPopup>
          <PokemonSprite src={selectedPokemon.img} full />
          <PokemonInfo style={{ marginTop: -50 }}>Nazwa: {selectedPokemon.name}</PokemonInfo>
          <PokemonInfo>Typ: {selectedPokemon.type.map(el => `${el.type.name} `)}</PokemonInfo>
          <PokemonInfo>Zdolności początkowe: {selectedPokemon.ability.map(el => `${el.ability.name} `)}</PokemonInfo>
          <PokemonInfo>Może się nauczć:</PokemonInfo>
          <div style={{ width: 250, height: 100, overflowY: 'scroll', color: 'aliceblue', marginLeft: '50%', transform: 'translateX(-50%)' }}>
            {selectedPokemon.moves.map((el, i) => <p style={{ margin: 3 }} key={`move-${i}`}>{el.move.name}</p>)}
          </div>
          <CloseButton onClick={() => { setSelectedPokemon(undefined) }}> ZAMKNIJ </CloseButton>
        </PokemonPopup>
        }
        <MoreButton onClick={getPokemons}> Wiecej </MoreButton>
      </div>
    </ThemeProvider>
  );
}

export default Root;