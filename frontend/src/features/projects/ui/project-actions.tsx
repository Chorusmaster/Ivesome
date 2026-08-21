import { Bookmark, Flag, Share2, Triangle, Users } from "lucide-react";
import Card from "@/shared/ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import Textarea from "@/shared/ui/textarea";
import { Link } from "react-router-dom";
import type { Project } from "../projects.types";

type ProjectActionsProps = {
  ownProject: boolean;
  project: Project;
  requestSent: boolean;
  requestMessage: string;
  requestSubmitting: boolean;
  requestError: string;
  isUpvoted: boolean;
  upvotes: number;
  isFavourite: boolean;
  onRequestMessageChange: (value: string) => void;
  onParticipationRequest: () => void;
  onUpvote: () => void;
  onShare: () => void;
  onFavourite: () => void;
};

function ProjectActions({ ownProject, project, requestSent, requestMessage, requestSubmitting, requestError, isUpvoted, upvotes, isFavourite, onRequestMessageChange, onParticipationRequest, onUpvote, onShare, onFavourite }: ProjectActionsProps) {
  return (
    ownProject === true ?
    (<Card>
      {project.stage == "IDEA" ?
        <button className="button text-white bg-primary disabled:bg-primary-hover hover:bg-primary-hover flex gap-2 justify-center items-center w-full">Turn into project</button> :
        <Link to="/" className="button text-white bg-primary disabled:bg-primary-hover hover:bg-primary-hover flex gap-2 justify-center items-center">
          Open workspace
        </Link> 
      }
      <div className="flex gap-2 mt-2">
        <Link to="/" className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary transition flex-1 text-center">Edit</Link>
        <button className="button border border-border text-muted hover:text-danger hover:border-danger transition flex-1 text-center">Delete</button>
      </div>
    </Card>) :
    (<Card>
      <div className="flex flex-col gap-4 justify-center">
        <Dialog>
          <DialogTrigger disabled={requestSent} className="button text-white bg-primary disabled:bg-primary-hover hover:bg-primary-hover flex gap-2 justify-center items-center">
            <Users /> {requestSent ? "Request sent" : "Send participation request"}
          </DialogTrigger>
          <DialogContent className="bg-surface ring-border">
            <DialogHeader>
              <DialogTitle>Send participation request</DialogTitle>
              <DialogDescription>Tell the project owner why you'd like to join their team.</DialogDescription>
              <Textarea value={requestMessage} onChange={(event) => onRequestMessageChange(event.target.value)} className="min-h-16 max-h-32" maxLength={2000} />
              {requestError && <p className="text-danger">{requestError}</p>}
            </DialogHeader>
            <DialogFooter className="sm:justify-start bg-surface border-0 -mt-4">
              <div className="flex w-full gap-4 justify-end">
                <DialogClose render={<button type="button" className="hover:text-text-secondary">Close</button>} />
                <button type="button" onClick={onParticipationRequest} disabled={requestSubmitting} className="hover:text-text-secondary disabled:opacity-50">
                  {requestSubmitting ? "Sending..." : "Send request"}
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex justify-center gap-4">
          <button onClick={onUpvote} className={`button w-18 border transition flex items-center gap-2 ${isUpvoted ? "text-primary border-primary" : "border-border text-muted hover:text-primary hover:border-primary"}`}>
            <Triangle size={20} fill={isUpvoted ? "currentColor" : "none"} /> {upvotes}
          </button>
          <button onClick={onShare} className="button border border-border text-muted hover:text-text-secondary hover:border-text-secondary active:bg-muted/10 transition"><Share2 size={20} /></button>
          <button onClick={onFavourite} className={`button border hover:text-accent hover:border-accent transition ${isFavourite ? "text-accent border-accent" : "border-border text-muted"}`}><Bookmark size={20} fill={isFavourite ? "currentColor" : "none"} /></button>
          <button className="button border border-border text-muted hover:text-danger hover:border-danger transition"><Flag size={20} /></button>
        </div>
      </div>
    </Card>)
  );
}

export default ProjectActions;