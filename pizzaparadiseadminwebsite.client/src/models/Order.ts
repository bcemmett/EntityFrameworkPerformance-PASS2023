export interface Order {
    Id: number;
    AccountId: number;
    Restaurant: string;
    TimeReceived: Date;
    TimeAccepted: Date;
    TimeDispatched: Date;
    TimeDelivered: Date;
    TimeRefunded: Date;
    SubTotal: number;
    TaxCharged: number;
    Total: number;
    VoucherCode: string;
}