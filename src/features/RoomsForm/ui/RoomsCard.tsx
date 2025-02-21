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
  Button,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface Room {
  id: string;
  room_number: string;
  floor: number;
  access_controller_id: string;
}

const RoomsCard: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 20;

  // Функция для получения данных о кабинетах
  const fetchRooms = () => {
    fetch('http://localhost:8080/rooms')
      .then((response) => {
        if (!response.ok) {
          console.error('Статус ответа:', response.status);
          throw new Error('Ошибка сети');
        }
        return response.json();
      })
      .then((data: any) => {
        console.log('Полученные данные:', data);
        // Предполагается, что сервер возвращает объект вида { data: [...] }
        setRooms(data.data || []);
      })
      .catch((error) => console.error('Ошибка при получении данных:', error));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Фильтрация кабинетов по номеру
  const filteredRooms = rooms.filter((room) =>
    room.room_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Расчёт пагинации
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  // Рассчитываем диапазон номеров страниц для отображения (до 5 кнопок)
  let startPage: number, endPage: number;
  if (totalPages <= 5) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= 3) {
      startPage = 1;
      endPage = 5;
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4;
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  const paginationButtons = [];
  for (let i = startPage; i <= endPage; i++) {
    paginationButtons.push(
      <Button
        key={i}
        onClick={() => setCurrentPage(i)}
        colorScheme={i === currentPage ? 'blue' : 'gray'}
        mx={1}
        size="sm"
      >
        {i}
      </Button>
    );
  }

  // Пример использования useBreakpointValue (при необходимости)
  const imageSize = useBreakpointValue({ base: '40px', sm: '60px' });

  return (
    <Box
      overflow="hidden"
      bg="white"
      borderRadius="12px" // уменьшили радиус
      p={2}             // уменьшили отступы
      mb={6}
      maxWidth="800px"  // ограниченная ширина
      mx="auto"        // по центру
    >
      {/* Header с поиском */}
      <Flex justify="space-between" align="center" mb={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="#8E8E93" />
          </InputLeftElement>
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // сброс страницы при новом поиске
            }}
            background="#F5F5F5"
            border="none"
            borderRadius="md"
            placeholder="Поиск по кабинету"
            width="auto"
          />
        </InputGroup>
      </Flex>

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Кабинет</Th>
            <Th>Этаж</Th>
            <Th>Контроллер доступа</Th>
          </Tr>
        </Thead>
        <Tbody>
          {currentRooms.map((room) => (
            <Tr key={room.id} _hover={{ bg: 'gray.100' }}>
              <Td>{room.room_number}</Td>
              <Td>{room.floor}</Td>
              <Td>{room.access_controller_id}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Панель пагинации */}
      <Flex justify="center" align="center" mt={4}>
        {paginationButtons}
      </Flex>

      <Flex justify="center" align="center" mt={2}>
        <Text fontSize="sm">
          Страница {currentPage} из {totalPages}
        </Text>
      </Flex>
    </Box>
  );
};

export default RoomsCard;
