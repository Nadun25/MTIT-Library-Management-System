/**
 * Member Controller
 * ------------------------------------
 * Handles all logic for member operations
 */

// In-memory "database"
let members = [
    { id: 1, name: 'Alice', email: 'alice@yahoo.com', active: true },
    { id: 2, name: 'Bob', email: 'bob@google.com', active: true }
];

let nextId = 3;

/**
 * GET all members
 */
const getAllMembers = (req, res) => {
    res.status(200).json({
        success: true,
        count: members.length,
        data: members
    });
};

/**
 * CREATE new member
 */
const createMember = (req, res) => {
    const { name, email } = req.body;

    // Validation
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            error: 'Name and Email are required'
        });
    }

    const newMember = {
        id: nextId++,
        name,
        email,
        active: true
    };

    members.push(newMember);

    res.status(201).json({
        success: true,
        data: newMember
    });
};

/**
 * GET member by ID
 */
const getMemberById = (req, res) => {
    const member = members.find(m => m.id == req.params.id);

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
};

/**
 * UPDATE member
 */
const updateMember = (req, res) => {
    const member = members.find(m => m.id == req.params.id);

    if (!member) {
        return res.status(404).json({
            success: false,
            error: 'Member not found'
        });
    }

    const { name, email, active } = req.body;

    if (name) member.name = name;
    if (email) member.email = email;
    if (active !== undefined) member.active = active;

    res.status(200).json({
        success: true,
        data: member
    });
};

/**
 * DELETE member
 */
const deleteMember = (req, res) => {
    const index = members.findIndex(m => m.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            error: 'Member not found'
        });
    }

    members.splice(index, 1);

    res.status(200).json({
        success: true,
        message: 'Member deleted successfully'
    });
};

module.exports = {
    getAllMembers,
    createMember,
    getMemberById,
    updateMember,
    deleteMember
};