import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faVideo, faUniversity, faCheckSquare, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cart = (props) => {

    const cart = props.cart;
    const totalPrice = cart.reduce((sum, cart) => sum + cart.price, 0);

    return (
        <>
            <div className="my-5">
                <h1 className="text-center text-primary">Total Course: {cart.length} </h1>
            </div>
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-10 mx-auto">

                        {cart.map(courses =>
                            <div className="row d-flex justify-content-center">
                                <div className="col-md-2"></div>
                                <div className="col-md-3">
                                    <p><FontAwesomeIcon icon={faVideo} /> {courses.Course_name}</p>
                                </div>
                                <div className="col-md-4">
                                    <p><FontAwesomeIcon icon={faUniversity} /> {courses.Institution_name}</p>
                                </div>
                                <div className="col-md-3">
                                    <p><FontAwesomeIcon icon={faDollarSign} /> {courses.price}</p>
                                </div>
                            </div>
                        )}

                        <div className="row d-flex justify-content-center">
                            <p className="lead text-center my-5">Total Price: <FontAwesomeIcon icon={faDollarSign} /> <strong> {totalPrice}</strong> </p>

                            <div className="col-md-6 d-flex justify-content-center">
                                {
                                    totalPrice > 0 ? <button className="btn btn-success"><FontAwesomeIcon icon={faCheckSquare} /> Proceed to checkout </button> : <Link to="/courses" className="btn btn-secondary"><FontAwesomeIcon icon={faShoppingCart} /> Buy any Course</Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;