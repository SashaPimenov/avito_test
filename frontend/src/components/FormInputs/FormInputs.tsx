import { Board } from '@api/types/board.DTO';
import { User } from '@api/types/user.DTO';
import { CreateTaskFormValues, TaskFormValues } from '@components/TaskModal/types';
import { Form, Input, Select } from 'antd';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import styles from './FormInputs.module.css';

const { TextArea } = Input;
const { Option } = Select;

interface FormInputsProps {
  control: Control<TaskFormValues>;
  errors: FieldErrors<TaskFormValues>;
  users?: User[];
  boards?: Board[];
  boardId?: number;
  isEditMode: boolean;
}

/**
 * Общий компонент, который отображает все поля формы создания или редактирования
 */
export const FormInputs = ({
  control,
  errors,
  users,
  boards,
  boardId,
  isEditMode,
}: FormInputsProps) => {
  return (
    <>
      <Form.Item
        label="Заголовок"
        validateStatus={errors.title ? 'error' : ''}
        help={errors.title?.message}
      >
        <Controller name="title" control={control} render={({ field }) => <Input {...field} />} />
      </Form.Item>
      <Form.Item
        label="Описание"
        validateStatus={errors.description ? 'error' : ''}
        help={errors.description?.message}
        className={styles.formItem}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => <TextArea rows={4} {...field} className={styles.textArea} />}
        />
      </Form.Item>
      <Form.Item
        label="Приоритет"
        validateStatus={errors.priority ? 'error' : ''}
        help={errors.priority?.message}
        className={styles.formItem}
      >
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select {...field} className={styles.select}>
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>
          )}
        />
      </Form.Item>

      {isEditMode && (
        <Form.Item
          label="Статус"
          validateStatus={errors.status ? 'error' : ''}
          help={errors.status?.message}
        >
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <Option value="Backlog">Backlog</Option>
                <Option value="InProgress">In Progress</Option>
                <Option value="Done">Done</Option>
              </Select>
            )}
          />
        </Form.Item>
      )}

      <Form.Item
        label="Ответственный"
        validateStatus={errors.assigneeId ? 'error' : ''}
        help={errors.assigneeId?.message}
      >
        <Controller
          name="assigneeId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Выберите ответственного"
              options={users?.map((user) => ({
                label: user.fullName,
                value: user.id,
              }))}
              onChange={field.onChange}
              value={field.value}
              loading={!users}
              status={errors.assigneeId ? 'error' : ''}
            />
          )}
        />
      </Form.Item>

      {!isEditMode && (
        <Form.Item
          label="Доска"
          validateStatus={errors.boardId ? 'error' : ''}
          help={errors.boardId?.message}
          className={styles.formItem}
        >
          <Controller
            name="boardId"
            control={control as Control<CreateTaskFormValues>}
            render={({ field }) => (
              <Select {...field} loading={!boards} disabled={!!boardId} className={styles.select}>
                {boards?.map((board) => (
                  <Option key={board.id} value={board.id}>
                    {board.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>
      )}
    </>
  );
};
