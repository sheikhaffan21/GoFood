import React from 'react'

export default function Crousal() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='crousel'>
                <div class="carousel-caption" style={{zIndex:'10'}}>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
                        </form>
                        </div>
                    <div className="carousel-item active">
                        <img src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        
                    </div>
                    <div className="carousel-item">
                        <img src="https://images.pexels.com/photos/6287520/pexels-photo-6287520.jpeg?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
                        
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div >
        </div >
    )
}
