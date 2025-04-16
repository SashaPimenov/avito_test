import { Board } from '@api/types/board.type';
import { Task } from '@api/types/task.type';
import { User } from '@api/types/user.type';
import { FormInputs } from '@components/FormInputs/FormInputs';
import { ROUTES } from '@const/routes';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './FormFields.module.css'

interface FormFieldsProps {
  control: any;
  errors: any;
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
        {isEditMode && source === 'tasks' && (
          <Button onClick={goToBoard} disabled={isLoading} className={styles.buttonElement}>
            Перейти на доску
          </Button>
        )}
        <Button onClick={onCancel} disabled={isLoading} className={styles.buttonElement}>
          Отменить
        </Button>
        <Button type="primary" onClick={onSubmit} loading={isLoading} className={styles.buttonElement}>
          {isEditMode ? 'Изменить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
};
