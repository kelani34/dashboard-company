import { UserModel } from 'Containers/User/Models/UserModel';
import { useUser } from 'Context/User';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { pusherSelector } from 'Containers/Core/selectors';

// events for user roles
export const useUserRoleEvents = () => {
  const { id: userId }: UserModel = useUser();

  const pusher = useSelector(pusherSelector, areEqual);

  const [refreshUser, setRefreshUser]: any = useState(false);

  // web sockets events for user role changes
  useEffect(() => {
    if (userId) {
      // user role changed event
      pusher
        ?.subscribe(`BroadcastUserRoleChangedEvent.User.${userId}`)
        ?.bind('App\\Events\\BroadcastUserRoleChangedEvent', () => {
          setRefreshUser(true);
        });
    }

    return () => {
      pusher?.unsubscribe(`BroadcastUserRoleChangedEvent.User.${userId}`);
      setRefreshUser(false);
    };
  }, [pusher, userId]);

  return [refreshUser, setRefreshUser];
};
