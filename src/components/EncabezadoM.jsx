import { useState } from "react";
import UNSTA_logo from "../assets/UNSTA.png";
import { close, menu } from "../assets";
import { Link } from "react-router-dom"

export const navLinks = [
  { id: "partidos", title: "Partidos", to: "/masculino/partidos" },
  { id: "equipos", title: "Equipos", to: "/masculino/equipos" },
  { id: "fase_de_grupos", title: "Fase de grupos", to: "/masculino/fase_de_grupos" },
  { id: "cuadro_de_eliminatorias", title: "Cuadro de eliminatorias", to: "/masculino/cuadro_de_eliminatorias" },
  { id: "estadisticas", title: "Estadísticas", to: "/masculino/estadisticas" },
  { id: "femenino", title: "Femenino", to: "/femenino/partidos" },
];

const EncabezadoM = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  const handleNavClick = (title) => {
    setActive(title);
    setToggle(false);
  };

  return (
    <nav className="w-full flex py-5 justify-between items-center navbar">
      <Link to="/">
        <img src={UNSTA_logo} alt="UNSTA" className="w-[60px] h-[60px]" />
      </Link>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              style={nav.id === "femenino" ? { color: '#f235d3' } : {}}
          >
            <Link to={nav.to} onClick={() => handleNavClick(nav.title)}>{nav.title}</Link>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  style={nav.id === "femenino" ? { color: '#f235d3' } : {}}
              >
                <Link to={nav.to} onClick={() => handleNavClick(nav.title)}>{nav.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default EncabezadoM;