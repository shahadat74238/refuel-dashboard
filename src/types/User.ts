export interface donationsRecord {
    _id: string,
    donorName: string,
    email: string,
    amount: number,
    fundType: 'IGNITE_FUND' | 'IGNITE_A_CHILD',
    frequency: "One-time" | "Monthly" | "Weekly" | "Yearly",
    freeCovered: true,
    isPaid: false,
    transactionId: string,
    createdAt: string,
    updatedAt: string,
}

export interface ClubAddress {
    streetAddress: string | null
    city: string | null
    zipCode: string | null
}

export interface sportsOfferedData {
    _id: string,
    name: string,
    isDeleted: boolean,
}

export interface ClubRecord {
    _id: string;
    name: string;
    sportsOffered: sportsOfferedData[];
    websiteLink: string;
    fee: number;
    status: string;
    primaryContactName: string;
    quantity: number;
    primaryContactEmail: string;
    primaryContactPhone: string;
    locations: ClubAddress[];
    competitionLevel: string[];
    transactionId: string;
    expireDate: string | null;
    joinDate: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}