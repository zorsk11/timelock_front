import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from '@chakra-ui/react';

interface Room {
  id: string;
  room_number: string;
  // другие поля, если необходимы
}

interface Staff {
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  role: string;
  password: string;
  accessRooms: string; // выбрана одна аудитория
}

const CreateStaffForm: React.FC = () => {
  const [staff, setStaff] = useState<Staff>({
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    role: '',
    password: '',
    accessRooms: '',
  });

  const [rooms, setRooms] = useState<Room[]>([]);
  const toast = useToast();
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/rooms');
        if (response.ok) {
          const data = await response.json();
          // Если сервер возвращает объект вида { data: [...] }
          setRooms(data.data || []);
        } else {
          console.error('Ошибка загрузки аудиторий:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка при получении аудиторий:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staff),
      });
      if (response.ok) {
        toast({
          title: 'Пользователь создан!',
          description: 'Сотрудник успешно создан.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Ошибка создания пользователя',
          description: response.statusText,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка создания пользователя',
        description: 'Произошла ошибка при создании пользователя.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={4}>
        <FormLabel>Имя</FormLabel>
        <Input
          name="first_name"
          placeholder="Введите имя"
          onChange={handleChange}
          value={staff.first_name}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Фамилия</FormLabel>
        <Input
          name="second_name"
          placeholder="Введите фамилию"
          onChange={handleChange}
          value={staff.second_name}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          type="email"
          placeholder="Введите email"
          onChange={handleChange}
          value={staff.email}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Телефон</FormLabel>
        <Input
          name="phone"
          placeholder="Введите телефон"
          onChange={handleChange}
          value={staff.phone}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Адрес</FormLabel>
        <Input
          name="address"
          placeholder="Введите адрес"
          onChange={handleChange}
          value={staff.address}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Город</FormLabel>
        <Input
          name="city"
          placeholder="Введите город"
          onChange={handleChange}
          value={staff.city}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Страна</FormLabel>
        <Input
          name="country"
          placeholder="Введите страну"
          onChange={handleChange}
          value={staff.country}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Роль</FormLabel>
        <Select
          name="role"
          placeholder="Выберите роль"
          onChange={handleChange}
          value={staff.role}
        >
          <option value="учитель">Преподаватель</option>
          <option value="администратор">Администратор</option>
          <option value="персонал">Персонал</option>
        </Select>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Пароль</FormLabel>
        <Input
          name="password"
          type="password"
          placeholder="Введите пароль"
          onChange={handleChange}
          value={staff.password}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Аудитория</FormLabel>
        <Select
          name="accessRooms"
          placeholder="Выберите аудиторию"
          onChange={handleChange}
          value={staff.accessRooms}
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.room_number}>
              {room.room_number}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button colorScheme="blue" type="submit">
        Создать сотрудника
      </Button>
    </form>
  );
};

export default CreateStaffForm;
