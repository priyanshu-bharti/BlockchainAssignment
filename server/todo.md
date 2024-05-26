<!-- ----------------------------------------------------------------------- -->
<!--                    Get all transactions for a block                     -->
<!-- ----------------------------------------------------------------------- -->

```jsx
import axios from "axios";

let headersList = {
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  jsonrpc: "2.0",
  method: "starknet_getBlockWithTxs",
  params: [
    {
      block_number: 643323, // Change this for each new transaction
    },
  ],
  id: 1,
});

let reqOptions = {
  url: "https://free-rpc.nethermind.io/mainnet-juno",
  method: "POST",
  headers: headersList,
  data: bodyContent,
};

let response = await axios.request(reqOptions);
console.log(response.data);
```

<!-- ----------------------------------------------------------------------- -->
<!--                    Get the latest transaction number                    -->
<!-- ----------------------------------------------------------------------- -->

```tsx
import axios from "axios";

let headersList = {
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  jsonrpc: "2.0",
  method: "starknet_blockNumber",
  params: [],
  id: 1,
});

let reqOptions = {
  url: "https://free-rpc.nethermind.io/mainnet-juno",
  method: "POST",
  headers: headersList,
  data: bodyContent,
};

let response = await axios.request(reqOptions);
console.log(response.data);
```

<!-- ----------------------------------------------------------------------- -->
<!--                Get the details for a single transaction                 -->
<!-- ----------------------------------------------------------------------- -->

```tsx
import axios from "axios";

let headersList = {
  "Content-Type": "application/json",
};

let bodyContent = JSON.stringify({
  jsonrpc: "2.0",
  method: "starknet_getTransactionReceipt",
  params: ["0x30b0013be9343eefa91333ec2ace938a2eef4955102ad2b09ceb030cc6f706e"],
  id: 1,
});

let reqOptions = {
  url: "https://free-rpc.nethermind.io/mainnet-juno",
  method: "POST",
  headers: headersList,
  data: bodyContent,
};

let response = await axios.request(reqOptions);
console.log(response.data);
```
