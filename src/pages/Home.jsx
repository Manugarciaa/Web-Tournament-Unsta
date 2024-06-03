import { logo_torneo } from "../assets";
import styles from "../style";
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <section id="inicio" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold text-[42px] text-white leading-[45px] xl:text-[65px] xl:leading-[75px]">
            Bienvenidos al evento más emocionante de <span className="text-gradient">Ingeniería</span>
          </h1>
        </div>
        <p className={`font-poppins font-normal text-dimWhite text-[16px] leading-[30.8px] max-w-[470px] mt-5`}>
          Bienvenidos al evento más emocionante de Ingeniería. Elige una opción para mantenerte al tanto de los partidos, estadísticas, tablas de posiciones y todo lo relacionado con nuestro apasionante torneo de fútbol universitario.
        </p>
        <div className={`flex space-x-20 sm:px-16 px-6`}>
          <button className="my-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-md hover:scale-105">
            <Link to="/masculino/partidos" className="text-white">
              Masculino
            </Link>
          </button>
          <button className="my-5 bg-pink-500 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full shadow-md hover:scale-105">
            <Link to="/femenino/partidos" className="text-white">
              Femenino
            </Link>
          </button>
        </div>
      </div>
      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img
          src={logo_torneo}
          alt="Home image"
          className="w-[80%] h-[80%] relative z-[5]"
        />
      </div>
    </section>
  </>
);

export default Home;
