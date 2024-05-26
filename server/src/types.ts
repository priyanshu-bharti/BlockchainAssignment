export interface BlockResult {
  result: {
    status: string;
    block_number: number;
    timestamp: number;
    transactions: {
      transaction_hash: string;
      type: string;
      version: number;
      calldata: string[];
      signature: string[];
    }[];
  };
}

export interface TransactionResult {
  data: {
    result: {
      type: string;
      transaction_hash: string;
      gasConsumed?: number;
      actual_fee: {
        amount: string;
        unit: string;
      };
      block_hash: string;
      block_number: string;
      events: {
        from_address: string;
        keys: string[];
        data: string[];
      }[];
      unixTimestamp: number;
      nonce: number;
      execution_resources: {
        steps: number;
        pedersen_builtin_applications: number;
        range_check_builtin_applications: number;
        bitwise_builtin_applications: number;
        ec_op_builtin_applications: number;
      };
    };
  };
}

export interface Transaction {
  id: string;
  status: string;
  hash: string;
  type: string;
  block: number;
  age: string;
  position: number;
  version: number;
  calldata: string[];
  signature: string[];
}

export interface TransactionDetail {
  hash: string;
  type: string;
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

export interface StarknetTransaction {
  blockNumber: number;
  timestamp: number;
  actualFee: Fee;
  maxFee?: string;
  gasConsumed?: number;
  tokensTransferred?: any;
  senderAddress?: string;
  unixTimestamp: number;
  nonce?: number;
  position?: number;
  version?: string;
  l1TxnHash?: string;
  executionResources: ExecutionResources;
  calldata: any;
  signature?: string;
}

interface Fee {
  amount: string;
  unit: string;
}

interface ExecutionResources {
  steps: number;
  pedersenBuiltinApplications: number;
  rangeCheckBuiltinApplications: number;
  ecOpBuiltinApplications: number;
  dataAvailability: DataAvailability;
}

interface DataAvailability {
  l1Gas: number;
  l1DataGas: number;
}
