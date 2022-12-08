import {atom, selector} from 'recoil';

const joinPolicyState = atom({
    key: 'joinPolicyState',
    default: {
        termOfService: false,
        lifeRecord: false,
        personalInfo: false,
        privacy: false,
        thirdPerson: false,
    },
});

const joinPolicyAllReset = atom({
    key: 'joinPolicyAllReset',
    default: {
        termOfService: false,
        lifeRecord: false,
        personalInfo: false,
        privacy: false,
        thirdPerson: false,
    },
});

const joinPolicyAllCheck = atom({
    key: 'joinPolicyReset',
    default: {
        termOfService: true,
        lifeRecord: true,
        personalInfo: true,
        privacy: true,
        thirdPerson: true,
    },
});

export {joinPolicyState, joinPolicyAllReset, joinPolicyAllCheck};
