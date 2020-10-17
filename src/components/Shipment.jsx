import React from 'react';

const Shipment = () => {
    return (
        <>
        <div className="my-4">
            <h1 className="text-center text-primary">Shipment Details</h1>
        </div>
        <div className="container contact_div">
            <div className="row">
                <div className="col-md-6 col-10 mx-auto">
                    <div className="mb-3">
                        <label for="exampleformControlInput1" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="exampleformControlInput1" placeholder="Enter Your Name" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleformControlInput1" className="form-label">Phone</label>
                        <input type="number" className="form-control" id="exampleformControlInput2" placeholder="Enter Mobile Number" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleformControlInput1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleformControlInput3" placeholder="Enter Your Email" />
                    </div>
                    <div className="mb-3">
                        <label for="exampleformControlTextarea1" className="form-label">Address</label>
                        <textarea className="form-control" id="exampleformControlTextarea1" rows="2"></textarea>
                    </div>
                    <div className="col-12">
                        <button className="btn btn-outline-primary" type="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default Shipment;