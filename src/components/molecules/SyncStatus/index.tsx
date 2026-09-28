import { useAppSelector } from "../../../store/hooks";
import { Badge } from "../../atoms/Badge";

export function SyncStatus() {
  const { isOnline, isSyncing, pending } = useAppSelector(
    (state) => state.offline,
  );

  if (!isOnline)
    return <Badge $variant="warning">Offline - {pending.length} pending</Badge>;
  if (isSyncing) return <Badge $variant="warning">Syncing...</Badge>;
  return <Badge $variant="success">All changes saved</Badge>;
}
