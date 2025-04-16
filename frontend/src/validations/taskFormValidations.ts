import * as yup from 'yup';

export const createTaskSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
  assigneeId: yup.number().nullable().required('Assignee is required'),
  boardId: yup.number().required('Board is required'),
});

export const updateTaskSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
  status: yup.string().oneOf(['Backlog', 'InProgress', 'Done']).required('Status is required'),
  assigneeId: yup.number().nullable().required('Assignee is required'),
});
