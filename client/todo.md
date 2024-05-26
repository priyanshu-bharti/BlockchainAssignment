```ts
function timeAgo(timestamp: Date): string {
  const now = new Date();
  const secondsPast = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  if (secondsPast < 0) {
    return "In the future";
  }

  if (secondsPast <= 60) {
    return "A few seconds ago";
  }

  const minutesPast = Math.floor(secondsPast / 60);
  if (minutesPast <= 60) {
    return minutesPast === 1 ? "1 minute ago" : `${minutesPast} minutes ago`;
  }

  const hoursPast = Math.floor(minutesPast / 60);
  if (hoursPast <= 24) {
    return hoursPast === 1 ? "1 hour ago" : `${hoursPast} hours ago`;
  }

  const daysPast = Math.floor(hoursPast / 24);
  if (daysPast <= 30) {
    return daysPast === 1 ? "1 day ago" : `${daysPast} days ago`;
  }

  const monthsPast = Math.floor(daysPast / 30);
  if (monthsPast <= 12) {
    return monthsPast === 1 ? "1 month ago" : `${monthsPast} months ago`;
  }

  const yearsPast = Math.floor(monthsPast / 12);
  return yearsPast === 1 ? "1 year ago" : `${yearsPast} years ago`;
}

// Example usage:
const someDate = new Date("2024-05-25T14:48:00");
console.log(timeAgo(someDate));
```


I have the following interface for Transaction:

export interface Transaction {
  id: string;
  status: string;
  hash: string;
  type: string;
  block: number;
  age: string;
}

I want you to write code which generates JSON file with a list containing 10000 Transactions. The values for the transactions should be:
id: Random UUID
status: Randomly assign one of "pending", "accepted_on_l1"
hash: 24 char hex string,
type: Randomly assign one of "declare", "deploy", "deploy_account", "invoke", "l1_handler"
block: Integer starting from 654512, but gets incremented every 100 entries.
age: For each unique integer, add a minute to "1 minute ago"