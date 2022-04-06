import styled from 'styled-components';
import { backgroundColor, headerColor, hoverColor, textColor, tileColor } from './themes';

export const Header = styled.div`
  width: 100%;
  height: 100px;
  background-color: ${headerColor};
  font-size: xx-large;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding-top: 15px;
  height: 120px;
  text-align: center;
  color: ${textColor};
`

export const Pokemon = styled.div`
  heigth: auto;
  margin: 15px;
  border: 1px solid black;
  justify-content: center;
  color: ${textColor};
  font-family: font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  padding: 20px;
  font-weight: bold;
  background-color: ${tileColor};
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
  color: ${textColor};
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
  background-color: ${headerColor};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  line-height: 50px;
  font-size: 24px;
  color: ${textColor};
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: ${hoverColor};
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
  background-color: ${headerColor};
  cursor: pointer;
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  color: ${textColor};
  &:hover {
    background-color: ${hoverColor};
  }
`
export const PokemonTiles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20%, 200px));
  justify-content: center;
  background-color: ${backgroundColor}
`

export const ThemeParagraph = styled.div`
  display: flex;
  font-size: 15px;
`