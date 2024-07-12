import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart, } from './ContextReducer';

export default function Navbar() {
    let data = useCart();
    let userName = localStorage.getItem("userName");
    console.log(userName)
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link> 
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span> 
                    </button>
                    < div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li>
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                                </li> : " "}
                        </ul>
                                

                        {(localStorage.getItem("authToken")) ?
                            <div className="navbar-brand  m-auto mt-3" to="/" >
                                <span class=" fs-2 fst-italic">Hello  </span> <span className='fs-5'>{userName}</span>
                                </div>
                            :
                            <div>
                            </div>

                        }

                        
                        {(!localStorage.getItem("authToken")) ?
                            <form className='d-flex'>

                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>

                                <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>

                            </form>
                            :
                            <div>

                                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                                    My Cart {" "}
                                    <Badge pill bg="danger" text="dark">{data.length}</Badge>
                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : null}

                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}> Logout </div>
                            </div>

                        }


                    </div>
                </div>
            </nav>
        </div>
    )
}
