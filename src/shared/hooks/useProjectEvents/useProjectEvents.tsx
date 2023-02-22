import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { pusherSelector } from 'Containers/Core/selectors';

// events for a single project
export const useProjectEvents = (projectId: string) => {
  const pusher = useSelector(pusherSelector, areEqual);

  const [refreshProjects, setRefreshProjects]: any = useState(false);
  const [projectDeleted, setProjectDeleted]: any = useState(false);

  // web sockets events for project
  useEffect(() => {
    // project completed event
    const projectCompleted = pusher
      ?.subscribe(`BroadcastProjectCompletedEvent.Project.${projectId}`)
      ?.bind('App\\Events\\BroadcastProjectCompletedEvent', () => {
        setRefreshProjects(true);
      });
    // project created event
    const projectCreated = pusher
      ?.subscribe(`BroadcastProjectCreatedEvent.Project.${projectId}`)
      ?.bind('App\\Events\\BroadcastProjectCreatedEvent', () => {
        setRefreshProjects(true);
      });
    // project deleted event
    const projectDeleted = pusher
      ?.subscribe(`BroadcastProjectDeletedEvent.Project.${projectId}`)
      ?.bind('App\\Events\\BroadcastProjectDeletedEvent', () => {
        setProjectDeleted(true);
        setRefreshProjects(true);
      });

    return () => {
      projectCompleted?.unsubscribe(`BroadcastProjectCompletedEvent.Project.${projectId}`);
      projectCreated?.unsubscribe(`BroadcastProjectCreatedEvent.Project.${projectId}`);
      projectDeleted?.unsubscribe(`BroadcastProjectDeletedEvent.Project.${projectId}`);
      setRefreshProjects(false);
      setProjectDeleted(false);
    };
  }, [pusher]);

  return [refreshProjects, setRefreshProjects, projectDeleted];
};
