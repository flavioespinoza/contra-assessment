# contra-assessment

Contra coding assessment

## Solution

```js
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
```

## Getting Started

```bash
git clone https://github.com/flavioespinoza/contra-assessment.git
```

```bash
yarn install
```

```bash
yarn start
```

Navigate to:
- http://localhost:3000

