import { useEffect, useState } from 'react'
import style from './card.module.scss';
import axios from 'axios'
import { URL_ESPECIES, URL_EVOLUCIONES, URL_POKEMON } from '../../api/apiList.js'

export default function Card({cards}) {
    const [pokemon, setpokemon] = useState({})
    const [especiePokemon, setEspeciePokemon] = useState({})
    const [evoluciones, setEvoluciones] = useState([])
    
   useEffect (() => {
    const dataPokemon = async () => {
        try {
            const api = await axios.get(`${URL_POKEMON}/${cards.name}`)
            setpokemon(api.data)
        } catch (error) {
            //console.error("no se encontro")
        }
    }
    dataPokemon()
   },[cards])
   
   useEffect (() => {
       const dataEspeciePokemon = async () => {
           const idUrl = cards.url.split('/')
           try {
               const api = await axios.get(`${URL_ESPECIES}/${idUrl[6]}`)
               setEspeciePokemon({
                url_especie : api?.data?.evolution_chain,
                data: api?.data
             })

        } catch (error) {
            //console.error("no se encontro")
        }
    }
    dataEspeciePokemon()
   },[cards])

   useEffect (() => {
        async function getPokemonImagen (id){
            const respuesta = await axios.get(`${URL_POKEMON}/${id}`)
            return respuesta?.data?.sprites?.other['official-artwork']?.front_default
        }  
        
        if (especiePokemon?.url_especie){
            
            const obtenerEvoluciones = async () => {
                const idUrl = especiePokemon?.url_especie?.url?.split('/')
                const arrayEvoluciones = [] 
                    try {
                        const api = await axios.get(`${URL_EVOLUCIONES}/${idUrl[6]}`)
                        const url2 = api?.data?.chain?.species?.url?.split('/')
        
                        const img1 = await getPokemonImagen(url2[6])
                        arrayEvoluciones.push({
                            img: img1,
                            nombre: api?.data?.chain?.species?.name,
                        })
                        
                        if (api?.data?.chain?.evolves_to?.length != 0){
                            const data2 = api?.data?.chain?.evolves_to[0]?.species
                            const ID = data2?.url?.split("/")
                            const img2 = await getPokemonImagen(ID[6])
                            arrayEvoluciones.push({
                                img: img2,
                                nombre: data2?.name,
                            })
                        }
                        if (api?.data?.chain?.evolves_to[0]?.evolves_to?.length != 0){
                            const data3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species
                            const ID = data3?.url?.split("/")
                            const img3 = await getPokemonImagen(ID[6])
                            arrayEvoluciones.push({
                                img: img3,
                                nombre: data3?.name,
                            })
                        }


                        setEvoluciones(arrayEvoluciones)
         
                 } catch (error) {
                     //console.error("no se encontro")
                 }
                }
                obtenerEvoluciones()
    }
   },[especiePokemon])

let pokeId = pokemon?.id?.toString()
if (pokeId?.length === 1){
    pokeId = "00" + pokeId
} else if (pokeId?.length === 2){
    pokeId = "0" + pokeId
}

//console.log(evoluciones)
  return (
    <div className={style.card}>
        <img className={style.card_img} src= {pokemon?.sprites?.other['official-artwork']?.front_default} alt={cards.name} />
        <div className={ `bg-${especiePokemon?.data?.color?.name} ${style.sub_card} `}>
            <strong className={style.card_id}>id: {pokeId} </strong>
            <strong className={style.card_name}>nombre: {pokemon?.name} </strong>
            <h4 className={style.card_altura}>altura: {pokemon?.height}0 cm </h4>
            <h4 className={style.card_peso}>peso: {pokemon?.weight} kg </h4>
            <h4 className={style.card_habitad}>habitad: {especiePokemon?.data?.habitat?.name} </h4>
        
            <div className={style.div_stats}>
                {pokemon?.stats?.map((sta, index) =>{
                    return (
                        <h6 key={index} className = {style.item_stat}>
                            <span className={style.stat_name}>{sta.stat.name}</span>
                            <progress value={sta.base_stat} max={110}></progress>
                            <span className= {style.stat_numero}>{sta.base_stat} </span>
                        </h6>
                    )
                })}
            </div>

            <div className={style.div_tipo_color}>
                {pokemon?.types?.map((tipo,index) =>{
                    return (
                        <h6 key={index}  className={`color-${tipo.type.name} ${style.tipo_color}`}>
                            {tipo.type.name}
                        </h6>
                    )
                })}
            </div>

            <div className={style.div_evoluciones}>
                {evoluciones.map((evolucion,index) => {
                    return (
                        <div key={index} className={style.item_evolucion}>
                            <img src={evolucion.img} alt='evolucion' className={style.img_evolucion} />
                            <h6>{evolucion.name} </h6>
                        </div>
                    )
                } )}
            </div>
        </div>
    </div>
  )
}
