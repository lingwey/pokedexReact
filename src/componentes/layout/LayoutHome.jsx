import { useEffect, useState } from "react"
import Header from "../header/Header"
import style from "./layout.module.scss"
//import {URL_POKEMON} from '../../api/apiList.js'
//import axios from "axios"
import * as FaIcons from "react-icons/fa"
import Card from "../card/Card.jsx"
import useGlobalPokemon from "../../hooks/useGlobalPokemon.js"
import usePokemonArray from "../../hooks/usePokemonArray.js"


export default function LayoutHome() {
  const [pagina, setPagina] = useState(1)
  const [buscador, setBuscador] = useState('')

  const arrayPokemon = usePokemonArray({pagina});
  const globalPokemon = useGlobalPokemon();

  const obtenerPokemon = (e) => {
    const texto = e.toLowerCase()
    setBuscador(texto)
    setPagina(1)
  } 

  const filtro = buscador?.length > 0 
  ? globalPokemon?.filter(pokemon => pokemon?.name.includes(buscador))
  : arrayPokemon

 // console.log(buscador);
  return (
    <div className="layout">
      <Header obtenerPokemon={obtenerPokemon} />

      <section className={style.seccion_paginacion}>
        <div className={style.div_paginacion}>
          <span className={style.item_izquierdo} onClick={()=>{
            if (pagina === 1){
              return
            }
            setPagina(pagina - 1)
          } }>
            {" "}<FaIcons.FaAngleLeft />{" "}
          </span>
          <span className={style.item}>{pagina} </span>
          <span className={style.item}>de</span>
          <span className={style.item}> {Math.round(globalPokemon?.length / 15)}</span>
          <span className={style.item_derecho} onClick={()=>{
            if (pagina === 67){
              return
            }
            setPagina(pagina + 1)
          } }>
            {" "}<FaIcons.FaAngleRight />{" "}
          </span>
        </div>
      </section>


      <div className={style.card_content}>
      {filtro.map((card, index) => (
        //console.log(card)
        <Card key={index} cards={card}/>
        ))}
      </div>
      
    </div>
  )
}
