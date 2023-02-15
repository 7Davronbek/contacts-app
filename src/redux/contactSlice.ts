import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_PATH } from "../constants";
import { ITags, IContacts } from "../interface";

// GET ALL TAGS
const getTags = createAsyncThunk("contact/getTags", async () => {
  const response = await fetch(API_PATH + "/tag-list-create/");
  const res = response.json();
  return res;
});

//   CREATE TAG
const createTag = createAsyncThunk(
  "contact/createTag",
  async (name: string) => {
    await axios
      .post(API_PATH + "/tag-list-create/", { name })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
);

// GET ALL CONTACTS
const getContacts = createAsyncThunk("contact/getContacts", async () => {
  const response = await fetch(API_PATH + "/list-contacts/");
  const res = response.json();
  return res;
});

// GET SINGLE CONTACT BY ID
const getContact = createAsyncThunk(
  "contact/getContact",
  async (id: string) => {
    const response = await fetch(API_PATH + `/contact-rud/${id}/`);
    const res = response.json();
    return res;
  }
);

// DELETE CONTACT BY ID
const deleteContact = createAsyncThunk(
  "contact/deleteById",
  async (id: number) => {
    await axios.delete(API_PATH + `/contact-rud/${id}/`);
    return;
  }
);

interface IContactState {
  isLoading: boolean;
  isTags: boolean;
  tags: ITags[];

  isContact: boolean;
  contacts: IContacts[];

  deleteContactLoading: boolean;

  getSingleContactLoading: boolean;
  contact: any;
}

const initialState: IContactState = {
  isLoading: false,
  isTags: false,
  tags: [],

  isContact: false,
  contacts: [],

  deleteContactLoading: false,

  getSingleContactLoading: false,
  contact: [],
};
export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //   CREATE TAG
    builder.addCase(createTag.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(createTag.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Tag created successfully");
      }),
      builder.addCase(createTag.rejected, (state) => {
        toast.error("Internet error");
        state.isLoading = false;
      });

    //   GET ALL TAGS
    builder.addCase(getTags.pending, (state) => {
      state.isTags = true;
    }),
      builder.addCase(getTags.fulfilled, (state, action) => {
        state.isTags = false;
        state.tags = action.payload;
      }),
      builder.addCase(getTags.rejected, (state) => {
        toast.error("Internet error");
        state.isTags = false;
      });

    //   GET ALL CONTACTS
    builder.addCase(getContacts.pending, (state) => {
      state.isContact = true;
    }),
      builder.addCase(getContacts.fulfilled, (state, action) => {
        state.isContact = false;
        state.contacts = action.payload;
      }),
      builder.addCase(getContacts.rejected, (state) => {
        toast.error("Internet error");
        state.isContact = false;
      });

    //   DELETE CONTACT BY ID
    builder.addCase(deleteContact.pending, (state) => {
      state.deleteContactLoading = true;
    }),
      builder.addCase(deleteContact.fulfilled, (state, action) => {
        state.deleteContactLoading = false;
        toast.success("Contact has been deleted");
      }),
      builder.addCase(deleteContact.rejected, (state) => {
        toast.error("Internet error");
        state.deleteContactLoading = false;
      });

    //   GET SINGLE STUDENT BY ID
    builder.addCase(getContact.pending, (state) => {
      state.getSingleContactLoading = true;
    }),
      builder.addCase(getContact.fulfilled, (state, action) => {
        state.getSingleContactLoading = false;
        state.contact = action.payload;
      }),
      builder.addCase(getContact.rejected, (state) => {
        toast.error("Internet error");
        state.getSingleContactLoading = false;
      });
  },
});

export const contactAction = {
  ...contactSlice.actions,
  createTag,
  getTags,
  getContacts,
  deleteContact,
  getContact,
};

export default contactSlice.reducer;
