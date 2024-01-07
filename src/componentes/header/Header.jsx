import style from './header.module.scss';
import logo from  '../../imagenes/logo.png';
import * as FaIcons from "react-icons/fa"

export default function Header({obtenerPokemon}) {
  return (
    <nav className= {style.header}>
        <div className= {style.div_header}>
            <div className= {style.div_logo}>
                <img src= {logo} alt="pokemnon" />
            </div>
            <div className= {style.div_search}>
                <div>
                  <FaIcons.FaSearch/>
                </div>
                <input type="search" onChange={(e) => obtenerPokemon(e.target.value)} />
            </div>
        </div>
    </nav>
  )
}
