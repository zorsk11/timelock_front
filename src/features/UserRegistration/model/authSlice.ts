import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  token: string;
  email: string;
  FirstName: string;
  SecondName: string;
  phone: string;
  role: string;
  accessRooms: string[];
  photos: string[];
  address: string;
  country: string;
  city: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  {
    token: string;
    message: string;
    id: string;
    email: string;
    first_name: string;
    second_name: string;
    phone: string;
    role: string;
    access_rooms: string[];
    photos: string[];
    address: string;
    country: string;
    city: string;
  },
  { identifier: string; password: string },
  { rejectValue: string }
>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.error || 'Ошибка авторизации');
      }

      const data = await response.json();

      return {
        token: data.token,
        message: data.message,
        id: data.user.id,
        email: data.user.email,
        first_name: data.user.first_name,
        second_name: data.user.second_name,
        phone: data.user.phone,
        role: data.user.role,
        access_rooms: data.user.access_rooms,
        photos: data.user.photos,
        address: data.user.address,
        country: data.user.country,
        city: data.user.city,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Ошибка авторизации');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      loginUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          token: string;
          message: string;
          id: string;
          email: string;
          first_name: string;
          second_name: string;
          phone: string;
          role: string;
          access_rooms: string[];
          photos: string[];
          address: string;
          country: string;
          city: string;
        }>
      ) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          FirstName: action.payload.first_name,
          SecondName: action.payload.second_name,
          token: action.payload.token,
          phone: action.payload.phone,
          role: action.payload.role,
          accessRooms: action.payload.access_rooms,
          photos: action.payload.photos,
          address: action.payload.address,
          country: action.payload.country,
          city: action.payload.city,
        };
      }
    );

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка авторизации';
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
