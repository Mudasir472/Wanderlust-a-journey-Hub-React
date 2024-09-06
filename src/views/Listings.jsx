import "./listing.css"
import { Link } from "react-router-dom";

export default function Listings({ Data }) {
    return (
        <>
            <div className="items  container d-flex flex-wrap align-items-center justify-content-between">
                {
                    Data.map((item) => (
                        <div key={item._id} >
                            <Link to={`/listing/${item._id}`} ><div style={{  border: "none" }} className="Mainlisting my-4 cursor-pointer card h-96	">
                                <img style={{ height: "18rem", width: "25rem" }} className="h-40 w-full	card-img-top" src={item.image.url} alt="..." />
                                <div >
                                    <p className="my-3 ml-3 card-text">{item.title}</p>
                                    <p className="mb-3 ml-3 card-text">&#8377;{item.price.toLocaleString("en-IN")} / night</p>
                                </div>
                            </div></Link>
                        </div>
                    ))
                }
            </div>
        </>
    )
}