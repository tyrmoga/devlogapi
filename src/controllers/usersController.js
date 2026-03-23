import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const listUsersController = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            // For demonstration, we return a static list of users. In a real application, you would fetch this from the database.
            res.status(200).send("List of users");
        });
    } catch (err) {
        console.error('Error in listUsersController:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }  
};

export const listSpecificUserController = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }   
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            // For demonstration, we return a static user. In a real application, you would fetch this from the database using req.params.id.
            res.status(200).send(`Details of user with id ${req.params.id}`);
        });
    } catch (err) {
        console.error('Error in listSpecificUserController:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }   
};

export const updateUserController = async (req, res) => {   
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            // For demonstration, we return a success message. In a real application, you would update the user in the database using req.params.id and req.body.
            res.status(200).send(`User with id ${req.params.id} updated successfully`);
        });
    } catch (err) {
        console.error('Error in updateUserController:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }   
};

export const deleteUserController = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: 'Unauthorized' });
            }
            // For demonstration, we return a success message. In a real application, you would delete the user from the database using req.params.id.
            res.status(200).send(`User with id ${req.params.id} deleted successfully`);
        });
    } catch (err) {
        console.error('Error in deleteUserController:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }   
};