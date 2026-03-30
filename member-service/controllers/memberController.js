const Member = require('../models/Member');

/**
 * GET all members
 */
const getAllMembers = async (req, res, next) => {
    try {
        const members = await Member.find();

        res.status(200).json({
            success: true,
            count: members.length,
            data: members
        });
    } catch (error) {
        next(error);
    }
};

/**
 * CREATE member
 */
const createMember = async (req, res, next) => {
    try {
        console.log("BODY:", req.body); // 🔥 DEBUG

        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                error: 'Name and Email are required'
            });
        }

        const member = await Member.create({ name, email });

        res.status(201).json({
            success: true,
            data: member
        });

    } catch (error) {
        next(error);
    }
};

/**
 * GET by ID
 */
const getMemberById = async (req, res, next) => {
    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                error: 'Member not found'
            });
        }

        res.status(200).json({
            success: true,
            data: member
        });

    } catch (error) {
        next(error);
    }
};

/**
 * UPDATE
 */
const updateMember = async (req, res, next) => {
    try {
        const member = await Member.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!member) {
            return res.status(404).json({
                success: false,
                error: 'Member not found'
            });
        }

        res.status(200).json({
            success: true,
            data: member
        });

    } catch (error) {
        next(error);
    }
};

/**
 * DELETE
 */
const deleteMember = async (req, res, next) => {
    try {
        const member = await Member.findByIdAndDelete(req.params.id);

        if (!member) {
            return res.status(404).json({
                success: false,
                error: 'Member not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Member deleted successfully'
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllMembers,
    createMember,
    getMemberById,
    updateMember,
    deleteMember
};