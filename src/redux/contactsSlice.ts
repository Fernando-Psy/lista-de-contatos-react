import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../types";


interface ContactsState {
    list: Contact[];
}

const initialState: ContactsState = {
    list: [],
};

const contactsSlice = createSlice ({
    name: "contacts",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Omit<Contact, 'id'>>) => {
            const newContact: Contact = {
                id: Date.now(),
                ...action.payload,
            };
            state.list.push(newContact);
        },
        deleteContact: (state, action: PayloadAction<number>) => {
            state.list = state.list.filter(contact => contact.id !== action.payload);
        },
        updateContact: (state,action: PayloadAction<Contact>) => {
            const {id, ...updateContact} = action.payload;
            const index = state.list.findIndex((contact) => contact.id === id);
            if (index !== -1) {
                state.list[index] = { id, ...updateContact };
            }
        },
    },
});

export const { addContact, deleteContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;