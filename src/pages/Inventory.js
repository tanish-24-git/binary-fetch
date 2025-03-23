import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "../pages/style.css";

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function Inventory() {
  const [fileData, setFileData] = useState({});
  const [predictionData, setPredictionData] = useState({}); // Store predictions per shop
  const [chartData, setChartData] = useState({
    labels: ["Shop 1", "Shop 2", "Shop 3", "Shop 4", "Shop 5", "Shop 6"],
    datasets: [
      {
        label: "Average Predicted Sales",
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
        borderColor: "#333",
        borderWidth: 1,
      },
    ],
  });

  const handleFileChange = (event, shopIndex) => {
    const file = event.target.files[0];
    if (!file) {
      alert("No file selected");
      return;
    }
    if (!file.name.endsWith('.csv')) {
      alert("Please upload a CSV file");
      return;
    }
    if (file.size === 0) {
      alert("Uploaded file is empty");
      return;
    }

    console.log("Selected file for Shop", shopIndex + 1, ":", file.name, "Size:", file.size);
    setFileData((prev) => ({ ...prev, [shopIndex]: file }));
    setPredictionData((prev) => ({ ...prev, [shopIndex]: [] })); // Reset predictions when new file is uploaded
  };

  const handlePredict = async (shopIndex) => {
    const file = fileData[shopIndex];
    if (!file) {
      alert(`No file uploaded for Shop ${shopIndex + 1}`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:8000/inventory/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response for Shop", shopIndex + 1, ":", response.data);

      if (response.data.success && response.data.predictions.length > 0) {
        const predictions = response.data.predictions;
        setPredictionData((prev) => ({ ...prev, [shopIndex]: predictions }));

        // Update chart with average prediction for the shop
        const avgPrediction = predictions.reduce((sum, p) => sum + p.predicted_demand, 0) / predictions.length;
        updateChart(shopIndex, avgPrediction);
        alert(`Prediction for Shop ${shopIndex + 1}: ${response.data.message}`);
      } else {
        alert(`No valid predictions returned for Shop ${shopIndex + 1}`);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Unknown error occurred";
      console.error("Prediction failed for Shop", shopIndex + 1, ":", errorMsg);
      alert(`Failed to predict sales for Shop ${shopIndex + 1}: ${errorMsg}`);
    }
  };

  const updateChart = (shopIndex, avgPrediction) => {
    const updatedData = [...chartData.datasets[0].data];
    updatedData[shopIndex] = avgPrediction;
    setChartData((prev) => ({
      ...prev,
      datasets: [{ ...prev.datasets[0], data: updatedData }],
    }));
  };

  return (
    <div className="container p-4">
      <h2 className="mb-4 text-center">Inventory Management</h2>
      <div className="row">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-lg">
              <div className="card-body">
                <h5 className="card-title">Shop {index + 1}</h5>
                <div className="mb-3">
                  <label htmlFor={`file-input-${index}`} className="form-label">Upload data.csv:</label>
                  <input
                    type="file"
                    className="form-control"
                    id={`file-input-${index}`}
                    accept=".csv"
                    onChange={(event) => handleFileChange(event, index)}
                  />
                </div>
                <button
                  className="btn btn-primary w-100 mb-3"
                  onClick={() => handlePredict(index)}
                  disabled={!fileData[index]}
                >
                  Predict
                </button>
                {predictionData[index] && predictionData[index].length > 0 && (
                  <div>
                    <h6>Prediction Results</h6>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Product ID</th>
                          <th>Product Name</th>
                          <th>Predicted Demand</th>
                        </tr>
                      </thead>
                      <tbody>
                        {predictionData[index].map((pred, idx) => (
                          <tr key={idx}>
                            <td>{pred.product_id}</td>
                            <td>{pred.product_name}</td>
                            <td>{pred.predicted_demand.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <h3>Average Prediction Results</h3>
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default Inventory;