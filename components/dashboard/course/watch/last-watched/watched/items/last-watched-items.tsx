import { LastWatched } from "@/client/models/watched/last-watched";
import LastWatchedItem from "./last-watched-item";
import { User } from "@/client/structs/types/next-auth";

interface LastWatchedItemsProps {
  user: User;
  items: LastWatched[];
}

export default function LastWatchedItems({
  user,
  items,
}: LastWatchedItemsProps) {
  return items.map((item, index) => (
    <LastWatchedItem key={index} item={item} user={user} />
  ));
}
