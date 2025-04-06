import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store/index'; // Импортируйте тип корневого состояния вашего Redux store

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

// Thunk для логина пользователя
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

// Thunk для обновления контактов (почты и телефона) пользователя.
// Теперь в payload отправляются только непустые поля,
// а если сервер не возвращает обновлённое значение, сохраняем старое.
export const updateUserContact = createAsyncThunk<
  { email: string; phone: string },
  { email?: string; phone?: string },
  { state: RootState; rejectValue: string }
>(
  'auth/updateUserContact',
  async (contactData, thunkAPI) => {
    try {
      // Получаем токен и текущего пользователя из состояния
      const state = thunkAPI.getState();
      const user = state.auth.user;
      if (!user) {
        return thunkAPI.rejectWithValue('Пользователь не авторизован');
      }

      // Формируем URL для обновления с использованием ID пользователя (маршрут: PUT /users/:id)
      const url = `http://localhost:8080/users/${user.id}`;

      // Формируем payload: включаем только те поля, которые не пустые
      const payload: Partial<{ email: string; phone: string }> = {};
      if (contactData.email !== undefined && contactData.email !== "") {
        payload.email = contactData.email;
      }
      if (contactData.phone !== undefined && contactData.phone !== "") {
        payload.phone = contactData.phone;
      }

      // Если нет данных для обновления, возвращаем ошибку
      if (Object.keys(payload).length === 0) {
        return thunkAPI.rejectWithValue('Нет данных для обновления');
      }

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.error || 'Ошибка обновления данных');
      }

      const data = await response.json();

      // Если сервер не вернул одно из полей, используем старое значение
      const updatedEmail = data.email !== undefined && data.email !== "" ? data.email : user.email;
      const updatedPhone = data.phone !== undefined && data.phone !== "" ? data.phone : user.phone;

      return {
        email: updatedEmail,
        phone: updatedPhone,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Ошибка обновления данных');
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
    // Обработка loginUser
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

    // Обработка updateUserContact
    builder.addCase(updateUserContact.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateUserContact.fulfilled,
      (state, action: PayloadAction<{ email: string; phone: string }>) => {
        state.loading = false;
        if (state.user) {
          state.user.email = action.payload.email;
          state.user.phone = action.payload.phone;
        }
      }
    );
    builder.addCase(updateUserContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Ошибка обновления данных';
    });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
