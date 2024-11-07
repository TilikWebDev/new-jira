import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from '@components/modal';
import { Input } from '@ui/input';
import { Textarea } from '@ui/textarea';
import InputFile from '@ui/input-field';
import { FileAttachment, Task, TaskStatuses } from '@appTypes/tasks';
import { useModal } from '@context/modals-context';
import { Button } from '@ui/button';
import { useTasks } from '@context/tasks-context';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  files: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      url: Yup.string().required(),
      size: Yup.number(),
      type: Yup.string(),
    })
  ),
});

const CreateTask: React.FC = () => {
  const { addTask } = useTasks();
  const { closeModal } = useModal();

  const onConfirmCreate = (values: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      id: Date.now(),
      status: TaskStatuses.toDo,
      ...values,
    };
    addTask(newTask);
    closeModal();
  };

  return (
    <Modal
      title="Create a new task"
      body={
        <Formik
          validateOnBlur={false}
          initialValues={{
            title: '',
            description: '',
            status: TaskStatuses.toDo,
            files: [] as FileAttachment[],
          }}
          validationSchema={TaskSchema}
          onSubmit={onConfirmCreate}
        >
          {({ isValid, setFieldValue, values }) => (
            <Form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Title
                </label>
                <Field
                  name="title"
                  as={Input}
                  placeholder="Task Title"
                  className="w-full"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <Field
                  name="description"
                  as={Textarea}
                  placeholder="Task Description"
                  rows={4}
                  className="w-full"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-xs mt-1"
              />

              <InputFile
                label="Attach Files"
                files={values.files}
                onFilesChange={(files: FileAttachment[]) =>
                  setFieldValue('files', files)
                }
              />

              <ErrorMessage
                name="files"
                component="div"
                className="text-red-500 text-xs mt-1"
              />

              <div className="flex justify-end space-x-3 dark:border-gray-700 mt-6">
                <Button type="button" variant="outline" onClick={closeModal}>
                  Cancel
                </Button>

                <Button type="submit" variant="default" disabled={!isValid}>
                  Create
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      }
    />
  );
};

export default React.memo(CreateTask);
