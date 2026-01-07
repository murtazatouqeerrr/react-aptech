import React, { useState, useEffect } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/service")
      .then((response) => response.json())
      .then((data) => {
        setServices(data.getservice || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger text-center mt-5">
        Error: {error}
      </div>
    );

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Our Services</h1>

      <div className="row">
        {services.map((service) => (
          <div className="col-md-4 mb-4" key={service._id}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  {service.service}
                </h5>

                <p className="card-text text-muted">
                  {service.description}
                </p>

                <h6 className="fw-bold">
                  Price: <span className="text-success">${service.price}</span>
                </h6>

                <p className="mb-0">
                  <strong>Provider:</strong> {service.provider}
                </p>
              </div>

              <div className="card-footer bg-white border-0 text-center">
                <button className="btn btn-outline-primary btn-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
