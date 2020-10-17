import React from 'react';
import fakeData from '../fakeData.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faUser, faDollarSign, faUsers, faUniversity } from '@fortawesome/free-solid-svg-icons';

const Courses = (props) => {
    return (
        <>
            <div className="my-5">
                <h1 className="text-center text-primary"> Our Courses </h1>
            </div>
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row gy-4">
                            {fakeData.map(courses =>
                                <div className="col-md-4 col-10 mx-auto" key={courses.id}>
                                    <div className="card">
                                        <img src={courses.image} className="card-img-top" alt="Course" />
                                        <div className="card-body">
                                            <h5 className="card-title">{courses.Course_name}</h5>
                                            <p className="card-text lead"><FontAwesomeIcon icon={faUser} /> {courses.course_instructor}</p>
                                            <p className="card-text"><FontAwesomeIcon icon={faUniversity} /> {courses.Institution_name}</p>
                                            <div>
                                                <span className="card-text mr-4"><FontAwesomeIcon icon={faUsers} /> {courses.enroll_students} students enrolled</span>
                                                <span className="card-text ml-5 lead"><FontAwesomeIcon icon={faDollarSign} /> {courses.price}</span>
                                            </div>
                                            <button onClick={() => props.addToCart(courses)} className="btn btn-primary mt-3"><FontAwesomeIcon icon={faCartArrowDown} /> Buy Course</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Courses;