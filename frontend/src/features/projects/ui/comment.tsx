import Avatar from "@/shared/ui/avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { enUS } from "date-fns/locale";

type CommentProps = {
  author: string;
  text: string;
  date: Date;
};

function Comment({ author, text, date }: CommentProps) {
  return (
    <div>
      <hr className="border-border mt-6 mb-6"></hr>
      <div className="flex gap-4">
        <Avatar customText={author} theme="primary_light"></Avatar>
        <div className="flex flex-col gap-1 text-text-secondary">
          <div>
            <span className="text-text-primary font-medium">
              Ferko Mrkvička
            </span>{" "}
            ·{" "}
            {formatDistanceToNowStrict(date, { locale: enUS, addSuffix: true })}
          </div>
          <div>{text}</div>
          <div className="flex gap-2 text-small text-muted">
            <button className="hover:text-text-primary">Respond</button>
            <button className="hover:text-text-primary">Edit</button>
            <button className="hover:text-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
