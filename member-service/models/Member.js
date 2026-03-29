/**
 * Member Model (Simple Structure)
 * ------------------------------------
 * Used as a reference for member objects
 */

class Member {
    constructor(id, name, email, active = true) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.active = active;
    }
}

module.exports = Member;