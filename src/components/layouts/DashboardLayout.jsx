import React, { useContext } from 'react'
import { UserContext} from '../../context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const DashboardLayout = ( {children , activeMenu}) => {
    const {user} = useContext(UserContext);
   
  return (
    <div className="">
        <Navbar activeMenu={activeMenu}/>

        {user && (
            <div className="flex">
                <div className="hidden lg:block fixed top-[61px] left-0 z-20">
                    <SideMenu activeMenu={activeMenu}/>
                </div>    
            
            <div className="grow p-5 pt-1 w-full lg:ml-64">{children}</div>
        </div>
      )}
     </div>
  );  
};

export default DashboardLayout;
