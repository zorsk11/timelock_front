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
import { User } from '@/features/StaffProfile/modal/type';
import DeleteButton from '@/features/StaffProfile/ui/DeleteButton'; 

const UsersCard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Функция загрузки пользователей
  const fetchUsers = () => {
    fetch('http://localhost:8080/users')
      .then((response) => {
        if (!response.ok) {
          console.error('Статус ответа:', response.status);
          throw new Error('Ошибка сети');
        }
        return response.json();
      })
      .then((data: any) => {
        if (!Array.isArray(data)) {
          console.error('Неправильный формат ответа:', data);
          return;
        }

        const usersArray: User[] = data.map((item: any) => ({
          id: item.id,
          keyId: item.key_id,
          firstName: item.first_name,
          secondName: item.second_name,
          email: item.email,
          accessRooms: item.access_rooms || [],
          photos: item.photos || [],
          address: item.address || '',
          phone: item.phone || '',
          country: item.country || '',
          city: item.city || '',
          role: item.role,
          password: item.password || '',
        }));

        setUsers(usersArray);
      })
      .catch((error) => console.error('Ошибка при получении данных:', error));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Фильтрация пользователей
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.secondName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box overflow="hidden" bg="white" borderRadius="16px" p={4} mb={6}>
      {/* Поиск */}
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
            placeholder="Поиск по имени"
            width="auto"
          />
        </InputGroup>
      </Flex>

      {/* Таблица пользователей */}
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Имя</Th>
            <Th>Фамилия</Th>
            <Th>Email</Th>
            <Th>Роль</Th>
            <Th>Город</Th>
            <Th>Телефон</Th>
            <Th>Адрес</Th>
            <Th>Комнаты</Th>
            <Th>Действия</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers.map((user) => (
            <Tr key={user.id} _hover={{ bg: 'gray.100' }}>
              <Td>{user.firstName}</Td>
              <Td>{user.secondName}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
              <Td>{user.city}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.address}</Td>
              <Td>{user.accessRooms.join(', ')}</Td>
              <Td>
              <DeleteButton userId={user.id} refreshUsers={fetchUsers} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default UsersCard;
