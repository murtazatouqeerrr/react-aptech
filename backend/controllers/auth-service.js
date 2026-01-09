const Service = require("../models/auth-service");

const getServices = async (req, res) => {
    try {
        const getservice = await Service.find({});
        return res.status(200).json({ msg: "Service fetched successfully", getservice });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error fetching services" });
    }
};

const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { service, description, price, provider } = req.body;
        const updatedService = await Service.findByIdAndUpdate(id, { service, description, price, provider }, { new: true });
        if (!updatedService) {
            return res.status(404).json({ msg: "Service not found" });
        }
        res.status(200).json({ msg: "Service updated successfully", updatedService });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error updating service" });
    }
};

const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ msg: "Service not found" });
        }
        res.status(200).json({ msg: "Service deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error deleting service" });
    }
};

module.exports = { getServices, updateService, deleteService };
