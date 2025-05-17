import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        list: [],
    },
    reducers: {
        addContact: (state, action) => {
            const newContact = {
                id: Date.now(),
                ...action.payload,
            };
            state.list.push(newContact);
        },
        deleteContact: (state, action) => {
            state.list = state.list.filter(
                (contact) => contact.id !== action.payload
            );
        },
        updateContact: (state, action) => {
            const { id, ...updatedContact } = action.payload;
            const index = state.list.findIndex((contact) => contact.id === id);
            if (index !== -1) {
                state.list[index] = { id, ...updatedContact };
            }
        },
    },
});

export const { addContact, deleteContact, updateContact } =
    contactsSlice.actions;
export default contactsSlice.reducer;