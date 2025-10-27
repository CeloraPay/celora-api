import crypto from 'crypto';

const randomKey = (num?: number) => {
    return crypto.randomBytes(num || 32).toString('hex');
};

export default randomKey;
