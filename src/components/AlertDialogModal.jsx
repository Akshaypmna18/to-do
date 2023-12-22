import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogContent,
} from "./ui/alert-dialog";

export default function AlertDialogModal({ children, Content, title, Desc }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <big>{title}</big>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Desc />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Content />
      </AlertDialogContent>
    </AlertDialog>
  );
}
