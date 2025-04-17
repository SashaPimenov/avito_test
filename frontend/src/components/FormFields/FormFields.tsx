import { Board } from '@api/types/board.type';
import { Task } from '@api/types/task.type';
import { User } from '@api/types/user.type';
import { FormInputs } from '@components/FormInputs';
import { ROUTES } from 'src/constants/routes';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './FormFields.module.css';
import { TaskFormValues } from '@components/TaskForm/types';
import { Control, FieldErrors } from 'react-hook-form';
import { FORM_SOURCE } from '@constants/formSource';

interface FormFieldsProps {
  control: Control<TaskFormValues>;
  errors: FieldErrors<TaskFormValues>;
  users?: User[];
  task?: Task;
  source: string;
  boards?: Board[];
  boardId?: number;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  isEditMode: boolean;
}

/**
 * Компонент, который создает форму и отображает ее поля + футер
 */
export const FormFields = ({
  control,
  errors,
  task,
  users,
  source,
  boards,
  boardId,
  onSubmit,
  onCancel,
  isLoading,
  isEditMode,
}: FormFieldsProps) => {
  const navigate = useNavigate();
  const goToBoard = () => {
    const boardId = boards?.find((board) => board.name === task?.boardName)?.id;
    navigate(`${ROUTES.BOARD}/${boardId}?target=form&taskId=${task?.id}`);
  };
  return (
    <Form layout="vertical">
      <FormInputs
        control={control}
        errors={errors}
        users={users}
        boards={boards}
        boardId={boardId}
        isEditMode={isEditMode}
      />

      <Form.Item>
        {isEditMode && source === FORM_SOURCE.TASKS && (
          <Button onClick={goToBoard} disabled={isLoading} className={styles.buttonElement}>
            Перейти на доску
          </Button>
        )}
        <Button onClick={onCancel} disabled={isLoading} className={styles.buttonElement}>
          Отменить
        </Button>
        <Button
          type="primary"
          onClick={onSubmit}
          loading={isLoading}
          className={styles.buttonElement}
        >
          {isEditMode ? 'Изменить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
};
