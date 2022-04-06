import '../App.css';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react'
import { AiFillFire } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';

export const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: purple;
  font-size: xx-large;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding-top: 15px;
  height: 120px;
  text-align: center;
  color: aliceblue;
`
export const Pokemon = styled.div`
  heigth: auto;
  margin: 15px;
  border: 1px solid black;
  justify-content: center;
  color: aliceblue;
  font-family: font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding: 20px;
  font-weight: bold;
  background-color: blueviolet;
`

export const PokemonSprite = styled.img`
  width: ${p => p.full ? '300px' : '100px'};
  height: ${p => p.full ? '300px' : '100px'};
  float: ${p => p.full ? 'none' : 'left'};
  ${p => p.full ? '' :
  `@media (max-width: 1470px) {
    margin-left: 50%;
    transform: translateX(-50%);`
  }
`

export const PokemonDesc = styled.div`
  float: left;
  width: 120px;
`

export const PokemonInfo = styled.h4`
  color: aliceblue;
`

export const PokemonPopup = styled.div`
  width: 95%;
  height: 95vh;
  position: fixed;
  box-sizing: border-box;
  padding-top: 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, .9);
  border-radius: 15px;
  z-index: 10;
  box-shadow: 2.5px 2.5px 10px black;
`

export const CloseButton = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: purple;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  line-height: 50px;
  font-size: 24px;
  color: aliceblue;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: darkmagenta;
  }
`
export const Types = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`
export const MoreButton = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  background-color: purple;
  cursor: pointer;
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: aliceblue;
  &:hover {
    background-color: darkmagenta;
  }
`
export const PokemonTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, 200px));
  justify-content: center;
`

export const ThemeParagraph = styled.div`
  display: flex;
  font-size: 15px;
`

function Root() {
  const [pokemons, setPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(undefined)

  const getPokemons = async () => {
    function sendData(jsonData) {
      setPokemons(pokemons.concat(jsonData))
      console.log(jsonData)
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

  function ToggleTheme(){
    const theme = useSelector(state => state.app.theme)

    return 
  }

  useEffect(() => {
    setPokemons([])
    getPokemons()
  }, [])

  return (
    <div className="App">
     <Header>
     <ThemeParagraph><button onClick = 'ToggleTheme()'>Zmień schemat</button></ThemeParagraph>
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
  );
}

export default Root;
