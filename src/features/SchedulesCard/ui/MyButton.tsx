import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';

interface Room {
  id: string;
  room_number: string;
  floor: number;
  access_controller_id: string;
}

const ScheduleForm: React.FC = () => {
  const [schedule, setSchedule] = useState({
    first_name: '',
    second_name: '',
    day: '',
    start_time: '',
    end_time: '',
    room_number: '',
    subject: '',
  });

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8080/rooms');
        if (response.ok) {
          const data = await response.json();
          // Если ответ выглядит как { "data": [ ... ] }
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
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedule),
      });
      if (response.ok) {
        // Обработка успешного сохранения, например, закрытие дровера или очистка формы
      } else {
        console.error('Ошибка при сохранении расписания:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при создании расписания:', error);
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
          value={schedule.first_name}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Фамилия</FormLabel>
        <Input
          name="second_name"
          placeholder="Введите фамилию"
          onChange={handleChange}
          value={schedule.second_name}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>День</FormLabel>
        <Select
          name="day"
          placeholder="Выберите день"
          onChange={handleChange}
          value={schedule.day}
        >
          <option value="Monday">Понедельник</option>
          <option value="Tuesday">Вторник</option>
          <option value="Wednesday">Среда</option>
          <option value="Thursday">Четверг</option>
          <option value="Friday">Пятница</option>
          <option value="Saturday">Суббота</option>
          <option value="Sunday">Воскресенье</option>
        </Select>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Начало</FormLabel>
        <Input
          type="time"
          name="start_time"
          onChange={handleChange}
          value={schedule.start_time}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Конец</FormLabel>
        <Input
          type="time"
          name="end_time"
          onChange={handleChange}
          value={schedule.end_time}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Аудитория</FormLabel>
        <Select
          name="room_number"
          placeholder="Выберите аудиторию"
          onChange={handleChange}
          value={schedule.room_number}
        >
          {rooms.map((room) => (
            <option key={room.id} value={room.room_number}>
              {room.room_number}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Предмет</FormLabel>
        <Input
          name="subject"
          placeholder="Введите предмет"
          onChange={handleChange}
          value={schedule.subject}
        />
      </FormControl>
      <Button colorScheme="blue" type="submit">
        Создать расписание
      </Button>
    </form>
  );
};

export default ScheduleForm;
