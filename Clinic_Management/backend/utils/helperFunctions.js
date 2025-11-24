const ensureRole = (req, res, role) => {
    if (!req.user || req.user.role !== role) {
        res.status(403).json({ message: `${role} access required` });
        return false;
    }
    return true;
};

export { ensureRole }