import { createHireLead, getAllHireLeads} from '../service/hire.js';
import { messageService } from '../service/messageService.js';

/**
 * POST /api/hire
 * Submits a new portfolio hire form inquiry
 */
export const submitHireForm = async (req, res) => {
    try {
        const { name, email, phone, project_scope,message } = req.body;

        // Basic validation
        if (!name) {
            return res.status(400).json({ success: false, message: 'Name field is required.' });
        }

        // Send data to service layer
        const lead = await createHireLead({ name, email, phone, project_scope,message });
        

        return res.status(201).json({
            success: true,
            message: 'Your request has been submitted successfully!🎉',
            data: lead
        });
    } catch (error) {
        // Handle explicit errors thrown from service (e.g., duplicate email)
        return res.status(400).json({
            success: false,
            message: error.message || 'Something went wrong while processing your request.'
        });
    }
};

export const messageController = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic validation
        if (!name) {
            return res.status(400).json({ success: false, message: 'Name field is required.' });
        }

        // Send data to service layer
        const lead = await messageService({ name, email, message });
        

        return res.status(201).json({
            success: true,
            message: 'Your message has been submitted successfully!🎉',
            data: lead
        });
    } catch (error) {
        // Handle explicit errors thrown from service (e.g., duplicate email)
        return res.status(400).json({
            success: false,
            message: error.message || 'Something went wrong while processing your request.'
        });
    }
};

/**
 * GET /api/hire
 * Retrieves all submissions (Protected admin route functionality later)
 */
export const getHireInquiries = async (req, res) => {
    try {
        const leads = await getAllHireLeads();
        return res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};