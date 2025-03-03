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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Schedule } from '@features/SchedulesCard/model/types';

interface ScheduleActionsProps {
  schedule: Schedule;
  refreshSchedules: () => void; // Функция обновления списка расписаний
}

const ScheduleActions: React.FC<ScheduleActionsProps> = ({ schedule, refreshSchedules }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [scheduleData, setScheduleData] = useState<Schedule>(schedule);

  const toast = useToast();

  // Обновляем локальное состояние, если изменились пропсы
  useEffect(() => {
    setScheduleData(schedule);
  }, [schedule]);

  // Функция удаления расписания
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/schedule/${scheduleData.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления расписания');
      }

      toast({
        title: 'Расписание удалено',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      refreshSchedules();
      onClose();
    } catch (error) {
      console.error('Ошибка:', error);
      toast({
        title: 'Ошибка удаления расписания',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Функция обновления расписания
  const handleUpdate = async () => {
    try {
      const updatedData = {
        user_id: scheduleData.userId,
        first_name: scheduleData.firstName,
        second_name: scheduleData.secondName,
        day: scheduleData.day,
        start_time: scheduleData.startTime,
        end_time: scheduleData.endTime,
        room_number: scheduleData.roomNumber,
        subject: scheduleData.subject,
      };
      
      const response = await fetch(`http://localhost:8080/schedule/${scheduleData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления расписания');
      }

      toast({
        title: 'Расписание обновлено',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      refreshSchedules();
      onClose();
    } catch (error) {
      console.error('Ошибка:', error);
      toast({
        title: 'Ошибка обновления расписания',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Menu placement="right-start">
        <MenuButton as={IconButton} icon={<HamburgerIcon />} aria-label="Menu" background="none" />
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
            {isEditing ? 'Редактировать расписание' : 'Удалить расписание?'}
          </ModalHeader>
          <ModalBody>
            {isEditing ? (
              <>
                <Input
                  placeholder="User ID"
                  value={scheduleData.userId}
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, userId: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Имя"
                  value={scheduleData.firstName}
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, firstName: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Фамилия"
                  value={scheduleData.secondName}
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, secondName: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="День"
                  value={scheduleData.day}
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, day: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Начало"
                  value={scheduleData.startTime}
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, startTime: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Конец"
                  value={scheduleData.endTime}
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, endTime: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Номер аудитории"
                  value={scheduleData.roomNumber}
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, roomNumber: e.target.value })
                  }
                  mb={3}
                />
                <Input
                  placeholder="Предмет"
                  value={scheduleData.subject}
                  onChange={(e) =>
                    setScheduleData({ ...scheduleData, subject: e.target.value })
                  }
                  mb={3}
                />
              </>
            ) : (
              'Вы уверены, что хотите удалить это расписание? Это действие нельзя отменить.'
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

export default ScheduleActions;
