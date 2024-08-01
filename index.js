import React, { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import ItemList from '../components/ItemList';
import { Container, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

const Home = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [open, setOpen] = useState(false);

  const addItem = (item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const deleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const editItem = (index) => {
    setCurrentItem({ ...items[index], index });
    setOpen(true);
  };

  const handleEditChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    setItems((prevItems) =>
      prevItems.map((item, i) => (i === currentItem.index ? { name: currentItem.name, quantity: currentItem.quantity } : item))
    );
    setOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4">Pantry Management</Typography>
      <ImageUploader addItem={addItem} />
      <ItemList items={items} onDelete={deleteItem} onEdit={editItem} />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={currentItem?.name || ''}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={currentItem?.quantity || ''}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;

