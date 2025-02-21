  import React, { useEffect, useState } from 'react';
  import {
    Box,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    Tbody,
    Tr,
    Td,
    Thead,
    Th,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import { SearchIcon } from '@chakra-ui/icons';
  import { Schedule } from '@/features/SchedulesCard/model/types'; // Обновлённый интерфейс Schedule
  import MyButton from '@/features/SchedulesCard/ui/MyButton';
  import ScheduleActions from './MenuProduct';

  const SchedulesCard: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Функция для получения расписания
    const fetchSchedule = () => {
      fetch('http://localhost:8080/schedule') // URL вашего API
        .then((response) => {
          if (!response.ok) {
            console.error('Статус ответа:', response.status);
            throw new Error('Ошибка сети');
          }
          return response.json();
        })
        .then((data: any) => {
          console.log('Полученные данные:', data);
          // Преобразуем данные из data.data в нужный формат
          const schedulesArray: Schedule[] = data.data.map((item: any) => ({
            id: item.id,
            userId: item.user_id,
            firstName: item.first_name,
            secondName: item.second_name,
            day: item.day,
            startTime: item.start_time,
            endTime: item.end_time,
            roomNumber: item.room_number,
            subject: item.subject,
          }));
          setSchedules(schedulesArray);
        })
        .catch((error) => console.error('Ошибка при получении данных:', error));
    };

    useEffect(() => {
      fetchSchedule();
    }, []);

    // Фильтрация расписания по предмету
    const filteredSchedules = schedules.filter((schedule) =>
      schedule.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const imageSize = useBreakpointValue({ base: '40px', sm: '60px' });

    return (
      <Box overflow="hidden" bg="white" borderRadius="16px" p={4} mb={6}>
        {/* Header с поиском */}
        <Flex justify="space-between" align="center" mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="#8E8E93" />
            </InputLeftElement>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              background="#F5F5F5"
              border="none"
              borderRadius="16px"
              placeholder="Поиск по предмету"
              width="auto"
            />
          </InputGroup>
        </Flex>

        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              <Th>Предмет</Th>
              <Th>Время</Th>
              <Th>День</Th>
              <Th>Кабинет</Th>
              <Th>Преподаватель</Th>
              <Th>Действия</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredSchedules.map((schedule) => (
              <Tr key={schedule.id} _hover={{ bg: 'gray.100' }}>
                <Td>{schedule.subject}</Td>
                <Td>{`${schedule.startTime} - ${schedule.endTime}`}</Td>
                <Td>{schedule.day}</Td>
                <Td>{schedule.roomNumber}</Td>
                <Td>{`${schedule.firstName} ${schedule.secondName}`}</Td>
                <Td>
                  <ScheduleActions schedule={schedule} refreshSchedules={fetchSchedule} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };

  export default SchedulesCard;
