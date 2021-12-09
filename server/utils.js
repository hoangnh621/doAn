import jwt from 'jsonwebtoken';


const getToken = (user) => {
    return jwt.sign(
        {
        _id: user._id,
        name: user.name,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
        expiresIn: '48h',
        }
    );
};

export {getToken}