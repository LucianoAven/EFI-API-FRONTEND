import { NavLink } from 'react-router-dom';
export default function Home() {
    return (
        <>
            <h1>Nuestro servicios de reparación</h1>
            <div className="repairs">
                <NavLink to="/devices">
                    <div className="devices">
                        <h2>Dispositivos</h2>
                        {/* <p>Reparación de smarthphones</p> */}
            
                    </div>
                </NavLink>
                <NavLink to="repair-orders">
                    <div className="orders">
                        <h2>Ordenes de reparación</h2>
                        {/* <p>Reparación de laptops</p> */}
                        
                    </div>
                </NavLink>
                <NavLink to="/repairs">
                    <div className="repairs">
                        <h2>Reparaciones</h2>
                        {/* <p>Reparación de tablets</p> */}

                    </div>   
                </NavLink>                             
            </div>
        </>
    );
};