export interface ChildRegistrationData {
    _id: string,
    childFirstName: string,
    childLastName: string,
    childSport: {
        _id: string,
        name: string,
    },
    dateOfBirth: string,
    gender: string,
    guardianFirstName: string,
    guardianLastName: string,
    guardianEmail: string,
    guardianAddress: string,
    annualHouseHoldIncome: number,
    showcaseVideoLink: string,
    childStory: string,
    isPlaced: boolean,
    createdAt: string,
    updatedAt: string,
    age: number,
    isShowCase: boolean
}