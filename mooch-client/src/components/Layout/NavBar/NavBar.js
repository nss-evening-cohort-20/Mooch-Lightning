import { useNavigate } from "react-router-dom"
import { BLACK, WHITE } from "../../Utils/Constants"

export const NavBar = () => {
    const navigate = useNavigate();

    return <div className=" position-fixed py-3 d-flex align-items-baseline "
        style={{
            height: "70px", top: "0px", zIndex: "100", width: "100vw",
            backgroundColor: `${BLACK}`
            // boxShadow: "0px 2px 5px 0px #14213D"
        }}>
        <div className='align-self-center'
            style={{
                color: `${WHITE}`,
                marginLeft: '1rem',
                fontFamily: 'Vina Sans, cursive',
                fontSize: "40px",
                letterSpacing: "1px",
                paddingBottom: "8px",
                cursor: 'pointer'
            }}
            onClick={() => navigate("/")}>
            MOOCH
        </div>
    </div>
}