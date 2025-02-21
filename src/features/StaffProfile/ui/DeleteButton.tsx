import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

interface DeleteButtonProps {
  userId: string;
  refreshUsers: () => void; // Функция обновления списка пользователей
}

interface Room {
  id: string;
  name: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ userId, refreshUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    address: '',
    role: '',
    city: '',
    country: '',
    rooms: '', // Храним id выбранной комнаты
  });

  // Состояние для хранения исходных данных пользователя
  const [initialUserData, setInitialUserData] = useState({
    email: '',
    phone: '',
    address: '',
    role: '',
    city: '',
    country: '',
    rooms: '',
  });

  // Список доступных комнат из базы
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

  const toast = useToast();

  // Загружаем список комнат из API
  useEffect(() => {
    fetch('http://localhost:8080/rooms')
      .then((response) => response.json())
      .then((data) => {
        let roomsData: Room[] = [];
        if (Array.isArray(data)) {
          roomsData = data;
        } else if (data.data && Array.isArray(data.data)) {
          roomsData = data.data;
        }
        console.log('Загруженные комнаты:', roomsData);
        setAvailableRooms(roomsData);
      })
      .catch((error) => console.error('Ошибка загрузки комнат:', error));
  }, []);

  // Загружаем данные пользователя для редактирования
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:8080/users/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          const fetchedData = {
            email: data.email,
            phone: data.phone,
            address: data.address,
            role: data.role,
            city: data.city,
            country: data.country,
            rooms: data.rooms || '', // ожидается, что здесь хранится id комнаты
          };
          setUserData(fetchedData);
          setInitialUserData(fetchedData); // Сохраняем исходные данные
        })
        .catch((error) => console.error('Ошибка загрузки пользователя:', error));
    }
  }, [userId]);

  // Функция удаления пользователя
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления пользователя');
      }

      toast({
        title: 'Пользователь удален',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      refreshUsers();
      onClose();
    } catch (error) {
      console.error('Ошибка:', error);
      toast({
        title: 'Ошибка удаления',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Функция обновления пользователя с методом PUT
  const handleUpdate = async () => {
    try {
      // Если поле не заполнено, используем исходное значение
      const updatedData = {
        email: userData.email.trim() ? userData.email : initialUserData.email,
        phone: userData.phone.trim() ? userData.phone : initialUserData.phone,
        address: userData.address.trim() ? userData.address : initialUserData.address,
        city: userData.city.trim() ? userData.city : initialUserData.city,
        country: userData.country.trim() ? userData.country : initialUserData.country,
        rooms: userData.rooms.trim() ? userData.rooms : initialUserData.rooms,
      };

      const response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления пользователя');
      }

      toast({
        title: 'Данные обновлены',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      refreshUsers();
      onClose();
    } catch (error) {
      console.error('Ошибка:', error);
      toast({
        title: 'Ошибка обновления',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Menu placement="right-start">
        <MenuButton
          as={IconButton}
          icon={<HamburgerIcon />}
          aria-label="Menu"
          background="none"
        />
        <MenuList>
          <MenuItem
            onClick={() => {
              setIsEditing(true);
              onOpen();
            }}
          >
            Изменить
          </MenuItem>
          <MenuItem
            onClick={() => {
              setIsEditing(false);
              onOpen();
            }}
          >
            Удалить
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? 'Редактировать пользователя' : 'Удалить пользователя?'}
          </ModalHeader>
          <ModalBody>
            {isEditing ? (
              <>
                <Input
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Телефон"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Адрес"
                  value={userData.address}
                  onChange={(e) =>
                    setUserData({ ...userData, address: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Город"
                  value={userData.city}
                  onChange={(e) =>
                    setUserData({ ...userData, city: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Страна"
                  value={userData.country}
                  onChange={(e) =>
                    setUserData({ ...userData, country: e.target.value })
                  }
                  mb={3}
                />
                <Select
                  placeholder="Выберите комнату"
                  value={userData.rooms}
                  onChange={(e) =>
                    setUserData({ ...userData, rooms: e.target.value })
                  }
                  mb={3}
                  bg="white" // Явно задаём белый фон
                  color="black" // и чёрный цвет текста
                >
                  {availableRooms.length ? (
                    availableRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Нет доступных комнат
                    </option>
                  )}
                </Select>
              </>
            ) : (
              'Вы уверены, что хотите удалить пользователя? Это действие нельзя отменить.'
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Отмена
            </Button>
            <Button
              colorScheme={isEditing ? 'blue' : 'red'}
              onClick={isEditing ? handleUpdate : handleDelete}
            >
              {isEditing ? 'Сохранить' : 'Удалить'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteButton;
