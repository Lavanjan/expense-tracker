import { memo, useState, type FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Modal } from "../../atoms/Modal";
import { Form } from "../../atoms/Form";
import FormField from "../../molecules/FormField";
import { Input, Select, TextArea } from "../../atoms/Input/Input";
import { EXPENSE_CATEGORIES } from "../../../constants/constants";
import { Button } from "../../atoms/Button";
import type { Expense } from "../../../types/types";
import { ButtonsWrapper } from "./styles";

type Props = {
  onClose: () => void;
  onSave: (expenses: Expense) => void;
  expense: Expense | null;
};

function BaseExpenseModalForm({ onClose, onSave, expense }: Props) {
  const [title, setTitle] = useState(expense?.title ?? "");
  const [amount, setAmount] = useState(expense?.amount ?? "");
  const [date, setDate] = useState(
    expense?.date ?? new Date().toISOString().slice(0, 10),
  );
  const [category, setCategory] = useState(
    expense?.category ?? EXPENSE_CATEGORIES[0],
  );
  const [notes, setNotes] = useState(expense?.notes ?? "");
  const [errors, setErrors] = useState<{ title?: string; amount?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!amount || Number(amount) <= 0)
      newErrors.amount = "Amount must be greater than 0";
    setErrors(newErrors);
    onSave({
      id: expense?.id ?? uuidv4(),
      title: title.trim(),
      amount: Number(amount),
      date,
      category,
      notes,
    });
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <FormField label="Title" error={errors.title}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormField>
        <FormField label="Amount" error={errors.amount}>
          <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
        </FormField>

        <FormField label="date">
          <Input
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </FormField>

        <FormField label="Category">
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField label="Notes (optional)">
          <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </FormField>
        <ButtonsWrapper>
          <Button onClick={onClose}>Close </Button>
          <Button $variant="primary" type="submit">
            Save
          </Button>
        </ButtonsWrapper>
      </Form>
    </Modal>
  );
}

export const ExpenseModalForm = memo(BaseExpenseModalForm);
