interface Post {
    id: number;
    title: string;
    body: string;
  }
  interface AddPostModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: { title: string; body: string }) => void;
  }

  interface EditPostModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: { title: string; body: string }) => void;
    initialValues: { title: string; body: string };
  }

  interface DeleteConfirmModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    postId: number;
  }

  interface DeleteConfirmationModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
  }
  