import logo from "../assets/logo.webp";

const Header = () => {
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="Facultad-de-Ingenieria" className="w-[175px] h-[55px]" />
    </nav>
  );
};

export default Header;
