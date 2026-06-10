import User from '../model/user.js'; // Adjust the path if your model is named differently

/**
 * Service to handle business logic for hiring/leads
 */
export const createHireLead = async (hireData) => {
    try {
        const { email } = hireData;

        // If an email is provided, check if this lead already exists
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('A lead with this email has already been submitted.');
            }
        }

        // Create and save the new lead
        const newLead = new User(hireData);
        return await newLead.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

//fetch all hire leads
export const getAllHireLeads = async () => {
    try {
        return await User.find({}).sort({ createdAt: -1 }); // Newest first
    } catch (error) {
        throw new Error('Could not fetch hire leads.');
    }
};