// authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Интерфейс пользователя (свойства с заглавной буквы, как вы их используете в состоянии)
export interface User {
  id: string;
  email: string;
  FirstName: string;
  SecondName: string;
  token: string;
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
  },
  { identifier: string; password: string },
  { rejectValue: string }
>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData.error || 'Ошибка авторизации');
      }
      
      const data = await response.json();
      
      // Преобразуем данные: извлекаем нужные поля из data.user
      return {
        token: data.token,
        message: data.message,
        id: data.user.id,
        email: data.user.email,
        first_name: data.user.first_name,
        second_name: data.user.second_name,
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
    // Здесь производится маппинг из payload, который содержит поля first_name и second_name,
    // в поля состояния FirstName и SecondName
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
        }>
      ) => {
        state.loading = false;
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          FirstName: action.payload.first_name,   // маппинг из first_name
          SecondName: action.payload.second_name,   // маппинг из second_name
          token: action.payload.token,
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
