import { useEffect, useState } from "react"
import Header from "../header/Header"
import style from "./layout.module.scss"
import {URL_POKEMON} from '../../api/apiList.js'
import axios from "axios"
import * as FaIcons from "react-icons/fa"
import Card from "../card/Card.jsx"


export default function LayoutHome() {
  const [arrayPokemon, setArrayPokemon] = useState ([])
  const [pagina, setPagina] = useState(1)
  const [globalPokemon, setGlobalPokemon] = useState([])
  const [buscador, setBuscador] = useState('')
  
  useEffect(() => {
    
    const api = async () => {
      const limite = 15
      const xPagina = (pagina - 1) * limite
      try {
        const apiPoke = await axios.get(`${URL_POKEMON}/?offset=${xPagina}&limit=${limite}`)
        //console.log("Respuesta de la API:", apiPoke.data);
        setArrayPokemon(apiPoke.data.results)
      } catch (error) {
        console.error("Error al obtener datos:", error)
      }
  
    }

    api()
    getGlobalPokemons()
  },[pagina])

  const getGlobalPokemons = async () => {
    const respuesta = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`)
    const promesas = respuesta.data.results.map((pokemon) =>{
      return pokemon
    })
    const result = await Promise.all(promesas)
    setGlobalPokemon(result)
  }

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
