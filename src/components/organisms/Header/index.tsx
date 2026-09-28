import { Button } from "../../atoms/Button";
import { SyncStatus } from "../../molecules/SyncStatus";
import { Right, Title, Wrapper } from "./styles";

type Props = {
  onAdd: () => void;
};

export function Header({ onAdd }: Props) {
  return (
    <Wrapper>
      <Title>Expense Tracker</Title>
      <Right>
        <SyncStatus />
        <Button $variant="primary" onClick={onAdd}>
          Add Expense
        </Button>
      </Right>
    </Wrapper>
  );
}
