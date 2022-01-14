/**
 * In this short assessment, the following code tries to implement the React Suspense API,
 * but does so incorrectly. There are 3 core issues with how these components utilize Suspense and concurrent mode -- can you find them?
 *
 * In your submission, be sure to:
 * 1) Clearly identify what the 3 core issues are, and how they violate the principles of React Suspense;
 * 2) Write and submit the code to fix the core issues you have identified in a gist of your own
 *
 * If you aren't familiar with Suspense, the docs are a good starting place:
 *
 * https://reactjs.org/docs/concurrent-mode-intro.html
 *
 * We rate each answer by comparing the submitted answer to how we would write the same code in production at Contra.
 * You are guaranteed an interview if your code ticks all the boxes. Good luck!
 */

/**
 * CORE ISSUES
 * 1) The useEffect hook should not be used with Suspense because Suspense starts the rendering before the data is returned.
 * 2) The fetchProfileData(id) call for data should be done in a child component of Suspense.
 * 3) The useState hook should not be used with Suspense because the fetchProfileData(id) should return a data object through a contract as is done in Relay.
 * */

import React, { Suspense } from 'react';
import { fetchProfileData } from './simulatedRelayApi';

function SuspensefulUserProfile({ resource }) {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <UserProfile resource={resource} />
    </Suspense>
  );
}

function UserProfile({ resource }) {
  const user = resource.user.read();
  return (
    <>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </>
  );
}

export default function UserProfileList() {
  const userIds = [1, 2, 3];
  const list = userIds.map((id) => {
    const resource = fetchProfileData(id);
    return <SuspensefulUserProfile resource={resource} />;
  });
  return <>{list}</>;
}
