import { TransactionDetail } from "@/types/types";
import EventsTabTable from "./EventsTabTable";
import { formatTime } from "@/utils/formatTime";

interface IEventsTabProps {
  transaction: TransactionDetail;
}

const EventsTab = ({ transaction }: IEventsTabProps) => {
  return (
    <>
      <EventsTabTable>
        {transaction.events.map((event, idx) => (
          <EventsTabTable.Row
            key={event.from_address}
            id={
              transaction.transactions?.blockNumber?.toString() +
              "_407_" +
              (idx + 1).toString()
            }
            block={transaction.transactions?.blockNumber?.toString() ?? ""}
            age={formatTime(
              new Date(transaction.transactions?.timestamp as string)
            )}
          />
        ))}
      </EventsTabTable>
    </>
  );
};

export default EventsTab;
