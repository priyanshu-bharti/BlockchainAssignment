export interface Transaction {
  id: string;
  status: string;
  hash: string;
  type: string;
  block: number;
  age: string;
}

export interface TransactionDetail {
  hash: string,
  type: string,
  transactions?: {
    blockNumber?: number;
    timestamp?: string;
    actualFee?: {
      amount?: string;
      unit?: string;
      usd?: number;
      to?: string;
    };
    gas?: number;
  };
  developer?: {
    timestamp?: number;
    nonce?: number;
    position?: number;
    version?: number;
    execution?: {
      steps: number;
      pedersen: number;
      range_check: number;
      ec_op: number;
    };
    calldata?: {
      input?: number;
      value?: string;
    }[];
    signature?: string[];
  };
  events: {
    from_address: string;
    keys: string[];
    data: string[];
  }[];
}
