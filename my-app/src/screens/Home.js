import React, { useEffect, useState } from 'react' //study about useCallback and use Memo
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'


export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        setIsLoading(true);
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        response = await response.json();

        setFoodItem(response[0]);
        setFoodCat(response[1]);
        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
      <div>
        <div> <Navbar /> </div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
                <div className="carousel-inner" id='crousel'>
                <div className="carousel-caption" style={{zIndex:'10'}}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                            {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                        </div>
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
                </div>
  
        <div className='container'>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            foodCat.length !== 0 ? ( // Use length instead of !== [] for better readability
              foodCat.map((data, index) => {return <div className='row mb-3'>
                <div key={data._id} className='fs-3 m-3'>
                  {data.CategoryName}</div>
                  <hr />
                  {foodItem.length !== 0 // Similar check for foodItem
                    ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) &&(item.name.toLowerCase().includes(search.toLowerCase())))

                      .map((filterItems) => (
                        <div key={filterItems._id}  className="col-12 col-md-6 col-lg-3">
                          <Card foodItem = {filterItems}
                          options = {filterItems.options[0]}
                          
                          /> {/* Pass data to Card component */}
                        </div>
                      ))
                    : <div>No such Data found</div>}
              </div>})
            ) : (
              <div>"No data available."</div>
            )
          )}
           {/* Potentially misplaced Card component */}
        </div>
  
        <Footer />
      </div >
    );
}