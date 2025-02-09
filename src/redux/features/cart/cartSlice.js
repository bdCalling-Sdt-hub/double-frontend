import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        items: [],
        total: 0,
        subtotal: 0,
};

const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
                addToCart(state, action) {
                        const item = action.payload;
                        const existingItem = state.items.find((cartItem) => cartItem._id === item._id);

                        if (existingItem) {
                                existingItem.quantity += 1;
                                existingItem.subtotal = existingItem.price * existingItem.quantity;
                        } else {
                                state.items.push({ ...item, quantity: 1, subtotal: item.price });
                        }

                        state.total = calculateTotal(state.items);
                        state.subtotal = calculateSubtotal(state.items);
                },

                quantityIncrement(state, action) {
                        const itemId = action.payload;
                        const item = state.items.find((cartItem) => cartItem._id === itemId);
                        item.quantity += 1;
                        item.subtotal = item.price * item.quantity;

                        state.total = calculateTotal(state.items);
                        state.subtotal = calculateSubtotal(state.items);
                },

                quantityDecrement(state, action) {
                        const itemId = action.payload;
                        const item = state.items.find((cartItem) => cartItem._id === itemId);
                        item.quantity -= 1;
                        item.subtotal = item.price * item.quantity;

                        if (item.quantity === 0) {
                                state.items = state.items.filter((cartItem) => cartItem._id !== itemId);
                        }

                        state.total = calculateTotal(state.items);
                        state.subtotal = calculateSubtotal(state.items);
                },

                removeFromCart(state, action) {
                        const itemId = action.payload;
                        state.items = state.items.filter((item) => item._id !== itemId);

                        state.total = calculateTotal(state.items);
                        state.subtotal = calculateSubtotal(state.items);
                },

                clearCart(state) {
                        state.items = [];
                        state.total = 0;
                        state.subtotal = 0;
                },
        },
});

const calculateTotal = (items) => {
        return items.reduce((total, item) => total + item.subtotal, 0);
};
const calculateSubtotal = (items) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const { addToCart, quantityIncrement, quantityDecrement, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
