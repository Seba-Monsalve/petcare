export const Navbar = () => {
  return (
    <nav className="flex  bg-gray-200  flex-row justify-between items-center p-4 shadow-md px-8 ">
      <div className="bg-red-50">Logo</div>
      <ul className=" flex flex-row space-x-4 p-4">
        <li>Itema1</li>
        <li>Itema1</li>
        <li>Itema1</li>
      </ul>
      <div className="flex flex-row space-x-4 p-4">
        <button>Ingresar</button>
        <button>Crear Cuenta</button>
      </div>
    </nav>
  );
};
