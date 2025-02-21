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
import { Log } from '@/features/LogsForm/model/type';

const LogsCard: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Функция для получения логов
  const fetchLogs = () => {
    fetch('http://localhost:8080/logs') // URL вашего API для логов
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
        const logsArray: Log[] = data.data.map((item: any) => ({
          id: item.id,
          event_type: item.event_type,
          message: item.message,
          user_id: item.user_id,
          timestamp: item.timestamp,
        }));
        setLogs(logsArray);
      })
      .catch((error) => console.error('Ошибка при получении данных:', error));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // Фильтрация логов по типу события или сообщению
  const filteredLogs = logs.filter(
    (log) =>
      log.event_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Пример использования useBreakpointValue, если нужно адаптировать размер чего-либо
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
            placeholder="Поиск "
            width="auto"
          />
        </InputGroup>
      </Flex>

      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Тип события</Th>
            <Th>Сообщение</Th>
            <Th>Время</Th>
            <Th>User ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredLogs.map((log) => (
            <Tr key={log.id} _hover={{ bg: 'gray.100' }}>
              <Td>{log.event_type}</Td>
              <Td>{log.message}</Td>
              <Td>{new Date(log.timestamp).toLocaleString()}</Td>
              <Td>{log.user_id || '—'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default LogsCard;
