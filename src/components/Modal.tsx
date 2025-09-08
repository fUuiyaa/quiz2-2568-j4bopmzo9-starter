import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
} from "@mantine/core";

type AddFoodModalProps = {
  opened: boolean;
  onClose: () => void;
  onAdd: (
    name: string,
    price: number | string,
    quantity: number | string,
    category: string
  ) => void;
};

export default function AddFoodModal({opened, onClose, onAdd}: AddFoodModalProps) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [quantity, setQuantity] = useState<number | string>(0);
  const [category, setCategory] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!name.trim() || price == 0 || quantity == 0 || !category) return;
    onAdd(name, price, quantity, category);
    setName("");
    setPrice(0);
    setQuantity(0);
    setCategory(null);
    onClose();
  };

  // หากต้องการแปง type string เป็น type number สามารถดูตัวอย่างนี้ได้
  let val_number: number = Number("500.0");
  console.log(val_number + 100); // 600.0

  return (
    <Modal opened ={opened} onClose= {onClose} title = "Add an item">
      <Stack>
        <TextInput
          label="Name of item"
          description="Name of item"
          error= {!name.trim() && "Name of item is required"}
          placeholder="e.g., Chicken rice"
          value = {name}
          onChange = {(e) => setName(e.currentTarget.value)}        
        />

        <NumberInput
          label = "Price per dish"
          description = "Price per dish"
          error= { price == 0 && "Price per dish is required"}
          min = {0}
          value = {price}
          onChange = {setPrice}
        />

        <NumberInput
          label = "Quantity"
          description = "Quantity"
          error= { quantity == 0 && "Quantity is required"}
          min = {0}
          value = {quantity}
          onChange = {setQuantity}
          allowDecimal = {false}
        />
        <Select
          label = "Category"
          description = "Category"
          error= { category == null && "Category is required"}
          data={['Main Course', 'Drink', 'Dessert']}
          onChange = {setCategory}
          placeholder= "Select a category"
        />
        <Button onClick = {handleSubmit}>Submit</Button>
      </Stack>
    </Modal>
  );
}
