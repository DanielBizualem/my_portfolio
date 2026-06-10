import Message from "../model/message.js";

export const messageService = async (messageData) => {
    try {
        const { email } = messageData;

        // If an email is provided, check if this lead already exists
        if (email) {
            const existingUser = await Message.findOne({ email });
            if (existingUser) {
                throw new Error('A lead with this email has already been submitted.');
            }
        }

        // Create and save the new lead
        const newLead = new Message(messageData);
        return await newLead.save();
    } catch (error) {
        throw new Error(error.message);
    }
};