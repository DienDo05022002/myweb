import NavBar from './NavBar'

const layout = ({children}) => {
  return (
    <div>
      <NavBar/>
      {children}
    </div>
  );
};

export default layout;
