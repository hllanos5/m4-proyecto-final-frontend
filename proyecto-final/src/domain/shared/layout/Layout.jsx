import proptypes from 'prop-types';
import Nav from '../components/Nav';
import SideBar from '../components/SideBar';

function Layout({ children }) {

  return (
    <main>
        <SideBar/>
        <div>
            <Nav />
            <div className='principal'>
                {children}
            </div>
        </div>
    </main>
  );
}

Layout.propTypes = {
  children: proptypes.any.isRequired,
};

export default Layout;