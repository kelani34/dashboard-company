import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { pusherSelector } from 'Containers/Core/selectors';

// events for projects (multi)
export const useProjectsEvents = () => {
  const { id: userId }: UserModel = useUser();

  const pusher = useSelector(pusherSelector, areEqual);

  const [refreshProjects, setRefreshProjects]: any = useState(false);
  const [projectDeleted, setProjectDeleted]: any = useState(false);

  // web sockets events for projects
  useEffect(() => {
    // project completed event
    const projectCompleted = pusher
      ?.subscribe(`BroadcastProjectCompletedEvent.User.${userId}`)
      ?.bind('App\\Events\\BroadcastProjectCompletedEvent', () => {
        setRefreshProjects(true);
      });
    // project created event
    const projectCreated = pusher
      ?.subscribe(`BroadcastProjectCreatedEvent.User.${userId}`)
      ?.bind('App\\Events\\BroadcastProjectCreatedEvent', () => {
        setRefreshProjects(true);
      });
    // project deleted event
    const projectDeleted = pusher
      ?.subscribe(`BroadcastProjectDeletedEvent.User.${userId}`)
      ?.bind('App\\Events\\BroadcastProjectDeletedEvent', () => {
        setProjectDeleted(true);
        setRefreshProjects(true);
      });

    return () => {
      projectCompleted?.unsubscribe(`BroadcastProjectCompletedEvent.User.${userId}`);
      projectCreated?.unsubscribe(`BroadcastProjectCreatedEvent.User.${userId}`);
      projectDeleted?.unsubscribe(`BroadcastProjectDeletedEvent.User.${userId}`);
      setRefreshProjects(false);
      setProjectDeleted(false);
    };
  }, [pusher, userId]);

  return [refreshProjects, setRefreshProjects, projectDeleted];
};
